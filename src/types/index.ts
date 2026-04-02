import { Category, Role, OrderStatus, RequestStatus } from "./prisma";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDesc: string;
  category: Category;
  price: number;
  originalPrice?: number;
  images: string[];
  demoUrl?: string;
  videoUrl?: string;
  features: string[];
  techStack: string[];
  whatYouGet: string[];
  accessLink: string;
  isFeatured: boolean;
  isActive: boolean;
  rating: number;
  totalSales: number;
  createdAt: Date;
};

export type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  paymentId?: string;
  paymentMethod?: string;
  invoiceUrl?: string;
  createdAt: Date;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
