import { 
  Image, 
  Platform, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "@/constants/Colors";
import api from "@/lib/axios";
import { BarberData } from "@/@types/barber";
import { SchedulingData } from "@/@types/scheduling";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { NotificationCard } from "@/components/NotificationCard";

export default function HistoryBarber() {
  const [barberData, setBarberData] = useState<BarberData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [schedulingData, setSchedulingData] = useState<SchedulingData[]>([]);
  const [schedulingsWithUserData, setSchedulingsWithUserData] = useState<any[]>([]);

  const fetchScheduling = useCallback(async () => {
    try {
      const response = await api.get<SchedulingData[]>("scheduling");

      const dataWithDates = response.data.map(item => ({
        ...item,
        dayAt: typeof item.dayAt === 'string' ? new Date(item.dayAt) : item.dayAt,
      }));

      setSchedulingData(dataWithDates);
    } catch (error) {
      console.error("Erro ao carregar os agendamentos:", error);
      Alert.alert("Erro ao carregar os agendamentos.");
    }
  }, []);

  useEffect(() => {
    async function fetchBarberData() {
      try {
        const storedData = await AsyncStorage.getItem('authBarberToken');
        if (storedData) {
          const response = await api.post('auth-barber/me', {}, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedData}`,
            },
          });
          setBarberData(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do barbeiro:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBarberData();
  }, []);

  useEffect(() => {
    if (!barberData) return;
    
    const loadData = async () => {
      await fetchScheduling();
    };
    
    loadData();
  }, [barberData, fetchScheduling]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!barberData || schedulingData.length === 0) return;

      const barberHistory = schedulingData
        .filter(item => {
          if (item.barberId !== barberData.id) return false;
          
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const schedulingDate = item.dayAt instanceof Date ? item.dayAt : new Date(item.dayAt as any);
          const schedulingDateLocal = new Date(schedulingDate.getFullYear(), schedulingDate.getMonth(), schedulingDate.getDate());
          const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          
          return schedulingDateLocal.getTime() < todayLocal.getTime();
        })
        .sort((a, b) => {
          const aTime = (a.dayAt instanceof Date ? a.dayAt : new Date(a.dayAt as any)).getTime();
          const bTime = (b.dayAt instanceof Date ? b.dayAt : new Date(b.dayAt as any)).getTime();
          return bTime - aTime;
        });

      const schedulingsWithUsers = await Promise.all(
        barberHistory.map(async (scheduling) => {
          try {
            const userResponse = await api.get(`users/${scheduling.userId}`);
            return {
              ...scheduling,
              user: userResponse.data
            };
          } catch (error) {
            console.error(`Erro ao buscar dados do usuário ${scheduling.userId}:`, error);
            return {
              ...scheduling,
              user: { name: "Cliente", avatarUrl: undefined }
            };
          }
        })
      );

      setSchedulingsWithUserData(schedulingsWithUsers);
    };

    loadUserData();
  }, [barberData, schedulingData]);

  if (isLoading) {
    return <Loading />;
  }

  if (!barberData) {
    return <NotFound />;
  }

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.zinc_400} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.welcomeTitle}>{barberData.name}</Text>

          <TouchableOpacity onPress={() => router.push(`/(dashboard)/profilebarber/${barberData.id}`)}>
            <Text 
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.nameTitle}
            >
              Histórico
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push(`/(dashboard)/profilebarber/${barberData.id}`)}>
          <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.navTitle}>
          <Text style={styles.listTitle}>Histórico de Agendamentos</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {schedulingsWithUserData.length > 0 ? (
            schedulingsWithUserData.map((scheduling) => (
              <NotificationCard
                key={scheduling.id}
                id={scheduling.id}
                date={formatDate(scheduling.dayAt)}
                time={scheduling.hourAt}
                serviceType={scheduling.serviceType}
                clientName={scheduling.user?.name || "Cliente"}
                avatarUrl={scheduling.user?.avatarUrl}
                onAccept={() => {}}
                onReject={() => {}}
                status={scheduling.status}
              />
            ))
          ) : (
            <Text style={styles.noDataText}>Nenhum agendamento no histórico.</Text>
          )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 8,
  },
  welcomeTitle: {
    color: Colors.zinc_500,
    fontSize: 18,
    fontWeight: '400',
  },
  nameTitle: {
    color: Colors.orange_600,
    fontSize: 24,
    fontWeight: 'bold',
  },
  listTitle: {
    color: Colors.zinc_100,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 24,
  },
  navTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
  },
  profile: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  noDataText: {
    color: Colors.zinc_100,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

