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
import { fetchPendingSchedulings, updateSchedulingStatus } from "@/services/schedulingService";

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
  const [pendingSchedulings, setPendingSchedulings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBarberData = useCallback(async () => {
    try {
      const storedData = await AsyncStorage.getItem('authBarberToken');

      if (!storedData) {
        handleLogout();
        return;
      }

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
      return response.data.id;
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do barbeiro.");
      throw error;
    }
  }, []);

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

  const fetchPendingAppointments = useCallback(async (barberId: string) => {
    try {
      setIsLoading(true);
      const schedulings = await fetchPendingSchedulings(barberId);
      setPendingSchedulings(schedulings);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os agendamentos pendentes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await updateSchedulingStatus(id, 'confirmado');

      setPendingSchedulings(prev => prev.filter(item => item.id !== id));

      Alert.alert("Sucesso", "Agendamento confirmado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível confirmar o agendamento.");
    }
  };
  
  const handleReject = async (id: string) => {
    try {
      await updateSchedulingStatus(id, 'cancelado');

      setPendingSchedulings(prev => prev.filter(item => item.id !== id));

      Alert.alert("Sucesso", "Agendamento cancelado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cancelar o agendamento.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authBarberToken');
    router.replace('/');
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const barberId = await fetchBarberData();
        if (barberId) {
          await fetchPendingAppointments(barberId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (barberData) {
        fetchPendingAppointments(barberData.id);
        fetchBarberAvailability();
      }
    }, [barberData])
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.listTitle}>Agendamentos Pendentes</Text>

          {isLoading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : pendingSchedulings.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum agendamento pendente</Text>
          ) : (
            pendingSchedulings.map(scheduling => (
              <NotificationCard
                key={scheduling.id}
                id={scheduling.id}
                date={formatDate(scheduling.dayAt)}
                time={scheduling.hourAt}
                serviceType={scheduling.serviceType}
                clientName={scheduling.user?.name || "Cliente"}
                avatarUrl={scheduling.user?.avatarUrl}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))
          )}

          <Text style={styles.listTitle}>Horários de Trabalho</Text>

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
  scrollContainer: {
    paddingBottom: 120,
  },
  container: {
    backgroundColor: Colors.zinc_800,
    paddingTop: 24,
    paddingHorizontal: 16,
    gap: 16,
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
    marginLeft: 8,
  },
  profile: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  loadingText: {
    color: Colors.zinc_400,
    textAlign: 'center',
    marginVertical: 16,
  },
  emptyText: {
    color: Colors.zinc_500,
    textAlign: 'center',
    marginVertical: 16,
    fontStyle: 'italic',
  },
});
