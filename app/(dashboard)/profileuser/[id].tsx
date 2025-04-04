import { 
  Alert, 
  Image, 
  Platform, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import api from "@/lib/axios";
import { Colors } from "@/constants/Colors";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  accessToken: string;
}

const registerSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail é obrigatório"),
  phone: z.string().min(13, "O whatsapp deve ter pelo menos 13 caracteres"),
  currentPassword: z.string().min(6, "Senha atual é obrigatória"),
  password: z.string().min(6, "Nova senha é obrigatória"),
  confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;

interface EditProfileProps {
  onSubmit: (data: RegisterSchema) => Promise<void>;
}

export default function ProfileUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const userId = Array.isArray(id) ? id[0] : id;
  const { control, handleSubmit, reset, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`users/${userId}`);
        reset(response.data);
      } catch (error) {
        Alert.alert("Erro ao carregar os dados do perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id, reset]);

  const handleSave = async (data: RegisterSchema) => {
    try {
      await api.put(`users/${userId}`, data);
      Alert.alert("Perfil atualizado com sucesso!");
      router.back();
    } catch (error: any) {
      Alert.alert("Erro ao atualizar o perfil", error.message || "Tente novamente mais tarde.");
    }
  };

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem('authUserToken');

      setUserData(null);

      Alert.alert('Você saiu! Até breve...');
      router.replace("/");
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

      <ScrollView
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
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
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )} 
            />

            <Controller 
              control={control} 
              name="phone" 
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Ionicons name="call-outline" size={16} style={styles.iconInput}/>
                  <TextInput 
                    placeholder='Telefone' 
                    placeholderTextColor={Colors.zinc_500} 
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />

            <Controller 
              control={control} 
              name="email" 
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={16} style={styles.iconInput}/>
                  <TextInput 
                    placeholder='E-mail' 
                    placeholderTextColor={Colors.zinc_500} 
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )} 
            />

            <View style={styles.formContent}>

              <Controller 
                control={control} 
                name="currentPassword" 
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={16} style={styles.iconInput}/>
                    <TextInput 
                      placeholder='Senha atual' 
                      placeholderTextColor={Colors.zinc_500} 
                      style={styles.input}
                    />
                  </View>
                )} 
              />

              <Controller 
                control={control} 
                name="password" 
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={16} style={styles.iconInput}/>
                    <TextInput 
                      placeholder='Nova senha' 
                      placeholderTextColor={Colors.zinc_500} 
                      style={styles.input}
                    />
                  </View>
                )}
              />

              <Controller 
                control={control} 
                name="confirmPassword" 
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={16} style={styles.iconInput}/>
                    <TextInput 
                      placeholder='Confirmar senha' 
                      placeholderTextColor={Colors.zinc_500} 
                      style={styles.input}
                    />
                  </View>
                )}
              />
            </View>

            <TouchableOpacity 
              style={[styles.button, loading && styles.disabledButton]}
              onPress={handleSubmit(handleSave)} 
              disabled={loading}
            >
              <Text>{loading ? 'Carregando...' : 'Confirmar mudanças'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    marginTop: 18,
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
    marginTop: 14,
    marginBottom: 24,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  disabledButton: {
    backgroundColor: Colors.zinc_500,
  },
  errorText: {
    color: Colors.red_600,
    fontSize: 12,
    marginBottom: 8,
  },
});