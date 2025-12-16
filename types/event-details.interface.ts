// Host Interface
export interface IHost {
  id: string;
  name: string;
  image: string;
  location: string;
  bio: string;
}

// Participant (basic – প্রয়োজন অনুযায়ী extend করতে পারো)
export interface IParticipant {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string; // or Date
}

// Review (future-proof)
export interface IReview {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
  eventId: string;
  createdAt: string; // or Date
}

// Payment
export interface IPayment {
  id: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  userId: string;
  eventId: string;
  createdAt: string; // or Date
}

// Main Event Interface
export interface IEvent {
  id: string;
  name: string;
  type: "Sports" | "Music" | "Tech" | "Art" | string;
  description: string;
  location: string;
  image: string;

  date: string; // ISO Date string (2025-12-17T16:00:00.000Z)
  time: string; // "22:00"

  minParticipants: number;
  maxParticipants: number;
  participantCount: number;
  isPaid?:boolean

  fee: number | string;
  status: "OPEN" | "CLOSED" | "CANCELLED" | string;

  createdAt: string; // or Date

  hostId: string;
  host: IHost;

  participants: IParticipant[];
  reviews: IReview[];
  payments: IPayment[];
}


