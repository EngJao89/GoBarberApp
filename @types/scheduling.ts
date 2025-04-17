export interface SchedulingData {
  id: string;
  barberId: string;
  userId: string;
  dayAt: Date | string;
  hourAt: string;
  serviceType: string;
  status: string;
}

export interface CardProps {
  scheduling: SchedulingData;
}
