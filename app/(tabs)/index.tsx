"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useTranslation } from "../../context/TranslationContext"
import { useRouter } from "expo-router"

export default function HomeScreen() {
  const { translations } = useTranslation()
  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{translations.home.title}</Text>
        <Text style={styles.subtitle}>{translations.home.subtitle}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/consultation")}>
          <Text style={styles.primaryButtonText}>{translations.home.consultNow}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/history")}>
          <Text style={styles.secondaryButtonText}>{translations.home.viewHistory}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentActivityContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{translations.home.recentActivity}</Text>
          <TouchableOpacity onPress={() => router.push("/history")}>
            <Text style={styles.viewAllText}>{translations.home.viewAll}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.activityList}>
          <Text style={styles.noActivityText}>{translations.home.noActivity}</Text>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  actionsContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  recentActivityContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#007AFF",
    fontSize: 14,
  },
  activityList: {
    flex: 1,
  },
  noActivityText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
  },
})

