import { differenceInDays } from "date-fns";

export function roundMoney(amount: number) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function stayNights(checkIn: Date | string, checkOut: Date | string) {
  const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
  return Math.max(1, nights);
}

export function accommodationRequired(nightlyRates: number[], nights: number, discount: number = 0) {
  const totalBase = nightlyRates.reduce((sum, rate) => sum + (rate * nights), 0);
  return roundMoney(totalBase - discount);
}
