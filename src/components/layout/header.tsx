import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ThemeLogo } from "@/components/theme/theme-logo";
import { SocialLinks } from "@/components/layout/social-links";

export function Header() {
  return (
    <header className="relative flex flex-col items-center gap-3 px-6 pb-6 pt-10 text-center">
      <ThemeToggle className="absolute right-4 top-4" />
      <ThemeLogo />
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">
          Paşam Lounge&apos;a Hoşgeldiniz
        </h1>
        <p className="text-sm text-foreground/60">
          Lezzetli yemekler, kaliteli hizmet, sıcak bir atmosfer.
        </p>
      </div>
      <SocialLinks />
    </header>
  );
}
