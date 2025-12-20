// Host info
export interface IHost {
  id: string;
  name: string;
  image: string;
}

// Event info
export interface IEventType {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  image: string;
  date: string; // ISO date string
  time: string; // "22:00"
  minParticipants: number;
  maxParticipants: number;
  participantCount: number;
  fee: number;
  status: "OPEN" | "COMPLETED" | "CANCELLED" | "PENDING" | "CLOSED";
  createdAt: string;
  hostId: string;
  host: IHost;
}

// Joined Event (participant data)
export interface IJoinedEvent {
  id: string;
  userId: string;
  eventId: string;
  paid: boolean;
  joinedAt: string;
  event: IEventType;
}

// API response
export interface IJoinedEventResponse {
  meta: {page:number,limit:number, total:number}
  data: IJoinedEvent[];
}
