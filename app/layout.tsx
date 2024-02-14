import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Hub",
  description: "Movie Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} relative mx-auto flex w-full max-w-[1440px] flex-col bg-[#131116] text-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
