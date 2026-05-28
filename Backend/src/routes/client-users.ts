import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { getSupabaseAdmin } from '../lib/supabase'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import {
  createFallbackClientUser,
  isMissingSupabaseTable,
  listFallbackClientUsers,
  updateFallbackClientUser,
} from '../lib/crm-fallback-store'
import { requireInternalAuth } from '../middleware/auth'

const router = Router()

router.get('/client-users', requireInternalAuth, async (_req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .select('id, name, company, email, is_active, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) {
      if (isMissingSupabaseTable(error)) {
        res.json({ data: await listFallbackClientUsers() })
        return
      }
      throw error
    }
    res.json({ data })
  } catch (error) {
    logRouteError('client-users:list', error)
    res.status(500).json({ error: 'Failed to fetch clients', details: getErrorMessage(error) })
  }
})

router.post('/client-users', requireInternalAuth, async (req, res) => {
  try {
    const { name, company, email, password } = req.body
    if (!name || !email || !password) {
      res.status(400).json({ error: 'name, email, and password are required' })
      return
    }
    if (password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters' })
      return
    }

    const password_hash = await bcrypt.hash(password, 12)
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .insert({ name, company: company || null, email: email.toLowerCase().trim(), password_hash })
      .select('id, name, company, email, is_active, created_at')
      .single()

    if (error) {
      if (isMissingSupabaseTable(error)) {
        const data = await createFallbackClientUser({
          name,
          company: company || null,
          email,
          password_hash,
        })
        res.status(201).json({ data })
        return
      }
      if (error.code === '23505') {
        res.status(409).json({ error: 'A client with this email already exists' })
        return
      }
      throw error
    }
    res.status(201).json({ data })
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'DUPLICATE_EMAIL') {
      res.status(409).json({ error: 'A client with this email already exists' })
      return
    }
    logRouteError('client-users:create', error)
    res.status(500).json({ error: 'Failed to create client', details: getErrorMessage(error) })
  }
})

router.patch('/client-users/:id', requireInternalAuth, async (req, res) => {
  try {
    const { name, company, email, is_active } = req.body
    const updates: Record<string, unknown> = {}
    if (name !== undefined) updates.name = name
    if (company !== undefined) updates.company = company
    if (email !== undefined) updates.email = email.toLowerCase().trim()
    if (is_active !== undefined) updates.is_active = is_active

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .update(updates)
      .eq('id', req.params.id)
      .select('id, name, company, email, is_active, updated_at')
      .single()

    if (error) {
      if (isMissingSupabaseTable(error)) {
        const data = await updateFallbackClientUser(req.params.id, updates)
        if (!data) {
          res.status(404).json({ error: 'Client not found' })
          return
        }
        res.json({ data })
        return
      }
      throw error
    }
    res.json({ data })
  } catch (error) {
    logRouteError('client-users:update', error)
    res.status(500).json({ error: 'Failed to update client', details: getErrorMessage(error) })
  }
})

router.patch('/client-users/:id/password', requireInternalAuth, async (req, res) => {
  try {
    const { password } = req.body
    if (!password || password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters' })
      return
    }
    const password_hash = await bcrypt.hash(password, 12)
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('client_users')
      .update({ password_hash })
      .eq('id', req.params.id)

    if (error) {
      if (isMissingSupabaseTable(error)) {
        const data = await updateFallbackClientUser(req.params.id, { password_hash })
        if (!data) {
          res.status(404).json({ error: 'Client not found' })
          return
        }
        res.json({ ok: true })
        return
      }
      throw error
    }
    res.json({ ok: true })
  } catch (error) {
    logRouteError('client-users:password', error)
    res.status(500).json({ error: 'Failed to update password', details: getErrorMessage(error) })
  }
})

router.delete('/client-users/:id', requireInternalAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('client_users')
      .update({ is_active: false })
      .eq('id', req.params.id)

    if (error) {
      if (isMissingSupabaseTable(error)) {
        const data = await updateFallbackClientUser(req.params.id, { is_active: false })
        if (!data) {
          res.status(404).json({ error: 'Client not found' })
          return
        }
        res.json({ ok: true })
        return
      }
      throw error
    }
    res.json({ ok: true })
  } catch (error) {
    logRouteError('client-users:deactivate', error)
    res.status(500).json({ error: 'Failed to deactivate client', details: getErrorMessage(error) })
  }
})

export default router
