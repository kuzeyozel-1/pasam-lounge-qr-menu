"use client";

import type { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNav } from "@/components/admin/admin-nav";

interface AdminShellProps {
  onLogout: () => void;
  children: ReactNode;
}

export function AdminShell({ onLogout, children }: AdminShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AdminHeader onLogout={onLogout} />
      <AdminNav />
      {children}
    </div>
  );
}
