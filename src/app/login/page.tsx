"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiResponse, AuthData } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: ApiResponse<AuthData> = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "No se pudo iniciar sesion");
        return;
      }

      document.cookie = `auth_token=${data.data.token}; path=/; max-age=28800; SameSite=Lax`;
      document.cookie = `auth_role=${data.data.user.role}; path=/; max-age=28800; SameSite=Lax`;
      document.cookie = `auth_user=${encodeURIComponent(data.data.user.nombre)}; path=/; max-age=28800; SameSite=Lax`;

      router.push(data.data.user.role === "ADMIN" ? "/admin" : "/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Iniciar sesion
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Entrar
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          No tienes cuenta?{" "}
          <Link href="/register" className="text-gray-900 font-medium">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
