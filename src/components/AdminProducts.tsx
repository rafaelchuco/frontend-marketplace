"use client";

import { useState } from "react";
import { ApiResponse, Category, Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface AdminProductsProps {
  initialProducts: Product[];
  categories: Category[];
}

const getAuthToken = () =>
  document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("auth_token="))
    ?.split("=")[1];

const fieldClassName =
  "w-full rounded-xl border border-[var(--line)] bg-[#fbfdfc] px-3 py-2.5 text-[var(--foreground)] transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--brand)]";

const labelClassName =
  "mb-1 block text-sm font-semibold text-[var(--foreground)]";

export default function AdminProducts({
  initialProducts,
  categories,
}: AdminProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    CategoryId: "",
    ImageUrl: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data: ApiResponse<Product[]> = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId
      ? `${API_URL}/products/${editingId}`
      : `${API_URL}/products`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          precio: parseFloat(formData.precio),
          descripcion: formData.descripcion || undefined,
          CategoryId: formData.CategoryId ? Number(formData.CategoryId) : null,
          ImageUrl: formData.ImageUrl || undefined,
        }),
      });

      if (res.ok) {
        setFormData({
          nombre: "",
          precio: "",
          descripcion: "",
          CategoryId: "",
          ImageUrl: "",
        });
        setEditingId(null);
        fetchProducts();
      } else {
        alert("No tienes permisos o la sesion expiro");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      nombre: product.nombre,
      precio: product.precio.toString(),
      descripcion: product.descripcion || "",
      CategoryId: product.CategoryId ? String(product.CategoryId) : "",
      ImageUrl: product.ImageUrl || "",
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Estas seguro?")) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      precio: "",
      descripcion: "",
      CategoryId: "",
      ImageUrl: "",
    });
    setEditingId(null);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/92 p-6 shadow-[0_18px_45px_rgba(23,32,38,0.08)]">
          <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">
            {editingId ? "Editar Producto" : "Crear Producto"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClassName}>
                Nombre
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className={fieldClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Precio
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.precio}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                className={fieldClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Descripcion
              </label>
              <textarea
                rows={3}
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className={fieldClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Categoria
              </label>
              <select
                value={formData.CategoryId}
                onChange={(e) =>
                  setFormData({ ...formData, CategoryId: e.target.value })
                }
                className={fieldClassName}
              >
                <option value="">Sin categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClassName}>
                ImageUrl
              </label>
              <input
                type="url"
                value={formData.ImageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, ImageUrl: e.target.value })
                }
                className={fieldClassName}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[var(--accent)] py-2.5 font-semibold text-white shadow-md shadow-orange-200/70 transition-colors hover:bg-[var(--accent-strong)]"
              >
                {editingId ? "Actualizar" : "Crear"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl border border-[var(--line)] px-4 py-2.5 font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface-soft)]"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white/92 shadow-[0_18px_45px_rgba(23,32,38,0.08)]">
          <table className="w-full">
            <thead className="border-b border-[var(--line)] bg-[var(--surface-soft)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase text-[var(--brand)]">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase text-[var(--brand)]">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase text-[var(--brand)]">
                  Categoria
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold uppercase text-[var(--brand)]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {products.map((product) => (
                <tr key={product.id} className="transition-colors hover:bg-[var(--surface-soft)]/55">
                  <td className="px-6 py-4 text-sm font-medium text-[var(--foreground)]">
                    {product.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[var(--accent)]">
                    S/ {Number(product.precio).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--ink-muted)]">
                    {product.Category?.nombre || "Sin categoria"}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => handleEdit(product)}
                      className="mr-4 font-semibold text-[var(--brand)] hover:text-[var(--brand-strong)]"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="font-semibold text-[var(--accent-strong)] hover:text-[#b93827]"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
