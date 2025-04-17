import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Colors } from "@/constants/Colors";
import api from "@/lib/axios";
import { router } from "expo-router";
import axios from "axios";

const registerSchema = z.object({
  name: z.string().min(3, "Nome de usuário é obrigatório"),
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  phone: z.string().min(13, "O telefone deve ter pelo menos 13 caracteres"),
  barbershop: z.string().min(6,"Barbearia é obrigatório"), 
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export function FormRegisterBarber() {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await api.post('barbers', {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        barbershop: data.barbershop,
      });

      if(response.status === 200 || response.status === 201){
        Alert.alert('Usuário criado com sucesso')
        router.push("/(auth)/successbarber/page");
      }
    } catch (error: any) {
      Alert.alert('Error:' +(error));

      if (axios.isAxiosError(error)) {
        if (error.response) {
          Alert.alert(
            'O registro falhou: ' + (error.response.data.message || 
            'Por favor, verifique suas informações e tente novamente.')
          );
        } else if (error.request) {
          Alert.alert('Falha no registro: Nenhuma resposta do servidor.');
        } else {
          Alert.alert('O registro falhou: ' + error.message);
        }
      } else {
        Alert.alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <View style={styles.form}>
      <Controller 
        control={control} 
        name="name" 
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={16} style={styles.icon}/>
            <TextInput 
              placeholder='Nome' 
              placeholderTextColor={Colors.zinc_500} 
              value={value} 
              onChangeText={onChange} 
              style={styles.input}
            />
          </View>
        )}
      />

      <Controller 
        control={control} 
        name="email" 
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={16} style={styles.icon}/>
            <TextInput 
              placeholder='E-mail' 
              placeholderTextColor={Colors.zinc_500} 
              value={value} 
              onChangeText={onChange} 
              style={styles.input}
            />
          </View>
        )}
      />

      <Controller 
        control={control} 
        name="phone" 
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={16} style={styles.icon}/>
            <TextInput 
              placeholder='Telefone' 
              placeholderTextColor={Colors.zinc_500} 
              value={value} 
              onChangeText={onChange} 
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
            <Ionicons name="lock-closed-outline" size={16} style={styles.icon}/>
            <TextInput 
              placeholder='Senha' 
              placeholderTextColor={Colors.zinc_500} 
              value={value} 
              onChangeText={onChange} 
              style={styles.input}
            />
          </View>
        )} 
      />

      <Controller 
        control={control} 
        name="barbershop" 
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Ionicons name="pin-outline" size={16} style={styles.icon}/>
            <TextInput 
              placeholder='Barbearia' 
              placeholderTextColor={Colors.zinc_500} 
              value={value} 
              onChangeText={onChange} 
              style={styles.input}
            />
          </View>
        )} 
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgot} onPress={() => router.push('/')}>
        <Ionicons name="enter-outline" size={16} style={styles.forgotIcon}/>
        <Text style={styles.textForgot}>Ir para área de usuários</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    width: "100%", 
    padding: 24,
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
  icon: {
    color: Colors.zinc_500,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: Colors.zinc_50,
  },
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
  forgotIcon: {
    color: Colors.zinc_50,
    marginRight: 8,
  },
  textForgot: {
    color: Colors.zinc_50,
    fontWeight: "bold",
  },
});
