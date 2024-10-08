import Link from "next/link";
import Image from "next/image";
import { Compass, LayoutDashboard, User } from "lucide-react";

const NavLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <Link
    href={href}
    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground font-dmsans"
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
);

const navLinks = [
  { href: "/", icon: Compass, label: "Discover" },
  { href: "/dashboard", icon: LayoutDashboard, label: "My Dashboard" },
  { href: "/profile", icon: User, label: "My Profile" },
];

export default function Menu() {
  return (
    <aside className="w-64 bg-muted p-4 flex-col hidden md:flex">
      <div className="my-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">
            <Image
              src="/logo.png"
              alt="Haven Logo"
              width={200}
              height={26.66}
            />
          </span>
        </Link>
      </div>
      <nav className="space-y-4 flex-1">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} icon={link.icon} label={link.label} />
        ))}
      </nav>
    </aside>
  );
}

