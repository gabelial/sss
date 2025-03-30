import { Stack } from "expo-router"
import { TranslationProvider } from "../context/TranslationContext"

export default function Layout() {
  return (
    <TranslationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TranslationProvider>
  )
}

