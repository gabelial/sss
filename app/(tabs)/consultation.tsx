"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native"
import { useTranslation } from "../../context/TranslationContext"

export default function ConsultationScreen() {
  const { translations } = useTranslation()
  const [step, setStep] = useState(1)
  const [symptoms, setSymptoms] = useState("")

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{translations.consultation.selectSymptoms}</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              placeholder={translations.consultation.enterDetails}
              value={symptoms}
              onChangeText={setSymptoms}
            />
            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryButtonText}>{translations.consultation.next}</Text>
            </TouchableOpacity>
          </View>
        )
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{translations.consultation.chooseDoctor}</Text>
            {/* Doctor selection UI would go here */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleBack}>
                <Text style={styles.secondaryButtonText}>{translations.consultation.back}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
                <Text style={styles.primaryButtonText}>{translations.consultation.next}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{translations.consultation.scheduleTime}</Text>
            {/* Time selection UI would go here */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleBack}>
                <Text style={styles.secondaryButtonText}>{translations.consultation.back}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
                <Text style={styles.primaryButtonText}>{translations.consultation.next}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{translations.consultation.confirmConsultation}</Text>
            {/* Confirmation details would go here */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleBack}>
                <Text style={styles.secondaryButtonText}>{translations.consultation.back}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>{translations.consultation.submit}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{translations.consultation.title}</Text>
      </View>

      {renderStep()}
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
  stepContainer: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    minHeight: 120,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
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
    flex: 1,
    marginRight: 10,
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})

