import { Router } from 'express'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { getSupabaseAdmin } from '../lib/supabase'
import { requireClient } from '../middleware/auth'

const router = Router()

const PROFILE_COLUMNS =
  'id, name, company, email, phone, subscription_plan, subscription_status, subscription_current_period_end, allowed_tools'

router.get('/profile', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .select(PROFILE_COLUMNS)
      .eq('id', req.client_id)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Profile not found' })
      return
    }
    res.json({ data })
  } catch (error) {
    logRouteError('client-profile:get', error)
    res.status(500).json({ error: 'Failed to load profile', details: getErrorMessage(error) })
  }
})

router.patch('/profile', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const { name, company, phone } = req.body ?? {}
    const updates: Record<string, unknown> = {}
    if (name !== undefined) updates.name = typeof name === 'string' ? name.trim() : ''
    if (company !== undefined) updates.company = company || null
    if (phone !== undefined) updates.phone = phone || null

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .update(updates)
      .eq('id', req.client_id)
      .select(PROFILE_COLUMNS)
      .single()

    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('client-profile:update', error)
    res.status(500).json({ error: 'Failed to update profile', details: getErrorMessage(error) })
  }
})

export default router
