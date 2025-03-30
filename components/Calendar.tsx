"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTranslation } from "../context/TranslationContext"

type CalendarProps = {
  onDateSelect?: (date: Date | null) => void
  initialDate?: Date
}

export default function Calendar({ onDateSelect, initialDate }: CalendarProps) {
  const { translations } = useTranslation()
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    // Toggle selection: if the same date is selected, deselect it
    if (
      selectedDate &&
      selectedDate.getDate() === newDate.getDate() &&
      selectedDate.getMonth() === newDate.getMonth() &&
      selectedDate.getFullYear() === newDate.getFullYear()
    ) {
      setSelectedDate(null)
      if (onDateSelect) onDateSelect(null)
    } else {
      setSelectedDate(newDate)
      if (onDateSelect) onDateSelect(newDate)
    }
  }

  const renderDays = () => {
    const days = []
    let dayCount = 1

    // Create blank spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayItem} />)
    }

    // Create day buttons for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === currentMonth.getMonth() &&
        selectedDate.getFullYear() === currentMonth.getFullYear()

      days.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[styles.dayItem, isSelected && styles.selectedDay]}
          onPress={() => handleDateSelect(i)}
        >
          <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{i}</Text>
        </TouchableOpacity>,
      )
      dayCount++
    }

    return days
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.daysHeader}>
        {dayNames.map((day, index) => (
          <Text key={index} style={styles.dayName}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysContainer}>{renderDays()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  navButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    padding: 5,
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  dayName: {
    width: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#666",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayItem: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  selectedDayText: {
    color: "#fff",
  },
})

