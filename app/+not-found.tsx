"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTranslation } from "../context/TranslationContext"
import { useRouter } from "expo-router"

export default function NotFoundScreen() {
  const { translations } = useTranslation()
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translations.notFound.title}</Text>
      <Text style={styles.message}>{translations.notFound.message}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.buttonText}>{translations.notFound.backHome}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
})

