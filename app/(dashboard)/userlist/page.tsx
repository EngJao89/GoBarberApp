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
import { Colors } from "@/constants/Colors";
import { CardUser } from "@/components/CardUser";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface SchedulingData {
  id: string;
  barberId: string;
  userId: string
  dayAt: Date | string;
  hourAt: string;
  serviceType: string;
  status: string;
}

export default function UserList() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [schedulingData, setSchedulingData] = useState<SchedulingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchScheduling = useCallback(async () => {
    try {
      const response = await api.get<SchedulingData[]>('scheduling');

      const dataWithDates = response.data.map(item => ({
        ...item,
        dayAt: typeof item.dayAt === 'string' ? new Date(item.dayAt) : item.dayAt,
      }));

      const sortedData = dataWithDates.sort((a, b) => a.dayAt.getTime() - b.dayAt.getTime());
      setSchedulingData(sortedData);
    } catch (error: any) {
      Alert.alert("Erro ao carregar os casos.");
    }
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const storedData = await AsyncStorage.getItem('authUserToken');

        if (storedData) {
          const response = await api.post(
            'auth-user/me',
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedData}`,
              },
            }
          );

          setUserData(response.data);
        } else {
          Alert.alert("Nenhum token encontrado. Tente Novamente");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do barbeiro.");
      }
    }

    async function fetchData() {
      await fetchUserData();
      await fetchScheduling();
      setIsLoading(false);
    }

    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchScheduling();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const filteredData = schedulingData.filter((availability) => availability.userId === userData?.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeTitle}>Bem Vindo,</Text>

          <TouchableOpacity onPress={() => router.push('/(dashboard)/profileuser/page')}>
            <Text style={styles.nameTitle}>{userData ? userData.name : "Carregando..."}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(dashboard)/profileuser/page')}>
          <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.listTitle}>Cabelereiros</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredData.length > 0 ? (
            filteredData.map((availability) => (
              <CardUser key={availability.id} scheduling={availability} />
            ))
          ) : (
            <Text style={styles.noDataText}>Nenhum agendamento encontrado.</Text>
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
  noDataText: {
    color: Colors.zinc_100,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.zinc_900,
  },
  loadingText: {
    color: Colors.zinc_100,
    fontSize: 18,
  },
});