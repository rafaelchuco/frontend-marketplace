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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white/80 backdrop-blur-xl z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Tu Carrito</h2>
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500">¡Empieza a explorar nuestros productos!</p>
              </div>
              <Link 
                href="/"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
              >
                Ir a la tienda
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-medium text-gray-400">
                      Sin imagen
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-bold text-gray-900 truncate pr-2">
                      {item.name}
                    </h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-indigo-600 font-medium mt-1">
                    S/ {item.price.toFixed(2)}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 bg-white/50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-indigo-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm font-bold text-gray-700">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-indigo-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
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
          <div className="p-6 border-t border-gray-100 bg-white/50 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>S/ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 pt-2">
                <span>Total</span>
                <span>S/ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-bold text-lg shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  );
}
