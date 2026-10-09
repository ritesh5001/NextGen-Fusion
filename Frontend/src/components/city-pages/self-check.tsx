"use client"

import { useId, useState } from "react"
import { Check, MessageCircle } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { whatsappHref } from "@/lib/whatsapp"

type Props = {
  heading: string
  items: string[]
  /** e.g. "SEO in Sydney" — used in the result and the WhatsApp message. */
  topic: string
}

function verdict(ticked: number, total: number) {
  if (ticked === total) {
    return "Strong foundations. The gains from here are in the details. Send us your site and we will point out the next three."
  }
  if (ticked * 2 >= total) {
    return "A good base. The unticked items are usually the quickest wins: small fixes with a visible effect on enquiries."
  }
  return "This is where most businesses start. Fixing these usually does more for growth than spending more on traffic, and we can help with each one."
}

/** A short self-audit the visitor ticks through; nothing is stored or sent. */
export function SelfCheck({ heading, items, topic }: Props) {
  const [ticked, setTicked] = useState<boolean[]>(() => items.map(() => false))
  const baseId = useId()
  const count = ticked.filter(Boolean).length
  const touched = ticked.some(Boolean)
  const message = `Hi NextGen Fusion, I did your ${topic} self-check and ticked ${count} of ${items.length}. Can you tell me what to fix first?`

  return (
    <section aria-labelledby={`${baseId}-heading`} className="mb-16 rounded-2xl border border-gray-200 p-6 sm:p-8">
      <h2 id={`${baseId}-heading`} className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-3 text-gray-600">Tick what is already true for your business. It takes a minute and nothing is sent anywhere.</p>

      <ul className="mt-6 space-y-3">
        {items.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 px-4 py-3 transition-colors hover:border-gray-400 has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={ticked[index]}
                onChange={() => setTicked((prev) => prev.map((value, i) => (i === index ? !value : value)))}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500",
                  ticked[index] ? "border-purple-600 bg-purple-600 text-white" : "border-gray-300 bg-white",
                )}
              >
                {ticked[index] && <Check className="h-3.5 w-3.5" />}
              </span>
              <span className="leading-relaxed text-gray-800">{item}</span>
            </label>
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="mt-6">
        {touched && (
          <div className="rounded-xl bg-gray-50 p-5">
            <p className="font-semibold text-gray-900">
              {count} of {items.length} in place
            </p>
            <p className="mt-1 leading-relaxed text-gray-600">{verdict(count, items.length)}</p>
            <a
              href={whatsappHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "au_self_check", topic, score: count })}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ask what to fix first
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
