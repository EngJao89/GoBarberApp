export interface BarberSchedulingData {
  id: string;
  barberId: string;
  dayAt: string;
  startTime: string;
  endTime: string;
  status?: 'pendente' | 'confirmado' | 'cancelado' | 'finalizado';
}
