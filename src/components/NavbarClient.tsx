"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import AuthNav from "./AuthNav";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";

interface NavbarClientProps {
  role: string | null;
}

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return null;

  return (
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.split("=")[1] || null
  );
};

export default function NavbarClient({ role }: NavbarClientProps) {
  const router = useRouter();
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [currentRole, setCurrentRole] = useState<string | null>(role);

  useEffect(() => {
    const syncAuthRole = () => setCurrentRole(getCookieValue("auth_role"));

    syncAuthRole();
    window.addEventListener("auth-changed", syncAuthRole);
    window.addEventListener("focus", syncAuthRole);

    return () => {
      window.removeEventListener("auth-changed", syncAuthRole);
      window.removeEventListener("focus", syncAuthRole);
    };
  }, []);

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; max-age=0";
    document.cookie = "auth_role=; path=/; max-age=0";
    document.cookie = "auth_user=; path=/; max-age=0";
    window.dispatchEvent(new Event("auth-changed"));
    setCurrentRole(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 opacity-25 blur transition duration-300 group-hover:opacity-50" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                <ShoppingBag className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Product<span className="text-indigo-600">Store</span>
            </span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-500 transition-all duration-200 hover:text-indigo-600"
            >
              Explorar
            </Link>
            {currentRole === "ADMIN" && (
              <Link
                href="/admin"
                className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600/80 transition-all duration-200 hover:bg-indigo-100"
              >
                Panel Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full p-2 text-gray-400 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="mx-2 hidden h-6 w-px bg-gray-200 sm:block" />

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full p-2 text-gray-400 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </button>

            <AuthNav role={currentRole} onLogout={handleLogout} />
          </div>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
}
