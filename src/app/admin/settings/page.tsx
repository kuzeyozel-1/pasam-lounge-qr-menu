import type { Metadata } from "next";
import { AdminSettingsGate } from "@/components/admin/admin-settings-gate";

export const metadata: Metadata = {
  title: "Site Ayarları",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return <AdminSettingsGate />;
}
