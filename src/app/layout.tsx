import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ClientLayout from "@/components/ClientLayout";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Tranh Thêu Tay | Khóa Học Thêu & Phụ Kiện Chất Lượng Cao",
  description: "Chuyên tranh thêu tay thủ công tinh xảo, khóa học thêu từ cơ bản đến nâng cao, và phụ kiện thêu cao cấp. Kế thừa tinh hoa nghệ thuật thêu truyền thống Việt Nam.",
  keywords: "tranh thêu tay, thêu tay thủ công, khóa học thêu, phụ kiện thêu, tranh thêu nghệ thuật, tranh thêu truyền thống",
  authors: [{ name: "Nghệ Nhân Thêu Tay" }],
  creator: "Nghệ Nhân Thêu Tay",
  publisher: "Nghệ Nhân Thêu Tay",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://localhost:3000"),
  openGraph: {
    title: "Tranh Thêu Tay | Khóa Học Thêu & Phụ Kiện Chất Lượng Cao",
    description: "Chuyên tranh thêu tay thủ công tinh xảo, khóa học thêu từ cơ bản đến nâng cao, và phụ kiện thêu cao cấp.",
    url: process.env.NEXTAUTH_URL || "https://localhost:3000",
    siteName: "Nghệ Nhân Thêu Tay",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tranh Thêu Tay - Nghệ Thuật Truyền Thống",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tranh Thêu Tay | Khóa Học Thêu & Phụ Kiện",
    description: "Chuyên tranh thêu tay thủ công tinh xảo, khóa học thêu và phụ kiện thêu cao cấp.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} ${notoSans.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
