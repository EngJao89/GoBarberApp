import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { z } from "zod";

import api from "@/lib/axios";
import { Colors } from "@/constants/Colors";

const registerSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail é obrigatório"),
  phone: z.string().min(13, "O whatsapp deve ter pelo menos 13 caracteres"),
  barbershop: z.string().min(8, "Insira um valor válido"),
  currentPassword: z.string().min(6, "Senha atual é obrigatória"),
  newPassword: z.string().min(6, "Nova senha é obrigatória"),
  confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export function FormProfileBarber() {
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
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });
  
    useEffect(() => {
      const fetchIncident = async () => {
        try {
          const response = await api.get(`barbers/${barberId}`);
          reset(response.data);
        } catch (error) {
          Alert.alert("Erro ao carregar os dados do perfil");
        } finally {
          setLoading(false);
        }
      };
  
      fetchIncident();
    }, [id, reset]);
  
    const handleSave = async (data: RegisterSchema) => {
      try {
        await api.put(`barbers/${barberId}`, data);
        Alert.alert("Perfil atualizado com sucesso!");
        router.back();
      } catch (error: any) {
        Alert.alert("Erro ao atualizar o perfil", error.message || "Tente novamente mais tarde.");
      }
    };
  

  return(
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
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

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
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

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
      {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

      <Controller 
        control={control} 
        name="barbershop" 
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Ionicons name="business-outline" size={16} style={styles.iconInput}/>
            <TextInput 
              placeholder='Barbearia' 
              placeholderTextColor={Colors.zinc_500} 
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          </View>
        )}
      />
      {errors.barbershop && <Text style={styles.errorText}>{errors.barbershop.message}</Text>}

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
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            </View>
          )}
        />
        {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword.message}</Text>}

        <Controller 
          control={control} 
          name="newPassword" 
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={16} style={styles.iconInput}/>
              <TextInput 
                placeholder='Nova senha' 
                placeholderTextColor={Colors.zinc_500} 
                style={styles.input}
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            </View>
          )}
        />
        {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword.message}</Text>}

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
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            </View>
          )}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

        <TouchableOpacity 
          style={[styles.button, loading && styles.disabledButton]} 
          onPress={handleSubmit(handleSave)} 
          disabled={loading}
        >
          <Text>{loading ? 'Carregando...' : 'Confirmar mudanças'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.orange_600,
    marginTop: 20,
    marginBottom: 24,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: Colors.zinc_500,
  },
  errorText: {
    color: Colors.red_600,
    fontSize: 12,
    marginBottom: 8,
  },
  form: {
    marginTop: 24,
  },
  formContent: {
    marginTop: 24,
  },
  iconInput: {
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
});
