import { Router } from 'express'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { getSupabaseAdmin } from '../lib/supabase'
import { requireClient } from '../middleware/auth'

const router = Router()

// Client-facing project view. Only the logged-in client's projects, and only
// client-safe fields (no budget, no internal notes).
router.get('/projects', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('agency_projects')
      .select(`
        id, title, status, priority, project_type, start_date, deadline, delivered_date,
        description, created_at, updated_at,
        project_milestones ( id, title, description, due_date, is_completed, completed_at ),
        project_updates ( id, content, update_type, created_at )
      `)
      .eq('client_id', req.client_id)
      .order('created_at', { ascending: false })
      .order('created_at', { referencedTable: 'project_updates', ascending: false })

    if (error) throw error
    res.json({ data: data ?? [] })
  } catch (error) {
    logRouteError('client-projects:list', error)
    res.status(500).json({ error: 'Failed to fetch projects', details: getErrorMessage(error) })
  }
})

export default router
