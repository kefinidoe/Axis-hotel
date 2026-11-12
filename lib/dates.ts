import { format, formatDistanceToNow, isPast, addMinutes, differenceInMinutes, differenceInDays } from "date-fns";

export function formatDisplayDate(date: Date | string) {
  return format(new Date(date), "MMM d, yyyy");
}

export function formatDisplayDateTime(date: Date | string) {
  return format(new Date(date), "MMM d, yyyy h:mm a");
}

export function formatTime(date: Date | string) {
  return format(new Date(date), "h:mm a");
}

export function getTimeAgo(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function isDatePast(date: Date | string) {
  return isPast(new Date(date));
}

export function getStayNights(checkIn: Date | string, checkOut: Date | string) {
  const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
  return nights > 0 ? nights : 1;
}
