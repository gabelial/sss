import { View, Text, StyleSheet, FlatList } from "react-native"
import { useTranslation } from "../../context/TranslationContext"

export default function HistoryScreen() {
  const { translations } = useTranslation()

  // Sample data - in a real app, this would come from an API or local storage
  const historyItems = []

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{translations.history.title}</Text>
      </View>

      {historyItems.length > 0 ? (
        <FlatList
          data={historyItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <View style={styles.historyItem}>{/* Render history item */}</View>}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>{translations.history.noHistory}</Text>
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
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  historyItem: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#F2F2F7",
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
  },
})

