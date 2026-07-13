"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import defaultSettings from "@/data/settings.json";
import type { SiteSettings } from "@/types/settings";

const STORAGE_KEY = "pasam-lounge-settings";

interface SettingsContextValue {
  settings: SiteSettings;
  updateSettings: (next: SiteSettings) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function loadFromStorage(): SiteSettings | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SiteSettings;
  } catch {
    return null;
  }
}

function saveToStorage(settings: SiteSettings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // localStorage kullanılamıyor (gizli mod/kota) - sessizce yoksay.
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(
    defaultSettings as SiteSettings
  );

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings(stored);
    }
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        setSettings(JSON.parse(event.newValue));
      } catch {
        // ignore malformed cross-tab payload
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateSettings = useCallback((next: SiteSettings) => {
    setSettings(next);
    saveToStorage(next);
  }, []);

  const value = useMemo(
    () => ({ settings, updateSettings }),
    [settings, updateSettings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
