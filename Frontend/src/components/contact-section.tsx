"use client"

import { m, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Target, Map, Lightbulb, Users, CheckCircle, AlertCircle, MapPin, Phone } from "lucide-react"
import { useRef, useState } from "react"
import BadgeSubtitle from "./badge-subtitle"
import PhoneInput from "./phone-input"
import { apiService, ContactFormData } from "@/lib/api"
import { OFFICE_HOURS, offices } from "@/data/offices"
import { trackEvent } from "@/lib/analytics"
import { Turnstile, type TurnstileHandle } from "./turnstile"
import { TURNSTILE_ENABLED } from "@/lib/turnstile"

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

const formVariants = {
  hidden: { 
    opacity: 0, 
    x: 20 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3
    }
  }
}


interface FormData {
  firstName: string
  email: string
  phoneNumber: string
  message: string
  referralSource: string
}

export default function ContactSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<TurnstileHandle>(null)
  const captchaReady = !TURNSTILE_ENABLED || captchaToken !== null
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    phoneNumber: "",
    message: "",
    referralSource: "",
  })


  const benefits = [
    {
      icon: <Target className="w-4 h-4" />,
      title: "A straight answer on fit",
      description:
        "We tell you on the first call whether we are the right team, including when the answer is that you do not need us.",
    },
    {
      icon: <Map className="w-4 h-4" />,
      title: "A written scope",
      description:
        "What we would build, one fixed price and one delivery window, in writing, before you pay anything.",
    },
    {
      icon: <Lightbulb className="w-4 h-4" />,
      title: "Builds like yours",
      description: "The case studies closest to your business, so you can see what we built for someone in your position.",
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Support after launch",
      description: "A support plan quoted upfront with every project, so the site does not go stale the month after it ships.",
    },
  ]

  const referralOptions = ["Internet", "Instagram", "Tiktok", "Youtube", "Facebook", "Friends", "College", "Other"]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setSubmitStatus('idle')
    setErrorMessage('')
    setFormData({
      firstName: "",
      email: "",
      phoneNumber: "",
      message: "",
      referralSource: "",
    })
  }

  const handleSubmit = async () => {
    if (!isStep1Valid || !isStep2Valid || !captchaReady) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const contactFormData: ContactFormData = {
        name: formData.firstName,
        email: formData.email,
        phone: formData.phoneNumber,
        message: formData.message,
        information_source: formData.referralSource,
      }

      await apiService.submitContactForm(contactFormData, captchaToken)
      trackEvent("contact_submit")
      setSubmitStatus('success')
      setCurrentStep(3) // Show success step
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
      captchaRef.current?.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep1Valid = formData.firstName && formData.email && formData.phoneNumber && formData.message
  const isStep2Valid = formData.referralSource

  return (
    <m.section 
      id="contact-section" 
      className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <m.div 
          className="text-center mb-10 sm:mb-14"
          variants={itemVariants}
        >
          <m.div className="mb-5" variants={textVariants}>
            <BadgeSubtitle>Contact Us</BadgeSubtitle>
          </m.div>
          <m.h2 className="display mx-auto mb-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl" variants={textVariants}>
            Time to Stop Scrolling, Let&apos;s <span className="text-gradient">Discuss</span> and Cook It Up!
          </m.h2>
          <m.p 
            className="text-ink-soft text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            variants={textVariants}
          >
            We&apos;re here to listen. Book a meeting with our team to discuss your vision, explore possibilities, and start
            creating something.
          </m.p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto">
          {/* Left Column - Benefits */}
          {/* An ink panel with a CSS glow, replacing a purple background image:
              one request fewer, and it follows the theme colours. */}
          <div className="relative flex w-full flex-1 flex-col gap-8 overflow-hidden rounded-[36px] bg-ink p-7 text-white sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_100%_0%,rgba(42,75,245,0.55),rgba(42,75,245,0)_70%),radial-gradient(60%_50%_at_0%_100%,rgba(138,92,246,0.45),rgba(138,92,246,0)_70%)]"
            />
            <div className="relative">
              <h3 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                <p className="m-0">What Will You Get</p>
                <p className="m-0">in Meeting</p>
              </h3>
            </div>
            
            <div className="relative flex flex-col gap-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="glass-ink flex items-start gap-4 rounded-[24px] p-4">
                  <div className="icon-badge h-10 w-10">
                    {benefit.icon}
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-1.5">
                    <div className="text-base font-medium leading-tight">
                      {benefit.title}
                    </div>
                    <div className="text-sm leading-snug text-white/75">
                      {benefit.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <m.div 
            className="glass rounded-[36px] p-6 sm:p-9 lg:min-h-[600px]"
            variants={cardVariants}
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <m.div 
                  className="space-y-4 sm:space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <m.div 
                      className="relative"
                      variants={textVariants}
                    >
                      <h3 className="display text-3xl sm:text-4xl">
                        <span className="relative inline-block">
                          Pop
                        </span>
                        {" "}Us a
                      </h3>
                      <h3 className="display text-3xl sm:text-4xl">Message</h3>
                    </m.div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-soft">1 of 2 Steps</span>
                  </div>

                  <m.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                  >
                    <label className="mb-2 block pl-5 text-sm font-medium text-ink-soft">Fullname</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full rounded-full border border-transparent bg-white px-5 py-3 text-base text-ink outline-none transition-shadow duration-200 placeholder:text-ink-mute/70 focus:ring-2 focus:ring-ink"
                    />
                  </m.div>

                  <m.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  >
                    <label className="mb-2 block pl-5 text-sm font-medium text-ink-soft">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-full border border-transparent bg-white px-5 py-3 text-base text-ink outline-none transition-shadow duration-200 placeholder:text-ink-mute/70 focus:ring-2 focus:ring-ink"
                    />
                  </m.div>

                  <m.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                  >
                    <label className="mb-2 block pl-5 text-sm font-medium text-ink-soft">Phone Number</label>
                    <PhoneInput
                      onChange={(value) => handleInputChange("phoneNumber", value)}
                      placeholder="Phone number"
                    />
                  </m.div>

                  <m.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                  >
                    <label className="mb-2 block pl-5 text-sm font-medium text-ink-soft">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your project..."
                      rows={3}
                      className="w-full resize-none rounded-[24px] border border-transparent bg-white px-5 py-3 text-base text-ink outline-none transition-shadow duration-200 placeholder:text-ink-mute/70 focus:ring-2 focus:ring-ink"
                    />
                  </m.div>

                  <m.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 }}
                  >
                    <m.button
                      onClick={handleNext}
                      disabled={!isStep1Valid}
                      className="w-full btn btn-brand disabled:cursor-not-allowed disabled:bg-canvas-deep disabled:text-ink-mute disabled:shadow-none"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next Step
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </m.button>
                  </m.div>
                </m.div>
              )}

              {/* Step 2: Referral Source */}
              {currentStep === 2 && (
                <m.div 
                  className="space-y-4 sm:space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <m.div 
                      className="relative"
                      variants={textVariants}
                    >
                      <h3 className="display text-3xl sm:text-4xl">
                        <span className="relative inline-block">
                          How Did You
                        </span>
                        {" "}Find Us?
                      </h3>
                    </m.div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-soft">2 of 2 Steps</span>
                  </div>

                  <m.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                  >
                    <label className="mb-3 block text-sm font-medium text-ink-soft">Referral Source</label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {referralOptions.map((option, index) => (
                        <m.button
                          key={option}
                          onClick={() => handleInputChange("referralSource", option)}
                          aria-pressed={formData.referralSource === option}
                          className={`rounded-full px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            formData.referralSource === option
                              ? "bg-ink text-white"
                              : "bg-white text-ink-soft hover:text-ink"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          {option}
                        </m.button>
                      ))}
                    </div>
                  </m.div>

                  <Turnstile ref={captchaRef} action="contact" onToken={setCaptchaToken} className="pt-2" />

                  <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <m.button
                      onClick={handleBack}
                      className="btn flex-1 bg-white text-ink hover:bg-canvas"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                      Back
                    </m.button>
                    <m.button
                      onClick={handleSubmit}
                      disabled={!isStep2Valid || isSubmitting || !captchaReady}
                      className="flex-1 btn btn-brand disabled:cursor-not-allowed disabled:bg-canvas-deep disabled:text-ink-mute disabled:shadow-none"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                      {!isSubmitting && <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </m.button>
                  </div>
                </m.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <m.div 
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-[24px] flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Submission Failed</p>
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                </m.div>
              )}

              {/* Step 3: Success */}
              {currentStep === 3 && submitStatus === 'success' && (
                <m.div 
                  className="text-center space-y-4 sm:space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <div className="icon-badge mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20">
                      <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                  </m.div>
                  
                  <m.h3 
                    className="display text-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Message Sent Successfully!
                  </m.h3>
                  
                  <m.p 
                    className="text-ink-soft text-base"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Thank you for reaching out! We&apos;ll get back to you within {OFFICE_HOURS.replyWithin}.
                  </m.p>
                  
                  <m.button
                    onClick={handleReset}
                    className="btn btn-ink"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Send Another Message
                  </m.button>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </div>

        {/* Offices Section */}
        <div className="mt-20 sm:mt-24">
          <m.div 
            className="text-center mb-10 sm:mb-14"
            variants={itemVariants}
          >
            <m.div className="mb-5" variants={textVariants}>
              <BadgeSubtitle>Our Offices</BadgeSubtitle>
            </m.div>
            <m.h2 
              className="display mb-4 text-3xl sm:text-4xl lg:text-5xl"
              variants={textVariants}
            >
              Visit Us at Our Locations
            </m.h2>
            <m.p 
              className="text-ink-soft text-base sm:text-lg max-w-2xl mx-auto"
              variants={textVariants}
            >
              Connect with us at either of our offices for in-person consultations and support.
            </m.p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offices.map((office, index) => (
              <m.div
                key={office.city}
                className="glass rounded-[32px] p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="icon-badge h-12 w-12">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="display text-3xl">
                      {office.city}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-ink-mute flex-shrink-0 mt-0.5" />
                    <p className="text-ink-soft text-sm leading-relaxed">
                      {office.address}
                    </p>
                  </div>

                  <div className="border-t border-ink/10 pt-4">
                    <p className="text-sm font-medium text-ink-soft mb-3">
                      <strong>Managed by:</strong> {office.contact.name}
                    </p>
                    <a
                      href={`tel:${office.contact.phone}`}
                      className="btn btn-ink btn-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {office.contact.phone}
                    </a>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </m.section>
  )
}
