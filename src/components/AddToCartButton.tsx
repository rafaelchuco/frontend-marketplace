"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95"
    >
      <ShoppingCart className="h-5 w-5" />
      Añadir al carrito
    </button>
  );
}
