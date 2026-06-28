"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CartDrawer({ isOpen, setIsOpen }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-[60] bg-[#172026]/45 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white/92 shadow-2xl backdrop-blur-xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--surface-soft)]/70 p-6">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-[var(--brand)]" />
            <h2 className="text-xl font-bold text-[var(--foreground)]">Tu Carrito</h2>
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-[var(--brand)] shadow-sm">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-[var(--ink-muted)] transition-colors hover:bg-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-soft)] text-[var(--brand)]">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[var(--foreground)]">Tu carrito está vacío</p>
                <p className="text-sm text-[var(--ink-muted)]">¡Empieza a explorar nuestros productos!</p>
              </div>
              <Link 
                href="/"
                onClick={() => setIsOpen(false)}
                className="mt-4 rounded-full bg-[var(--accent)] px-6 py-2 font-semibold text-white transition-colors hover:bg-[var(--accent-strong)]"
              >
                Ir a la tienda
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="group flex gap-4 rounded-2xl border border-[var(--line)] bg-white/75 p-3 shadow-sm">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-medium text-[var(--ink-muted)]">
                      Sin imagen
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between">
                    <h3 className="truncate pr-2 text-sm font-bold text-[var(--foreground)]">
                      {item.name}
                    </h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[var(--ink-muted)] transition-colors hover:text-[var(--accent-strong)]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                    S/ {item.price.toFixed(2)}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-[var(--line)] bg-[var(--surface-soft)]/70 px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 transition-colors hover:text-[var(--brand)]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm font-bold text-[var(--foreground)]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 transition-colors hover:text-[var(--brand)]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-[var(--foreground)]">
                      S/ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="space-y-4 border-t border-[var(--line)] bg-[var(--surface-soft)]/55 p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[var(--ink-muted)]">
                <span>Subtotal</span>
                <span>S/ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--ink-muted)]">
                <span>Envío</span>
                <span className="font-semibold text-[var(--brand)]">Gratis</span>
              </div>
              <div className="flex justify-between pt-2 text-xl font-black text-[var(--foreground)]">
                <span>Total</span>
                <span>S/ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full rounded-[1.5rem] bg-[var(--accent)] py-4 text-lg font-bold text-white shadow-lg shadow-orange-200/80 transition-all hover:bg-[var(--accent-strong)] active:scale-[0.98]">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  );
}
