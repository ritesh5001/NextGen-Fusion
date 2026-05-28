import { Router } from 'express'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { getSupabaseAdmin } from '../lib/supabase'
import { requireAuth } from '../middleware/auth'

const router = Router()

// ─── List projects ────────────────────────────────────────────────────────────
router.get('/projects', requireAuth, async (req, res) => {
  try {
    const { status, member_id, priority, q } = req.query
    const supabase = getSupabaseAdmin()

    let query = supabase
      .from('agency_projects')
      .select(`
        id, title, client_name, client_company, status, priority, project_type,
        start_date, deadline, delivered_date, budget, currency, created_at, updated_at,
        project_assignments (
          role,
          agency_members ( id, name, avatar_color )
        )
      `)
      .order('created_at', { ascending: false })

    if (status) query = query.eq('status', status as string)
    if (priority) query = query.eq('priority', priority as string)
    if (q) {
      query = query.or(`title.ilike.%${q}%,client_name.ilike.%${q}%,client_company.ilike.%${q}%`)
    }

    const { data, error } = await query
    if (error) throw error

    let result = data ?? []
    if (member_id) {
      result = result.filter((p) => {
        const assignments = p.project_assignments as unknown as Array<{
          agency_members: Array<{ id: string }> | { id: string } | null
        }>
        return assignments.some((a) => {
          if (!a.agency_members) return false
          if (Array.isArray(a.agency_members)) return a.agency_members.some((m) => m.id === member_id)
          return a.agency_members.id === member_id
        })
      })
    }

    res.json({ data: result })
  } catch (error) {
    logRouteError('agency-projects:list', error)
    res.status(500).json({ error: 'Failed to fetch projects', details: getErrorMessage(error) })
  }
})

// ─── Create project ───────────────────────────────────────────────────────────
router.post('/projects', requireAuth, async (req, res) => {
  try {
    const {
      title, client_name, client_email, client_phone, client_company, client_website,
      status = 'kickoff', priority = 'medium', project_type,
      start_date, deadline, budget, currency = 'INR',
      description, notes, member_ids = [],
    } = req.body

    if (!title || !client_name) {
      res.status(400).json({ error: 'title and client_name are required' })
      return
    }

    const supabase = getSupabaseAdmin()
    const { data: project, error } = await supabase
      .from('agency_projects')
      .insert({
        title, client_name, client_email, client_phone, client_company, client_website,
        status, priority, project_type, start_date, deadline, budget, currency, description, notes,
      })
      .select()
      .single()

    if (error) throw error

    if (Array.isArray(member_ids) && member_ids.length > 0) {
      const assignments = member_ids.map((mid: string) => ({
        project_id: project.id,
        member_id: mid,
        role: 'contributor',
      }))
      await supabase.from('project_assignments').insert(assignments)
    }

    await supabase.from('project_updates').insert({
      project_id: project.id,
      member_id: req.member_id ?? null,
      content: `Project created with status: ${status}`,
      update_type: 'system',
    })

    res.status(201).json({ data: project })
  } catch (error) {
    logRouteError('agency-projects:create', error)
    res.status(500).json({ error: 'Failed to create project', details: getErrorMessage(error) })
  }
})

// ─── Get project detail ───────────────────────────────────────────────────────
router.get('/projects/:id', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('agency_projects')
      .select(`
        *,
        project_assignments ( role, assigned_at, agency_members ( id, name, avatar_color, role ) ),
        project_references ( * ),
        project_milestones ( * ),
        project_updates ( *, agency_members ( id, name ) )
      `)
      .eq('id', req.params.id)
      .order('created_at', { referencedTable: 'project_updates', ascending: false })
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Project not found' })
      return
    }
    res.json({ data })
  } catch (error) {
    logRouteError('agency-projects:detail', error)
    res.status(500).json({ error: 'Failed to fetch project', details: getErrorMessage(error) })
  }
})

// ─── Update project ───────────────────────────────────────────────────────────
router.patch('/projects/:id', requireAuth, async (req, res) => {
  try {
    const allowed = [
      'title', 'client_name', 'client_email', 'client_phone', 'client_company',
      'client_website', 'priority', 'project_type', 'start_date', 'deadline',
      'delivered_date', 'budget', 'currency', 'description', 'notes',
    ]
    const updates: Record<string, unknown> = {}
    for (const key of allowed) {
      if (key in req.body) updates[key] = req.body[key]
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('agency_projects')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('agency-projects:update', error)
    res.status(500).json({ error: 'Failed to update project', details: getErrorMessage(error) })
  }
})

// ─── Delete project ───────────────────────────────────────────────────────────
router.delete('/projects/:id', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('agency_projects')
      .delete()
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ ok: true })
  } catch (error) {
    logRouteError('agency-projects:delete', error)
    res.status(500).json({ error: 'Failed to delete project', details: getErrorMessage(error) })
  }
})

// ─── Change project status ────────────────────────────────────────────────────
router.patch('/projects/:id/status', requireAuth, async (req, res) => {
  try {
    const { status, note } = req.body
    const validStatuses = ['kickoff', 'in_progress', 'client_review', 'revisions', 'delivered', 'on_hold', 'cancelled']
    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid status value' })
      return
    }

    const supabase = getSupabaseAdmin()
    const updates: Record<string, unknown> = { status }
    if (status === 'delivered') updates.delivered_date = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('agency_projects')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) throw error

    const statusLabels: Record<string, string> = {
      kickoff: 'Kickoff',
      in_progress: 'In Progress',
      client_review: 'Client Review',
      revisions: 'Revisions',
      delivered: 'Delivered',
      on_hold: 'On Hold',
      cancelled: 'Cancelled',
    }
    const content = note
      ? `Status changed to ${statusLabels[status]}. ${note}`
      : `Status changed to ${statusLabels[status]}`

    await supabase.from('project_updates').insert({
      project_id: req.params.id,
      member_id: req.member_id ?? null,
      content,
      update_type: 'status_change',
    })

    res.json({ data })
  } catch (error) {
    logRouteError('agency-projects:status', error)
    res.status(500).json({ error: 'Failed to update status', details: getErrorMessage(error) })
  }
})

// ─── Assignments ──────────────────────────────────────────────────────────────
router.post('/projects/:id/assignments', requireAuth, async (req, res) => {
  try {
    const { member_id, role = 'contributor' } = req.body
    if (!member_id) {
      res.status(400).json({ error: 'member_id is required' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('project_assignments')
      .upsert({ project_id: req.params.id, member_id, role }, { onConflict: 'project_id,member_id' })
      .select()
      .single()

    if (error) throw error
    res.status(201).json({ data })
  } catch (error) {
    logRouteError('agency-projects:assign', error)
    res.status(500).json({ error: 'Failed to assign member', details: getErrorMessage(error) })
  }
})

router.delete('/projects/:id/assignments/:member_id', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('project_assignments')
      .delete()
      .eq('project_id', req.params.id)
      .eq('member_id', req.params.member_id)

    if (error) throw error
    res.json({ ok: true })
  } catch (error) {
    logRouteError('agency-projects:unassign', error)
    res.status(500).json({ error: 'Failed to remove assignment', details: getErrorMessage(error) })
  }
})

// ─── References ───────────────────────────────────────────────────────────────
router.post('/projects/:id/references', requireAuth, async (req, res) => {
  try {
    const { type, title, url, notes } = req.body
    if (!type || !title || !url) {
      res.status(400).json({ error: 'type, title, and url are required' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('project_references')
      .insert({ project_id: req.params.id, type, title, url, notes })
      .select()
      .single()

    if (error) throw error
    res.status(201).json({ data })
  } catch (error) {
    logRouteError('agency-projects:add-reference', error)
    res.status(500).json({ error: 'Failed to add reference', details: getErrorMessage(error) })
  }
})

router.delete('/projects/:id/references/:ref_id', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('project_references')
      .delete()
      .eq('id', req.params.ref_id)
      .eq('project_id', req.params.id)

    if (error) throw error
    res.json({ ok: true })
  } catch (error) {
    logRouteError('agency-projects:delete-reference', error)
    res.status(500).json({ error: 'Failed to delete reference', details: getErrorMessage(error) })
  }
})

// ─── Milestones ───────────────────────────────────────────────────────────────
router.post('/projects/:id/milestones', requireAuth, async (req, res) => {
  try {
    const { title, description, due_date } = req.body
    if (!title) {
      res.status(400).json({ error: 'title is required' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('project_milestones')
      .insert({ project_id: req.params.id, title, description, due_date })
      .select()
      .single()

    if (error) throw error
    res.status(201).json({ data })
  } catch (error) {
    logRouteError('agency-projects:add-milestone', error)
    res.status(500).json({ error: 'Failed to add milestone', details: getErrorMessage(error) })
  }
})

router.patch('/projects/:id/milestones/:mid', requireAuth, async (req, res) => {
  try {
    const { title, description, due_date, is_completed } = req.body
    const updates: Record<string, unknown> = {}
    if (title !== undefined) updates.title = title
    if (description !== undefined) updates.description = description
    if (due_date !== undefined) updates.due_date = due_date
    if (is_completed !== undefined) {
      updates.is_completed = is_completed
      updates.completed_at = is_completed ? new Date().toISOString() : null
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('project_milestones')
      .update(updates)
      .eq('id', req.params.mid)
      .eq('project_id', req.params.id)
      .select()
      .single()

    if (error) throw error

    if (is_completed && data) {
      await supabase.from('project_updates').insert({
        project_id: req.params.id,
        member_id: req.member_id ?? null,
        content: `Milestone completed: ${data.title}`,
        update_type: 'milestone',
      })
    }

    res.json({ data })
  } catch (error) {
    logRouteError('agency-projects:update-milestone', error)
    res.status(500).json({ error: 'Failed to update milestone', details: getErrorMessage(error) })
  }
})

router.delete('/projects/:id/milestones/:mid', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('project_milestones')
      .delete()
      .eq('id', req.params.mid)
      .eq('project_id', req.params.id)

    if (error) throw error
    res.json({ ok: true })
  } catch (error) {
    logRouteError('agency-projects:delete-milestone', error)
    res.status(500).json({ error: 'Failed to delete milestone', details: getErrorMessage(error) })
  }
})

// ─── Activity log ─────────────────────────────────────────────────────────────
router.get('/projects/:id/updates', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('project_updates')
      .select('*, agency_members ( id, name )')
      .eq('project_id', req.params.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('agency-projects:list-updates', error)
    res.status(500).json({ error: 'Failed to fetch updates', details: getErrorMessage(error) })
  }
})

router.post('/projects/:id/updates', requireAuth, async (req, res) => {
  try {
    const { content, update_type = 'note' } = req.body
    if (!content) {
      res.status(400).json({ error: 'content is required' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('project_updates')
      .insert({
        project_id: req.params.id,
        member_id: req.member_id ?? null,
        content,
        update_type,
      })
      .select('*, agency_members ( id, name )')
      .single()

    if (error) throw error
    res.status(201).json({ data })
  } catch (error) {
    logRouteError('agency-projects:add-update', error)
    res.status(500).json({ error: 'Failed to add update', details: getErrorMessage(error) })
  }
})

export default router
