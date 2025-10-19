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

import api from "@/lib/axios";
import { BarberAvailabilityData, BarberData } from "@/@types/barber";
import { Colors } from "@/constants/Colors";
import { fetchConfirmedSchedulings, fetchPendingSchedulings } from "@/services/schedulingService";
import { CardBarber } from "@/components/CardBarber";
import { NotificationCard } from "@/components/NotificationCard";

export default function BarberList() {
  const [barberData, setBarberData] = useState<BarberData | null>(null);
  const [barberAvailability, setBarberAvailability] = useState<BarberAvailabilityData[]>([]);
  const [confirmedSchedulings, setConfirmedSchedulings] = useState<any[]>([]);
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

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const upcomingAvailability = dataWithDates.filter(availability => {
        const availabilityDate = new Date(availability.dayAt);
        const availabilityDateLocal = new Date(availabilityDate.getFullYear(), availabilityDate.getMonth(), availabilityDate.getDate());
        const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextWeekLocal = new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate());
        return availabilityDateLocal.getTime() >= todayLocal.getTime() && availabilityDateLocal.getTime() <= nextWeekLocal.getTime();
      });

      const sortedData = upcomingAvailability.sort((a, b) => a.dayAt.getTime() - b.dayAt.getTime());

      setBarberAvailability(sortedData);
    } catch (error: any) {
      console.error("Erro ao carregar os horários de trabalho:", error);
      Alert.alert("Erro ao carregar os horários de trabalho.");
    }
  }, []);

  const fetchPendingAppointments = useCallback(async (barberId: string) => {
    try {
      const schedulings = await fetchPendingSchedulings(barberId);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const upcomingSchedulings = schedulings.filter(scheduling => {
        const schedulingDate = new Date(scheduling.dayAt);
        const schedulingDateLocal = new Date(schedulingDate.getFullYear(), schedulingDate.getMonth(), schedulingDate.getDate());
        const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextWeekLocal = new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate());
        return schedulingDateLocal.getTime() >= todayLocal.getTime() && 
               schedulingDateLocal.getTime() <= nextWeekLocal.getTime() &&
               scheduling.status === 'pendente';
      });

      const schedulingsWithUserData = await Promise.all(
        upcomingSchedulings.map(async (scheduling) => {
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
              user: { name: "Cliente", email: "", phone: "" }
            };
          }
        })
      );

      setPendingSchedulings(schedulingsWithUserData);
    } catch (error) {
      console.error("Erro ao carregar agendamentos pendentes:", error);
      Alert.alert("Erro", "Não foi possível carregar os agendamentos pendentes.");
    }
  }, []);

  const fetchConfirmedAppointments = useCallback(async (barberId: string) => {
    try {
      setIsLoading(true);
      const schedulings = await fetchConfirmedSchedulings(barberId);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const upcomingSchedulings = schedulings.filter(scheduling => {
        const schedulingDate = new Date(scheduling.dayAt);
        const schedulingDateLocal = new Date(schedulingDate.getFullYear(), schedulingDate.getMonth(), schedulingDate.getDate());
        const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextWeekLocal = new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate());
        return schedulingDateLocal.getTime() >= todayLocal.getTime() && schedulingDateLocal.getTime() <= nextWeekLocal.getTime();
      });

      const schedulingsWithUserData = await Promise.all(
        upcomingSchedulings.map(async (scheduling) => {
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
              user: { name: "Cliente", email: "", phone: "" }
            };
          }
        })
      );

      setConfirmedSchedulings(schedulingsWithUserData);
    } catch (error) {
      console.error("Erro ao carregar agendamentos confirmados:", error);
      Alert.alert("Erro", "Não foi possível carregar os agendamentos confirmados.");
    } finally {
      setIsLoading(false);
    }
  }, []);


  const handleAcceptAppointment = async (schedulingId: string) => {
    try {
      await api.patch(`scheduling/${schedulingId}`, { status: 'confirmado' });
      Alert.alert("Sucesso", "Agendamento confirmado com sucesso!");
      if (barberData) {
        await fetchPendingAppointments(barberData.id);
        await fetchConfirmedAppointments(barberData.id);
      }
    } catch (error) {
      console.error("Erro ao confirmar agendamento:", error);
      Alert.alert("Erro", "Não foi possível confirmar o agendamento.");
    }
  };

  const handleRejectAppointment = async (schedulingId: string) => {
    try {
      await api.patch(`scheduling/${schedulingId}`, { status: 'cancelado' });
      Alert.alert("Sucesso", "Agendamento cancelado com sucesso!");
      if (barberData) {
        await fetchPendingAppointments(barberData.id);
        await fetchConfirmedAppointments(barberData.id);
      }
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
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
          await fetchConfirmedAppointments(barberId);
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
        fetchConfirmedAppointments(barberData.id);
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

          {(() => {
            if (isLoading) {
              return <Text style={styles.loadingText}>Carregando...</Text>;
            }
            
            if (pendingSchedulings.length === 0) {
              return <Text style={styles.emptyText}>Nenhum agendamento pendente para hoje</Text>;
            }
            
            return pendingSchedulings.map(scheduling => {
              return (
                <NotificationCard
                  key={scheduling.id}
                  id={scheduling.id}
                  date={formatDate(scheduling.dayAt)}
                  time={scheduling.hourAt}
                  serviceType={scheduling.serviceType}
                  clientName={scheduling.user?.name || "Cliente"}
                  avatarUrl={scheduling.user?.avatarUrl}
                  onAccept={() => handleAcceptAppointment(scheduling.id)}
                  onReject={() => handleRejectAppointment(scheduling.id)}
                  status={scheduling.status}
                />
              );
            });
          })()}

          <Text style={styles.listTitle}>Agendamentos Confirmados</Text>

          {(() => {
            if (isLoading) {
              return <Text style={styles.loadingText}>Carregando...</Text>;
            }
            
            if (confirmedSchedulings.length === 0) {
              return <Text style={styles.emptyText}>Nenhum agendamento confirmado para hoje</Text>;
            }
            
            return confirmedSchedulings
              .filter(scheduling => scheduling.status === 'confirmado')
              .map(scheduling => (
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
              ));
          })()}

          <Text style={styles.listTitle}>Agenda de Trabalho</Text>

          {(() => {
            const filteredAvailability = barberAvailability.filter((availability) => availability.barberId === barberData?.id);

            if (filteredAvailability.length === 0) {
              return <Text style={styles.emptyText}>Nenhum agendamento disponível</Text>;
            }

            return filteredAvailability.map((availability) => (
              <CardBarber key={availability.id} barberScheduling={availability} />
            ));
          })()}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => router.push('(appointment)/add-availability/page' as any)}
        >
          <Text style={styles.footerButtonText}>+ Adicionar Horário</Text>
        </TouchableOpacity>
      </View>
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.zinc_800,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.zinc_700,
  },
  footerButton: {
    backgroundColor: Colors.orange_600,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerButtonText: {
    color: Colors.zinc_100,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
