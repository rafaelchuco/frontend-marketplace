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
      window.dispatchEvent(new Event("auth-changed"));

      router.replace(data.data.user.role === "ADMIN" ? "/admin" : "/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-[1.75rem] border border-[var(--line)] bg-white/92 p-10 shadow-[0_28px_70px_rgba(23,32,38,0.12)] backdrop-blur">
        <div className="text-center">
          <span className="mb-3 inline-flex rounded-full bg-[var(--surface-soft)] px-4 py-1 text-xs font-bold uppercase text-[var(--brand)]">
            Acceso seguro
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Bienvenido
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Ingresa tus credenciales para acceder
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="mb-1 ml-1 block text-sm font-semibold text-[var(--foreground)]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="relative block w-full appearance-none rounded-xl border border-[var(--line)] bg-[#fbfdfc] px-4 py-3 text-[var(--foreground)] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--brand)] sm:text-sm"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="mb-1 ml-1 block text-sm font-semibold text-[var(--foreground)]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="relative block w-full appearance-none rounded-xl border border-[var(--line)] bg-[#fbfdfc] px-4 py-3 text-[var(--foreground)] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--brand)] sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border-l-4 border-[var(--accent-strong)] bg-orange-50 p-4">
              <p className="text-sm text-[var(--accent-strong)]">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-xl border border-transparent bg-[var(--accent)] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200/80 transition-all hover:scale-[1.02] hover:bg-[var(--accent-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 active:scale-[0.98]"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-[var(--ink-muted)]">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="font-bold text-[var(--brand)] transition-colors hover:text-[var(--brand-strong)]">
              Regístrate ahora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
