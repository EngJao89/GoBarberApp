import { 
  Alert, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { z } from "zod";

import { Colors } from "@/constants/Colors";
import api from "@/lib/axios";

const loginSchema = z.object({
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export function FormSignInBarber() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authBarberToken');
      if (token) {
        router.replace('/(dashboard)/barberlist/page');
      }
    };
    checkToken();
  }, []);

  const onSubmit = async (data: LoginSchema) => {
    try {
      if (!data.email || !data.password) {
        Alert.alert('Por favor, forneça o e-mail e a senha.');
        return;
      }

      const response = await api.post('auth-barber/login', data, { withCredentials: true });

      if (response.data.accessToken) {
        await AsyncStorage.setItem('authBarberToken', response.data.accessToken);
        Alert.alert(`Usuário Logado: ${data.email}, Seja Bem vindo!`);
        router.push("/(dashboard)/barberlist/page");
      } else {
        Alert.alert('Token não encontrado na resposta.');
      }
    } catch (error) {
      Alert.alert('Login falhou. Verifique suas credenciais.');
    }
  };

  return(
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={16} style={styles.icon}/>
        <TextInput 
          placeholder='E-mail' 
          placeholderTextColor={Colors.zinc_500} 
          onChangeText={(text) => setValue('email', text)} 
          value={watch("email")}  
          style={styles.input} 
        />
      </View>
      

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={16} style={styles.icon}/>
        <TextInput 
          placeholder='Senha' 
          placeholderTextColor={Colors.zinc_500} 
          secureTextEntry
          onChangeText={(text) => setValue('password', text)} 
          value={watch("password")} 
          style={styles.input}
        />
      </View>

      <TouchableOpacity 
        activeOpacity={0.5} 
        onPress={handleSubmit(onSubmit)} 
        style={styles.button}
      >
        <Text>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.5} style={styles.forgot}>
        <Text style={styles.textGhost}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.orange_600,
    marginTop: 16,
    marginBottom: 8,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  forgot: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
  },
  form: {
    width: "100%", 
    padding: 24,
  },
  icon: {
    color: Colors.zinc_500,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: Colors.zinc_50,
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
  textGhost: {
    color: Colors.zinc_50,
    fontWeight: "bold",
  },
});
