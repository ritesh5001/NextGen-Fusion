import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { getSupabaseAdmin } from '../lib/supabase'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { requireInternalAuth } from '../middleware/auth'
import { DEFAULT_CLIENT_TOOLS, normalizeAllowedTools } from '../lib/client-subscription'

const router = Router()
const DEFAULT_TRIAL_DAYS = 14

router.get('/client-users', requireInternalAuth, async (_req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .select('id, name, company, email, phone, is_active, subscription_plan, subscription_status, subscription_current_period_end, allowed_tools, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('client-users:list', error)
    res.status(500).json({ error: 'Failed to fetch clients', details: getErrorMessage(error) })
  }
})

router.post('/client-users', requireInternalAuth, async (req, res) => {
  try {
    const { name, company, email, password, phone, subscription_plan, subscription_status, allowed_tools } = req.body
    // Name is optional — if the admin doesn't set one, the client is prompted
    // to complete their profile on first login.
    if (!email || !password) {
      res.status(400).json({ error: 'email and password are required' })
      return
    }
    if (password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters' })
      return
    }

    const password_hash = await bcrypt.hash(password, 12)
    const trialEndsAt = new Date(Date.now() + DEFAULT_TRIAL_DAYS * 24 * 60 * 60 * 1000).toISOString()
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .insert({
        name: typeof name === 'string' ? name.trim() : '',
        company: company || null,
        phone: phone || null,
        email: email.toLowerCase().trim(),
        password_hash,
        subscription_plan: typeof subscription_plan === 'string' ? subscription_plan.trim() || 'starter' : 'starter',
        subscription_status: typeof subscription_status === 'string' ? subscription_status : 'trialing',
        subscription_current_period_end: trialEndsAt,
        allowed_tools: allowed_tools === undefined ? DEFAULT_CLIENT_TOOLS : normalizeAllowedTools(allowed_tools),
      })
      .select('id, name, company, email, phone, is_active, subscription_plan, subscription_status, subscription_current_period_end, allowed_tools, created_at')
      .single()

    if (error) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'A client with this email already exists' })
        return
      }
      throw error
    }
    res.status(201).json({ data })
  } catch (error) {
    logRouteError('client-users:create', error)
    res.status(500).json({ error: 'Failed to create client', details: getErrorMessage(error) })
  }
})

router.patch('/client-users/:id', requireInternalAuth, async (req, res) => {
  try {
    const {
      name,
      company,
      email,
      phone,
      is_active,
      subscription_plan,
      subscription_status,
      subscription_current_period_end,
      allowed_tools,
    } = req.body
    const updates: Record<string, unknown> = {}
    if (name !== undefined) updates.name = name
    if (company !== undefined) updates.company = company
    if (phone !== undefined) updates.phone = phone
    if (email !== undefined) updates.email = email.toLowerCase().trim()
    if (is_active !== undefined) updates.is_active = is_active
    if (subscription_plan !== undefined) updates.subscription_plan = subscription_plan || null
    if (subscription_status !== undefined) updates.subscription_status = subscription_status
    if (subscription_current_period_end !== undefined) {
      updates.subscription_current_period_end = subscription_current_period_end || null
    }
    if (allowed_tools !== undefined) updates.allowed_tools = normalizeAllowedTools(allowed_tools)

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .update(updates)
      .eq('id', req.params.id)
      .select('id, name, company, email, phone, is_active, subscription_plan, subscription_status, subscription_current_period_end, allowed_tools, updated_at')
      .single()

    if (error) throw error
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

    if (error) throw error
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

    if (error) throw error
    res.json({ ok: true })
  } catch (error) {
    logRouteError('client-users:deactivate', error)
    res.status(500).json({ error: 'Failed to deactivate client', details: getErrorMessage(error) })
  }
})

export default router
