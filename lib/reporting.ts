import { startOfDay, endOfDay, format } from "date-fns";

export function getReportRange(start?: string | null, end?: string | null) {
  const startDate = start ? new Date(start) : startOfDay(new Date());
  const endDate = end ? new Date(end) : endOfDay(new Date());
  
  return {
    start: startDate,
    endExclusive: new Date(endDate.getTime() + 1),
    endInclusive: endDate,
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd"),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function reportDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}
