"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWebsite } from "@/context/WebsiteContext";
import { ChevronRight, CreditCard, Truck, MapPin, User, Phone, Mail } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { settings } = useWebsite();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "COD"
  });

  const shipping = subtotal >= settings.shipping.freeshipThreshold ? 0 : settings.shipping.fee;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      alert("Hệ thống chưa được thiết lập Firebase. Vui lòng kiểm tra Admin Dashboard.");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const orderData = {
        customer: {
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal,
        shipping,
        total,
        paymentMethod: formData.paymentMethod,
        status: formData.paymentMethod === "VNPAY" || formData.paymentMethod === "MOMO" 
          ? "Chờ thanh toán" 
          : "Chờ xác nhận",
        createdAt: serverTimestamp(),
      };

      // Save order to get order ID
      const docRef = await addDoc(collection(db, "orders"), orderData);
      const newOrderId = docRef.id;
      const orderCode = newOrderId.substring(0, 6).toUpperCase();

      // COD or BANK - redirect to result page
      // For BANK: Order status is "Chờ thanh toán" until admin confirms
      // For COD: Order status is "Chờ xác nhận"
      setOrderId(orderCode);
      clearCart();
      router.push(`/thanh-toan/ket-qua?orderId=${newOrderId}`);
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.");
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#fffbf5] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm text-[#57534e] mb-4">
              <Link href="/gio-hang" className="hover:text-[var(--color-primary)]">Giỏ hàng</Link>
              <ChevronRight size={14} />
              <span className="text-[var(--color-dark)] font-bold">Thanh toán</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-[#e7e5e4] shadow-sm">
              <h2 className="text-xl font-bold text-[var(--color-dark)] flex items-center gap-3">
                <MapPin size={24} className="text-[var(--color-primary)]" />
                Thông tin giao hàng
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#57534e] uppercase tracking-wider">Họ và tên</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
                    <input 
                      required 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder="Nguyễn Văn A" 
                      className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#57534e] uppercase tracking-wider">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
                    <input 
                      required 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="tel" 
                      placeholder="09xx xxx xxx" 
                      className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#57534e] uppercase tracking-wider">Email (Không bắt buộc)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    placeholder="example@gmail.com" 
                    className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#57534e] uppercase tracking-wider">Địa chỉ nhận hàng</label>
                <textarea 
                  required 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3} 
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố" 
                  className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-6 border-t border-[#e7e5e4]">
                <h2 className="text-xl font-bold text-[var(--color-dark)] flex items-center gap-3 mb-6">
                  <CreditCard size={24} className="text-[var(--color-primary)]" />
                  Phương thức thanh toán
                </h2>
                <div className="space-y-3">
                  {/* Bank Transfer */}
                  <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'BANK' ? 'border-[var(--color-primary)] bg-[#fffbf5]' : 'border-[#e7e5e4] hover:bg-[#f5f5f4]'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="BANK"
                      checked={formData.paymentMethod === "BANK"}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-4 h-4 text-[var(--color-primary)] border-[var(--color-primary)] focus:ring-[var(--color-primary)]" 
                    />
                    <div className="flex-1">
                      <p className="font-bold text-[var(--color-dark)]">Chuyển khoản ngân hàng</p>
                      <p className="text-xs text-[#57534e]">Chuyển khoản vào tài khoản ngân hàng. Đơn hàng được xử lý sau khi xác nhận thanh toán.</p>
                    </div>
                  </label>

                  {/* COD */}
                  <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'COD' ? 'border-[var(--color-primary)] bg-[#fffbf5]' : 'border-[#e7e5e4] hover:bg-[#f5f5f4]'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-4 h-4 text-[var(--color-primary)] border-[var(--color-primary)] focus:ring-[var(--color-primary)]" 
                    />
                    <div className="flex-1">
                      <p className="font-bold text-[var(--color-dark)]">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-xs text-[#57534e]">Bạn chỉ thanh toán khi nhận được hàng. Phí ship có thể cao hơn.</p>
                    </div>
                  </label>
                </div>

                {/* Bank Transfer Details */}
                {formData.paymentMethod === 'BANK' && settings.payment.bankTransfer.enabled && (
                  <div className="mt-4 p-4 bg-[#f5f5f4] rounded-xl border border-[#e7e5e4]">
                    <p className="text-sm font-medium text-[var(--color-dark)] mb-3">Thông tin chuyển khoản:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#57534e]">Ngân hàng:</span>
                        <span className="font-medium text-[var(--color-dark)]">{settings.payment.bankTransfer.bankName || "Vietcombank"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#57534e]">Số tài khoản:</span>
                        <span className="font-medium text-[var(--color-dark)]">{settings.payment.bankTransfer.accountNumber || "1234567890"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#57534e]">Chủ tài khoản:</span>
                        <span className="font-medium text-[var(--color-dark)]">{settings.payment.bankTransfer.accountName || settings.brand.name}</span>
                      </div>
                      {settings.payment.bankTransfer.branch && (
                        <div className="flex justify-between">
                          <span className="text-[#57534e]">Chi nhánh:</span>
                          <span className="font-medium text-[var(--color-dark)]">{settings.payment.bankTransfer.branch}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-[#e7e5e4]">
                        <span className="text-[#57534e]">Số tiền:</span>
                        <span className="font-medium text-[var(--color-primary)]">{formatPrice(total)}</span>
                      </div>
                      <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                        <p className="text-xs text-yellow-700">
                          <strong>Ghi chú:</strong> Vui lòng ghi "Thanh toan don hang [SĐT]" khi chuyển khoản. Chúng tôi sẽ liên hệ qua Zalo để xác nhận.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isProcessing || cartItems.length === 0}
                className="w-full py-4 bg-[var(--color-dark)] text-white font-bold rounded-xl hover:bg-[var(--color-primary)] transition-all shadow-lg shadow-black/10 disabled:opacity-50"
              >
                {isProcessing ? "Đang xử lý..." : "Hoàn tất đặt hàng"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl border border-[#e7e5e4] shadow-sm sticky top-24 space-y-6">
              <h2 className="text-xl font-bold text-[var(--color-dark)] uppercase tracking-tight">Tóm tắt đơn hàng ({cartItems.length})</h2>
              
              <div className="divide-y divide-[#e7e5e4]/60 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <div className="relative w-16 h-16 bg-[#f5f5f4] rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--color-dark)] truncate">{item.name}</p>
                      <p className="text-xs text-[#57534e] mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <p className="text-sm font-bold text-[var(--color-dark)]">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-[#e7e5e4]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#57534e] font-medium">Tạm tính</span>
                  <span className="text-[var(--color-dark)] font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#57534e] font-medium">Phí vận chuyển</span>
                  <span className={shipping === 0 ? "text-green-600 font-bold" : "text-[var(--color-dark)] font-bold"}>
                    {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#e7e5e4]">
                  <span className="text-lg font-bold text-[var(--color-dark)]">Tổng cộng</span>
                  <span className="text-2xl font-bold text-[var(--color-primary)] tracking-tighter">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="bg-[#fffbf5] p-4 rounded-xl border border-[var(--color-primary)]/10">
                <p className="text-[11px] text-[var(--color-primary)] font-bold uppercase tracking-widest mb-1">Chính sách giao hàng</p>
                <p className="text-xs text-[#57534e] leading-relaxed italic">
                  * Giao hàng từ {settings.shipping.estimatedTime} tùy khu vực. Kiểm tra hàng trước khi thanh toán.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



