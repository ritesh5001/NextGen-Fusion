"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, Linkedin, ExternalLink } from "lucide-react"
import SimpleNavbar from "@/components/simple-navbar"
import Footer from "@/components/footer"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

interface SkillGroup {
  category: string
  items: string[]
}

interface TeamMemberData {
  name: string
  role: string
  image: string
  email: string
  linkedinUrl: string
  experience: string
  bio: string
  expertise: string[]
  achievements: string[]
  color: string
  skills: SkillGroup[]
}

const teamMembersData: Record<string, TeamMemberData> = {
  "ritesh-giri": {
    name: "Ritesh Kumar Giri",
    role: "Full Stack Developer",
    image: "/member/ritesh-giri.png",
    email: "ritesh@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/ritesh-giri",
    experience: "5+ years",
    bio: "Expert full-stack developer who builds scalable, performant web applications from the ground up. Leads technical architecture decisions and delivers end-to-end digital solutions — from database design to deployment.",
    expertise: [
      "Full Stack Development",
      "Web Architecture",
      "Database Design",
      "API Development",
      "Cloud Deployment",
      "Performance Optimization"
    ],
    achievements: [
      "Built and deployed 30+ production web applications",
      "Expert in modern JavaScript ecosystem (React, Next.js, Node.js)",
      "Architected scalable backend systems serving thousands of users",
      "End-to-end ownership from design to delivery"
    ],
    color: "from-blue-500 to-blue-600",
    skills: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Supabase"] },
      { category: "DevOps", items: ["Docker", "AWS", "Vercel", "CI/CD"] },
      { category: "Tools", items: ["Git", "Figma", "VS Code", "Postman"] }
    ]
  },

  "vivek-gautam": {
    name: "Vivek Gautam",
    role: "SEO & Social Media",
    image: "/member/vivek-gautam.jpeg",
    email: "vivek@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/vivek-gautam",
    experience: "3+ years",
    bio: "Drives organic growth through smart search engine optimization and engaging social media strategy. Turns search rankings and social reach into real leads — building brand visibility and loyal, engaged audiences across every platform.",
    expertise: [
      "Search Engine Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "Keyword Research",
      "Community Management",
      "Analytics & Reporting"
    ],
    achievements: [
      "Grew organic traffic for multiple brands through targeted SEO",
      "Built and managed engaged social media communities",
      "Ranked client websites on page one for competitive keywords",
      "Data-driven content strategies that convert followers into customers"
    ],
    color: "from-emerald-500 to-emerald-600",
    skills: [
      { category: "SEO", items: ["On-Page SEO", "Technical SEO", "Link Building", "Local SEO"] },
      { category: "Social Media", items: ["Instagram", "Facebook", "LinkedIn", "YouTube"] },
      { category: "Content", items: ["Copywriting", "Content Calendar", "Hashtag Strategy", "Reels"] },
      { category: "Tools", items: ["Google Analytics", "Search Console", "Ahrefs", "Meta Business Suite"] }
    ]
  },

  "sajal-singh": {
    name: "Sajal Singh",
    role: "Full Stack Developer & Cinematographer",
    image: "/member/sajal-singh.jpeg",
    email: "sajal@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/sajal-singh",
    experience: "4+ years",
    bio: "A rare blend of code and creativity. Builds robust full-stack applications by day and crafts compelling visual stories behind the lens — bringing both technical precision and an artistic eye to every project.",
    expertise: [
      "Full Stack Development",
      "Cinematography",
      "Video Production",
      "UI Implementation",
      "Color Grading",
      "Visual Storytelling"
    ],
    achievements: [
      "Delivered full-stack web projects from concept to launch",
      "Shot and edited brand films and promotional content",
      "Bridges engineering and creative production seamlessly",
      "Built media-rich web experiences with custom video work"
    ],
    color: "from-violet-500 to-violet-600",
    skills: [
      { category: "Development", items: ["React", "Next.js", "Node.js", "TypeScript"] },
      { category: "Cinematography", items: ["Cinematography", "Lighting", "Composition", "Storyboarding"] },
      { category: "Post-Production", items: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Color Grading"] },
      { category: "Tools", items: ["Git", "Tailwind CSS", "Figma", "Adobe Suite"] }
    ]
  },

  "mohammad-iqbal": {
    name: "Mohammad Iqbal",
    role: "Full Stack & App Developer",
    image: "/member/mohammad-iqbal.png",
    email: "iqbal@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/mohammad-iqbal",
    experience: "4+ years",
    bio: "Builds powerful web and mobile applications end-to-end. Turns ideas into polished, production-ready products across web and app platforms — owning everything from API design to native mobile experiences.",
    expertise: [
      "Full Stack Development",
      "Mobile App Development",
      "Cross-Platform Apps",
      "API Development",
      "App Store Deployment",
      "Backend Architecture"
    ],
    achievements: [
      "Shipped multiple mobile apps to the Play Store and App Store",
      "Built full-stack platforms powering web and mobile together",
      "Expert in React Native and modern app development workflows",
      "End-to-end delivery from backend APIs to native UI"
    ],
    color: "from-amber-500 to-amber-600",
    skills: [
      { category: "Mobile", items: ["React Native", "Flutter", "Android", "iOS"] },
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "Firebase", "PostgreSQL"] },
      { category: "Tools", items: ["Git", "Expo", "Play Console", "App Store Connect"] }
    ]
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const member = teamMembersData[resolvedParams.slug]

  if (!member) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <SimpleNavbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Team Member Not Found</h1>
            <Link href="/team" className="text-blue-600 hover:underline flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Team
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-white">
      <SimpleNavbar />

      {/* Hero Banner */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Link href="/team" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Team
          </Link>
        </motion.div>
      </section>

      {/* Profile Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Image & Contact */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <div className={`rounded-xl overflow-hidden shadow-xl bg-gradient-to-b ${member.color} p-1 mb-6`}>
                <div className="rounded-lg overflow-hidden bg-white">
                  <div className="relative h-96">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <motion.div className="space-y-3">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm font-semibold text-gray-900 truncate">{member.email}</span>
                </a>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm font-semibold text-gray-900">LinkedIn Profile</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Details */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">{member.name}</h1>
              <p className={`text-xl font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-6`}>
                {member.role}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{member.bio}</p>

              {member.experience !== "Details coming soon" && (
                <div className={`inline-block px-6 py-3 rounded-lg bg-gradient-to-r ${member.color} text-white font-semibold mb-8`}>
                  {member.experience} Experience
                </div>
              )}

              {/* Achievements */}
              {member.achievements[0] !== "Details coming soon" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h3>
                  <ul className="space-y-3">
                    {member.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        variants={itemVariants}
                        className="flex gap-3 items-start"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${member.color} mt-2 flex-shrink-0`} />
                        <span className="text-gray-700">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* Expertise & Skills */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Expertise &amp; Skills</h2>

            {/* Core Expertise */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Core Expertise</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {member.expertise.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-4 rounded-lg border border-gray-200 bg-gray-50 hover:shadow-sm transition-shadow"
                  >
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${member.color} mb-2`} />
                    <p className="font-semibold text-gray-900 text-sm">{exp}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Skills</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {member.skills.map((skillGroup, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-6 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <h4 className={`text-base font-bold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4`}>
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, sidx) => (
                        <span key={sidx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-16 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-center border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in working together?</h3>
            <p className="text-gray-600 mb-6">Get in touch to learn more about our services and how we can help your business grow.</p>
            <a
              href="/contact"
              className={`inline-block px-8 py-3 bg-gradient-to-r ${member.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}
            >
              Let&#39;s Connect <ExternalLink className="w-4 h-4 inline ml-2" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
