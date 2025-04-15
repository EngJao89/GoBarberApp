import api from "@/lib/axios";

export const acceptAppointment = async (appointmentId: string) => {
  try {
    const response = await api.patch(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectAppointment = async (appointmentId: string) => {
  try {
    const response = await api.patch(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};