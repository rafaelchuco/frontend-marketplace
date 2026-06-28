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
      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-200/80 transition-all hover:bg-[var(--accent-strong)] active:scale-95"
    >
      <ShoppingCart className="h-5 w-5" />
      Añadir al carrito
    </button>
  );
}
