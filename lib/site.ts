// Central contact config for the service promo CTA.
// TODO: fill your contact details — e.g. whatsapp: "213XXXXXXXXX" (digits only, with country code),
// telegram: "your_username" (without @), email: "you@example.com".
// Buttons fall back to "#" with a helper title while these stay empty.
export const siteContact = {
  whatsapp: "",
  telegram: "",
  email: "",
} as const;

export function whatsappLink(): string {
  return siteContact.whatsapp
    ? `https://wa.me/${siteContact.whatsapp}`
    : "#";
}

export function telegramLink(): string {
  return siteContact.telegram
    ? `https://t.me/${siteContact.telegram}`
    : "#";
}

export function emailLink(): string {
  return siteContact.email ? `mailto:${siteContact.email}` : "#";
}

export function contactFallbackTitle(): string {
  return "أضف بيانات التواصل في lib/site.ts";
}

export function isContactConfigured(): boolean {
  return Boolean(siteContact.whatsapp || siteContact.telegram || siteContact.email);
}
