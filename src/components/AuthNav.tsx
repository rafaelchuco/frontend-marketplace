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
          className="px-3 py-2 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--brand)]"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-200/70 transition-all hover:bg-[var(--accent-strong)] active:scale-95"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 rounded-full bg-[var(--surface-soft)] px-3 py-1 text-[var(--brand)]">
        <div className="h-2 w-2 rounded-full bg-[var(--gold)]" />
        <span className="text-xs font-medium capitalize">{role}</span>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="px-3 py-2 text-sm font-medium text-[var(--accent-strong)] transition-colors hover:text-[#b93827]"
      >
        Salir
      </button>
    </div>
  );
}
