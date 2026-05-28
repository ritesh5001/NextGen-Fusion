import { randomUUID } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import { MongoClient, Db } from 'mongodb'

export type ClientUser = {
  id: string
  name: string
  company: string | null
  email: string
  password_hash: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type AgencyMember = {
  id: string
  name: string
  email: string
  password_hash: string
  role: 'partner' | 'admin_partner'
  avatar_color: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type AgencyProject = {
  id: string
  title: string
  client_name: string
  client_email?: string | null
  client_phone?: string | null
  client_company: string | null
  client_website?: string | null
  status: string
  priority: string
  project_type: string | null
  start_date: string | null
  deadline: string | null
  delivered_date: string | null
  budget: number | null
  currency: string
  description?: string | null
  notes?: string | null
  created_at: string
  updated_at: string
  project_assignments: unknown[]
}

export type ClientProduct = {
  id: string
  client_id: string
  title: string
  description: string | null
  vendor: string | null
  product_type: string | null
  category: string | null
  tags: string | null
  published: boolean
  options: unknown[]
  variants: unknown[]
  images: string[]
  created_at: string
  updated_at: string
}

type FallbackData = {
  client_users: ClientUser[]
  agency_members: AgencyMember[]
  agency_projects: AgencyProject[]
  client_products: ClientProduct[]
}

const emptyData = (): FallbackData => ({
  client_users: [],
  agency_members: [],
  agency_projects: [],
  client_products: [],
})

let mongoClientPromise: Promise<MongoClient> | null = null

function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI)
}

async function getMongoDb(): Promise<Db> {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured')
  if (!mongoClientPromise) {
    mongoClientPromise = new MongoClient(process.env.MONGODB_URI).connect()
  }
  const client = await mongoClientPromise
  return client.db(process.env.MONGODB_DB || 'nextgenfusion')
}

function getFallbackFile(): string {
  return process.env.CRM_FALLBACK_FILE || path.join(process.cwd(), 'crm-fallback.json')
}

async function readFileData(): Promise<FallbackData> {
  try {
    const raw = await fs.readFile(getFallbackFile(), 'utf8')
    return { ...emptyData(), ...JSON.parse(raw) }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return emptyData()
    throw error
  }
}

async function writeFileData(data: FallbackData): Promise<void> {
  const file = getFallbackFile()
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(data, null, 2))
}

export function isMissingSupabaseTable(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const maybe = error as { code?: unknown; message?: unknown }
  return (
    maybe.code === 'PGRST205' ||
    (typeof maybe.message === 'string' &&
      (maybe.message.includes('schema cache') || maybe.message.includes('Could not find the table')))
  )
}

export function publicClientUser(user: ClientUser): Omit<ClientUser, 'password_hash'> {
  const { password_hash: _passwordHash, ...rest } = user
  return rest
}

export function publicAgencyMember(member: AgencyMember): Omit<AgencyMember, 'password_hash'> {
  const { password_hash: _passwordHash, ...rest } = member
  return rest
}

export async function listFallbackClientUsers(): Promise<Array<Omit<ClientUser, 'password_hash'>>> {
  if (isMongoConfigured()) {
    const db = await getMongoDb()
    const items = await db.collection<ClientUser>('client_users').find().sort({ created_at: -1 }).toArray()
    return items.map(publicClientUser)
  }

  const data = await readFileData()
  return [...data.client_users]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map(publicClientUser)
}

export async function findFallbackClientByEmail(email: string): Promise<ClientUser | null> {
  const normalizedEmail = email.toLowerCase().trim()
  if (isMongoConfigured()) {
    const db = await getMongoDb()
    return db.collection<ClientUser>('client_users').findOne({ email: normalizedEmail })
  }

  const data = await readFileData()
  return data.client_users.find((user) => user.email === normalizedEmail) ?? null
}

export async function createFallbackClientUser(input: {
  name: string
  company?: string | null
  email: string
  password_hash: string
}): Promise<Omit<ClientUser, 'password_hash'>> {
  const now = new Date().toISOString()
  const user: ClientUser = {
    id: randomUUID(),
    name: input.name,
    company: input.company || null,
    email: input.email.toLowerCase().trim(),
    password_hash: input.password_hash,
    is_active: true,
    created_at: now,
    updated_at: now,
  }

  if (isMongoConfigured()) {
    const db = await getMongoDb()
    const exists = await db.collection<ClientUser>('client_users').findOne({ email: user.email })
    if (exists) throw Object.assign(new Error('A client with this email already exists'), { code: 'DUPLICATE_EMAIL' })
    await db.collection<ClientUser>('client_users').insertOne(user)
    return publicClientUser(user)
  }

  const data = await readFileData()
  if (data.client_users.some((item) => item.email === user.email)) {
    throw Object.assign(new Error('A client with this email already exists'), { code: 'DUPLICATE_EMAIL' })
  }
  data.client_users.unshift(user)
  await writeFileData(data)
  return publicClientUser(user)
}

export async function updateFallbackClientUser(
  id: string,
  updates: Partial<Pick<ClientUser, 'name' | 'company' | 'email' | 'is_active' | 'password_hash'>>,
): Promise<Omit<ClientUser, 'password_hash'> | null> {
  const normalized: Partial<ClientUser> = { ...updates, updated_at: new Date().toISOString() }
  if (updates.email) normalized.email = updates.email.toLowerCase().trim()

  if (isMongoConfigured()) {
    const db = await getMongoDb()
    const result = await db
      .collection<ClientUser>('client_users')
      .findOneAndUpdate({ id }, { $set: normalized }, { returnDocument: 'after' })
    return result ? publicClientUser(result) : null
  }

  const data = await readFileData()
  const index = data.client_users.findIndex((item) => item.id === id)
  if (index === -1) return null
  data.client_users[index] = { ...data.client_users[index], ...normalized }
  await writeFileData(data)
  return publicClientUser(data.client_users[index])
}

export async function deleteFallbackClientUser(id: string): Promise<boolean> {
  if (isMongoConfigured()) {
    const db = await getMongoDb()
    const result = await db.collection<ClientUser>('client_users').deleteOne({ id })
    return result.deletedCount > 0
  }

  const data = await readFileData()
  const next = data.client_users.filter((item) => item.id !== id)
  if (next.length === data.client_users.length) return false
  data.client_users = next
  await writeFileData(data)
  return true
}

export async function listFallbackAgencyMembers(): Promise<Array<Omit<AgencyMember, 'password_hash'>>> {
  if (isMongoConfigured()) {
    const db = await getMongoDb()
    const items = await db.collection<AgencyMember>('agency_members').find().sort({ created_at: 1 }).toArray()
    return items.map(publicAgencyMember)
  }

  const data = await readFileData()
  return [...data.agency_members]
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
    .map(publicAgencyMember)
}

export async function findFallbackAgencyMemberByEmail(email: string): Promise<AgencyMember | null> {
  const normalizedEmail = email.toLowerCase().trim()
  if (isMongoConfigured()) {
    const db = await getMongoDb()
    return db.collection<AgencyMember>('agency_members').findOne({ email: normalizedEmail })
  }

  const data = await readFileData()
  return data.agency_members.find((member) => member.email === normalizedEmail) ?? null
}

export async function createFallbackAgencyMember(input: {
  name: string
  email: string
  password_hash: string
  role?: 'partner' | 'admin_partner'
  avatar_color?: string
}): Promise<Omit<AgencyMember, 'password_hash'>> {
  const now = new Date().toISOString()
  const member: AgencyMember = {
    id: randomUUID(),
    name: input.name,
    email: input.email.toLowerCase().trim(),
    password_hash: input.password_hash,
    role: input.role || 'partner',
    avatar_color: input.avatar_color || '#3B82F6',
    is_active: true,
    created_at: now,
    updated_at: now,
  }

  if (isMongoConfigured()) {
    const db = await getMongoDb()
    const exists = await db.collection<AgencyMember>('agency_members').findOne({ email: member.email })
    if (exists) throw Object.assign(new Error('A member with this email already exists'), { code: 'DUPLICATE_EMAIL' })
    await db.collection<AgencyMember>('agency_members').insertOne(member)
    return publicAgencyMember(member)
  }

  const data = await readFileData()
  if (data.agency_members.some((item) => item.email === member.email)) {
    throw Object.assign(new Error('A member with this email already exists'), { code: 'DUPLICATE_EMAIL' })
  }
  data.agency_members.push(member)
  await writeFileData(data)
  return publicAgencyMember(member)
}

export async function updateFallbackAgencyMember(
  id: string,
  updates: Partial<Pick<AgencyMember, 'name' | 'email' | 'role' | 'avatar_color' | 'is_active' | 'password_hash'>>,
): Promise<Omit<AgencyMember, 'password_hash'> | null> {
  const normalized: Partial<AgencyMember> = { ...updates, updated_at: new Date().toISOString() }
  if (updates.email) normalized.email = updates.email.toLowerCase().trim()

  if (isMongoConfigured()) {
    const db = await getMongoDb()
    const result = await db
      .collection<AgencyMember>('agency_members')
      .findOneAndUpdate({ id }, { $set: normalized }, { returnDocument: 'after' })
    return result ? publicAgencyMember(result) : null
  }

  const data = await readFileData()
  const index = data.agency_members.findIndex((item) => item.id === id)
  if (index === -1) return null
  data.agency_members[index] = { ...data.agency_members[index], ...normalized }
  await writeFileData(data)
  return publicAgencyMember(data.agency_members[index])
}

export async function listFallbackAgencyProjects(): Promise<AgencyProject[]> {
  if (isMongoConfigured()) {
    const db = await getMongoDb()
    return db.collection<AgencyProject>('agency_projects').find().sort({ created_at: -1 }).toArray()
  }

  const data = await readFileData()
  return [...data.agency_projects].sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export async function createFallbackAgencyProject(
  input: Omit<AgencyProject, 'id' | 'created_at' | 'updated_at' | 'project_assignments'>,
): Promise<AgencyProject> {
  const now = new Date().toISOString()
  const project: AgencyProject = {
    id: randomUUID(),
    ...input,
    created_at: now,
    updated_at: now,
    project_assignments: [],
  }

  if (isMongoConfigured()) {
    const db = await getMongoDb()
    await db.collection<AgencyProject>('agency_projects').insertOne(project)
    return project
  }

  const data = await readFileData()
  data.agency_projects.unshift(project)
  await writeFileData(data)
  return project
}

export async function listFallbackClientProducts(clientId: string): Promise<ClientProduct[]> {
  if (isMongoConfigured()) {
    const db = await getMongoDb()
    return db
      .collection<ClientProduct>('client_products')
      .find({ client_id: clientId })
      .sort({ created_at: -1 })
      .toArray()
  }

  const data = await readFileData()
  return data.client_products
    .filter((product) => product.client_id === clientId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export async function findFallbackClientProduct(clientId: string, id: string): Promise<ClientProduct | null> {
  if (isMongoConfigured()) {
    const db = await getMongoDb()
    return db.collection<ClientProduct>('client_products').findOne({ id, client_id: clientId })
  }

  const data = await readFileData()
  return data.client_products.find((product) => product.id === id && product.client_id === clientId) ?? null
}

export async function createFallbackClientProduct(
  clientId: string,
  input: Partial<Omit<ClientProduct, 'id' | 'client_id' | 'created_at' | 'updated_at'>>,
): Promise<ClientProduct> {
  const now = new Date().toISOString()
  const product: ClientProduct = {
    id: randomUUID(),
    client_id: clientId,
    title: String(input.title || ''),
    description: typeof input.description === 'string' ? input.description : null,
    vendor: typeof input.vendor === 'string' ? input.vendor : null,
    product_type: typeof input.product_type === 'string' ? input.product_type : null,
    category: typeof input.category === 'string' ? input.category : null,
    tags: typeof input.tags === 'string' ? input.tags : null,
    published: typeof input.published === 'boolean' ? input.published : true,
    options: Array.isArray(input.options) ? input.options : [],
    variants: Array.isArray(input.variants) ? input.variants : [],
    images: Array.isArray(input.images) ? input.images.filter((item): item is string => typeof item === 'string') : [],
    created_at: now,
    updated_at: now,
  }

  if (isMongoConfigured()) {
    const db = await getMongoDb()
    await db.collection<ClientProduct>('client_products').insertOne(product)
    return product
  }

  const data = await readFileData()
  data.client_products.unshift(product)
  await writeFileData(data)
  return product
}

export async function updateFallbackClientProduct(
  clientId: string,
  id: string,
  updates: Partial<Omit<ClientProduct, 'id' | 'client_id' | 'created_at'>>,
): Promise<ClientProduct | null> {
  const normalized: Partial<ClientProduct> = { updated_at: new Date().toISOString() }
  if (updates.title !== undefined) normalized.title = String(updates.title)
  if (updates.description !== undefined) normalized.description = typeof updates.description === 'string' ? updates.description : null
  if (updates.vendor !== undefined) normalized.vendor = typeof updates.vendor === 'string' ? updates.vendor : null
  if (updates.product_type !== undefined) normalized.product_type = typeof updates.product_type === 'string' ? updates.product_type : null
  if (updates.category !== undefined) normalized.category = typeof updates.category === 'string' ? updates.category : null
  if (updates.tags !== undefined) normalized.tags = typeof updates.tags === 'string' ? updates.tags : null
  if (updates.published !== undefined) normalized.published = Boolean(updates.published)
  if (updates.options !== undefined) normalized.options = Array.isArray(updates.options) ? updates.options : []
  if (updates.variants !== undefined) normalized.variants = Array.isArray(updates.variants) ? updates.variants : []
  if (updates.images !== undefined) {
    normalized.images = Array.isArray(updates.images)
      ? updates.images.filter((item): item is string => typeof item === 'string')
      : []
  }

  if (isMongoConfigured()) {
    const db = await getMongoDb()
    return db
      .collection<ClientProduct>('client_products')
      .findOneAndUpdate({ id, client_id: clientId }, { $set: normalized }, { returnDocument: 'after' })
  }

  const data = await readFileData()
  const index = data.client_products.findIndex((product) => product.id === id && product.client_id === clientId)
  if (index === -1) return null
  data.client_products[index] = { ...data.client_products[index], ...normalized }
  await writeFileData(data)
  return data.client_products[index]
}

export async function deleteFallbackClientProduct(clientId: string, id: string): Promise<boolean> {
  if (isMongoConfigured()) {
    const db = await getMongoDb()
    const result = await db.collection<ClientProduct>('client_products').deleteOne({ id, client_id: clientId })
    return result.deletedCount > 0
  }

  const data = await readFileData()
  const next = data.client_products.filter((product) => product.id !== id || product.client_id !== clientId)
  if (next.length === data.client_products.length) return false
  data.client_products = next
  await writeFileData(data)
  return true
}
