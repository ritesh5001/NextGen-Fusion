import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { getSupabaseAdmin } from '../lib/supabase'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/members', requireAuth, async (_req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('agency_members')
      .select('id, name, email, role, avatar_color, is_active, created_at, updated_at')
      .order('created_at', { ascending: true })

    if (error) throw error
    res.json({ data })
  } catch {
    res.status(500).json({ error: 'Failed to fetch members' })
  }
})

router.post('/members', requireAuth, async (req, res) => {
  try {
    const { name, email, password, role = 'partner', avatar_color = '#3B82F6' } = req.body
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
      .from('agency_members')
      .insert({ name, email: email.toLowerCase().trim(), password_hash, role, avatar_color })
      .select('id, name, email, role, avatar_color, is_active, created_at')
      .single()

    if (error) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'A member with this email already exists' })
        return
      }
      throw error
    }
    res.status(201).json({ data })
  } catch {
    res.status(500).json({ error: 'Failed to create member' })
  }
})

router.get('/members/:id', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const [memberRes, countRes] = await Promise.all([
      supabase
        .from('agency_members')
        .select('id, name, email, role, avatar_color, is_active, created_at, updated_at')
        .eq('id', req.params.id)
        .single(),
      supabase
        .from('project_assignments')
        .select('id', { count: 'exact', head: true })
        .eq('member_id', req.params.id),
    ])

    if (memberRes.error || !memberRes.data) {
      res.status(404).json({ error: 'Member not found' })
      return
    }

    res.json({ data: { ...memberRes.data, active_project_count: countRes.count ?? 0 } })
  } catch {
    res.status(500).json({ error: 'Failed to fetch member' })
  }
})

router.patch('/members/:id', requireAuth, async (req, res) => {
  try {
    const { name, email, role, avatar_color, is_active } = req.body
    const updates: Record<string, unknown> = {}
    if (name !== undefined) updates.name = name
    if (email !== undefined) updates.email = email.toLowerCase().trim()
    if (role !== undefined) updates.role = role
    if (avatar_color !== undefined) updates.avatar_color = avatar_color
    if (is_active !== undefined) updates.is_active = is_active

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('agency_members')
      .update(updates)
      .eq('id', req.params.id)
      .select('id, name, email, role, avatar_color, is_active, updated_at')
      .single()

    if (error) throw error
    res.json({ data })
  } catch {
    res.status(500).json({ error: 'Failed to update member' })
  }
})

router.patch('/members/:id/password', requireAuth, async (req, res) => {
  try {
    const { password } = req.body
    if (!password || password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters' })
      return
    }
    const password_hash = await bcrypt.hash(password, 12)
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('agency_members')
      .update({ password_hash })
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to update password' })
  }
})

router.delete('/members/:id', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('agency_members')
      .update({ is_active: false })
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to deactivate member' })
  }
})

export default router
