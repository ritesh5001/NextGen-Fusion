import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { getSupabaseAdmin } from '../lib/supabase'
import { requireInternalAuth } from '../middleware/auth'

const router = Router()

router.get('/client-users', requireInternalAuth, async (_req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .select('id, name, company, email, is_active, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ data })
  } catch {
    res.status(500).json({ error: 'Failed to fetch clients' })
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
      if (error.code === '23505') {
        res.status(409).json({ error: 'A client with this email already exists' })
        return
      }
      throw error
    }
    res.status(201).json({ data })
  } catch {
    res.status(500).json({ error: 'Failed to create client' })
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

    if (error) throw error
    res.json({ data })
  } catch {
    res.status(500).json({ error: 'Failed to update client' })
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

    if (error) throw error
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to update password' })
  }
})

router.delete('/client-users/:id', requireInternalAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('client_users')
      .update({ is_active: false })
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to deactivate client' })
  }
})

export default router
