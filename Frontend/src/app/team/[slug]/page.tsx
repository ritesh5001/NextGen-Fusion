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

const teamMembersData: Record<string, any> = {
  "ritesh-giri": {
    name: "Ritesh Giri",
    role: "Founder & Full Stack Developer",
    image: "/member/ritesh-giri.png",
    email: "ritesh@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/ritesh-giri",
    experience: "5+ years",
    bio: "Visionary founder with proven expertise in building scalable web applications. Leads NextGen Fusion with a passion for delivering innovative digital solutions.",
    expertise: [
      "Full Stack Development",
      "Web Architecture",
      "Project Leadership",
      "React & Node.js",
      "Database Design",
      "Cloud Deployment"
    ],
    achievements: [
      "Founded NextGen Fusion with a mission to empower businesses",
      "Led 30+ successful projects for diverse industries",
      "Mentored 10+ junior developers",
      "Expert in modern web technologies and best practices"
    ],
    color: "from-blue-500 to-blue-600",
    skills: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB"] },
      { category: "DevOps", items: ["Docker", "AWS", "Supabase", "CI/CD"] },
      { category: "Tools", items: ["Git", "Figma", "VS Code", "Postman"] }
    ]
  },
  "sajal-singh": {
    name: "Sajal Singh",
    role: "Co-Founder & Full Stack Developer",
    image: "/member/sajal-singh.jpeg",
    email: "sajal@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/sajal-singh",
    experience: "4+ years",
    bio: "Strategic co-founder with deep expertise in full-stack development and digital transformation. Drives innovation and excellence across all projects.",
    expertise: [
      "Full Stack Development",
      "Social Media Integration",
      "API Development",
      "Database Optimization",
      "Performance Tuning",
      "Technical Strategy"
    ],
    achievements: [
      "Co-founded NextGen Fusion to revolutionize digital solutions",
      "Architected solutions for 25+ enterprise clients",
      "Optimized platform performance by 40%",
      "Built robust social media integration systems"
    ],
    color: "from-purple-500 to-purple-600",
    skills: [
      { category: "Frontend", items: ["React", "Vue.js", "TypeScript", "Redux"] },
      { category: "Backend", items: ["Node.js", "Python", "GraphQL", "Microservices"] },
      { category: "Social Media", items: ["Facebook API", "Instagram API", "Twitter API", "LinkedIn API"] },
      { category: "Tools", items: ["Webpack", "Docker", "Kubernetes", "Jenkins"] }
    ]
  },
  "mohammad-iqbal": {
    name: "Mohammad Iqbal",
    role: "Full Stack & Android Developer",
    image: "/member/mohammad-iqbal.png",
    email: "iqbal@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/mohammad-iqbal",
    experience: "3+ years",
    bio: "Versatile developer specializing in cross-platform development. Bridges web and mobile development with modern technologies and best practices.",
    expertise: [
      "Full Stack Development",
      "Android Development",
      "React Native",
      "Cross-Platform Solutions",
      "Mobile UX/UI",
      "Performance Optimization"
    ],
    achievements: [
      "Developed 15+ successful mobile and web applications",
      "Cross-platform apps reaching 50K+ downloads",
      "Expert in responsive design and mobile optimization",
      "Maintained 99.9% app performance rating"
    ],
    color: "from-green-500 to-green-600",
    skills: [
      { category: "Frontend", items: ["React", "Next.js", "React Native", "Flutter"] },
      { category: "Mobile", items: ["Android", "Kotlin", "Java", "Firebase"] },
      { category: "Backend", items: ["Node.js", "Express", "MongoDB", "RESTful APIs"] },
      { category: "Tools", items: ["Android Studio", "Xcode", "VS Code", "Git"] }
    ]
  },
  "vivek-gautam": {
    name: "Vivek Gautam",
    role: "SEO & Social Media Marketing",
    image: "/member/vivek-gautam.jpeg",
    email: "vivek@nextgenfusion.in",
    linkedinUrl: "https://linkedin.com/in/vivek-gautam",
    experience: "4+ years",
    bio: "Digital marketing strategist with proven track record in SEO optimization and social media growth. Drives organic traffic and engagement for all clients.",
    expertise: [
      "SEO Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "Analytics & Reporting",
      "Digital Advertising",
      "Brand Management"
    ],
    achievements: [
      "Increased client organic traffic by 300%+",
      "Managed 20+ successful social media campaigns",
      "Expert in Google Search Console and Analytics",
      "Built organic communities with 100K+ followers across platforms"
    ],
    color: "from-orange-500 to-orange-600",
    skills: [
      { category: "SEO", items: ["On-Page SEO", "Technical SEO", "Link Building", "Keyword Research"] },
      { category: "Social Media", items: ["Instagram", "Facebook", "LinkedIn", "Twitter", "TikTok"] },
      { category: "Analytics", items: ["Google Analytics", "Google Search Console", "Semrush", "Ahrefs"] },
      { category: "Tools", items: ["Canva", "Buffer", "Hootsuite", "Google Ads"] }
    ]
  }
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = teamMembersData[params.slug]

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

      {/* Hero Section */}
      <section className={`pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ${member.color} opacity-10`}>
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Link href="/team" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
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
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Contact */}
              <motion.div className="space-y-4">
                <a href={`mailto:${member.email}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">{member.email}</p>
                  </div>
                </a>
                <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">LinkedIn</p>
                  </div>
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

              {/* Experience Badge */}
              <div className={`inline-block px-6 py-3 rounded-lg bg-gradient-to-r ${member.color} text-white font-semibold mb-8`}>
                {member.experience} Experience
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h3>
                <ul className="space-y-3">
                  {member.achievements.map((achievement: string, idx: number) => (
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
            </motion.div>
          </div>

          {/* Expertise & Skills */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Expertise & Skills</h2>
            
            {/* Expertise */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Core Expertise</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {member.expertise.map((exp: string, idx: number) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className={`p-4 rounded-lg bg-gradient-to-r ${member.color} bg-opacity-10 border border-gray-200`}
                  >
                    <p className="font-semibold text-gray-900">{exp}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Skills</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {member.skills.map((skillGroup: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="p-6 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <h4 className={`text-lg font-bold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4`}>
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill: string, sidx: number) => (
                        <span key={sidx} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700">
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
            <p className="text-gray-600 mb-6">Get in touch to learn more about our services and how we can help your business.</p>
            <a href="/contact" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Let's Connect <ExternalLink className="w-4 h-4 inline ml-2" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
