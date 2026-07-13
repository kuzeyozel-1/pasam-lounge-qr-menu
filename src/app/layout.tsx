import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { FaviconSync } from "@/components/theme/favicon-sync";
import { MenuProvider } from "@/context/menu-provider";
import { SettingsProvider } from "@/context/settings-provider";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Paşam Lounge | Dijital Menü",
    template: "%s | Paşam Lounge",
  },
  description:
    "Paşam Lounge dijital menüsü — serpme kahvaltı, nargile, özel kahveler ve daha fazlası.",
  applicationName: "Paşam Lounge",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Paşam Lounge",
  },
  icons: {
    icon: "/gorseller/logo-dark.png",
    apple: "/gorseller/logo-dark.png",
  },
  openGraph: {
    title: "Paşam Lounge | Dijital Menü",
    description: "Lezzetli yemekler, kaliteli hizmet, sıcak bir atmosfer.",
    siteName: "Paşam Lounge",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <FaviconSync />
            <MenuProvider>
              <ToastProvider>{children}</ToastProvider>
            </MenuProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
