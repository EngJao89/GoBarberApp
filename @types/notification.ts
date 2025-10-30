export interface NotificationCardProps {
  id: string;
  date: string;
  time: string;
  serviceType: string;
  clientName: string;
  avatarUrl?: string;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  status?: string;
  onFinish?: (id: string) => void;
  canFinish?: boolean;
}