"use client"

import { useState, useEffect } from "react"
import { m } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { apiService, ShowcaseItem } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"

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

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
}

export default function ShowcasePage() {
  const [showcaseData, setShowcaseData] = useState<ShowcaseItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch showcase data from external API
    const fetchShowcaseData = async () => {
      try {
        setLoading(true)
        const data = await apiService.getShowcaseItems()
        
        if (data && data.length > 0) {
          // Filter only active items and sort by display_order
          const activeItems = data
            .filter(item => item.is_active)
            .sort((a, b) => a.display_order - b.display_order)
          setShowcaseData(activeItems)
        } else {
          console.warn('No showcase data received from API')
          setShowcaseData([])
        }
      } catch (error) {
        console.error('Error fetching showcase data:', error)
        setShowcaseData([])
      } finally {
        setLoading(false)
      }
    }

    fetchShowcaseData()
  }, [])

  const handleGoToLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-ink-soft">Loading showcase...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <m.main
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <m.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <m.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-6"
              variants={itemVariants}
            >
              Our <span className="text-gradient">Showcase</span>
            </m.h1>
            <m.p 
              className="text-ink-soft text-lg max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Explore our latest projects and creative work. Each piece represents our commitment to excellence and innovation.
            </m.p>
          </m.div>

          {/* Grid */}
          <m.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {showcaseData.map((item, index) => (
              <m.div
                key={item.id}
                className="glass group relative overflow-hidden rounded-[28px] transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image - Full size */}
                <m.div 
                  className="relative aspect-square overflow-hidden"
                  variants={imageVariants}
                >
                  <Image
                    src={normalizeImagePath(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Bottom gradient and title (match portfolio preview style) */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col">
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{item.title}</h3>
                    <m.button
                      onClick={() => handleGoToLink(item.url)}
                      className="glass self-start text-ink px-4 py-2 rounded-full font-medium flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </m.button>
                  </div>
                </m.div>
              </m.div>
            ))}
          </m.div>

          {/* Empty State */}
          {showcaseData.length === 0 && (
            <m.div 
              className="text-center py-16"
              variants={itemVariants}
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">No showcase items found</h3>
              <p className="text-ink-soft">Check back later for our latest projects.</p>
            </m.div>
          )}
        </div>
      </m.main>

    </div>
  )
}
