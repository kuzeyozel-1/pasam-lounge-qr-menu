"use client";

import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "pasam-lounge-admin-auth";
// Geçici mock şifre - ileride .env'ye taşınacak.
const ADMIN_PASSWORD = "admin123";

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(SESSION_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthed(stored === "true");
    setIsChecking(false);
  }, []);

  const login = useCallback((password: string) => {
    if (password !== ADMIN_PASSWORD) return false;
    window.sessionStorage.setItem(SESSION_KEY, "true");
    setIsAuthed(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  }, []);

  return { isAuthed, isChecking, login, logout };
}
