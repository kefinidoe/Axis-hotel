"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Users, 
  Search, 
  Bell, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Calendar,
  LogOut,
  MoreVertical,
  User,
  Hash
} from "lucide-react";
import { format, isToday, isTomorrow, addMinutes, isAfter, differenceInMinutes } from "date-fns";
import clsx from "clsx";
import ModalShell from "@/components/ModalShell";
import { formatDisplayDateTime, getTimeAgo } from "@/lib/dates";

type CheckoutStatus = "UPCOMING" | "DUE_SOON" | "DUE_NOW" | "OVERDUE" | "CHECKED_OUT";

interface GuestCheckout {
  id: string;
  reservationId: string;
  guestName: string;
  roomNumber: string;
  scheduledCheckout: string;
  status: CheckoutStatus;
  lastReminderSent?: string;
}

interface FrontDeskClientProps {
  initialDepartures: GuestCheckout[];
}

export default function FrontDeskClient({ initialDepartures }: FrontDeskClientProps) {
  const [departures, setDepartures] = useState(initialDepartures);
  const [activeTab, setActiveTab] = useState<"arrivals" | "inHouse" | "departures">("departures");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCheckout, setSelectedCheckout] = useState<GuestCheckout | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Auto-refresh logic for checkout statuses when 'now' changes
  useEffect(() => {
    if (!mounted) return;
    
    setDepartures(prev => prev.map(checkout => {
      const checkoutTime = new Date(checkout.scheduledCheckout);
      const diff = differenceInMinutes(checkoutTime, now);
      
      let status: CheckoutStatus = checkout.status;
      if (checkout.status !== "CHECKED_OUT") {
        if (diff <= -30) status = "OVERDUE";
        else if (diff <= 0) status = "DUE_NOW";
        else if (diff <= 60) status = "DUE_SOON";
        else status = "UPCOMING";
      }
      
      return { ...checkout, status };
    }));
  }, [now, mounted]);

  const filteredDepartures = useMemo(() => {
    return departures.filter(d => 
      d.guestName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.roomNumber.includes(searchQuery)
    ).sort((a, b) => new Date(a.scheduledCheckout).getTime() - new Date(b.scheduledCheckout).getTime());
  }, [departures, searchQuery]);

  const notifications = useMemo(() => {
    return departures
      .filter(d => d.status === "OVERDUE" || d.status === "DUE_NOW")
      .map(d => ({
        id: d.id,
        title: d.status === "OVERDUE" ? "Checkout Overdue" : "Guest Due for Checkout",
        message: `${d.guestName} (Room ${d.roomNumber}) ${d.status === "OVERDUE" ? "is 30+ minutes overdue" : "is scheduled to check out now"}.`,
        type: d.status === "OVERDUE" ? "danger" : "warning",
        time: d.scheduledCheckout
      }));
  }, [departures]);

  return (
    <div className="animate-slide-up space-y-6">
      {/* Header with Notification Bell */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-500">Front Desk Operations</h1>
          <p className="text-text-secondary mt-1 font-medium">Manage daily arrivals, guest stays, and scheduled departures.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={clsx(
                "p-3 rounded-2xl border transition-all relative",
                notifications.length > 0 ? "bg-amber-50 border-amber-200 text-amber-600 shadow-sm" : "bg-white border-border text-text-muted hover:bg-bg"
              )}
            >
              <Bell size={22} />
              {mounted && notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-border z-50 overflow-hidden">
                <div className="p-4 border-b border-border bg-bg/30">
                  <h3 className="font-bold text-navy-800 text-sm">Checkout Alerts</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-border/50 hover:bg-bg transition-colors">
                        <div className="flex gap-3">
                          <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            n.type === "danger" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
                          )}>
                            <AlertCircle size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-navy-900">{n.title}</p>
                            <p className="text-xs text-text-secondary mt-0.5">{n.message}</p>
                            <p className="text-[10px] text-text-muted font-bold uppercase mt-2 tracking-widest" suppressHydrationWarning>
                              {mounted ? formatDisplayDateTime(n.time) : "---"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-text-muted">
                      <CheckCircle2 size={32} className="mx-auto mb-3 opacity-20" />
                      <p className="text-sm font-bold">No active alerts</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-border shadow-sm w-fit">
        {[
          { id: "arrivals", label: "Arrivals", icon: ArrowRight },
          { id: "inHouse", label: "In-House", icon: User },
          { id: "departures", label: "Departures", icon: LogOut },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={clsx(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === tab.id 
                ? "bg-navy-500 text-white shadow-md" 
                : "text-text-secondary hover:bg-bg"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Departures Content */}
      {activeTab === "departures" && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-border shadow-sm">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search departures by guest or room..."
                className="input-field pl-12"
              />
            </div>
          </div>

          <div className="table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Guest / Room</th>
                  <th>Scheduled Checkout</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartures.map((checkout) => (
                  <tr key={checkout.id} className="group">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                          checkout.status === "OVERDUE" ? "bg-rose-50 text-rose-600" : "bg-navy-50 text-navy-500"
                        )}>
                          <Hash size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-navy-800">{checkout.guestName}</p>
                          <p className="text-xs font-black text-teal-600 uppercase tracking-tighter">Room {checkout.roomNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-navy-700" suppressHydrationWarning>
                          <Calendar size={14} className="text-text-muted" /> {mounted ? format(new Date(checkout.scheduledCheckout), "MMM d, yyyy") : "---"}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary" suppressHydrationWarning>
                          <Clock size={14} className="text-text-muted" /> {mounted ? format(new Date(checkout.scheduledCheckout), "h:mm a") : "---"}
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={checkout.status} />
                    </td>
                    <td className="text-right">
                      <button 
                        onClick={() => setSelectedCheckout(checkout)}
                        className="btn btn-secondary px-4 py-2"
                      >
                        Process Checkout
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDepartures.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <div className="flex flex-col items-center opacity-30">
                        <LogOut size={48} strokeWidth={1} />
                        <p className="mt-4 font-bold text-text-primary">No guests found</p>
                        <p className="text-sm text-text-secondary mt-1">There are no departures scheduled for your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {selectedCheckout && (
        <ModalShell 
          title="Process Guest Checkout" 
          onClose={() => setSelectedCheckout(null)}
          maxWidth="max-w-lg"
        >
          <div className="space-y-6">
            <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-navy-900">{selectedCheckout.guestName}</h3>
                  <p className="text-sm font-black text-teal-600 uppercase tracking-widest mt-1">Room {selectedCheckout.roomNumber}</p>
                </div>
                <StatusBadge status={selectedCheckout.status} />
              </div>
              <div className="mt-4 pt-4 border-t border-navy-200/50 flex items-center gap-6 text-sm">
                <div>
                  <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">Scheduled</p>
                  <p className="font-bold text-navy-700 mt-1">{formatDisplayDateTime(selectedCheckout.scheduledCheckout)}</p>
                </div>
                {selectedCheckout.status === "OVERDUE" && (
                  <div>
                    <p className="text-[10px] font-black uppercase text-rose-500 tracking-widest">Overdue By</p>
                    <p className="font-bold text-rose-600 mt-1">
                      {mounted ? Math.abs(differenceInMinutes(new Date(selectedCheckout.scheduledCheckout), now)) : "---"} minutes
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="premium-card p-4 flex flex-col items-center text-center gap-2">
                <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">Guest Folio</p>
                <p className="text-xl font-black text-navy-900">KSh 12,450</p>
                <p className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase">Unpaid Balance</p>
              </div>
              <div className="premium-card p-4 flex flex-col items-center text-center gap-2">
                <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">Key Card</p>
                <CheckCircle2 size={24} className="text-teal-500" />
                <p className="text-[10px] font-bold text-text-secondary uppercase">Ready for Drop</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="btn btn-primary w-full py-4 text-base">
                Confirm Checkout & Close Folio
              </button>
              <button 
                onClick={() => setSelectedCheckout(null)}
                className="btn btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalShell>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: CheckoutStatus }) {
  switch (status) {
    case "OVERDUE":
      return <span className="badge bg-rose-50 text-rose-600 border-rose-100 shadow-sm shadow-rose-100">Overdue</span>;
    case "DUE_NOW":
      return <span className="badge bg-amber-50 text-amber-600 border-amber-100 shadow-sm shadow-amber-100">Due Now</span>;
    case "DUE_SOON":
      return <span className="badge bg-navy-50 text-navy-500 border-navy-100">Due Soon</span>;
    case "UPCOMING":
      return <span className="badge bg-bg text-text-muted border-border">Upcoming</span>;
    case "CHECKED_OUT":
      return <span className="badge bg-teal-50 text-teal-600 border-teal-100">Checked Out</span>;
    default:
      return null;
  }
}
