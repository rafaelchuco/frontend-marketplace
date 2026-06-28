import ProductCard from "@/components/ProductCard";
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Explora nuestro catálogo
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Encuentra los mejores productos para ti
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/"
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            !categoryId
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          Todos
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/?categoryId=${category.id}`}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              categoryId === String(category.id)
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {category.nombre}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-900">No hay productos disponibles</p>
          <p className="text-gray-500 mt-1">Prueba con otra categoría o vuelve más tarde.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
