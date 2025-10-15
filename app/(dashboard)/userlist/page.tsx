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
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "@/lib/axios";
import { SchedulingData } from "@/@types/scheduling";
import { UserData } from "@/@types/user";

import { Colors } from "@/constants/Colors";
import { CardUser } from "@/components/CardUser";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";

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

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const sortedData = dataWithDates.sort((a, b) => a.dayAt.getTime() - b.dayAt.getTime());
      setSchedulingData(sortedData);
    } catch (error: any) {
      Alert.alert("Erro ao carregar os agendamentos.");
    }
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authUserToken');
    router.replace('/');
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const storedData = await AsyncStorage.getItem('authUserToken');

        if (!storedData) {
          handleLogout();
          return;
        }

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
      } catch (error: any) {
        if (error.response?.status === 401) {
          handleLogout();
        } else {
          Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
        }
      }
    }

    async function fetchData() {
      setIsLoading(true);
      try {
        await fetchUserData();
        await fetchScheduling();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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
      <Loading />
    );
  }

  if (!userData || !schedulingData) {
    return (<NotFound />);
  }

  const filteredData = schedulingData.filter((availability) => availability.userId === userData?.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeTitle}>Bem Vindo,</Text>

          <TouchableOpacity onPress={() => router.push(`/(dashboard)/profileuser/${userData.id}`)}>
            <Text 
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.nameTitle}
            >
              {userData ? userData.name : "Carregando..."}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push(`/(dashboard)/profileuser/${userData.id}`)}>
          <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.navTitle}>
          <Text style={styles.listTitle}>Cabelereiros</Text>

          <TouchableOpacity onPress={() => router.push("/(appointment)/new/page")}>
            <Ionicons name="reader-sharp" size={28} style={styles.icon}/>
          </TouchableOpacity>
        </View>
        

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
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  welcomeTitle: {
    color: Colors.zinc_500,
    fontSize: 20,
    fontWeight: '400',
  },
  nameTitle: {
    color: Colors.orange_600,
    fontSize: 28,
    fontWeight: 'bold',
    flexShrink: 1,
    maxWidth: '80%',
    overflow: 'hidden',
  },
  icon: {
    color: Colors.zinc_400,
    marginRight: 24,
  },
  listTitle: {
    color: Colors.zinc_100,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 36,
    marginLeft: 24,
  },
  navTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
