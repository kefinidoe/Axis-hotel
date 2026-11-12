"use client";

import { useState, useEffect } from "react";
import { Search, X, Archive, RotateCcw, User, Phone, Mail, CreditCard, Globe, Car, ClipboardList, Wallet } from "lucide-react";
import { formatDisplayDate } from "@/lib/dates";
import clsx from "clsx";
import ModalShell from "@/components/ModalShell";

type GuestRow = {
  id: string;
  fullName: string;
  phone: string | null;
  email: string | null;
  isArchived: boolean;
  currentRoom: string | null;
  lastStatus: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
};

type GuestDetail = {
  id: string;
  fullName: string;
  phone: string | null;
  email: string | null;
  idNumber: string | null;
  nationality: string | null;
  vehicleRegistration: string | null;
  notes: string | null;
  isArchived: boolean;
  reservations: {
    id: string;
    code: string;
    status: string;
    checkInDate: string;
    checkOutDate: string;
    rooms: { roomNumber: string; rate: number }[];
  }[];
  folios: { id: string; isClosed: boolean; total: number; paid: number; balance: number }[];
};

export default function GuestsClient({ initialGuests }: { initialGuests: GuestRow[] }) {
  const [guests, setGuests] = useState(initialGuests);
  const [query, setQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<GuestDetail | null>(null);
  const [archiving, setArchiving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function search(q: string, includeArchived = showArchived) {
    setQuery(q);
    const params = new URLSearchParams({ q });
    if (includeArchived) params.set("includeArchived", "true");
    const res = await fetch(`/api/guests?${params.toString()}`);
    setGuests(await res.json());
  }

  function toggleShowArchived() {
    const next = !showArchived;
    setShowArchived(next);
    search(query, next);
  }

  async function openGuest(id: string) {
    setSelectedId(id);
    setDetail(null);
    const res = await fetch(`/api/guests/${id}`);
    setDetail(await res.json());
  }

  async function setArchived(id: string, isArchived: boolean) {
    if (isArchived && !confirm("Archive this guest? They'll be hidden from the list, but all their stay and payment history stays intact and can be restored anytime.")) {
      return;
    }
    setArchiving(true);
    const res = await fetch(`/api/guests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isArchived }),
    });
    setArchiving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      alert(body.error ?? "Something went wrong.");
      return;
    }

    setDetail((d) => (d ? { ...d, isArchived } : d));
    search(query);
  }

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-500">Guest Directory</h1>
          <p className="text-text-secondary mt-1 font-medium">
            Search and manage guest profiles and history.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="Search by name, phone, or email..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border-border bg-bg/30 focus:bg-white transition-all"
          />
        </div>
        <button 
          onClick={toggleShowArchived}
          className={clsx(
            "flex items-center gap-2 px-4 py-3 rounded-xl border font-bold text-sm transition-all whitespace-nowrap w-full md:w-auto justify-center",
            showArchived ? "bg-navy-50 border-navy-200 text-navy-600 shadow-sm" : "bg-white border-border text-text-secondary hover:bg-bg"
          )}
        >
          <Archive size={18} />
          {showArchived ? "Showing Archived" : "Show Archived"}
        </button>
      </div>

      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Guest Information</th>
                <th>Contact Details</th>
                <th>Current Stay</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr
                  key={g.id}
                  onClick={() => openGuest(g.id)}
                  className="cursor-pointer group"
                >
                  <td>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-navy-50 text-navy-500 flex items-center justify-center font-bold text-sm">
                          {g.fullName.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-navy-700 group-hover:text-navy-500 transition-colors">{g.fullName}</p>
                          {g.isArchived && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-bg border border-border text-[10px] font-black uppercase text-text-muted mt-1">
                               Archived
                            </span>
                          )}
                       </div>
                    </div>
                  </td>
                  <td>
                     <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                           <Phone size={12} className="text-text-muted" /> {g.phone ?? "—"}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                           <Mail size={12} className="text-text-muted" /> {g.email ?? "—"}
                        </div>
                     </div>
                  </td>
                  <td>
                     <p className="text-sm font-black text-navy-600">{g.currentRoom ? `Room ${g.currentRoom}` : "—"}</p>
                  </td>
                  <td>
                     {g.lastStatus ? (
                        <span className="badge bg-teal-50 text-teal-700 border-teal-100 uppercase tracking-tighter text-[10px]">
                           {g.lastStatus.replace("_", " ")}
                        </span>
                     ) : (
                        <span className="text-xs text-text-muted italic">No recent activity</span>
                     )}
                  </td>
                </tr>
              ))}
              {guests.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center opacity-30">
                       <User size={48} strokeWidth={1} />
                       <p className="mt-4 font-bold">No guests found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedId && (
        <ModalShell 
          title={detail?.fullName ?? "Guest Details"} 
          onClose={() => setSelectedId(null)}
          maxWidth="max-w-2xl"
        >
          {!detail ? (
            <div className="py-20 flex flex-col items-center gap-4 text-text-muted">
               <RotateCcw className="animate-spin" size={32} />
               <p className="font-bold">Fetching profile...</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <DetailItem icon={Phone} label="Phone Number" value={detail.phone} />
                 <DetailItem icon={Mail} label="Email Address" value={detail.email} />
                 <DetailItem icon={CreditCard} label="National ID / Passport" value={detail.idNumber} />
                 <DetailItem icon={Globe} label="Nationality" value={detail.nationality} />
                 <DetailItem icon={Car} label="Vehicle Registration" value={detail.vehicleRegistration} />
              </div>

              {detail.notes && (
                <div className="bg-bg/50 rounded-2xl p-4 border border-border">
                   <p className="text-[10px] font-black uppercase text-text-muted mb-2 tracking-widest">Internal Notes</p>
                   <p className="text-sm text-text-secondary leading-relaxed">{detail.notes}</p>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-navy-500">
                   <ClipboardList size={18} />
                   Stay History
                </h3>
                <div className="grid gap-3">
                  {detail.reservations.map((r) => (
                    <div key={r.id} className="bg-white border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-black text-navy-700">{r.rooms.map((rr) => rr.roomNumber).join(", ")}</p>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{r.code}</p>
                        </div>
                        <span className="badge bg-navy-50 text-navy-600 border-navy-100 uppercase text-[10px]">
                           {r.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-text-secondary mt-2" suppressHydrationWarning>
                        {mounted ? `${formatDisplayDate(r.checkInDate)} – ${formatDisplayDate(r.checkOutDate)}` : "---"}
                      </p>
                    </div>
                  ))}
                  {detail.reservations.length === 0 && (
                    <div className="py-12 bg-bg/30 rounded-2xl border border-dashed border-border text-center text-sm text-text-muted italic">
                       No reservations found
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-navy-500">
                   <Wallet size={18} />
                   Financial Summary
                </h3>
                <div className="grid gap-3">
                  {detail.folios.map((f) => (
                    <div key={f.id} className="flex justify-between items-center bg-bg/40 border border-border/60 rounded-2xl p-4">
                      <div>
                        <p className="text-sm font-bold text-navy-900">{f.isClosed ? "Closed Folio" : "Open Folio"}</p>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">{f.id.slice(-8)}</p>
                      </div>
                      <div className="text-right" suppressHydrationWarning>
                         <p className={clsx("text-sm font-black", f.balance > 0 ? "text-danger" : "text-success")}>
                           Balance: KSh {mounted ? f.balance.toLocaleString() : "---"}
                         </p>
                         <p className="text-[10px] text-text-muted font-bold mt-1">Total: KSh {mounted ? f.total.toLocaleString() : "---"}</p>
                      </div>
                    </div>
                  ))}
                  {detail.folios.length === 0 && (
                    <div className="py-12 bg-bg/30 rounded-2xl border border-dashed border-border text-center text-sm text-text-muted italic">
                       No billing history
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-border flex justify-end">
                {detail.isArchived ? (
                  <button
                    onClick={() => setArchived(detail.id, false)}
                    disabled={archiving}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-teal-600 hover:bg-teal-50 font-bold transition-all disabled:opacity-50"
                  >
                    <RotateCcw size={18} /> Restore Guest Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setArchived(detail.id, true)}
                    disabled={archiving || detail.reservations.some((r) => r.status === "CHECKED_IN")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-danger hover:bg-danger-bg font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    title={
                      detail.reservations.some((r) => r.status === "CHECKED_IN")
                        ? "Can't archive a guest who is currently checked in"
                        : "Hide this guest from the main directory"
                    }
                  >
                    <Archive size={18} /> Archive Guest Profile
                  </button>
                )}
              </div>
            </div>
          )}
        </ModalShell>
      )}
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: any, label: string, value: string | null }) {
   return (
      <div className="flex items-start gap-3">
         <div className="p-2.5 rounded-xl bg-bg text-navy-400">
            <Icon size={18} />
         </div>
         <div>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{label}</p>
            <p className="text-sm font-bold text-navy-900 mt-0.5">{value || "Not provided"}</p>
         </div>
      </div>
   );
}
