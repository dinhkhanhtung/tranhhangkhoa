import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Admin Dashboard - Tranh Thêu Tay Hằng Khoa",
  description: "Quản lý website bán tranh thêu tay",
};

// Admin layout - NO Header/Footer from main website
// Uses its own sidebar navigation
export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-[#fffbf5]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
