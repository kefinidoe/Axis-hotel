"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  DoorOpen, 
  CalendarCheck, 
  Bed, 
  Users, 
  Brush, 
  Wrench, 
  Utensils, 
  Package, 
  Wallet, 
  BarChart3, 
  Settings,
  LogOut
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Front Desk", href: "/dashboard/front-desk", icon: DoorOpen },
  { label: "Reservations", href: "/dashboard/reservations", icon: CalendarCheck },
  { label: "Rooms", href: "/dashboard/rooms", icon: Bed },
  { label: "Guests", href: "/dashboard/guests", icon: Users },
  { label: "Housekeeping", href: "/dashboard/housekeeping", icon: Brush },
  { label: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
  { label: "Restaurant", href: "/dashboard/restaurant", icon: Utensils },
  { label: "Inventory", href: "/dashboard/inventory", icon: Package },
  { label: "Expenses", href: "/dashboard/expenses", icon: Wallet },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-navy-950 text-white flex flex-col h-screen fixed left-0 top-0 z-40 shadow-2xl">
      <div className="p-8 border-b border-white/5 bg-navy-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20">
            <span className="text-navy-950 font-black text-xl">A</span>
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight">AXIS HOTEL</h1>
            <p className="text-[10px] font-bold text-gold-400 tracking-[0.2em] uppercase">Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                isActive 
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20" 
                  : "text-navy-200 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} className={clsx(
                "transition-colors",
                isActive ? "text-white" : "text-navy-400 group-hover:text-gold-400"
              )} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-navy-900/50">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-all">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
