"use client";

import { useAdminAuth } from "@/hooks/use-admin-auth";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminSettingsScreen } from "@/components/admin/admin-settings-screen";

export function AdminSettingsGate() {
  const { isAuthed, isChecking, login, logout } = useAdminAuth();

  if (isChecking) {
    return <div className="min-h-full flex-1" />;
  }

  if (!isAuthed) {
    return <AdminLogin onLogin={login} />;
  }

  return <AdminSettingsScreen onLogout={logout} />;
}
