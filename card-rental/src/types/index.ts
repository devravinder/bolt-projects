export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  name: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  image: string;
  pricePerDay: number;
  available: boolean;
  description: string;
}

export interface RentalRequest {
  id: string;
  vehicleId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  totalPrice: number;
}

export interface Comment {
  id: string;
  vehicleId: string;
  userId: string;
  text: string;
  createdAt: string;
}