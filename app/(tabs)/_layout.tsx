import { Tabs } from "expo-router"
import { useTranslation } from "../../context/TranslationContext"
import { Home, Clock, MessageSquare, Heart } from "lucide-react"

export default function TabLayout() {
  const { translations } = useTranslation()

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: translations.tabs.home,
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: translations.tabs.history,
          tabBarIcon: ({ color }) => <Clock size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="consultation"
        options={{
          title: translations.tabs.consultation,
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sexual-activity"
        options={{
          title: translations.sexualActivity.title,
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}

