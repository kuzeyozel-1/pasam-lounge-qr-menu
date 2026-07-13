"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { KeyRound, Lock } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { ThemeLogo } from "@/components/theme/theme-logo";
import { cn } from "@/lib/utils";

interface AdminLoginProps {
  onLogin: (password: string) => Promise<boolean>;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const toast = useToast();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const success = await onLogin(password);
    if (success) {
      toast({ title: "Giriş başarılı", variant: "success" });
    } else {
      setError(true);
      toast({
        title: "Şifre hatalı",
        description: "Lütfen tekrar deneyin.",
        variant: "error",
      });
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <ThemeLogo />
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Admin Girişi</h1>
        <p className="text-sm text-foreground/60">
          Devam etmek için şifreyi girin.
        </p>
      </div>
      <motion.form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs flex-col gap-3"
      >
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError(false);
            }}
            placeholder="Şifre"
            autoFocus
            className={cn(
              "w-full rounded-full border bg-surface py-3 pl-11 pr-4 text-sm outline-none transition-colors",
              error
                ? "border-red-400 focus:border-red-400"
                : "border-border focus:border-brand-400"
            )}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-full bg-brand-500 py-3 text-sm font-medium text-white shadow-glow transition-transform active:scale-[0.98]"
        >
          <KeyRound className="h-4 w-4" />
          Giriş Yap
        </button>
      </motion.form>
    </div>
  );
}
