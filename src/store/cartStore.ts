import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export type CartItemInput = Omit<CartItem, "quantity">;

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItemInput) => boolean;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);

        // FIX 1 — Each product can only be added once
        if (existing) {
          toast.error("Already in cart!");
          return false;
        }

        set({
          items: [...get().items, { ...item, quantity: 1 }],
        });
        toast.success("Added to cart!");
        return true;
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
        toast.success("Removed from cart");
      },
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce(
          (acc, item) => acc + item.price,
          0
        ),
    }),
    {
      name: "nexastore-cart",
    }
  )
);
