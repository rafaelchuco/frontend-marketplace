import Link from "next/link";
import { cookies } from "next/headers";
import AuthNav from "./AuthNav";

export default async function Navbar() {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value || null;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-semibold text-gray-900">
            ProductStore
          </Link>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Admin
            </Link>
            <AuthNav initialRole={role} />
          </div>
        </div>
      </div>
    </nav>
  );
}
