declare namespace Express {
  interface Request {
    auth_role?: 'admin' | 'member' | 'client'
    member_id?: string
    member_role?: 'partner' | 'admin_partner'
    client_id?: string
  }
}
