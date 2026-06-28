"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiResponse, AuthData } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function RegisterPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });
      const data: ApiResponse<AuthData> = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "No se pudo registrar el usuario");
        return;
      }

      document.cookie = `auth_token=${data.data.token}; path=/; max-age=28800; SameSite=Lax`;
      document.cookie = `auth_role=${data.data.user.role}; path=/; max-age=28800; SameSite=Lax`;
      document.cookie = `auth_user=${encodeURIComponent(data.data.user.nombre)}; path=/; max-age=28800; SameSite=Lax`;

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Únete a nuestra comunidad hoy mismo
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                Nombre completo
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Registrarme
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
