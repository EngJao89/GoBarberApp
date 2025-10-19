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
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Colors } from "@/constants/Colors";
import { z } from "zod";
import api from "@/lib/axios";

const loginSchema = z.object({
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export function FormSignInUser() {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });
  
    useEffect(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem('authUserToken');
        if (token) {
          router.replace('/(dashboard)/userlist/page');
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

      const response = await api.post('auth-user/login', data, { withCredentials: true });

      if (response.data.accessToken) {
        await AsyncStorage.setItem('authUserToken', response.data.accessToken);
        Alert.alert(`Usuário Logado: ${data.email}, Seja Bem vindo!`);
        router.push("/(dashboard)/userlist/page");
      } else {
        Alert.alert('Token não encontrado na resposta.');
      }
    } catch (error: any) {
      console.error('Erro no login:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        Alert.alert('Erro de Login', 'Email ou senha incorretos. Verifique suas credenciais.');
      } else if (error.response?.status === 400) {
        Alert.alert('Erro de Validação', error.response.data.message || 'Dados inválidos.');
      } else {
        Alert.alert('Erro de Conexão', 'Não foi possível conectar com o servidor. Tente novamente.');
      }
    }
  };

  return(
    <View style={styles.form}>
      <View>
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
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      </View>

      <View>
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
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
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

      <TouchableOpacity onPress={() => router.push('/(auth)/signinbarber/page')} style={styles.forgot}>
        <Ionicons name="enter-outline" size={16} style={styles.forgotIcon}/>
        <Text style={styles.textForgot}>
          Ir para área de barbeiros
        </Text>
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
  error: {
    color: Colors.red_600,
    fontSize: 12,
    marginTop: 4,
  },
  forgot: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
  },
  forgotIcon: {
    color: Colors.zinc_50,
    marginRight: 8,
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
  textForgot: {
    color: Colors.zinc_50,
    fontWeight: "bold",
  },
  textGhost: {
    color: Colors.zinc_50,
    fontWeight: "bold",
  },
});