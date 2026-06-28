"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthNavProps {
  initialRole: string | null;
}

export default function AuthNav({ initialRole }: AuthNavProps) {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(initialRole);

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; max-age=0";
    document.cookie = "auth_role=; path=/; max-age=0";
    document.cookie = "auth_user=; path=/; max-age=0";
    setRole(null);
    router.push("/login");
    router.refresh();
  };

  if (!role) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-md shadow-indigo-100 transition-all active:scale-95"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs font-medium capitalize">{role}</span>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-3 py-2"
      >
        Salir
      </button>
    </div>
  );
}
