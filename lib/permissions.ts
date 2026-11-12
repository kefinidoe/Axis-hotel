export const ROLES = [
  "ADMIN",
  "MANAGER",
  "RECEPTIONIST",
  "CASHIER",
  "WAITER",
  "ACCOUNTANT",
  "HOUSEKEEPER",
  "TECHNICIAN",
] as const;

export type Role = (typeof ROLES)[number];

export function canAccess(role: Role, feature: string): boolean {
  // Simple check for now
  if (role === "ADMIN") return true;
  return true; // Default allow for demo
}
