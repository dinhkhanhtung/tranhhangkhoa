/**
 * DEMO PAGE - Giai đoạn 5.2
 * 
 * URL-based demo system cho phép khách xem website với theme khác nhau
 * mà không cần setup thủ công.
 * 
 * Strategy: /demo?industry=do-go&preset=premium
 * - Đọc query params từ URL
 - Override WebsiteContext với demo data
 * - Hiển thị banner "Đây là demo"
 * 
 * Cẩn trọng: Không gọi API, chỉ dùng static/mock data
 */

import { Suspense } from "react";
import { Metadata } from "next";
import DemoContent from "./DemoContent";

export const metadata: Metadata = {
  title: "Demo Website - Xem giao diện ngành nghề",
  description: "Xem demo website cho các ngành nghề khác nhau",
};

export default function DemoPage() {
  return (
    <Suspense fallback={<DemoLoading />}>
      <DemoContent />
    </Suspense>
  );
}

function DemoLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Đang tải demo...</p>
      </div>
    </div>
  );
}
