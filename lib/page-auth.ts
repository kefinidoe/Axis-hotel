import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export async function requirePageRole(allowedRoles: string[]) {
  // Mocking auth for now since I don't have the full NextAuth setup
  // but keeping the structure as requested
  return { user: { id: "1", role: "ADMIN" } };
}
