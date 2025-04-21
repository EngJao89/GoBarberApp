import { 
  Alert, 
  Image, 
  Platform, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import api from "@/lib/axios";
import { BarberSchedulingData } from "@/@types/barberScheduling";
import { Colors } from "@/constants/Colors";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";

export default function  AppointmentDetailsUser(){
  const [loading, setLoading] = useState(true);
  const [barberScheduling, setBarberScheduling] = useState<BarberSchedulingData | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchSchedulingDetails = async () => {
      try {
        const barberSchedulingId = Array.isArray(id) ? id[0] : id;
        
        if (!barberSchedulingId) {
          throw new Error("ID do agendamento não fornecido");
        }

        const response = await api.get(`barber-availability/${barberSchedulingId}`);
        setBarberScheduling(response.data);
      } catch (error) {
        Alert.alert("Erro ao carregar os dados do agendamento");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedulingDetails();
  }, [id]);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (!barberScheduling) {
    return (
      <NotFound />
    );
  }

  const formattedDate = new Date(barberScheduling.dayAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return(
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={32} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{formattedDate}</Text>

        <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile} />
      </View>

      <View style={styles.container}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={24} color={Colors.orange_700} />
          <Text style={styles.detailText}>Data: {formattedDate}</Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={24} color={Colors.orange_700} />
          <Text style={styles.detailText}>Inicia: {barberScheduling.startTime}</Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={24} color={Colors.orange_700} />
          <Text style={styles.detailText}>Inicia: {barberScheduling.endTime}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.alterButton}>
          <Text>Alterar Horários</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.cancelButton}>
          <Text>Cancelar Horários</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_900,
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
  icon: {
    color: Colors.zinc_400,
  },
  profile: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  container: {
    backgroundColor: Colors.zinc_800,
    padding: 24,
    marginHorizontal: 16,
    borderRadius: 8,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    color: Colors.zinc_100,
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: Colors.red_600,
    marginTop: 4,
    marginBottom: 24,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  alterButton: {
    backgroundColor: Colors.orange_600,
    marginTop: 24,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});