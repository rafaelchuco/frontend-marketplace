import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-block mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Volver a productos
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        {product.ImageUrl && (
          <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.ImageUrl}
              alt={product.nombre}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {product.nombre}
        </h1>

        {product.Category && (
          <div className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-md mb-4">
            {product.Category.nombre}
          </div>
        )}

        <div className="text-3xl font-bold text-gray-900 mb-6">
          S/ {Number(product.precio).toFixed(2)}
        </div>

        {product.descripcion && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Descripcion
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.descripcion}
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
          ID del producto: {product.id}
        </div>
      </div>
    </div>
  );
}
