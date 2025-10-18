import { 
  Alert,
  Platform, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/lib/axios";
import { Colors } from "@/constants/Colors";

const availabilitySchema = z.object({
  dayAt: z.date({
    required_error: "Selecione uma data",
    invalid_type_error: "Data inválida",
  }).refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate.getTime() >= today.getTime();
  }, {
    message: "Não é possível definir horários em datas passadas"
  }),
  startTime: z.string().min(1, "Selecione um horário de início"),
  endTime: z.string().min(1, "Selecione um horário de fim"),
});

type AvailabilityFormData = z.infer<typeof availabilitySchema>;

export default function AddAvailability() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [barberId, setBarberId] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
  });

  const minimumDate = new Date();
  minimumDate.setHours(0, 0, 0, 0);

  const fetchBarberData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('authBarberToken');
      if (!storedData) {
        Alert.alert('Erro', 'Barbeiro não logado. Faça login novamente.');
        router.replace('/');
        return;
      }

      const response = await api.post('auth-barber/me', {}, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${storedData}` },
      });
      setBarberId(response.data.id);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        router.replace('/');
      } else {
        Alert.alert("Erro", "Não foi possível carregar os dados do barbeiro.");
      }
    }
  };

  useEffect(() => {
    fetchBarberData();
  }, []);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setValue('dayAt', selectedDate);
    }
  };

  const onStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setSelectedStartTime(selectedTime);
      const timeString = selectedTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setValue('startTime', timeString);
    }
  };

  const onEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setSelectedEndTime(selectedTime);
      const timeString = selectedTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setValue('endTime', timeString);
    }
  };

  const onSubmit = async (data: AvailabilityFormData) => {
    try {
      if (!barberId) {
        Alert.alert('Erro', 'Barbeiro não identificado. Faça login novamente.');
        return;
      }

      const availabilityData = {
        barberId,
        dayAt: data.dayAt.toISOString(),
        startTime: data.startTime,
        endTime: data.endTime,
      };

      await api.post('barber-availability', availabilityData);
      
      Alert.alert("Sucesso", "Horário de trabalho adicionado com sucesso!");
      router.back();
    } catch (error: any) {
      console.error('Erro ao adicionar horário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar adicionar o horário.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar Horário</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Data</Text>
          <Controller
            control={control}
            name="dayAt"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.inputText}>
                  {value ? value.toLocaleDateString('pt-BR') : 'Selecione uma data'}
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.dayAt && <Text style={styles.errorText}>{errors.dayAt.message}</Text>}

          <Text style={styles.label}>Horário de Início</Text>
          <Controller
            control={control}
            name="startTime"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text style={styles.inputText}>
                  {value || 'Selecione um horário de início'}
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.startTime && <Text style={styles.errorText}>{errors.startTime.message}</Text>}

          <Text style={styles.label}>Horário de Fim</Text>
          <Controller
            control={control}
            name="endTime"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Text style={styles.inputText}>
                  {value || 'Selecione um horário de fim'}
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.endTime && <Text style={styles.errorText}>{errors.endTime.message}</Text>}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Adicionar Horário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          minimumDate={minimumDate}
          onChange={onDateChange}
        />
      )}

      {showStartTimePicker && (
        <DateTimePicker
          value={selectedStartTime}
          mode="time"
          display="default"
          onChange={onStartTimeChange}
        />
      )}

      {showEndTimePicker && (
        <DateTimePicker
          value={selectedEndTime}
          mode="time"
          display="default"
          onChange={onEndTimeChange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_900,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 44 : 0,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.zinc_700,
  },
  backButton: {
    color: Colors.orange_600,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: Colors.zinc_100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    gap: 16,
  },
  label: {
    color: Colors.zinc_200,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.zinc_700,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.zinc_600,
  },
  inputText: {
    color: Colors.zinc_200,
    fontSize: 16,
  },
  errorText: {
    color: Colors.red_600,
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: Colors.orange_600,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: Colors.zinc_100,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
