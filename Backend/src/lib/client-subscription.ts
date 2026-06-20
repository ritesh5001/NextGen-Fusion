import type { NextFunction, Request, Response } from 'express'
import { getSupabaseAdmin } from './supabase'
import { requireClient } from '../middleware/auth'

export const CLIENT_TOOLS = ['product_catalog', 'image_library', 'ai_product_copy'] as const

export type ClientTool = (typeof CLIENT_TOOLS)[number]
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'inactive'

export const DEFAULT_CLIENT_TOOLS: ClientTool[] = ['product_catalog']

export function isClientTool(value: unknown): value is ClientTool {
  return typeof value === 'string' && (CLIENT_TOOLS as readonly string[]).includes(value)
}

export function normalizeAllowedTools(value: unknown): ClientTool[] {
  if (!Array.isArray(value)) return DEFAULT_CLIENT_TOOLS
  const tools = value.filter(isClientTool)
  return tools.length ? tools : []
}

export function hasActiveSubscription(input: {
  is_active?: boolean | null
  subscription_status?: string | null
  subscription_current_period_end?: string | null
}): boolean {
  if (input.is_active === false) return false
  const status = (input.subscription_status || 'active') as SubscriptionStatus
  if (status !== 'active' && status !== 'trialing') return false
  if (!input.subscription_current_period_end) return true
  return new Date(input.subscription_current_period_end).getTime() >= Date.now()
}

export function requireClientTool(tool: ClientTool) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await requireClient(req, res, async () => {
      try {
        if (!req.client_id) {
          res.status(401).json({ error: 'Unauthorized' })
          return
        }

        const supabase = getSupabaseAdmin()
        const { data, error } = await supabase
          .from('client_users')
          .select('is_active, account_type, subscription_status, subscription_current_period_end, allowed_tools')
          .eq('id', req.client_id)
          .single()

        if (error || !data || data.is_active === false) {
          res.status(403).json({ error: 'An active subscription is required to use this tool' })
          return
        }

        // Real agency clients always have access to the client tools — no payment
        // required. Self-signup users must have paid (active sub + allowed tool).
        if (data.account_type !== 'client') {
          if (!hasActiveSubscription(data)) {
            res.status(403).json({ error: 'An active subscription is required to use this tool' })
            return
          }
          const allowedTools = normalizeAllowedTools(data.allowed_tools)
          if (!allowedTools.includes(tool)) {
            res.status(403).json({ error: 'This tool is not included in your subscription' })
            return
          }
        }

        req.client_subscription = {
          status: (data.subscription_status || 'active') as SubscriptionStatus,
          allowed_tools: normalizeAllowedTools(data.allowed_tools),
          current_period_end: data.subscription_current_period_end || null,
        }
        next()
      } catch {
        res.status(500).json({ error: 'Failed to verify subscription' })
      }
    })
  }
}
