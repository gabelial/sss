import { View, Text, StyleSheet } from "react-native"
import LanguageSwitcher from "../components/LanguageSwitcher"

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <LanguageSwitcher />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
})

