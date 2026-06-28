import AdminProducts from "@/components/AdminProducts";
import { ApiResponse, Category, Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
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

export default async function AdminPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="mb-3 inline-flex rounded-full bg-[var(--surface-soft)] px-4 py-1 text-xs font-bold uppercase text-[var(--brand)]">
          Panel privado
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Administración de Productos
        </h1>
        <p className="mt-2 text-[var(--ink-muted)]">
          Crea, edita y organiza el catálogo desde un solo lugar.
        </p>
      </div>
      <AdminProducts initialProducts={products} categories={categories} />
    </div>
  );
}
