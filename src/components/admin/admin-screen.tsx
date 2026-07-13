"use client";

import { useAdminAuth } from "@/hooks/use-admin-auth";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export function AdminScreen() {
  const { isAuthed, isChecking, login, logout } = useAdminAuth();

  if (isChecking) {
    return <div className="min-h-full flex-1" />;
  }

  if (!isAuthed) {
    return <AdminLogin onLogin={login} />;
  }

  return <AdminDashboard onLogout={logout} />;
}
