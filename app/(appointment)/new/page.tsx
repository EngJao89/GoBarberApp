import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors } from "@/constants/Colors";

export default function Appointment() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const minimumDate = new Date(2020, 0, 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={32} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Agendamento</Text>

        <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile} />
      </View>

      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.title}>Escolha a data</Text>

          <TouchableOpacity activeOpacity={0.5} onPress={() => setShow(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>
              {selectedDate.toLocaleDateString('pt-BR')}
            </Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              mode="date"
              is24Hour={true}
              display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
              value={selectedDate}
              onChange={(event, date) => {
                setShow(false);
                if (date) {
                  setSelectedDate(date);
                }
              }}
              minimumDate={minimumDate}
            />
          )}
        </View>
        <View style={styles.schedule}>
          <View style={styles.section}>
            <Text style={styles.title}>Escolha o Horário</Text>

            <View style={styles.sectionLabel}>
              <Text style={styles.labelText}>
                Manhã
              </Text>
            </View>

            <ScrollView 
              contentContainerStyle={{paddingHorizontal: 24}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>09:00</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>11:30</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>12:00</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.sectionLabel}>
              <Text style={styles.labelText}>
                Tarde
              </Text>
            </View>

            <ScrollView 
              contentContainerStyle={{paddingHorizontal: 24}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>12:00</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>13:30</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>14:00</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>15:00</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>17:30</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.sectionLabel}>
              <Text style={styles.labelText}>
                Noite
              </Text>
            </View>

            <ScrollView 
              contentContainerStyle={{paddingHorizontal: 24}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>19:00</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.buttonText}>19:30</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => router.push('/(appointment)/successschedule/page')} 
              style={styles.scheduleButton}
            >
              <Text>Agendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
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
    paddingTop: Platform.OS === "android" ? 44 : 0,
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
  containerProvider: {
    marginBottom: 16,
  },
  providerButton: {
    marginTop: 8,
    marginBottom: 8,
    marginRight: 16,
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 14,
    borderRadius: 10,

    backgroundColor: Colors.zinc_700,
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerAvatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  providerTitle: {
    color: Colors.zinc_100,
    fontWeight: 'bold',
    marginLeft: 8,
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
  dateButton: {
    backgroundColor: Colors.zinc_700,
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  dateText: {
    color: Colors.zinc_100,
    fontSize: 16,
  },
  schedule: {
    paddingTop: 52,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 16,
    marginBottom: 10,
  },
  labelText: {
    color: Colors.zinc_400,
  },
  sectionButton: {
    backgroundColor: Colors.zinc_700,
    padding: 12,
    marginRight: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.zinc_100,
  },
  scheduleButton: {
    backgroundColor: Colors.orange_600,
    marginTop: 72,
    marginBottom: 8,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});
