export interface BarberData {
  id: string;
  name: string;
  email: string;
  phone: string;
  barberShop: string;
}

export interface BarberAvailabilityData {
  id: string;
  barberId: string;
  dayAt: Date | string;
  startTime: string;
  endTime: string;
}