import { useEffect, useState } from "react";
import { 
  Alert, 
  Image, 
  Platform, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/lib/axios";

interface BarberData {
  id: string;
  name: string;
  email: string;
  phone: string;
  barbershop: string;
}

const registerSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail é obrigatório"),
  phone: z.string().min(13, "O whatsapp deve ter pelo menos 13 caracteres"),
  barbershop: z.string().min(8, "Insira um valor válido"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

interface EditProfileProps {
  onSubmit: (data: RegisterSchema) => Promise<void>;
}

export default function ProfileBarber({ onSubmit }: EditProfileProps) {
  const [barberData, setBarberData] = useState<BarberData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const barberId = Array.isArray(id) ? id[0] : id;
  const { control, handleSubmit, reset, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      barbershop: "",
    },
  });

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await api.get(`barbers/${barberId}`);
        reset(response.data);
      } catch (error) {
        Alert.alert("Erro ao carregar os dados do incidente");
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id, reset]);

  const handleSave = async (data: RegisterSchema) => {
    try {
      await api.put(`barbers/${barberId}`, data);
      Alert.alert("Caso atualizado com sucesso!");
      router.back();
    } catch (error) {
      Alert.alert("Erro ao atualizar o caso");
    }
  };

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem('authBarberToken');

      setBarberData(null);

      Alert.alert('Você saiu! Até breve...');
      router.replace("/(auth)/signinbarber/page");
    } catch (error) {
      Alert.alert("Erro ao fazer logout:");
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
      <View style={styles.container}>
        <View style={styles.profileContent}>
          <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
        </View>
        
        <View style={styles.form}>

          <Controller 
            control={control} 
            name="name" 
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={16} style={styles.iconInput}/>
                <TextInput 
                  placeholder='Nome' 
                  placeholderTextColor={Colors.zinc_500} 
                  style={styles.input}
                />
              </View>
            )}
          />

          <Controller 
            control={control} 
            name="email" 
            render={({field: { onChange, value }}) => (
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={16} style={styles.iconInput}/>
                <TextInput 
                  placeholder='E-mail' 
                  placeholderTextColor={Colors.zinc_500} 
                  style={styles.input}
                />
              </View>
            )}
          />


          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={16} style={styles.iconInput}/>
              <TextInput 
                placeholder='Senha atual' 
                placeholderTextColor={Colors.zinc_500} 
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={16} style={styles.iconInput}/>
              <TextInput 
                placeholder='Nova senha' 
                placeholderTextColor={Colors.zinc_500} 
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={16} style={styles.iconInput}/>
              <TextInput 
                placeholder='Confirmar senha' 
                placeholderTextColor={Colors.zinc_500} 
                style={styles.input}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text>Confirmar mudanças</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_800,
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
  container: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 180,
  },
  profileContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginTop: 36,
  },
  formContent:{
    marginTop: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.zinc_950,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  iconInput: {
    color: Colors.zinc_500,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: Colors.zinc_50,
  },
  button: {
    backgroundColor: Colors.orange_600,
    marginTop: 72,
    marginBottom: 24,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});
