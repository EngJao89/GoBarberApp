import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from "@/constants/Colors";

export function CardBarber() {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: 'https://github.com/Rafaela3613.png' }} style={styles.avatar}/>

      <View>
        <Text style={styles.nameTitle}>Dia de trabalho</Text>

        <View style={styles.weekTime}>
          <Ionicons name="calendar-outline" size={14} color={Colors.orange_700}/>
          <Text style={styles.nameDetails}>Segunda</Text>
        </View>

        <View style={styles.weekTime}>
          <Ionicons name="time-outline" size={14} color={Colors.orange_700}/>
          <Text style={styles.nameDetails}>09:00h às 20:00h</Text>
        </View>
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
    width: 80,
    height: 80,
    borderRadius: 32,
  },
  nameTitle: {
    color: Colors.zinc_200,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nameDetails: {
    color: Colors.zinc_400,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,
  },
  weekTime: {
    flexDirection: 'row',
    marginTop: 8,
  },
})