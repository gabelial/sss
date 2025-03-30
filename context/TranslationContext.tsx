"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import en from "../translations/en"
import es from "../translations/es"

type Translations = typeof en

interface TranslationContextType {
  translations: Translations
  language: string
  setLanguage: (lang: string) => void
}

const translations = {
  en,
  es,
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("es") // Default to Spanish as requested

  const value = {
    translations: translations[language as keyof typeof translations],
    language,
    setLanguage,
  }

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}

