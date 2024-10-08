import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Compass,
  LayoutDashboard,
  User,
  MessageCircle,
  MessageSquarePlus,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Haven App | Connecting Refugees and Canadians",
  description:
    "Haven connects refugees coming to Canada who need help with Canadians who can help. Our platform makes it easy for Canadians to directly help refugees. Canadians can see the needs of refugees in their community, and refugees can get connected to the help they need fast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Create a reusable NavLink component
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

  // Define the navigation links data
  const navLinks = [
    { href: "/", icon: Compass, label: "Discover" },
    { href: "/dashboard", icon: LayoutDashboard, label: "My Dashboard" },
    { href: "/profile", icon: User, label: "My Profile" },
  ];

  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <div className="flex h-screen bg-background">
          {/* Sidebar */}
          <aside className="w-64 bg-muted p-4 flex-col hidden md:flex">
            {/* Logo */}
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

            {/* Navigation */}
            <nav className="space-y-4 flex-1">
              {navLinks.map((link, index) => (
                <NavLink key={index} {...link} />
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-16 border-b flex items-center justify-between px-4">
              <div className="flex items-center flex-1">
                <Input
                  type="search"
                  placeholder="How can you help?"
                  className="w-full max-w-sm"
                />
              </div>
              <nav className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Haven
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquarePlus className="h-5 w-5 mr-2" />
                  Send Feedback
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent"
                    >
                      <Avatar>
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
