
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { NotificationCardProps } from "@/@types/notification";

export function NotificationCard({ 
  id, 
  date, 
  time, 
  serviceType,
  clientName,
  avatarUrl, 
  onAccept, 
  onReject,
  status,
  onFinish,
  canFinish
}: Readonly<NotificationCardProps>) {
  const isConfirmed = status === 'confirmado';
  return (
    <Pressable 
      style={styles.container}
      onPress={() => router.push(`/(appointment)/detailsuser/${id}`)}
    >
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, { backgroundColor: Colors.zinc_600 }]}>
          <Ionicons name="person-outline" size={24} color={Colors.zinc_300} />
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.clientName}>{clientName}</Text>
        <Text style={styles.serviceType}>{serviceType}</Text>
        
        <View style={styles.timeContainer}>
          <View style={styles.weekTime}>
            <Ionicons name="calendar-outline" size={14} color={Colors.orange_700} />
            <Text style={styles.nameTitle}>{date}</Text>
          </View>

          <View style={styles.weekTime}>
            <Ionicons name="time-outline" size={14} color={Colors.orange_700} />
            <Text style={styles.nameDetails}>{time}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          activeOpacity={isConfirmed ? 1 : 0.5} 
          style={[styles.button, isConfirmed && styles.disabledButton]}
          onPress={isConfirmed ? undefined : () => onAccept(id)}
          disabled={isConfirmed}
        >
          <Ionicons 
            name="checkmark-outline" 
            size={20} 
            color={isConfirmed ? Colors.zinc_500 : Colors.success} 
          />
        </TouchableOpacity>

        {canFinish && isConfirmed && (
          <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => onFinish && onFinish(id)}
          >
            <Ionicons 
              name="checkmark-done-outline" 
              size={20} 
              color={Colors.success}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          activeOpacity={0.5}
          onPress={() => onReject(id)}
        >
          <Ionicons 
            name="close-outline" 
            size={20} 
            color={Colors.red_600}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.zinc_700,
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  weekTime: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 4,
  },
  clientName: {
    color: Colors.zinc_100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceType: {
    color: Colors.orange_500,
    fontSize: 14,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    marginRight: 16,
  },
  disabledButton: {
    opacity: 0.5,
  }
});