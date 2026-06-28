"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] transition-all duration-500 flex flex-col h-full"
    >
      {/* Imagen con efecto zoom */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        {product.ImageUrl ? (
          <Image
            src={product.ImageUrl}
            alt={product.nombre}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300">
            <span className="text-sm font-medium">Sin imagen</span>
          </div>
        )}
        
        {/* Overlay de categoría */}
        {product.Category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-indigo-600 rounded-full shadow-sm">
              {product.Category.nombre}
            </span>
          </div>
        )}

        {/* Overlay decorativo */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
            {product.nombre}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1 min-h-[2.5rem]">
            {product.descripcion || "Sin descripción disponible"}
          </p>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-tighter">Precio</span>
            <span className="text-xl font-black text-gray-900">
              <span className="text-sm font-semibold text-indigo-500 mr-0.5">S/</span>
              {Number(product.precio).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-indigo-200">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
