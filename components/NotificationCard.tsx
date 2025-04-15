import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface NotificationCardProps {
  id: string;
  date: string;
  time: string;
  avatarUrl: string;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export function NotificationCard({ 
  id, 
  date, 
  time, 
  avatarUrl, 
  onAccept, 
  onReject 
}: NotificationCardProps) {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />

      <View style={styles.weekTime}>
        <Ionicons name="calendar-outline" size={14} color={Colors.orange_700} />
        <Text style={styles.nameTitle}>{date}</Text>
      </View>

      <View style={styles.weekTime}>
        <Ionicons name="time-outline" size={14} color={Colors.orange_700} />
        <Text style={styles.nameDetails}>{time}</Text>
      </View>

      <View style={styles.weekTime}>
        <TouchableOpacity 
          activeOpacity={0.5} 
          style={styles.button}
          onPress={() => onAccept(id)}
        >
          <Ionicons name="checkmark-outline" size={20} color={Colors.success} />
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.5}
          onPress={() => onReject(id)}
        >
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