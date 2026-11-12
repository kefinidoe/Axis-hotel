import { prisma } from "@/lib/prisma";
import { Bed, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import clsx from "clsx";

export const dynamic = 'force-dynamic';

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany({
    include: { roomType: true },
    orderBy: { number: "asc" },
  });

  return (
    <div className="p-8 animate-slide-up space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy-500">Room Management</h1>
        <p className="text-text-secondary mt-1 font-medium">View and manage all rooms and their live status.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="premium-card p-4 flex flex-col items-center text-center gap-3 group relative overflow-hidden">
               <div className={clsx(
                 "absolute top-0 left-0 w-1 h-full",
                 room.status === "AVAILABLE" ? "bg-teal-500" :
                 room.status === "OCCUPIED" ? "bg-navy-500" :
                 room.status === "DIRTY" ? "bg-amber-500" : "bg-rose-500"
               )} />
               <p className="text-xs font-black text-text-muted uppercase tracking-widest">{room.roomType.name}</p>
               <p className="text-2xl font-black text-navy-900 group-hover:scale-110 transition-transform">{room.number}</p>
               <RoomStatusBadge status={room.status} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-text-muted">
            <Bed size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-bold">No rooms configured in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RoomStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "AVAILABLE":
      return <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full uppercase">Available</span>;
    case "OCCUPIED":
      return <span className="text-[10px] font-bold text-navy-600 bg-navy-50 px-2 py-0.5 rounded-full uppercase">Occupied</span>;
    case "DIRTY":
      return <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase">Dirty</span>;
    case "MAINTENANCE":
      return <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase">Maintenance</span>;
    default:
      return <span className="text-[10px] font-bold text-text-muted bg-bg px-2 py-0.5 rounded-full uppercase">{status}</span>;
  }
}
