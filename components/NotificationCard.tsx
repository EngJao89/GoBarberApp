import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";

export function NotificationCard() {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: 'https://github.com/Rafaela3613.png' }} style={styles.avatar} />

      <View style={styles.weekTime}>
        <Ionicons name="calendar-outline" size={14} color={Colors.orange_700} />
        <Text style={styles.nameTitle}>09/04/2025</Text>
      </View>

      <View style={styles.weekTime}>
        <Ionicons name="time-outline" size={14} color={Colors.orange_700} />
        <Text style={styles.nameDetails}>09:00</Text>
      </View>

      <View style={styles.weekTime}>
        <TouchableOpacity activeOpacity={0.5} style={styles.button}>
          <Ionicons name="checkmark-outline" size={20} color={Colors.success} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}>
          <Ionicons name="close-outline" size={20} color={Colors.red_600}/>
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.zinc_700,
    width: 370,
    padding: 16,
    marginLeft: 20,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 32,
  },
  weekTime: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  nameTitle: {
    color: Colors.zinc_200,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  nameDetails: {
    color: Colors.zinc_400,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,
  },
  button: {
    marginRight: 16,
  }
});