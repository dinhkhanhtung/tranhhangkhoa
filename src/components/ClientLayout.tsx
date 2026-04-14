"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if current path is admin route
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Admin routes: no header/footer, just children
    return <>{children}</>;
  }

  // Regular website routes: show full layout with header/footer
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen pt-[80px] lg:pt-[90px]">{children}</main>
      <Footer />
      <BackToTop />
      <MobileBottomBar />
      <FloatingContactBar />
    </>
  );
}
