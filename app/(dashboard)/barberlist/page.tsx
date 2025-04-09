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
import { NotificationCard } from "@/components/NotificationCard";

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
  dayAt: Date | string;
  startTime: string;
  endTime: string;
}

export default function BarberList() {
  const [barberData, setBarberData] = useState<BarberData | null>(null);
  const [barberAvailability, setBarberAvailability] = useState<BarberAvailabilityData[]>([]);

  const fetchBarberAvailability = useCallback(async () => {
    try {
      const response = await api.get<BarberAvailabilityData[]>('barber-availability');

      const dataWithDates = response.data.map(item => ({
        ...item,
        dayAt: typeof item.dayAt === 'string' ? new Date(item.dayAt) : item.dayAt,
      }));

      const sortedData = dataWithDates.sort((a, b) => a.dayAt.getTime() - b.dayAt.getTime());

      setBarberAvailability(sortedData);
    } catch (error: any) {
      Alert.alert("Erro ao carregar os casos.");
    }
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authBarberToken');
    router.replace('/');
  };

  useEffect(() => {
    async function fetchBarberData() {
      try {
        const storedData = await AsyncStorage.getItem('authBarberToken');

        if (!storedData) {
          handleLogout();
          return;
        }

        if (storedData) {
          const response = await api.post(
            'auth-barber/me',
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedData}`,
              },
            }
          );

          setBarberData(response.data);
        } else {
          Alert.alert("Nenhum token encontrado. Tente Novamente");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do barbeiro.");
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

          <TouchableOpacity onPress={() => router.push(`/(dashboard)/profilebarber/${barberData?.id}`)}>
            <Text style={styles.nameTitle}>{barberData ? barberData.name : "Carregando..."}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(dashboard)/profilebarber/page')}>
          <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.listTitle}>Agendamento Pendente</Text>

          <NotificationCard />

          <Text style={styles.listTitle}>Agenda de Trabalho</Text>

          {barberAvailability
            .filter((availability) => availability.barberId === barberData?.id)
            .map((availability) => (
              <CardBarber key={availability.id} barberScheduling={availability} />
            ))
          }
        </View>
      </ScrollView>
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
