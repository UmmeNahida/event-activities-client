export interface EventDetailsResponse {
  success: boolean;
  message: string;
  data: EventDetails;
}

export interface EventDetails {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  image: string;
  date: string;
  time: string;
  minParticipants: number;
  maxParticipants: number;
  participantCount: number;
  fee: number;
  status: "OPEN" | "CLOSED" | "COMPLETED";
  createdAt: string;
  hostId: string;
  host: Host;
  participants: Participant[];
  reviews: Review[];
  payments: Payment[];
}

export interface Host {
  id: string;
  name: string;
  image: string;
  location: string;
  bio: string;
}

export interface Participant {
  id: string;
  userId: string;
  eventId: string;
  paid: boolean;
  joinedAt: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  image: string;
  location: string;
  hobbies: string[];
  interests: string[];
}

export interface Review {
  id?: string;
  rating?: number;
  comment?: string;
}

export interface Payment {
  status: "PENDING" | "PAID" | "FAILED";
  amount: number;
}
