"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Alert } from "react-native"
import { useTranslation } from "../../context/TranslationContext"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Calendar from "../../components/Calendar"
import { format } from "date-fns"

export default function AddSexualActivityScreen() {
  const { translations } = useTranslation()
  const router = useRouter()

  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState(format(new Date(), "HH:mm"))
  const [partner, setPartner] = useState("")
  const [protection, setProtection] = useState(true)
  const [notes, setNotes] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)

  const handleSave = async () => {
    try {
      // Create new record
      const newRecord = {
        id: Date.now().toString(),
        date: date.toISOString(),
        time,
        partner: partner.trim() || undefined,
        protection,
        notes: notes.trim() || undefined,
      }

      // Get existing records
      const existingRecordsJson = await AsyncStorage.getItem("sexualActivityRecords")
      const existingRecords = existingRecordsJson ? JSON.parse(existingRecordsJson) : []

      // Add new record
      const updatedRecords = [newRecord, ...existingRecords]

      // Save updated records
      await AsyncStorage.setItem("sexualActivityRecords", JSON.stringify(updatedRecords))

      // Show success message
      Alert.alert(translations.sexualActivity.recordSaved, "", [{ text: "OK", onPress: () => router.back() }])
    } catch (error) {
      console.error("Error saving record:", error)
      Alert.alert("Error", "No se pudo guardar el registro")
    }
  }

  const handleDateSelect = (selectedDate: Date | null) => {
    if (selectedDate) {
      setDate(selectedDate)
    }
    setShowCalendar(false)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{translations.sexualActivity.addRecord}</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{translations.sexualActivity.date}</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowCalendar(true)}>
            <Text>{format(date, "dd/MM/yyyy")}</Text>
          </TouchableOpacity>
          {showCalendar && (
            <View style={styles.calendarContainer}>
              <Calendar onDateSelect={handleDateSelect} initialDate={date} />
            </View>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{translations.sexualActivity.time}</Text>
          <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="HH:MM" />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{translations.sexualActivity.partner}</Text>
          <TextInput
            style={styles.input}
            value={partner}
            onChangeText={setPartner}
            placeholder={translations.sexualActivity.enterPartner}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{translations.sexualActivity.protection}</Text>
          <View style={styles.switchContainer}>
            <Text>{protection ? translations.sexualActivity.yes : translations.sexualActivity.no}</Text>
            <Switch
              value={protection}
              onValueChange={setProtection}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={protection ? "#007AFF" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{translations.sexualActivity.notes}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder={translations.sexualActivity.enterNotes}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>{translations.sexualActivity.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{translations.sexualActivity.save}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  },
  formContainer: {
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 16,
    flex: 1,
    alignItems: "center",
    marginLeft: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    padding: 16,
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
})

