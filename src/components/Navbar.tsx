import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value || null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--line)] bg-white/82 shadow-[0_10px_35px_rgba(23,32,38,0.06)] backdrop-blur-xl">
      <NavbarClient role={role} />
    </nav>
  );
}
