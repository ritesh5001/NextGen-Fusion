'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export const LanguageToggle = () => {
  const [language, setLanguage] = useState<'en' | 'id'>('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'id' : 'en')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sm font-medium text-ink-soft hover:bg-white/70 rounded-full px-3 py-1.5"
      onClick={toggleLanguage}
    >
      {language.toUpperCase()}
    </Button>
  )
}
