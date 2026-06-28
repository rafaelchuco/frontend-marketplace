import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value || null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100/50 bg-white/70 backdrop-blur-md">
      <NavbarClient role={role} />
    </nav>
  );
}
