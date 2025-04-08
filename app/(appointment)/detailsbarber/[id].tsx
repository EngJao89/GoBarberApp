import { Alert, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface SchedulingData {
  id: string;
  userId: string;
  barberId: string;
  dayAt: string;
  hourAt: string;
  serviceType: string;
  status: string;
}

export default function  AppointmentDetailsUser(){
  const [loading, setLoading] = useState(true);
  const [scheduling, setScheduling] = useState<SchedulingData | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchSchedulingDetails = async () => {
      try {
        const schedulingId = Array.isArray(id) ? id[0] : id;
        
        if (!schedulingId) {
          throw new Error("ID do agendamento não fornecido");
        }

        const response = await api.get(`scheduling/${schedulingId}`);
        setScheduling(response.data);
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

  if (!scheduling) {
    return (
      <NotFound />
    );
  }

  const formattedDate = new Date(scheduling.dayAt).toLocaleDateString('pt-BR', {
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

        <Text style={styles.headerTitle}>{scheduling.serviceType}</Text>

        <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile} />
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
});