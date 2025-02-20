import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";

import { Colors } from "@/constants/Colors";

export default function Success() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconContent}>
          <Ionicons name="checkmark-sharp" size={60} style={styles.icon}/>
        </View>

        <View style={styles.titleContent}>
          <Text style={styles.title}>Cadastramento</Text>
        </View>

        <View>
          <Text style={styles.title}>concluído</Text>
        </View>

        <View style={styles.subtitleContent}>
          <Text style={styles.subtitle}>Agora é só fazer seu login.</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/')} style={styles.button}>
          <Text>Ok</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_800,
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: Colors.success,
    marginRight: 8,
  },
  iconContent: {
    marginTop: 170,
  },
  title: {
    color: Colors.zinc_50,
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleContent: {
    marginTop: 60,
  },
  subtitle: {
    color: Colors.zinc_500,
    fontSize: 14,
    fontWeight: '400',
  },
  subtitleContent: {
    marginTop: 24,
  },
  button: {
    backgroundColor: Colors.orange_600,
    marginTop: 54,
    marginBottom: 8,
    paddingTop: 14,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});
