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
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import api from "@/lib/axios";
import { Scheduling } from "@/@types/scheduling";
import { BarberData } from "@/@types/barber";
import { FormData } from "@/@types/form";
import { Colors } from "@/constants/Colors";

const registerSchema = z.object({
  barberId: z.string().min(1, "Selecione um barbeiro"),
  dayAt: z.date({
    required_error: "Selecione uma data",
    invalid_type_error: "Data inválida",
  }),
  hourAt: z.string().min(1, "Selecione um horário"),
  serviceType: z.string().min(3, "Descreva o serviço (mín. 3 caracteres)"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export default function Appointment() {
  const { 
    control, 
    handleSubmit, 
    setValue, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      barberId: "",
      dayAt: new Date(),
      hourAt: "",
      serviceType: "",
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [barbers, setBarbers] = useState<BarberData[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const minimumDate = new Date(2020, 0, 1);

  const morningHours = ['09:00', '10:00', '11:00', '12:00'];
  const afternoonHours = ['13:00', '14:00', '15:00', '16:00', '17:00'];
  const eveningHours = ['18:00', '19:00', '20:00'];

  const userId = "11838564-fe2f-48c2-8b03-dce0890b3a19";

  const fetchBarbers = async () => {
    try {
      const response = await api.get('barbers/');
      setBarbers(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a lista de barbeiros.');
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const [hours, minutes] = data.hourAt.split(':');
      const dayAt = new Date(data.dayAt);
      dayAt.setHours(parseInt(hours), parseInt(minutes));

      const schedulingData: Omit<Scheduling, 'id'> = {
        userId,
        barberId: data.barberId,
        dayAt: dayAt.toISOString(),
        hourAt: data.hourAt,
        serviceType: data.serviceType,
        status: "pendente",
      };

      const response = await api.post<Scheduling>('scheduling/', schedulingData);

      if (response.data) {
        router.push('/(appointment)/successschedule/page');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar agendar.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={32} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Agendamento</Text>

        <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile} />
      </View>

      <View style={styles.container}>
        <View>
          <ScrollView 
            contentContainerStyle={{ paddingHorizontal: 24 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {barbers.map((barber) => (
              <TouchableOpacity 
                key={barber.id}
                style={[
                  styles.barberButton,
                  selectedBarber === barber.id && styles.selectedButton
                ]}
                onPress={() => {
                  setValue('barberId', barber.id);
                  setSelectedBarber(barber.id);
                }}
              >
                <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.barberFoto} />
                <Text style={styles.barberText}>{barber.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.title}>Escolha a data</Text>

          <Controller
            control={control}
            name="dayAt"
            render={({ field: { value } }) => (
              <TouchableOpacity activeOpacity={0.5} onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                <Text style={styles.dateText}>
                  {value.toLocaleDateString('pt-BR')}
                </Text>
              </TouchableOpacity>
            )}
          />

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              is24Hour={true}
              display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
              value={selectedDate}
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setSelectedDate(date);
                  setValue('dayAt', date);
                }
              }}
              minimumDate={minimumDate}
            />
          )}
        </View>

        <View style={styles.schedule}>
          <View style={styles.section}>
            <Text style={styles.title}>Escolha o Horário</Text>

            <View style={styles.sectionLabel}>
              <Text style={styles.labelText}>Manhã</Text>
            </View>
            <ScrollView 
              contentContainerStyle={{ paddingHorizontal: 24 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Controller
                control={control}
                name="hourAt"
                render={({ field: { onChange, value } }) => (
                  <>
                    {morningHours.map((time, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.sectionButton, value === time && styles.selectedButton]}
                        onPress={() => onChange(time)}
                      >
                        <Text style={styles.buttonText}>{time}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              />
            </ScrollView>

            <View style={styles.sectionLabel}>
              <Text style={styles.labelText}>Tarde</Text>
            </View>
            <ScrollView 
              contentContainerStyle={{ paddingHorizontal: 24 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Controller
                control={control}
                name="hourAt"
                render={({ field: { onChange, value } }) => (
                  <>
                    {afternoonHours.map((time, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.sectionButton, value === time && styles.selectedButton]}
                        onPress={() => onChange(time)}
                      >
                        <Text style={styles.buttonText}>{time}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              />
            </ScrollView>

            <View style={styles.sectionLabel}>
              <Text style={styles.labelText}>Noite</Text>
            </View>
            <ScrollView 
              contentContainerStyle={{ paddingHorizontal: 24 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Controller
                control={control}
                name="hourAt"
                render={({ field: { onChange, value } }) => (
                  <>
                    {eveningHours.map((time, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.sectionButton, value === time && styles.selectedButton]}
                        onPress={() => onChange(time)}
                      >
                        <Text style={styles.buttonText}>{time}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              />
            </ScrollView>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="serviceType"
                render={({ field: { onChange, value } }) => (
                  <TextInput 
                    placeholder='Qual serviço deseja?' 
                    placeholderTextColor={Colors.zinc_500} 
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={handleSubmit(onSubmit)} 
              style={styles.scheduleButton}
            >
              <Text>Agendar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  },
  headerTitle: {
    color: Colors.zinc_100,
    fontSize: 28,
    fontWeight: 'bold',
  },
  barberButton: {
    backgroundColor: Colors.zinc_700,
    padding: 12,
    marginRight: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barberFoto: {
    width: 36,
    height: 36,
    borderRadius: 32,
    marginRight: 12,
  },
  barberText: {
    color: Colors.zinc_100,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  icon: {
    color: Colors.zinc_400,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.zinc_950,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.zinc_100,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 4,
  },
  input: {
    flex: 1,
    color: Colors.zinc_50,
  },
  profile: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  title: {
    color: Colors.zinc_100,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  dateButton: {
    backgroundColor: Colors.zinc_700,
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  dateText: {
    color: Colors.zinc_100,
    fontSize: 16,
  },
  schedule: {
    paddingTop: 52,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 16,
    marginBottom: 10,
  },
  labelText: {
    color: Colors.zinc_400,
  },
  sectionButton: {
    backgroundColor: Colors.zinc_700,
    padding: 12,
    marginRight: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.zinc_100,
  },
  selectedButton: {
    backgroundColor: Colors.orange_600, 
  },
  scheduleButton: {
    backgroundColor: Colors.orange_600,
    marginTop: 44,
    marginBottom: 8,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});
