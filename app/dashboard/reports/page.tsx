import { fetchReportData } from "@/lib/reporting-logic";
import ReportsClient from "@/components/reports/ReportsClient";
import { requirePageRole } from "@/lib/page-auth";

export const dynamic = 'force-dynamic';

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string; end?: string }>;
}) {
  await requirePageRole(["ADMIN", "MANAGER", "ACCOUNTANT"]);
  
  const { start, end } = await searchParams;
  
  // Real data fetch using the shared logic
  const initialData = await fetchReportData(start, end);

  return (
    <main className="p-8">
      <ReportsClient initialData={initialData} />
    </main>
  );
}
