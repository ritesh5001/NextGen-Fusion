// The journey a product takes from a chat message to a CSV row, expressed as
// discrete stages so the admin panel can show how far along each one is.

export const PF_STAGES = [
  { key: 'received', label: 'Message received' },
  { key: 'images', label: 'Images stored' },
  { key: 'extracted', label: 'Details extracted' },
  { key: 'complete', label: 'Ready for review' },
  { key: 'approved', label: 'Approved' },
  { key: 'exported', label: 'Exported to CSV' },
] as const

export type PfStageKey = (typeof PF_STAGES)[number]['key']

export type PfProgress = {
  stage: PfStageKey
  stageIndex: number
  totalStages: number
  percent: number
  /** Stages already cleared, for ticking off the stepper. */
  done: PfStageKey[]
  blockedBy: string[]
  note: string
}

type ProgressInput = {
  status: string
  productData: Record<string, unknown>
  imageCount: number
  missingFields: string[]
  exported?: boolean
}

const has = (value: unknown): boolean =>
  value !== undefined &&
  value !== null &&
  value !== '' &&
  !(Array.isArray(value) && value.length === 0)

/**
 * Works out how far a draft (or approved product) has travelled.
 *
 * Derived from state rather than stored, so it can never drift out of sync with
 * the draft it describes.
 */
export function describeProgress(input: ProgressInput): PfProgress {
  const { status, productData, imageCount, missingFields } = input

  const done: PfStageKey[] = ['received']

  if (imageCount > 0) done.push('images')

  // "Extracted" means the AI got something real off the message, not just that
  // it ran — a name or a price is the minimum worth showing as progress.
  if (has(productData.name) || has(productData.regular_price)) done.push('extracted')

  const isComplete = missingFields.length === 0
  if (isComplete || status === 'READY_FOR_REVIEW' || status === 'APPROVED') {
    done.push('complete')
  }
  if (status === 'APPROVED') done.push('approved')
  if (input.exported) done.push('exported')

  // Stages can complete out of order — a client often sends the name and price
  // before any photos — so the current stage is the FURTHEST one reached in
  // canonical order, not simply however many are ticked off.
  const doneSet = new Set<PfStageKey>(done)
  let stageIndex = 0
  PF_STAGES.forEach((s, i) => {
    if (doneSet.has(s.key)) stageIndex = i
  })
  const stage = PF_STAGES[stageIndex].key

  const isComplete2 = missingFields.length === 0

  let note: string
  if (status === 'CANCELLED') note = 'Cancelled by the client.'
  else if (input.exported) note = 'Included in a CSV export.'
  else if (status === 'APPROVED') note = 'Saved — will be included in the next CSV export.'
  else if (missingFields.length) note = `Waiting on the client for: ${missingFields.join(', ')}.`
  // Completeness, not the stored status string: a draft can satisfy every
  // requirement in the same pass that sets its status.
  else if (isComplete2) note = 'Waiting for the client to tap Approve.'
  else note = 'Collecting details from chat.'

  return {
    stage,
    stageIndex,
    totalStages: PF_STAGES.length,
    percent: Math.round((done.length / PF_STAGES.length) * 100),
    done,
    blockedBy: missingFields,
    note,
  }
}
