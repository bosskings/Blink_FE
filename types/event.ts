export interface Event {
  _id: string;
  communityId?: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  category: string;
  community?: string;
  image?: string;
  images?: string[];
  videos?: string[];
  createdBy?: {
    _id: string;
    firstName: string;
  };
  createdAt: string;
}

export interface FetchEventsResponse {
  status: string;
  events: Event[];
}

export interface FetchEventResponse {
  status: string;
  event: Event;
}

export interface CreateEventRequest {
  communityId: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
  images?: string[];
  videos?: string[];
}

export interface CreateEventResponse {
  status: string;
  event: Event;
}
