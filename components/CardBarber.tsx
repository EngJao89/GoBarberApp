import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";

import { Colors } from "@/constants/Colors";

interface BarberSchedulingData {
  id: string;
  barberId: string;
  dayAt: Date | string;
  startTime: string;
  endTime: string;
}

interface CardProps {
  barberScheduling: BarberSchedulingData;
}

export function CardBarber({ barberScheduling }: CardProps) {
  const dayAtDate = typeof barberScheduling.dayAt === 'string' 
    ? new Date(barberScheduling.dayAt) 
    : barberScheduling.dayAt;

  const formattedDate = dayAtDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Pressable 
      onPress={() => router.push(`/(appointment)/detailsbarber/${barberScheduling.id}`)} 
      style={styles.container}
    >
      <Image source={{ uri: 'https://github.com/Rafaela3613.png' }} style={styles.avatar} />

      <View>
        <View style={styles.weekTime}>
          <Ionicons name="calendar-outline" size={20} color={Colors.orange_700} />
          <Text style={styles.nameTitle}>{formattedDate}</Text>
        </View>
        

        <View style={styles.weekTime}>
          <Ionicons name="time-outline" size={14} color={Colors.orange_700} />
          <Text style={styles.nameDetails}>{barberScheduling.startTime}</Text>
        </View>

        <View style={styles.weekTime}>
          <Ionicons name="time-outline" size={14} color={Colors.orange_700} />
          <Text style={styles.nameDetails}>{barberScheduling.endTime}</Text>
        </View>
      </View>
    </Pressable>
  );
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
});
