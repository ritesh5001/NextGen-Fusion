declare namespace Express {
  interface Request {
    member_id?: string
    member_role?: 'partner' | 'admin_partner'
  }
}
