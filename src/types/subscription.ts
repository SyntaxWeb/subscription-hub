export interface System {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string;
  apiEndpoint?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  systemId: string;
  planId: string;
  planName: string;
  status: 'active' | 'inactive' | 'pending' | 'cancelled' | 'expired';
  startDate: Date;
  expirationDate: Date;
  autoRenew: boolean;
  price: number;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subscriptions: Subscription[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  systemId: string;
  price: number;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  features: string[];
  isActive: boolean;
}

export interface Notification {
  id: string;
  type: 'renewal' | 'expiration' | 'inactivity' | 'system';
  title: string;
  message: string;
  customerId?: string;
  systemId?: string;
  read: boolean;
  createdAt: Date;
}

export interface DashboardStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  inactiveSubscriptions: number;
  totalRevenue: number;
  monthlyRecurring: number;
  expiringThisMonth: number;
}
