
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { getCookie } from "@/services/auth/tokenHandler";
import { Menu } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const commonNav = [
  { label: "Explore Events", href: "/events" },
];

const userNav = [
  { label: "My Events", href: "/my-events" },
  { label: "Profile", href: "/profile" },
];

const hostNav = [
  { label: "My Events (Hosted)", href: "/host/events" },
  { label: "Create Event", href: "/host/create" },
  { label: "Profile", href: "/profile" },
];

const adminNav = [
  { label: "Admin Dashboard", href: "/admin" },
  { label: "Manage Users", href: "/admin/users" },
  { label: "Manage Hosts", href: "/admin/hosts" },
  { label: "Manage Events", href: "/admin/events" },
  { label: "My Profile", href: "/profile" },
];

export default async function Navbar({ role = "guest" }) {

  let navItems = [...commonNav];
  console.log("role", role)

  if (role === "guest" || null) navItems.push({ label: "Become a Host", href: "/become-host" });
  if (role === "guest" || null) navItems.push({ label: "Login", href: "/login" }, { label: "Register", href: "/register" });

  if (role === "USER") navItems = [...commonNav, ...userNav];
  if (role === "HOST") navItems = [...commonNav, ...hostNav];
  if (role === "ADMIN") navItems = [...adminNav];

  const accessToken = await getCookie("accessToken");
  return (
    <header className="fixed top-6 inset-x-4 h-16 w-full bg-[#0B0E24]/40 backdrop-blur-xl shadow-xl py-6 px-6 rounded-full max-w-7xl mx-auto flex items-center justify-between z-30">
      <Link href="/" className="flex items-center gap-2 text-white text-2xl font-bold">
        <span className="text-blue-500">V</span> ibent
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-white">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className="hover:text-blue-400 transition-all">
            {item.label}
          </Link>
        ))}

        {
          accessToken && (
            <LogoutButton />
          )
        }
      </nav>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger><Menu className="text-white h-7 w-7" /></SheetTrigger>
          <SheetContent className="bg-[#0B0E24] text-white">
            <div className="flex flex-col gap-4 mt-10">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className="text-lg hover:text-blue-400">
                  {item.label}
                </Link>
              ))}

              {
                accessToken && (
                  <LogoutButton />
                )
              }
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}