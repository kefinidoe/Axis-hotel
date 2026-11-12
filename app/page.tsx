import { redirect } from "next/navigation";

export default function RootPage() {
  // For this app, we'll redirect root to the dashboard
  redirect("/dashboard");
}
