import { create } from 'zustand';
import { User, Vehicle, RentalRequest, Comment } from '../types';

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: User | null;
  vehicles: Vehicle[];
  rentalRequests: RentalRequest[];
  comments: Comment[];
  users: User[];
  login: (email: string, password: string) => User | null;
  logout: () => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (vehicle: Vehicle) => void;
  addRentalRequest: (request: Omit<RentalRequest, 'id' | 'status'>) => void;
  updateRentalRequest: (requestId: string, status: 'approved' | 'rejected') => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
}

// Mock initial data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer',
    name: 'John Doe'
  }
];

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Tesla Model 3',
    type: 'Electric',
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80',
    pricePerDay: 150,
    available: true,
    description: 'Luxury electric vehicle with autopilot features'
  }
];

export const useStore = create<AppState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  currentUser: null,
  vehicles: mockVehicles,
  rentalRequests: [],
  comments: [],
  users: mockUsers,

  login: (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      set({ currentUser: user });
      return user;
    }
    return null;
  },

  logout: () => set({ currentUser: null }),

  addVehicle: (vehicle) => set((state) => ({
    vehicles: [...state.vehicles, { ...vehicle, id: Date.now().toString() }]
  })),

  updateVehicle: (vehicle) => set((state) => ({
    vehicles: state.vehicles.map(v => v.id === vehicle.id ? vehicle : v)
  })),

  addRentalRequest: (request) => set((state) => ({
    rentalRequests: [...state.rentalRequests, {
      ...request,
      id: Date.now().toString(),
      status: 'pending'
    }]
  })),

  updateRentalRequest: (requestId, status) => set((state) => ({
    rentalRequests: state.rentalRequests.map(r =>
      r.id === requestId ? { ...r, status } : r
    )
  })),

  addComment: (comment) => set((state) => ({
    comments: [...state.comments, {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }]
  }))
}));