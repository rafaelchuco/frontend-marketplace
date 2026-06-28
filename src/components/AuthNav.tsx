"use client";

import Link from "next/link";

interface AuthNavProps {
  role: string | null;
  onLogout: () => void;
}

export default function AuthNav({ role, onLogout }: AuthNavProps) {
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
        onClick={onLogout}
        className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-3 py-2"
      >
        Salir
      </button>
    </div>
  );
}
