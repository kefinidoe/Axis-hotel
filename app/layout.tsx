import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axis Hotel Management System",
  description: "Comprehensive hotel management system tailored for Axis Hotel with reservations, front desk, housekeeping, restaurant POS, inventory, billing, and reports.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-72 min-h-screen bg-bg">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
