import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors } from "@/constants/Colors";

export default function Appointment () {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const minimumDate = new Date(2020, 0, 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={32} style={styles.icon}/>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Agendamento</Text>

        <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
      </View>

      <View style={styles.container}>

        <View style={styles.dateContainer}>
          <Text style={styles.title}>Escolha a data</Text>

          <DateTimePicker 
            mode="date"
            is24Hour={true}
            display="spinner" 
            value={selectedDate}
            onChange={(event, date) => {
              if (date) {
                setSelectedDate(date);
              }
            }}
            minimumDate={minimumDate}
            textColor="#f4ede8"
          />
        </View>
        

        <View></View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_900,
  },
  container: {
    backgroundColor: Colors.zinc_800,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 180,
  },
  header: {
    width: '100%',
    marginTop: 24,
    marginBottom: 36,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.zinc_100,
    fontSize: 28,
    fontWeight: 'bold',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: Colors.zinc_400,
  },
  profile: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  title: {
    color: Colors.zinc_100,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});
