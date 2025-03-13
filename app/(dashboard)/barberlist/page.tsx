import { 
  Alert,
  Image, 
  Platform, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";

import { Colors } from "@/constants/Colors";
import { CardBarber } from "@/components/CardBarber";
import api from "@/lib/axios";

interface BarberData {
  id: string;
  name: string;
  email: string;
  phone: string;
  barberShop: string;
}

interface BarberAvailabilityData {
  id: string;
  barberId: string;
  dayAt: Date;
  startTime: string;
  endTime: string;
}

export default function BarberList() {
  const [barberData, setBarberData] = useState<BarberData>();
  const [barberAvailability, setBarberAvailability] = useState<BarberAvailabilityData[]>([]); // Alterado para array

  const fetchBarberAvailability = useCallback(async () => {
    try {
      const response = await api.get<BarberAvailabilityData[]>('barber-availability');
      setBarberAvailability(response.data); // Agora é um array
    } catch (error: any) {
      Alert.alert("Erro ao carregar os casos.");
    }
  }, []);

  useEffect(() => {
    async function fetchBarberData() {
      const storedData = await AsyncStorage.getItem('authBarberToken');
      if (storedData) {
        setBarberData(JSON.parse(storedData));
      }
    }
    fetchBarberData();
    fetchBarberAvailability();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBarberAvailability();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeTitle}>Bem Vindo,</Text>

          <TouchableOpacity onPress={() => router.push('/(dashboard)/profilebarber/page')}>
            <Text style={styles.nameTitle}>Rafaela R Barbosa</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(dashboard)/profilebarber/page')}>
          <Image source={{ uri: 'https://github.com/Rafaela3613.png' }} style={styles.profile}/>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.listTitle}>Agenda de Trabalho</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {barberAvailability.map((availability) => (
            <CardBarber key={availability.id} barberScheduling={availability} />
          ))}
        </ScrollView>
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
  },
  welcomeTitle: {
    color: Colors.zinc_500,
    fontSize: 24,
    fontWeight: '400',
  },
  nameTitle: {
    color: Colors.orange_600,
    fontSize: 36,
    fontWeight: 'bold',
  },
  listTitle: {
    color: Colors.zinc_100,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 36,
    marginLeft: 24,
  },
  profile: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
});
