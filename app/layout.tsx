import type { Metadata } from "next";
import { Tajawal, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "dz-delivery — دليل أسعار التوصيل في الجزائر",
  description:
    "دليل أسعار التوصيل في الجزائر — 58 ولاية، شركتا توصيل. قارن أسعار RedEx وأندرسون للمنزل والمكتب بالدينار الجزائري.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${tajawal.variable} ${jbmono.variable} min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
