export type SimulationStatus =
  | 'idle'
  | 'searching'
  | 'requested'
  | 'accepted'
  | 'mechanic_assigned'
  | 'en_route'
  | 'arrived'
  | 'diagnosing'
  | 'repaired'
  | 'completed';

export type Screen =
  | 'Splash'
  | 'Auth'
  | 'Home'
  | 'RegisteredDashboard'
  | 'Searching'
  | 'Problems'
  | 'Garages'
  | 'Tracking'
  | 'Completion'
  | 'Emergency'
  | 'MechanicList'
  | 'MechanicProfile'
  | 'Booking'
  | 'Payment'
  | 'Maintenance'
  | 'Profile';

export interface Vehicle {
  model: string;
  plate: string;
  type: string;
  year: string;
}

export interface DriverProfile {
  name: string;
  phone: string;
  avatar: string;
  vehicle: Vehicle;
}

export interface Garage {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  distance: number;
  eta: string;
  services: string[];
  verified: boolean;
  lat: number;
  lng: number;
}

export interface Mechanic {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  reviews: number;
  distance: number;
  services: string[];
  about: string;
  garageId: string;
  status: 'available' | 'on_duty' | 'offline';
  lat: number;
  lng: number;
}

export interface ChatMessage {
  id: string;
  sender: 'driver' | 'mechanic';
  text: string;
  timestamp: string;
}

export interface EmergencyRequest {
  id: string;
  problemType: string;
  details: string;
  photo: string | null;
  status: SimulationStatus;
  driver: DriverProfile;
  garage: Garage | null;
  mechanic: Mechanic | null;
  timestamp: string;
  notes?: string;
  rating?: number;
  review?: string;
  repairPhoto?: string | null;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface AppState {
  currentScreen: 'Splash' | 'Home' | 'RegisteredDashboard' | 'Searching' | 'Problems' | 'Garages' | 'Tracking' | 'Completion';
  driverRequest: EmergencyRequest | null;
  activeDriver: DriverProfile;
  registeredHistory: EmergencyRequest[];
  garages: Garage[];
  mechanics: Mechanic[];
  chatHistory: ChatMessage[];
  notifications: AppNotification[];
}