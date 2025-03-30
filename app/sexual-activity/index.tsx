"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native"
import { useTranslation } from "../../context/TranslationContext"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { format } from "date-fns"
import { es } from "date-fns/locale"

type SexualActivityRecord = {
  id: string
  date: string
  time: string
  partner?: string
  protection: boolean
  notes?: string
}

export default function SexualActivityScreen() {
  const { translations } = useTranslation()
  const router = useRouter()
  const [records, setRecords] = useState<SexualActivityRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecords()
  }, [])

  const loadRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem("sexualActivityRecords")
      if (storedRecords) {
        setRecords(JSON.parse(storedRecords))
      }
    } catch (error) {
      console.error("Error loading records:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    Alert.alert(translations.sexualActivity.delete, translations.sexualActivity.confirmDelete, [
      {
        text: translations.sexualActivity.cancel,
        style: "cancel",
      },
      {
        text: translations.sexualActivity.delete,
        style: "destructive",
        onPress: async () => {
          const updatedRecords = records.filter((record) => record.id !== id)
          setRecords(updatedRecords)
          try {
            await AsyncStorage.setItem("sexualActivityRecords", JSON.stringify(updatedRecords))
          } catch (error) {
            console.error("Error saving records:", error)
          }
        },
      },
    ])
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "PPP", { locale: es })
    } catch (error) {
      return dateString
    }
  }

  const renderItem = ({ item }: { item: SexualActivityRecord }) => (
    <View style={styles.recordItem}>
      <View style={styles.recordHeader}>
        <Text style={styles.recordDate}>{formatDate(item.date)}</Text>
        <Text style={styles.recordTime}>{item.time}</Text>
      </View>

      <View style={styles.recordDetails}>
        {item.partner && (
          <Text style={styles.recordPartner}>
            {translations.sexualActivity.partner}: {item.partner}
          </Text>
        )}
        <Text style={[styles.recordProtection, item.protection ? styles.protectionUsed : styles.protectionNotUsed]}>
          {item.protection ? translations.sexualActivity.protectionUsed : translations.sexualActivity.protectionNotUsed}
        </Text>
        {item.notes && <Text style={styles.recordNotes}>{item.notes}</Text>}
      </View>

      <View style={styles.recordActions}>
        <TouchableOpacity style={styles.editButton} onPress={() => router.push(`/sexual-activity/edit?id=${item.id}`)}>
          <Text style={styles.editButtonText}>{translations.sexualActivity.edit}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButtonText}>{translations.sexualActivity.delete}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{translations.sexualActivity.recordHistory}</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/sexual-activity/add")}>
        <Text style={styles.addButtonText}>{translations.sexualActivity.addRecord}</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Cargando...</Text>
        </View>
      ) : records.length > 0 ? (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>{translations.sexualActivity.noRecords}</Text>
        </View>
      )}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  recordItem: {
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recordTime: {
    fontSize: 14,
    color: "#666",
  },
  recordDetails: {
    marginBottom: 12,
  },
  recordPartner: {
    fontSize: 14,
    marginBottom: 4,
  },
  recordProtection: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "500",
  },
  protectionUsed: {
    color: "#34C759",
  },
  protectionNotUsed: {
    color: "#FF3B30",
  },
  recordNotes: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  recordActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
    backgroundColor: "#007AFF",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

