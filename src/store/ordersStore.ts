import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'completed' | 'processing' | 'pending' | 'cancelled';
  items: OrderItem[];
  paymentMethod: 'card' | 'qr';
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [
        {
          id: "NEX-8293-1928",
          date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
          total: 299,
          status: 'completed',
          paymentMethod: 'card',
          items: [
            {
              id: "1",
              name: "SaaS Starter Kit",
              price: 149,
              category: "SaaS Tool",
              image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
            },
            {
              id: "2",
              name: "GPT-4 Financial Advisor",
              price: 150,
              category: "AI Model",
              image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
            }
          ]
        },
        {
          id: "NEX-1029-4829",
          date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
          total: 89,
          status: 'completed',
          paymentMethod: 'qr',
          items: [
            {
              id: "3",
              name: "Crypto Tracker App",
              price: 89,
              category: "Mobile App",
              image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"
            }
          ]
        }
      ],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      getOrderById: (id) => get().orders.find(o => o.id === id),
    }),
    {
      name: 'nexastore-orders',
    }
  )
);
