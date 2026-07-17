import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});



export const metadata: Metadata = {
  title: "CasaJá — Aluguer de imóveis",
  description: "Pesquisa imóveis para alugar e contacta o proprietário diretamente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} antialiased text-blackish bg-neutrals`}
       suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
