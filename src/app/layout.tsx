import type { Metadata } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-popins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Spiralcom",
  description:
    "Discover the best shopping experience with SpiralCom. Explore a wide range of products, including electronics, fashion, home essentials, and more. Shop now and enjoy great deals and fast shipping!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${poppins.variable} font-nunito antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
