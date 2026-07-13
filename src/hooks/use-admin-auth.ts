"use client";

import { useCallback, useEffect, useState } from "react";

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session", { cache: "no-store" })
      .then((res) => res.json())
      .then((json: { authed: boolean }) => {
        if (cancelled) return;
        setIsAuthed(json.authed);
        setIsChecking(false);
      })
      .catch(() => {
        if (!cancelled) setIsChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const success = res.ok;
    if (success) setIsAuthed(true);
    return success;
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setIsAuthed(false);
  }, []);

  return { isAuthed, isChecking, login, logout };
}
