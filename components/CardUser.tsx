import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

interface SchedulingData {
  id: string;
  barberId: string;
  userId: string
  dayAt: Date | string;
  hourAt: string;
  serviceType: string;
  status: string;
}

interface CardProps {
  scheduling: SchedulingData;
}

export function CardUser({ scheduling }: CardProps) {

  const dayAtDate = typeof scheduling.dayAt === 'string' 
    ? new Date(scheduling.dayAt) 
    : scheduling.dayAt;

  const formattedDate = dayAtDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Pressable onPress={() => router.push('/(appointment)/new/page')} style={styles.container}>
      <Image 
        source={{ uri: 'https://github.com/Rafaela3613.png' }} 
        style={styles.avatar}
      />

      <View>
        <Text style={styles.nameTitle}>Rafaela Rabelo</Text>

        <View style={styles.weekTime}>
          <Ionicons name="calendar-outline" size={14} color={Colors.orange_700}/>
          <Text style={styles.nameDetails}>{formattedDate}</Text>
        </View>
        
        <View style={styles.weekTime}>
          <Ionicons name="time-outline" size={14} color={Colors.orange_700}/>
          <Text style={styles.nameDetails}>{scheduling.hourAt}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.zinc_700,
    width: '90%',
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
});
