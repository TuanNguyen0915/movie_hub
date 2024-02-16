import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
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
        className={`${inter.className} max-w-[2160px] bg-[#131116] mx-auto w-full px-4 text-white`}
      >
        <Toaster />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
