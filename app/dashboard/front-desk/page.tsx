import FrontDeskClient from "@/components/frontdesk/FrontDeskClient";
import { prisma } from "@/lib/prisma";

export default async function FrontDeskPage() {
  // In a real implementation, we would fetch departures from Prisma
  // For now, providing some sample data that matches the expected interface
  // to demonstrate the feature and premium UI.
  
  const now = new Date();
  
  const departures = [
    {
      id: "1",
      reservationId: "res_1",
      guestName: "James Mwangi",
      roomNumber: "104",
      scheduledCheckout: new Date(now.getTime() - 45 * 60000).toISOString(), // 45 mins ago
      status: "OVERDUE" as const,
    },
    {
      id: "2",
      reservationId: "res_2",
      guestName: "Sarah Chen",
      roomNumber: "201",
      scheduledCheckout: new Date(now.getTime() + 10 * 60000).toISOString(), // in 10 mins
      status: "DUE_SOON" as const,
    },
    {
      id: "3",
      reservationId: "res_3",
      guestName: "Robert Taylor",
      roomNumber: "305",
      scheduledCheckout: new Date(now.getTime() + 120 * 60000).toISOString(), // in 2 hours
      status: "UPCOMING" as const,
    }
  ];

  return (
    <main className="p-8">
      <FrontDeskClient initialDepartures={departures} />
    </main>
  );
}
