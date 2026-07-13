"use client";

import { useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  SettingsField,
  SettingsSection,
  SettingsSelect,
  SettingsTextArea,
  SettingsToggleRow,
} from "@/components/admin/settings/fields";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/context/settings-provider";
import { useToast } from "@/components/ui/toast";
import type { SiteSettings } from "@/types/settings";

interface AdminSettingsScreenProps {
  onLogout: () => void;
}

const CURRENCY_OPTIONS = [
  { value: "TRY", label: "₺ Türk Lirası (TRY)" },
  { value: "USD", label: "$ ABD Doları (USD)" },
  { value: "EUR", label: "€ Euro (EUR)" },
  { value: "GBP", label: "£ İngiliz Sterlini (GBP)" },
];

export function AdminSettingsScreen({ onLogout }: AdminSettingsScreenProps) {
  const { settings, updateSettings } = useSettings();
  const toast = useToast();
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!syncedRef.current) {
      // İlk gerçek (localStorage'dan gelen) ayar değeri geldiğinde bir kez senkronize edilir.
      setDraft(settings);
      syncedRef.current = true;
    }
  }, [settings]);

  function handleSave() {
    updateSettings(draft);
    toast({ title: "Ayarlar kaydedildi" });
  }

  return (
    <AdminShell onLogout={onLogout}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-4 pb-28">
        <SettingsSection
          title="Genel Ayarlar"
          description="Site adı, logolar, favicon ve varsayılan ürün görseli."
        >
          <SettingsField
            label="Site Adı"
            value={draft.general.siteName}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                general: { ...d.general, siteName: event.target.value },
              }))
            }
          />
          <SettingsField
            label="Light Mod Logosu (URL)"
            value={draft.general.logoLight}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                general: { ...d.general, logoLight: event.target.value },
              }))
            }
          />
          <SettingsField
            label="Dark Mod Logosu (URL)"
            value={draft.general.logoDark}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                general: { ...d.general, logoDark: event.target.value },
              }))
            }
          />
          <SettingsField
            label="Favicon (URL)"
            value={draft.general.favicon}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                general: { ...d.general, favicon: event.target.value },
              }))
            }
          />
          <SettingsField
            label="Varsayılan Ürün Resmi (URL, opsiyonel)"
            placeholder="Görseli olmayan ürünler için fallback"
            value={draft.general.defaultProductImage}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                general: {
                  ...d.general,
                  defaultProductImage: event.target.value,
                },
              }))
            }
          />
        </SettingsSection>

        <SettingsSection title="WiFi Bilgisi">
          <SettingsField
            label="WiFi Şifresi"
            revealable
            value={draft.wifi.password}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                wifi: { password: event.target.value },
              }))
            }
          />
        </SettingsSection>

        <SettingsSection title="Finans">
          <SettingsSelect
            label="Para Birimi"
            value={draft.finance.currency}
            onChange={(value) =>
              setDraft((d) => ({
                ...d,
                finance: {
                  ...d.finance,
                  currency: value as SiteSettings["finance"]["currency"],
                },
              }))
            }
            options={CURRENCY_OPTIONS}
          />
          <SettingsField
            label="KDV Oranı (%)"
            type="number"
            min={0}
            max={100}
            value={draft.finance.vatRate}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                finance: {
                  ...d.finance,
                  vatRate: Number(event.target.value),
                },
              }))
            }
          />
        </SettingsSection>

        <SettingsSection
          title="Header Bilgileri"
          description="Müşteri arayüzünde konum sayfasında gösterilecek bilgiler."
        >
          <SettingsToggleRow
            label="Çalışma Saatleri"
            visible={draft.header.workingHours.visible}
            value={draft.header.workingHours.value}
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                header: {
                  ...d.header,
                  workingHours: { ...d.header.workingHours, visible },
                },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                header: {
                  ...d.header,
                  workingHours: { ...d.header.workingHours, value },
                },
              }))
            }
          />
          <SettingsToggleRow
            label="Adres"
            visible={draft.header.address.visible}
            value={draft.header.address.value}
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                header: {
                  ...d.header,
                  address: { ...d.header.address, visible },
                },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                header: { ...d.header, address: { ...d.header.address, value } },
              }))
            }
          />
          <SettingsToggleRow
            label="Telefon"
            visible={draft.header.phone.visible}
            value={draft.header.phone.value}
            placeholder="+90 5xx xxx xx xx"
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                header: { ...d.header, phone: { ...d.header.phone, visible } },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                header: { ...d.header, phone: { ...d.header.phone, value } },
              }))
            }
          />
          <SettingsToggleRow
            label="E-posta"
            visible={draft.header.email.visible}
            value={draft.header.email.value}
            placeholder="info@pasamlounge.com"
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                header: { ...d.header, email: { ...d.header.email, visible } },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                header: { ...d.header, email: { ...d.header.email, value } },
              }))
            }
          />
          <SettingsToggleRow
            label="Web Sitesi"
            visible={draft.header.website.visible}
            value={draft.header.website.value}
            placeholder="https://..."
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                header: {
                  ...d.header,
                  website: { ...d.header.website, visible },
                },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                header: { ...d.header, website: { ...d.header.website, value } },
              }))
            }
          />
          <SettingsToggleRow
            label="Harita Linki"
            visible={draft.header.mapLink.visible}
            value={draft.header.mapLink.value}
            placeholder="https://maps.google.com/..."
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                header: {
                  ...d.header,
                  mapLink: { ...d.header.mapLink, visible },
                },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                header: { ...d.header, mapLink: { ...d.header.mapLink, value } },
              }))
            }
          />
        </SettingsSection>

        <SettingsSection title="Sosyal Medya">
          <SettingsToggleRow
            label="Facebook"
            visible={draft.social.facebook.visible}
            value={draft.social.facebook.value}
            placeholder="https://facebook.com/..."
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                social: {
                  ...d.social,
                  facebook: { ...d.social.facebook, visible },
                },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                social: { ...d.social, facebook: { ...d.social.facebook, value } },
              }))
            }
          />
          <SettingsToggleRow
            label="Instagram"
            visible={draft.social.instagram.visible}
            value={draft.social.instagram.value}
            placeholder="https://instagram.com/..."
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                social: {
                  ...d.social,
                  instagram: { ...d.social.instagram, visible },
                },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                social: {
                  ...d.social,
                  instagram: { ...d.social.instagram, value },
                },
              }))
            }
          />
          <SettingsToggleRow
            label="WhatsApp"
            visible={draft.social.whatsapp.visible}
            value={draft.social.whatsapp.value}
            placeholder="https://wa.me/90..."
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                social: {
                  ...d.social,
                  whatsapp: { ...d.social.whatsapp, visible },
                },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                social: {
                  ...d.social,
                  whatsapp: { ...d.social.whatsapp, value },
                },
              }))
            }
          />
          <SettingsToggleRow
            label="TikTok"
            visible={draft.social.tiktok.visible}
            value={draft.social.tiktok.value}
            placeholder="https://tiktok.com/@..."
            onToggle={(visible) =>
              setDraft((d) => ({
                ...d,
                social: {
                  ...d.social,
                  tiktok: { ...d.social.tiktok, visible },
                },
              }))
            }
            onValueChange={(value) =>
              setDraft((d) => ({
                ...d,
                social: { ...d.social, tiktok: { ...d.social.tiktok, value } },
              }))
            }
          />
        </SettingsSection>

        <SettingsSection
          title="Google Maps Değerlendirme Popup'ı"
          description="Müşteriler belirli bir süre menüde kaldığında değerlendirme isteği gösterilir."
        >
          <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-muted p-3">
            <span className="text-sm font-medium">Aktif Et</span>
            <Switch
              checked={draft.reviewPopup.enabled}
              onChange={(enabled) =>
                setDraft((d) => ({
                  ...d,
                  reviewPopup: { ...d.reviewPopup, enabled },
                }))
              }
              label="Değerlendirme popup'ını aktif et"
            />
          </div>
          <SettingsField
            label="Popup Başlığı"
            value={draft.reviewPopup.title}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                reviewPopup: { ...d.reviewPopup, title: event.target.value },
              }))
            }
          />
          <SettingsTextArea
            label="Popup Açıklaması"
            value={draft.reviewPopup.description}
            onChange={(value) =>
              setDraft((d) => ({
                ...d,
                reviewPopup: { ...d.reviewPopup, description: value },
              }))
            }
          />
          <SettingsField
            label="Popup Görseli (URL, opsiyonel)"
            value={draft.reviewPopup.image}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                reviewPopup: { ...d.reviewPopup, image: event.target.value },
              }))
            }
          />
          <SettingsField
            label="Popup Gecikmesi (saniye)"
            type="number"
            min={0}
            value={draft.reviewPopup.delaySeconds}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                reviewPopup: {
                  ...d.reviewPopup,
                  delaySeconds: Number(event.target.value),
                },
              }))
            }
          />
          <SettingsField
            label="Google Maps Değerlendirme Linki"
            placeholder="https://g.page/r/..."
            value={draft.reviewPopup.googleMapsLink}
            onChange={(event) =>
              setDraft((d) => ({
                ...d,
                reviewPopup: {
                  ...d.reviewPopup,
                  googleMapsLink: event.target.value,
                },
              }))
            }
          />
        </SettingsSection>
      </div>

      <div className="glass fixed inset-x-0 bottom-0 z-30 border-t border-border p-4 backdrop-blur-md">
        <button
          type="button"
          onClick={handleSave}
          className="mx-auto flex w-full max-w-2xl items-center justify-center gap-2 rounded-full bg-brand-500 py-3 text-sm font-medium text-white shadow-glow transition-transform active:scale-[0.98]"
        >
          <Save className="h-4 w-4" />
          Kaydet
        </button>
      </div>
    </AdminShell>
  );
}
