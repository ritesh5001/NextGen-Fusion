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
    name: "Ritesh Giri",
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

  "nitesh": {
    name: "Nitesh",
    role: "Project Manager",
    image: "/placeholder-user.jpg",
    email: "nitesh@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/nitesh",
    experience: "Details coming soon",
    bio: "The backbone of every project at NextGen Fusion. Ensures every deliverable lands on time, within scope, and exceeds client expectations. Manages cross-functional teams and keeps communication clear from kickoff to delivery.",
    expertise: [
      "Project Planning & Execution",
      "Client Communication",
      "Team Coordination",
      "Risk Management",
      "Agile Methodology",
      "Stakeholder Management"
    ],
    achievements: [
      "Details coming soon"
    ],
    color: "from-emerald-500 to-emerald-600",
    skills: [
      { category: "Project Management", items: ["Agile", "Scrum", "Kanban", "Milestone Tracking"] },
      { category: "Communication", items: ["Client Reporting", "Stakeholder Updates", "Sprint Planning"] },
      { category: "Tools", items: ["Notion", "Trello", "Slack", "Google Workspace"] },
      { category: "Skills", items: ["Risk Assessment", "Budget Management", "Team Leadership"] }
    ]
  },

  "nikhilesh": {
    name: "Nikhilesh",
    role: "Shopify Website Developer",
    image: "/placeholder-user.jpg",
    email: "nikhilesh@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/nikhilesh",
    experience: "Details coming soon",
    bio: "Specialist in building high-converting Shopify stores that look great and drive sales. From custom theme development to advanced app integrations — delivers e-commerce experiences built for growth.",
    expertise: [
      "Shopify Theme Development",
      "Shopify App Integration",
      "E-commerce Strategy",
      "Conversion Optimization",
      "Liquid Templating",
      "Payment Gateway Setup"
    ],
    achievements: [
      "Details coming soon"
    ],
    color: "from-violet-500 to-violet-600",
    skills: [
      { category: "Shopify", items: ["Liquid", "Shopify CLI", "Custom Themes", "App Bridge"] },
      { category: "E-commerce", items: ["Product Setup", "Collections", "Checkout Optimization", "Analytics"] },
      { category: "Frontend", items: ["HTML/CSS", "JavaScript", "React", "Tailwind CSS"] },
      { category: "Tools", items: ["Shopify Partners", "Metafields", "Webhooks", "REST API"] }
    ]
  },

  "vinay": {
    name: "Vinay",
    role: "Graphics & UI/UX Designer",
    image: "/placeholder-user.jpg",
    email: "vinay@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/vinay",
    experience: "Details coming soon",
    bio: "Creates stunning visuals and intuitive user interfaces that make brands memorable. Blends strong design principles with deep empathy for users — producing interfaces that are beautiful, functional, and on-brand.",
    expertise: [
      "UI/UX Design",
      "Brand Identity",
      "Graphic Design",
      "Wireframing & Prototyping",
      "Design Systems",
      "Motion Graphics"
    ],
    achievements: [
      "Details coming soon"
    ],
    color: "from-pink-500 to-pink-600",
    skills: [
      { category: "Design Tools", items: ["Figma", "Adobe Illustrator", "Photoshop", "After Effects"] },
      { category: "UI/UX", items: ["Wireframing", "Prototyping", "User Research", "Design Systems"] },
      { category: "Graphics", items: ["Logo Design", "Brand Identity", "Social Media Graphics", "Print Design"] },
      { category: "Skills", items: ["Typography", "Color Theory", "Responsive Design", "Accessibility"] }
    ]
  },

  "rahul": {
    name: "Rahul",
    role: "Sales Manager",
    image: "/placeholder-user.jpg",
    email: "rahul@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/rahul",
    experience: "Details coming soon",
    bio: "Drives client acquisition and builds lasting business relationships that fuel agency growth. Connects the right solutions to the right clients — turning conversations into partnerships and partnerships into long-term success.",
    expertise: [
      "Business Development",
      "Client Acquisition",
      "Relationship Management",
      "Proposal Writing",
      "Negotiation",
      "CRM Management"
    ],
    achievements: [
      "Details coming soon"
    ],
    color: "from-amber-500 to-amber-600",
    skills: [
      { category: "Sales", items: ["Lead Generation", "Cold Outreach", "Proposal Writing", "Closing"] },
      { category: "Strategy", items: ["Market Research", "Competitor Analysis", "Pricing Strategy"] },
      { category: "Communication", items: ["Client Presentations", "Negotiation", "Follow-ups"] },
      { category: "Tools", items: ["CRM Systems", "LinkedIn Sales Navigator", "Email Marketing"] }
    ]
  },

  "ajay": {
    name: "Ajay",
    role: "Advertising & Marketing Strategist",
    image: "/placeholder-user.jpg",
    email: "ajay@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/ajay",
    experience: "Details coming soon",
    bio: "Crafts data-driven advertising campaigns and marketing strategies that generate measurable ROI. Expert in paid media, audience targeting, and brand positioning — turning ad spend into real business results.",
    expertise: [
      "Paid Advertising (Meta, Google)",
      "Marketing Strategy",
      "Audience Targeting",
      "Campaign Management",
      "Brand Positioning",
      "Performance Analytics"
    ],
    achievements: [
      "Details coming soon"
    ],
    color: "from-red-500 to-red-600",
    skills: [
      { category: "Paid Ads", items: ["Meta Ads", "Google Ads", "Instagram Ads", "YouTube Ads"] },
      { category: "Strategy", items: ["Campaign Planning", "Audience Research", "A/B Testing", "Funnel Building"] },
      { category: "Analytics", items: ["Meta Business Suite", "Google Analytics", "Pixel Setup", "ROI Tracking"] },
      { category: "Tools", items: ["Canva", "AdEspresso", "Google Tag Manager", "Zapier"] }
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
