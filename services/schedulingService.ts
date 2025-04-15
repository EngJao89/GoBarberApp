import api from "@/lib/axios";

interface SchedulingData {
  id: string;
  userId: string;
  barberId: string;
  dayAt: string;
  hourAt: string;
  serviceType: string;
  status: 'pendente' | 'confirmado' | 'cancelado';
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

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