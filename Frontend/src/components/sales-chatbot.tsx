"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, Send, X, CalendarDays, PhoneCall } from "lucide-react"
import { openBookingModal } from "./booking-modal"

type ChatMessage = {
  role: "assistant" | "user"
  content: string
}

export default function SalesChatbot() {
  const [open, setOpen] = useState(false)
  const [conversationId, setConversationId] = useState("")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
  })
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask about website cost, WordPress or eCommerce timelines, tech stack, process, SEO, apps, or your exact project scope.",
    },
  ])
  const [latestAssistantContext, setLatestAssistantContext] = useState({
    shouldBookCall: false,
    capturedBudget: "",
    capturedTimeline: "",
    capturedRequirements: "",
    summary: "",
  })

  async function sendMessage() {
    const message = input.trim()
    if (!message || loading) return

    setMessages((prev) => [...prev, { role: "user", content: message }])
    setInput("")
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversationId || undefined,
          message,
          lead,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to send message")

      setConversationId(json.data.conversationId)
      setMessages((prev) => [...prev, { role: "assistant", content: json.data.reply }])
      setLatestAssistantContext({
        shouldBookCall: !!json.data.shouldBookCall,
        capturedBudget: json.data.capturedBudget || "",
        capturedTimeline: json.data.capturedTimeline || "",
        capturedRequirements: json.data.capturedRequirements || "",
        summary: json.data.summary || "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (typeof document === "undefined") return

    const bodyStyle = document.body.style
    const htmlStyle = document.documentElement.style
    const previousBodyOverflow = bodyStyle.overflow
    const previousBodyTouchAction = bodyStyle.touchAction
    const previousHtmlOverflow = htmlStyle.overflow
    const previousHtmlTouchAction = htmlStyle.touchAction

    if (open) {
      bodyStyle.overflow = "hidden"
      bodyStyle.touchAction = "none"
      htmlStyle.overflow = "hidden"
      htmlStyle.touchAction = "none"
    }

    return () => {
      bodyStyle.overflow = previousBodyOverflow
      bodyStyle.touchAction = previousBodyTouchAction
      htmlStyle.overflow = previousHtmlOverflow
      htmlStyle.touchAction = previousHtmlTouchAction
    }
  }, [open])

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-[70] flex h-16 w-16 items-center justify-center rounded-full bg-[#111318] text-white shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition hover:bg-[#1a1d24] md:bottom-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <Sparkles className="h-7 w-7" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-4 z-[75] flex h-[min(76vh,720px)] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#f8f5ee] shadow-[0_30px_90px_rgba(0,0,0,0.25)] md:bottom-8"
          >
            <div className="bg-[#121419] px-5 py-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.18em] text-[#f0d79b]">Sales Assistant</div>
                  <div className="mt-1 text-lg font-semibold">Ask about cost, timeline, or process.</div>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-full border border-white/10 bg-white/5 p-2">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y px-4 py-4 [scrollbar-gutter:stable]">
              <div className="mb-4 grid grid-cols-2 gap-2">
                <input value={lead.name} onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))} placeholder="Name" className={smallInputClass} />
                <input value={lead.email} onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))} placeholder="Email" className={smallInputClass} />
              </div>

              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "assistant"
                          ? "bg-white text-[#1d1d1d] border border-[#e7dfce]"
                          : "bg-[#111318] text-white"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {error && <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

              {latestAssistantContext.shouldBookCall && (
                <div className="mt-4 rounded-2xl border border-[#e5dcc7] bg-white p-4">
                  <div className="text-sm font-medium text-[#1d1d1d]">Ready for the next step?</div>
                  <p className="mt-1 text-sm leading-6 text-[#5f594b]">
                    This looks qualified enough to move into a real conversation.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        openBookingModal({
                          conversationId,
                          requestType: "meeting",
                          name: lead.name,
                          email: lead.email,
                          phone: lead.phone,
                          companyName: lead.companyName,
                          projectSummary: latestAssistantContext.capturedRequirements,
                          budget: latestAssistantContext.capturedBudget,
                          timeline: latestAssistantContext.capturedTimeline,
                          aiContext: latestAssistantContext.summary,
                        })
                      }
                      className={actionButtonClass}
                    >
                      <CalendarDays className="h-4 w-4" />
                      Book discovery call
                    </button>
                    <button
                      onClick={() =>
                        openBookingModal({
                          conversationId,
                          requestType: "callback",
                          name: lead.name,
                          email: lead.email,
                          phone: lead.phone,
                          companyName: lead.companyName,
                          projectSummary: latestAssistantContext.capturedRequirements,
                          budget: latestAssistantContext.capturedBudget,
                          timeline: latestAssistantContext.capturedTimeline,
                          aiContext: latestAssistantContext.summary,
                        })
                      }
                      className={secondaryButtonClass}
                    >
                      <PhoneCall className="h-4 w-4" />
                      Request callback
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#ebe3d2] bg-white px-4 py-4">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Example: how long does a WooCommerce site take?"
                  rows={2}
                  className="min-h-[52px] flex-1 resize-none rounded-2xl border border-[#e1d9c8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#1f1f1f] outline-none transition focus:border-[#111318] focus:ring-2 focus:ring-[#111318]/10"
                />
                <button onClick={sendMessage} disabled={loading || !input.trim()} className={sendButtonClass}>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const smallInputClass =
  "w-full rounded-2xl border border-[#e1d9c8] bg-white px-3 py-2.5 text-sm text-[#1f1f1f] outline-none transition focus:border-[#111318] focus:ring-2 focus:ring-[#111318]/10"

const actionButtonClass =
  "inline-flex items-center gap-2 rounded-full bg-[#111318] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1a1d24]"

const secondaryButtonClass =
  "inline-flex items-center gap-2 rounded-full border border-[#ddd4c0] bg-white px-4 py-2.5 text-sm font-medium text-[#2a2926] transition hover:border-[#b9aa82] hover:bg-[#faf7f1]"

const sendButtonClass =
  "inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#111318] text-white transition hover:bg-[#1a1d24] disabled:cursor-not-allowed disabled:opacity-60"
