
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";

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
        className={`${inter.className} mx-auto w-full max-w-[2160px] bg-[#131116] px-4 text-white`}
      >
        <AuthProvider>
          <Toaster />
          <div className="flex-1">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
