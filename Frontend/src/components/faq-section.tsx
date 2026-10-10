"use client"
import { m, AnimatePresence } from "framer-motion"
import { Plus, Minus, MoreVertical } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import BadgeSubtitle from "./badge-subtitle"
import { homeFaqs } from "@/data/home-faqs"
import { OFFICE_HOURS } from "@/data/offices"
import { openBookingModal } from "@/lib/booking"
import { whatsappHref } from "@/lib/whatsapp"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const faqVariants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2
    }
  }
}

const answerVariants = {
  hidden: { 
    opacity: 0, 
    height: 0 
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2
    }
  }
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const faqs = homeFaqs

  // A short "typing…" bubble before an answer appears, like the chat it is
  // styled as. Skipped for reduced motion. The answer itself is mounted the
  // whole time either way (see the Answer comment below).
  const [typingIndex, setTypingIndex] = useState<number | null>(null)
  const typingTimer = useRef<number | null>(null)
  useEffect(() => () => {
    if (typingTimer.current) window.clearTimeout(typingTimer.current)
  }, [])

  const toggleFAQ = (index: number) => {
    const opening = activeIndex !== index
    setActiveIndex(opening ? index : null)
    if (typingTimer.current) window.clearTimeout(typingTimer.current)
    if (opening && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypingIndex(index)
      typingTimer.current = window.setTimeout(() => setTypingIndex(null), 650)
    } else {
      setTypingIndex(null)
    }
  }

  const handleBackClick = () => {
    setActiveIndex(null)
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <m.section 
      id="faq" 
      className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Header */}
          <m.div 
            className="lg:sticky lg:top-28"
            variants={itemVariants}
          >
            <m.div className="mb-5" variants={textVariants}>
              <BadgeSubtitle>Frequently Asked Questions</BadgeSubtitle>
            </m.div>
            <m.h2 className="display text-4xl sm:text-5xl lg:text-6xl" variants={textVariants}>
              <span className="text-gradient">Questions</span> about working with us, answered
            </m.h2>

            <m.div variants={textVariants} className="glass mt-10 max-w-md rounded-[32px] p-6 sm:p-7">
              <p className="text-xl font-medium tracking-tight text-ink">Didn&apos;t find your answer?</p>
              <p className="mt-2 text-ink-soft">
                Ask us directly. You get a written reply within {OFFICE_HOURS.replyWithin}, including a clear next step.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={() => openBookingModal({ requestType: "meeting" })} className="btn btn-brand btn-sm">
                  Book a Free Call
                </button>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-glass btn-sm">
                  WhatsApp us
                </a>
              </div>
            </m.div>
            </m.div>

          {/* Right Column - Chat Interface */}
          <m.div 
            className="flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <m.div 
              className="w-full max-w-xl"
              variants={cardVariants}
            >
              {/* Chat Interface */}
              <div className="wash-blue relative rounded-[40px] p-3 sm:p-4">

                {/* Chat Header */}
                <m.div 
                  className="relative rounded-full bg-white px-3 py-2.5"
                  variants={textVariants}
                >
                  <div className="flex items-center justify-between">
                    <m.button 
                      type="button"
                      onClick={handleBackClick} 
                      aria-label="Back"
                      className="grid h-11 w-11 place-items-center rounded-full bg-canvas transition-colors hover:bg-canvas-deep"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </m.button>
                    <div className="flex items-center gap-3">
                      <m.div 
                        className="icon-badge h-9 w-9"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-xs font-semibold">TC</span>
                      </m.div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-ink">
                          {activeIndex !== null ? "NextGen Fusion" : "Your Questions"}
                        </div>
                        <div className="text-xs text-ink-mute">Usually replies within a day</div>
                      </div>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                      <m.button 
                        type="button"
                        onClick={toggleDropdown} 
                        aria-label="More options"
                        aria-expanded={showDropdown}
                        className="grid h-11 w-11 place-items-center rounded-full bg-canvas transition-colors hover:bg-canvas-deep"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-ink" />
                      </m.button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {showDropdown && (
                          <m.div 
                            className="absolute right-0 top-full mt-3 w-64 bg-white rounded-[24px] shadow-[0_24px_48px_-24px_rgba(15,16,13,0.5)] py-4 px-4 z-10"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="text-sm text-ink-soft text-center leading-relaxed">
                              What do you expect to find here? 
                              <br />
                              <span className="text-xs text-ink-mute mt-1 block">
                                Maybe some chat options or settings?
                              </span>
                            </p>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </m.div>

                {/* Today Badge */}
                <m.div 
                  className="relative px-4 pb-1 pt-4"
                  variants={textVariants}
                >
                  <div className="flex justify-center">
                    <span className="bg-ink/70 text-white text-xs px-3 py-1 rounded-full">Today</span>
                  </div>
                </m.div>

                {/* Chat Content */}
                <m.div 
                  className="relative space-y-2 p-1 pt-3 sm:p-2 sm:pt-3"
                  variants={containerVariants}
                >
                  {faqs.map((faq, index) => (
                    <m.div 
                      key={index} 
                      className="space-y-2"
                      variants={faqVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Question */}
                      <m.button
                        onClick={() => toggleFAQ(index)}
                        id={`faq-question-${index}`}
                        aria-expanded={activeIndex === index}
                        aria-controls={`faq-answer-${index}`}
                        className="faq-q w-full flex items-center gap-3 rounded-[22px] bg-white p-2.5 pr-4 text-left transition-colors hover:bg-white/90"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <m.div 
                          className={`faq-plus flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${activeIndex === index ? "icon-badge" : "bg-brand/10 text-brand"}`}
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {activeIndex === index ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                          <Plus className="w-4 h-4" />
                          )}
                        </m.div>
                        <span className="text-sm sm:text-base font-medium text-ink leading-snug">{faq.question}</span>
                      </m.button>

                      <AnimatePresence>
                        {typingIndex === index && (
                          <m.div
                            key="typing"
                            aria-hidden="true"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="ml-8 inline-flex rounded-[22px] bg-ink px-4 py-3 text-white/80"
                          >
                            <span className="typing-dots"><span /><span /><span /></span>
                          </m.div>
                        )}
                      </AnimatePresence>
                      {/* Answer.
                          Always mounted, never conditionally rendered. Collapsing
                          with `height: 0` keeps the text in the server HTML, where
                          AI fetchers that read rendered markup rather than JSON-LD
                          (Perplexity, ChatGPT search, Claude) can actually see it.
                          A `{activeIndex === index && ...}` guard here shipped a
                          homepage FAQ with eight questions and zero answers. */}
                      <m.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        variants={answerVariants}
                        initial={false}
                        animate={activeIndex === index && typingIndex !== index ? "visible" : "hidden"}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 rounded-[22px] bg-ink p-4 text-white">
                          <p className="text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      </m.div>
                    </m.div>
                  ))}
                </m.div>
              </div>
            </m.div>
          </m.div>
        </div>
      </div>
    </m.section>
  )
}
