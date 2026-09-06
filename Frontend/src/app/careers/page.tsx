"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  Clock,
  GraduationCap,
  Laptop,
  MapPin,
  Rocket,
  TrendingUp,
  Users,
} from "lucide-react"
import { ApplicationForm } from "@/components/careers/application-form"
import { cn } from "@/lib/utils"
import {
  CAREERS_EMAIL,
  jobDepartments,
  jobOpenings,
  openApplicationMailto,
  type JobDepartment,
} from "@/data/careers"

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const stats = [
  { value: "50+", label: "Live client websites" },
  { value: "10+", label: "Full-stack applications" },
  { value: "2", label: "Offices in India" },
  { value: "100%", label: "Work that ships" },
]

const benefits = [
  {
    Icon: Rocket,
    title: "Your work goes live",
    description:
      "No sandbox projects. What you build this month is on a real client's domain next month, used by real customers.",
    color: "from-blue-500 to-blue-600",
  },
  {
    Icon: Laptop,
    title: "Remote-friendly",
    description:
      "Most roles work remotely or hybrid from our Lucknow and Mumbai offices. We care when the work lands, not where you sat.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    Icon: Users,
    title: "Small team, real ownership",
    description:
      "You own features end to end instead of a slice of a ticket. Your name is on the decisions, not buried under four approval layers.",
    color: "from-violet-500 to-violet-600",
  },
  {
    Icon: GraduationCap,
    title: "You will learn fast",
    description:
      "Agency work means a new stack, industry, and problem every few weeks. It compresses years of experience into months.",
    color: "from-amber-500 to-amber-600",
  },
  {
    Icon: TrendingUp,
    title: "Growth that is visible",
    description:
      "Clear reviews, honest feedback, and a path from junior to lead that we actually talk about instead of leaving you to guess.",
    color: "from-rose-500 to-rose-600",
  },
  {
    Icon: Briefcase,
    title: "Work that travels",
    description:
      "Everything you ship becomes portfolio work you can show. We want you employable, not locked in.",
    color: "from-cyan-500 to-cyan-600",
  },
]

const hiringSteps = [
  {
    step: "01",
    title: "Apply",
    description:
      "Send your resume and anything you have built. Links beat claims — a live site or a repo tells us more than a bullet list.",
  },
  {
    step: "02",
    title: "Intro call",
    description:
      "A 20-30 minute conversation about your work, what you want next, and what the role actually involves day to day.",
  },
  {
    step: "03",
    title: "Practical task",
    description:
      "A short, paid, realistic task close to the work you would be doing. No week-long unpaid assignments.",
  },
  {
    step: "04",
    title: "Offer",
    description:
      "A final chat on scope, salary, and start date. We tell you either way, and we tell you quickly.",
  },
]

type DepartmentFilter = JobDepartment | "All"

export default function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState<DepartmentFilter>("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedRoleId, setSelectedRoleId] = useState("")

  // Preselect the role in the form, then bring the form into view. The form is
  // keyed on this value so it remounts with the new default.
  const applyForRole = (jobId: string) => {
    setSelectedRoleId(jobId)
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
  }

  const departments = useMemo<DepartmentFilter[]>(
    () => ["All", ...jobDepartments.filter((d) => jobOpenings.some((j) => j.department === d))],
    [],
  )

  const visibleJobs = useMemo(
    () =>
      activeDepartment === "All"
        ? jobOpenings
        : jobOpenings.filter((job) => job.department === activeDepartment),
    [activeDepartment],
  )

  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
            variants={itemVariants}
          >
            We are hiring — {jobOpenings.length} open roles
          </motion.span>
          <motion.h1
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Build things that go live
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            NextGen Fusion is a product and web studio in Lucknow and Mumbai. We build websites,
            e-commerce stores, and software for clients across India and beyond — and we are looking
            for people who want their work in front of real users, fast.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Link
              href="#open-roles"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
            >
              View open roles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#apply"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900"
            >
              Apply now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="rounded-xl bg-gray-50 p-6 text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why work here */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why work at NextGen Fusion
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are small enough that what you do matters, and busy enough that you will never run
              out of things to learn.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={cn(
                    "inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r",
                    benefit.color,
                  )}
                >
                  <benefit.Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Open roles</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pick a role to see the detail. If nothing fits but you think you should be here, send
              an open application — we read every one.
            </p>
          </motion.div>

          {/* Department filter */}
          <motion.div
            className="mb-8 flex flex-wrap items-center justify-center gap-2"
            variants={itemVariants}
          >
            {departments.map((department) => (
              <button
                key={department}
                type="button"
                onClick={() => setActiveDepartment(department)}
                aria-pressed={activeDepartment === department}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  activeDepartment === department
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 text-gray-700 hover:border-gray-900",
                )}
              >
                {department}
              </button>
            ))}
          </motion.div>

          <div className="space-y-4">
            {visibleJobs.map((job) => {
              const isExpanded = expandedId === job.id
              return (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : job.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`job-panel-${job.id}`}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div id={`job-panel-${job.id}`} className="border-t border-gray-100 px-6 py-6">
                      <p className="text-gray-600">{job.summary}</p>

                      <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                            What you will do
                          </h4>
                          <ul className="mt-3 space-y-2">
                            {job.responsibilities.map((item) => (
                              <li key={item} className="flex gap-2 text-sm text-gray-600">
                                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                            What we are looking for
                          </h4>
                          <ul className="mt-3 space-y-2">
                            {job.requirements.map((item) => (
                              <li key={item} className="flex gap-2 text-sm text-gray-600">
                                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => applyForRole(job.id)}
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
                      >
                        Apply for this role
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Hiring process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How hiring works here
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Four steps, usually inside two weeks. You will always know where you stand.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {hiringSteps.map((step) => (
              <motion.div key={step.step} variants={itemVariants} className="relative">
                <span className="text-5xl font-bold text-gray-200">{step.step}</span>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Application form */}
      <section id="apply" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Apply now</h2>
            <p className="text-lg text-gray-600">
              Fill this in and attach your resume. We read every application and reply within a
              week, either way.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ApplicationForm key={selectedRoleId} defaultRoleId={selectedRoleId} />
          </motion.div>

          <motion.p className="mt-6 text-center text-sm text-gray-500" variants={itemVariants}>
            Trouble with the form?{" "}
            <a
              href={openApplicationMailto()}
              className="font-medium text-gray-900 underline underline-offset-4"
            >
              Email us at {CAREERS_EMAIL}
            </a>{" "}
            with your resume attached.
          </motion.p>
        </motion.div>
      </section>
    </div>
  )
}
