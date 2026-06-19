import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Courses & Training",
  description:
    "Hands-on web, design, and digital-skills courses from the NextGen Fusion team. Programs are coming soon — register your interest.",
  alternates: {
    canonical: `${siteUrl}/courses`,
  },
}

export default function CoursesPage() {
  return (
    <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            Courses
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            We teach{" "}
            <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
              what we build
            </span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
            Practical, project-based training in web development, design, and modern digital
            skills, taught by the team that ships real client work. Our programs are launching
            soon. Register your interest and we&apos;ll reach out first.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Register your interest
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to home
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex justify-center lg:justify-end">
          <Image
            src="/images/illustration.svg"
            alt="Learning illustration"
            width={400}
            height={300}
            className="w-full max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  )
}
