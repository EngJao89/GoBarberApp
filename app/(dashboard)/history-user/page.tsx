import { 
  Image, 
  Platform, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "@/constants/Colors";
import api from "@/lib/axios";
import { UserData } from "@/@types/user";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";

export default function HistoryUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const storedData = await AsyncStorage.getItem('authUserToken');
        if (storedData) {
          const response = await api.post('auth-user/me', {}, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedData}`,
            },
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!userData) {
    return <NotFound />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.zinc_400} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.welcomeTitle}>{userData.name}</Text>

          <TouchableOpacity onPress={() => router.push(`/(dashboard)/profileuser/${userData.id}`)}>
            <Text 
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.nameTitle}
            >
              Histórico
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push(`/(dashboard)/profileuser/${userData.id}`)}>
          <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
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
  profile: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
});
