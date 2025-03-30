import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "../context/TranslationContext"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, language === "en" && styles.activeButton]}
        onPress={() => setLanguage("en")}
      >
        <Text style={[styles.buttonText, language === "en" && styles.activeButtonText]}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, language === "es" && styles.activeButton]}
        onPress={() => setLanguage("es")}
      >
        <Text style={[styles.buttonText, language === "es" && styles.activeButtonText]}>Español</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#333",
  },
  activeButtonText: {
    color: "#fff",
  },
})

