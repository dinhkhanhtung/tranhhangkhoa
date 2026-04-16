"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, Truck, Home, FileText, CreditCard, MessageCircle } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useWebsite } from "@/context/WebsiteContext";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const { settings } = useWebsite();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Order params
  const orderId = searchParams.get("orderId");
  const isError = searchParams.get("error") === "true";

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          setStatus("failed");
          setErrorMessage("Không tìm thấy mã đơn hàng");
          return;
        }

        if (isError) {
          setStatus("failed");
          setErrorMessage("Đặt hàng không thành công. Vui lòng thử lại sau.");
          return;
        }

        // Fetch order details
        if (db) {
          const orderRef = doc(db, "orders", orderId);
          const orderSnap = await getDoc(orderRef);
          
          if (orderSnap.exists()) {
            setOrderDetails(orderSnap.data());
            setStatus("success");
          } else {
            setStatus("failed");
            setErrorMessage("Không tìm thấy thông tin đơn hàng");
          }
        } else {
          setStatus("success");
        }
      } catch (error) {
        console.error("Fetch order error:", error);
        setStatus("failed");
        setErrorMessage("Có lỗi xảy ra khi lấy thông tin đơn hàng");
      }
    };

    fetchOrder();
  }, [orderId, isError]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#fffbf5] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 size={48} className="animate-spin text-[var(--color-primary)] mx-auto mb-4" />
          <p className="text-[#57534e]">Đang xử lý đơn hàng...</p>
        </motion.div>
      </div>
    );
  }

  // Success state
  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#fffbf5] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-[#e7e5e4] text-center max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          
          <h1 className="text-2xl font-bold text-[var(--color-dark)] mb-3">
            Đặt hàng thành công!
          </h1>
          
          <p className="text-[#57534e] mb-6">
            Cảm ơn bạn đã đặt hàng tại {settings.brand.name || "cửa hàng của chúng tôi"}.
            {orderDetails?.paymentMethod === "BANK" ? (
              <span className="block mt-2 text-sm">
                Vui lòng chuyển khoản theo thông tin bên dưới. Đơn hàng sẽ được xử lý sau khi xác nhận thanh toán.
              </span>
            ) : (
              <span className="block mt-2 text-sm">
                Chúng tôi sẽ liên hệ qua Zalo để xác nhận đơn hàng.
              </span>
            )}
            {orderDetails && (
              <span className="block mt-2 font-medium">
                Mã đơn hàng: <span className="text-[var(--color-primary)]">HK{orderId?.substring(0, 6).toUpperCase()}</span>
              </span>
            )}
          </p>

          {orderDetails && (
            <div className="bg-[#f5f5f4] p-4 rounded-xl mb-6 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#57534e]">Phương thức:</span>
                <span className="font-medium text-[var(--color-dark)]">
                  {orderDetails.paymentMethod === "BANK" ? "Chuyển khoản ngân hàng" : 
                   orderDetails.paymentMethod === "COD" ? "Thanh toán khi nhận" : 
                   orderDetails.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#57534e]">Số tiền:</span>
                <span className="font-medium text-[var(--color-dark)]">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(orderDetails.total || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#57534e]">Trạng thái:</span>
                <span className={`font-medium ${
                  orderDetails.paymentMethod === "BANK" ? "text-orange-600" : "text-green-600"
                }`}>
                  {orderDetails.paymentMethod === "BANK" ? "Chờ thanh toán" : "Chờ xác nhận"}
                </span>
              </div>
              
              {/* Bank Transfer Info */}
              {orderDetails.paymentMethod === "BANK" && (
                <div className="mt-4 pt-4 border-t border-[#e7e5e4]">
                  <p className="text-sm font-medium text-[var(--color-dark)] mb-2">Thông tin chuyển khoản:</p>
                  <p className="text-xs text-[#57534e] mb-1">Vui lòng chuyển khoản với nội dung: <strong>Thanh toan HK{orderId?.substring(0, 6).toUpperCase()}</strong></p>
                  <p className="text-xs text-[#57534e]">Sau khi chuyển khoản, vui lòng gửi biên lai qua Zalo để được xác nhận nhanh nhất.</p>
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-3">
            <Link 
              href="/tai-khoan?tab=orders" 
              className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-primary)] text-white font-medium rounded-xl hover:bg-[var(--color-secondary)] transition-colors"
            >
              <FileText size={18} />
              Xem đơn hàng của tôi
            </Link>
            
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 w-full py-3 border border-[#e7e5e4] text-[var(--color-dark)] font-medium rounded-xl hover:bg-[#f5f5f4] transition-colors"
            >
              <Home size={18} />
              Quay lại trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Failed state
  return (
    <div className="min-h-screen bg-[#fffbf5] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-[#e7e5e4] text-center max-w-lg w-full"
      >
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} />
        </div>
        
        <h1 className="text-2xl font-bold text-[var(--color-dark)] mb-3">
          Thanh toán không thành công
        </h1>
        
        <p className="text-[#57534e] mb-6">
          {errorMessage || "Giao dịch không thành công. Vui lòng thử lại sau hoặc chọn phương thức thanh toán khác."}
        </p>

        
        <div className="space-y-3">
          <Link 
            href="/thanh-toan" 
            className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-primary)] text-white font-medium rounded-xl hover:bg-[var(--color-secondary)] transition-colors"
          >
            <CreditCard size={18} />
            Thử thanh toán lại
          </Link>
          
          <Link 
            href="/gio-hang" 
            className="flex items-center justify-center gap-2 w-full py-3 border border-[#e7e5e4] text-[var(--color-dark)] font-medium rounded-xl hover:bg-[#f5f5f4] transition-colors"
          >
            <Truck size={18} />
            Quay lại giỏ hàng
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fffbf5] flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
      </div>
    }>
      <PaymentResultContent />
    </Suspense>
  );
}



