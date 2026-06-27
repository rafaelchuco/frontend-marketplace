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
      <>
        <Link
          href="/login"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Registro
        </Link>
      </>
    );
  }

  return (
    <>
      <span className="text-sm text-gray-500">{role}</span>
      <button
        type="button"
        onClick={handleLogout}
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Salir
      </button>
    </>
  );
}
