"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SimpleNavbar from "@/components/simple-navbar"
import Footer from "@/components/footer"

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

const teamMembers = [
  {
    id: "ritesh-giri",
    name: "Ritesh Giri",
    role: "Full Stack Developer",
    image: "/member/ritesh-giri.png",
    bio: "Expert full-stack developer building scalable web applications. Leads technical architecture and delivers end-to-end digital solutions for clients.",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "nitesh",
    name: "Nitesh",
    role: "Project Manager",
    image: "/placeholder-user.jpg",
    bio: "Keeps every project on track from kickoff to delivery. Ensures clear communication, on-time execution, and exceptional client experience.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: "nikhilesh",
    name: "Nikhilesh",
    role: "Shopify Website Developer",
    image: "/placeholder-user.jpg",
    bio: "Specialist in building high-converting Shopify stores. From custom themes to app integrations — delivering e-commerce experiences that sell.",
    color: "from-violet-500 to-violet-600"
  },
  {
    id: "vinay",
    name: "Vinay",
    role: "Graphics & UI/UX Designer",
    image: "/placeholder-user.jpg",
    bio: "Creates stunning visuals and intuitive interfaces. Translates brand identity into design systems that look great and feel effortless to use.",
    color: "from-pink-500 to-pink-600"
  },
  {
    id: "rahul",
    name: "Rahul",
    role: "Sales Manager",
    image: "/placeholder-user.jpg",
    bio: "Drives client acquisition and builds lasting business relationships. Connects the right solutions to the right clients — growing the agency pipeline.",
    color: "from-amber-500 to-amber-600"
  },
  {
    id: "ajay",
    name: "Ajay",
    role: "Advertising & Marketing Strategist",
    image: "/placeholder-user.jpg",
    bio: "Crafts data-driven ad campaigns and marketing strategies that generate real ROI. Expert in paid media, brand positioning, and audience targeting.",
    color: "from-red-500 to-red-600"
  }
]

export default function TeamPage() {
  return (
    <div className="bg-white">
      <SimpleNavbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Meet Our Experienced Team
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Talented professionals dedicated to delivering exceptional digital solutions. Each member brings years of expertise and innovation to every project.
          </motion.p>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Link href={`/team/${member.id}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-3`}>
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm flex-grow mb-4">{member.bio}</p>
                      
                      {/* View Profile Button */}
                      <motion.div
                        className="flex items-center text-blue-600 font-semibold group/btn"
                        whileHover={{ x: 5 }}
                      >
                        <span className="group-hover/btn:underline">View Profile</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
