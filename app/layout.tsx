import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import Menu from "@/components/Menu";
import Header from "@/components/Header";

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
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <div className="flex h-screen bg-background">
          <Menu />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
