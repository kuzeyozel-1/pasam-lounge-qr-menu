import type { Metadata } from "next";
import { AdminScreen } from "@/components/admin/admin-screen";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminScreen />;
}
