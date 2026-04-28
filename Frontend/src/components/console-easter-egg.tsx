"use client"

import { useEffect } from "react"

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log('NextGen Fusion')

    console.log('📱 Want to work with us? Reach us at:')

    console.log('  📞 +91 73482 28167')

    console.log('  📧 contact@nextgenfusion.in')

    console.log('  🔗 https://wa.me/917348228167')
  }, [])

  // Component ini tidak render apa-apa
  return null
}