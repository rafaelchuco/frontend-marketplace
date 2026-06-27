import Image from "next/image";
import Link from "next/link";
import { ApiResponse, Category, Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const dynamic = "force-dynamic";

async function getProducts(categoryId?: string): Promise<Product[]> {
  try {
    const query = categoryId ? `?categoryId=${categoryId}` : "";
    const res = await fetch(`${API_URL}/products${query}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data: ApiResponse<Product[]> = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data: ApiResponse<Category[]> = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const { categoryId } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(categoryId),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Productos</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/"
          className={`px-4 py-2 rounded-md border text-sm transition-colors ${
            !categoryId
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-900"
          }`}
        >
          Todos
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/?categoryId=${category.id}`}
            className={`px-4 py-2 rounded-md border text-sm transition-colors ${
              categoryId === String(category.id)
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-900"
            }`}
          >
            {category.nombre}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              {product.ImageUrl && (
                <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={product.ImageUrl}
                    alt={product.nombre}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {product.nombre}
              </h2>
              {product.Category && (
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  {product.Category.nombre}
                </p>
              )}
              <p className="text-2xl font-bold text-gray-900 mb-3">
                S/ {Number(product.precio).toFixed(2)}
              </p>
              {product.descripcion && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.descripcion}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
