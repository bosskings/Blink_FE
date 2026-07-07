export interface Notification {
  _id: string;
  id?: string;
  type: string;
  message: string;
  title?: string;
  description?: string;
  read: boolean;
  time?: string;
  date?: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface NotificationsResponse {
  status: string;
  notifications: Notification[];
}

export interface MarkNotificationReadResponse {
  status: string;
  message: string;
}

export interface MarkAllReadResponse {
  status: string;
  message: string;
}
