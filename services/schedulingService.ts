import { SchedulingData } from "@/@types/scheduling";
import api from "@/lib/axios";

export const fetchPendingSchedulings = async (barberId: string): Promise<SchedulingData[]> => {
  try {
    const response = await api.get(`scheduling/`, {
      params: {
        barberId,
        status: 'pendente'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSchedulingStatus = async (id: string, status: 'confirmado' | 'cancelado') => {
  try {
    const response = await api.patch(`scheduling/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};
