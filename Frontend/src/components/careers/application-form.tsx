"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react"
import { apiService } from "@/lib/api"
import { cn } from "@/lib/utils"
import { jobOpenings } from "@/data/careers"
import { trackEvent } from "@/lib/analytics"

const MAX_RESUME_MB = 5
const MAX_RESUME_BYTES = MAX_RESUME_MB * 1024 * 1024
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"]

type FieldErrors = Partial<Record<
  "role" | "name" | "email" | "phone" | "resume",
  string
>>

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"

export function ApplicationForm({ defaultRoleId = "" }: { defaultRoleId?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [roleId, setRoleId] = useState(defaultRoleId)
  const [resume, setResume] = useState<File | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function validateResume(file: File): string | null {
    const lower = file.name.toLowerCase()
    if (!ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
      return "Resume must be a PDF, DOC, or DOCX file"
    }
    if (file.size > MAX_RESUME_BYTES) {
      return `Resume must be ${MAX_RESUME_MB}MB or smaller`
    }
    return null
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const error = validateResume(file)
    if (error) {
      setResume(null)
      setErrors((prev) => ({ ...prev, resume: error }))
      event.target.value = ""
      return
    }
    setResume(file)
    setErrors((prev) => ({ ...prev, resume: undefined }))
  }

  function clearResume() {
    setResume(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const phone = String(data.get("phone") || "").trim()

    const nextErrors: FieldErrors = {}
    if (!roleId) nextErrors.role = "Choose the role you are applying for"
    if (!name) nextErrors.name = "Your name is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "A valid email is required"
    if (!phone) nextErrors.phone = "A phone number is required"
    if (!resume) nextErrors.resume = "Attach your resume"

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || !resume) return

    const role = jobOpenings.find((job) => job.id === roleId)

    setSubmitting(true)
    try {
      await apiService.submitCareerApplication({
        role_id: roleId,
        role_title: role?.title ?? roleId,
        name,
        email,
        phone,
        location: String(data.get("location") || "").trim(),
        experience: String(data.get("experience") || "").trim(),
        portfolio_url: String(data.get("portfolio_url") || "").trim(),
        cover_note: String(data.get("cover_note") || "").trim(),
        resume,
      })
      trackEvent("career_application_submit", { role_id: roleId })
      setSubmitted(true)
      form.reset()
      clearResume()
      setRoleId("")
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again, or email us directly.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 text-2xl font-bold text-gray-900">Application received</h3>
        <p className="mx-auto mt-2 max-w-md text-gray-600">
          Thanks for applying. We read every application and will get back to you within a week,
          either way.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900"
        >
          Submit another application
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-gray-900">
            Role you are applying for <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={roleId}
            onChange={(e) => {
              setRoleId(e.target.value)
              setErrors((prev) => ({ ...prev, role: undefined }))
            }}
            className={cn(inputClass, errors.role && "border-red-500")}
            aria-invalid={Boolean(errors.role)}
          >
            <option value="">Select a role</option>
            {jobOpenings.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} — {job.location}
              </option>
            ))}
          </select>
          {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
        </div>

        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-900">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={cn(inputClass, errors.name && "border-red-500")}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-900">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={cn(inputClass, errors.email && "border-red-500")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-900">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 00000 00000"
            className={cn(inputClass, errors.phone && "border-red-500")}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-gray-900">
            Current location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Lucknow, India"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="experience" className="mb-1.5 block text-sm font-medium text-gray-900">
            Years of experience
          </label>
          <input
            id="experience"
            name="experience"
            type="text"
            placeholder="e.g. 2 years, or fresher"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="portfolio_url" className="mb-1.5 block text-sm font-medium text-gray-900">
            Portfolio / GitHub / LinkedIn
          </label>
          <input
            id="portfolio_url"
            name="portfolio_url"
            type="url"
            placeholder="https://"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cover_note" className="mb-1.5 block text-sm font-medium text-gray-900">
            Why you are a good fit
          </label>
          <textarea
            id="cover_note"
            name="cover_note"
            rows={4}
            placeholder="A few lines about your work and why this role interests you."
            className={cn(inputClass, "resize-y")}
          />
        </div>

        {/* Resume upload */}
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-gray-900">
            Resume <span className="text-red-500">*</span>
          </span>
          <input
            ref={fileInputRef}
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="sr-only"
          />

          {resume ? (
            <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
              <span className="flex min-w-0 items-center gap-3">
                <FileText className="h-5 w-5 shrink-0 text-gray-500" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-gray-900">
                    {resume.name}
                  </span>
                  <span className="text-xs text-gray-500">{formatBytes(resume.size)}</span>
                </span>
              </span>
              <button
                type="button"
                onClick={clearResume}
                aria-label="Remove resume"
                className="shrink-0 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="resume"
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors",
                errors.resume
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-50 hover:border-gray-900",
              )}
            >
              <Upload className="h-6 w-6 text-gray-500" />
              <span className="mt-2 text-sm font-medium text-gray-900">
                Click to upload your resume
              </span>
              <span className="mt-1 text-xs text-gray-500">
                PDF, DOC, or DOCX — up to {MAX_RESUME_MB}MB
              </span>
            </label>
          )}
          {errors.resume && <p className="mt-1 text-xs text-red-600">{errors.resume}</p>}
        </div>
      </div>

      {submitError && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {submitError}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500">
          We use your details only to consider you for this role.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            "Submit application"
          )}
        </button>
      </div>
    </form>
  )
}
