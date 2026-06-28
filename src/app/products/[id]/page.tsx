import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { ApiResponse, Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const dynamic = "force-dynamic";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data: ApiResponse<Product> = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="group relative aspect-square overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              {product.ImageUrl ? (
                <Image
                  src={product.ImageUrl}
                  alt={product.nombre}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                  Sin imagen disponible
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              {product.Category && (
                <span className="mb-4 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                  {product.Category.nombre}
                </span>
              )}
              <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900">
                {product.nombre}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(48 reseñas)</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  S/ {Number(product.precio).toFixed(2)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  S/ {(Number(product.precio) * 1.2).toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-indigo-600">
                20% de descuento disponible hoy
              </p>
            </div>

            <div className="mb-8 text-gray-600">
              <h2 className="mb-2 font-semibold text-gray-900">Descripción</h2>
              <p className="leading-relaxed">
                {product.descripcion ||
                  "Sin descripción disponible para este producto."}
              </p>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Stock disponible para envío inmediato</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="h-5 w-5 text-indigo-500" />
                <span>Garantía de satisfacción de 30 días</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-indigo-500" />
                <span>Envío express disponible a todo el país</span>
              </div>
            </div>

            <div className="flex gap-4">
              <AddToCartButton product={product} />
            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              Referencia de producto: #{product.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
