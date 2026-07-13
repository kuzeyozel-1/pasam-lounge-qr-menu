export interface ToggleField {
  value: string;
  visible: boolean;
}

export interface SiteSettings {
  general: {
    siteName: string;
    logoLight: string;
    logoDark: string;
    favicon: string;
    defaultProductImage: string;
  };
  wifi: {
    password: string;
  };
  finance: {
    currency: "TRY" | "USD" | "EUR" | "GBP";
    vatRate: number;
  };
  header: {
    workingHours: ToggleField;
    address: ToggleField;
    phone: ToggleField;
    email: ToggleField;
    website: ToggleField;
    mapLink: ToggleField;
  };
  social: {
    facebook: ToggleField;
    instagram: ToggleField;
    whatsapp: ToggleField;
    tiktok: ToggleField;
  };
  reviewPopup: {
    enabled: boolean;
    title: string;
    description: string;
    image: string;
    delaySeconds: number;
    googleMapsLink: string;
  };
}
