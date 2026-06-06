'use client'

import { cn } from '@/lib/utils'

export type AiProvider = 'claude' | 'groq'

const OPTIONS: { value: AiProvider; label: string }[] = [
  { value: 'claude', label: 'Claude (Anthropic)' },
  { value: 'groq', label: 'Groq (Llama)' },
]

// Shared Claude-vs-Groq picker used by every feature that runs a structured LLM
// call (brand parsing, WP plugin generation, banner prompt crafting).
export function AiProviderSelect({
  value,
  onChange,
  disabled,
  label = 'AI model',
  className,
}: {
  value: AiProvider
  onChange: (value: AiProvider) => void
  disabled?: boolean
  label?: string
  className?: string
}) {
  return (
    <label className={cn('inline-flex items-center gap-2 text-sm text-slate-600', className)}>
      <span className="font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as AiProvider)}
        disabled={disabled}
        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 disabled:opacity-60"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
