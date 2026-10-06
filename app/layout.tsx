import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";


const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: {
    default: "Ambulink — Emergency Ambulance Dispatch",
    template: "%s | Ambulink",
  },
  description:
    "Fast, reliable emergency ambulance dispatch. Request an ambulance, track it live, and get to the hospital safely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        
        <QueryProvider>{children} <Toaster position="top-right" richColors /></QueryProvider>
      </body>
    </html>
  );
}