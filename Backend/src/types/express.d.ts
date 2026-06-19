declare namespace Express {
  interface Request {
    auth_role?: 'admin' | 'member' | 'client'
    member_id?: string
    member_role?: 'partner' | 'admin_partner'
    client_id?: string
    client_subscription?: {
      status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'inactive'
      allowed_tools: Array<'product_catalog' | 'image_library' | 'ai_product_copy'>
      current_period_end: string | null
    }
  }
}
