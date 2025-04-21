export interface SchedulingData {
  id: string;
  userId: string;
  barberId: string;
  dayAt: Date;
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

export interface CardProps {
  scheduling: SchedulingData;
}
