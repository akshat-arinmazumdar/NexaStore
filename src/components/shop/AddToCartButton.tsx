"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore";

export default function AddToCartButton({
  product,
}: {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}) {
  const { addItem } = useCartStore();

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-indigo-600/30"
    >
      Add to Cart
    </button>
  );
}

