import { 
  Alert, 
  Image, 
  Platform, 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BarberData } from "@/@types/barber";
import { Colors } from "@/constants/Colors";
import { FormProfileBarber } from "@/components/FormProfileBarber";

export default function ProfileBarber() {
  const [barberData, setBarberData] = useState<BarberData | null>(null);

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem('authBarberToken');
      setBarberData(null);
      Alert.alert('Você saiu! Até breve...');
      router.replace("/(auth)/signinbarber/page");
    } catch (error: any) {
      Alert.alert("Erro ao fazer logout:", error.message);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={32} style={styles.icon}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Ionicons name="power-outline" size={32} style={styles.icon}/>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.profileContent}>
            <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
          </View>

          <FormProfileBarber />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
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
    width: 186,
    height: 186,
    borderRadius: 88,
  },
  profileContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_800,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
