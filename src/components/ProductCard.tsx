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
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white/95 shadow-[0_18px_45px_rgba(23,32,38,0.07)] transition-all duration-500 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_24px_60px_rgba(15,118,110,0.14)]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--surface-soft)]">
        {product.ImageUrl ? (
          <Image
            src={product.ImageUrl}
            alt={product.nombre}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[var(--ink-muted)]">
            <span className="text-sm font-medium">Sin imagen</span>
          </div>
        )}
        
        {product.Category && (
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-white/88 px-3 py-1 text-[10px] font-bold uppercase text-[var(--brand)] shadow-sm backdrop-blur-md">
              {product.Category.nombre}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(23,32,38,0.18))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <h2 className="line-clamp-1 text-lg font-bold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--brand)]">
            {product.nombre}
          </h2>
          <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-[var(--ink-muted)]">
            {product.descripcion || "Sin descripción disponible"}
          </p>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase text-[var(--ink-muted)]">Precio</span>
            <span className="text-xl font-black text-[var(--foreground)]">
              <span className="mr-0.5 text-sm font-semibold text-[var(--accent)]">S/</span>
              {Number(product.precio).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-[var(--surface-soft)] p-2.5 text-[var(--brand)] shadow-sm transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-orange-200/80">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
