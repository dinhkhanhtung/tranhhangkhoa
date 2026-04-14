"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWebsite } from "@/context/WebsiteContext";
import { ChevronRight, CreditCard, Truck, MapPin, User, Phone, Mail } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { settings } = useWebsite();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
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
        status: "Chờ xác nhận",
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      setOrderId(docRef.id.substring(0, 6).toUpperCase());
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#fffbf5] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-[#e7e5e4] text-center max-w-lg w-full space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Truck size={40} />
          </div>
          <h1 className="text-2xl font-bold text-[#1c1917]">Đặt hàng thành công!</h1>
          <p className="text-[#57534e]">Cảm ơn bạn đã tin tưởng {settings.brand.name}. Mã đơn hàng của bạn là <strong>#HK{orderId}</strong>. Chúng tôi sẽ liên hệ sớm nhất để xác nhận.</p>
          <Link href="/" className="block w-full py-4 bg-[#b45309] text-white font-bold rounded-xl hover:bg-[#1c1917] transition-all">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf5] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm text-[#57534e] mb-4">
              <Link href="/gio-hang" className="hover:text-[#b45309]">Giỏ hàng</Link>
              <ChevronRight size={14} />
              <span className="text-[#1c1917] font-bold">Thanh toán</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-[#e7e5e4] shadow-sm">
              <h2 className="text-xl font-bold text-[#1c1917] flex items-center gap-3">
                <MapPin size={24} className="text-[#b45309]" />
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
                      className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-xl focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none" 
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
                      className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-xl focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none" 
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
                    className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-xl focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none" 
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
                  className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-6 border-t border-[#e7e5e4]">
                <h2 className="text-xl font-bold text-[#1c1917] flex items-center gap-3 mb-6">
                  <CreditCard size={24} className="text-[#b45309]" />
                  Phương thức thanh toán
                </h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'COD' ? 'border-[#b45309] bg-[#fffbf5]' : 'border-[#e7e5e4] hover:bg-[#f5f5f4]'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-4 h-4 text-[#b45309] border-[#b45309] focus:ring-[#b45309]" 
                    />
                    <div className="flex-1">
                      <p className="font-bold text-[#1c1917]">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-xs text-[#57534e]">Bạn chỉ thanh toán khi nhận được hàng.</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'BANK' ? 'border-[#b45309] bg-[#fffbf5]' : 'border-[#e7e5e4] hover:bg-[#f5f5f4]'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="BANK"
                      checked={formData.paymentMethod === "BANK"}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-4 h-4 text-[#b45309] border-[#e7e5e4] focus:ring-[#b45309]" 
                    />
                    <div className="flex-1">
                      <p className="font-bold text-[#1c1917]">Chuyển khoản ngân hàng</p>
                      <p className="text-xs text-[#57534e]">Nhân viên sẽ gửi thông tin tài khoản sau khi xác nhận đơn.</p>
                    </div>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing || cartItems.length === 0}
                className="w-full py-4 bg-[#1c1917] text-white font-bold rounded-xl hover:bg-[#b45309] transition-all shadow-lg shadow-black/10 disabled:opacity-50"
              >
                {isProcessing ? "Đang xử lý..." : "Hoàn tất đặt hàng"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl border border-[#e7e5e4] shadow-sm sticky top-24 space-y-6">
              <h2 className="text-xl font-bold text-[#1c1917] uppercase tracking-tight">Tóm tắt đơn hàng ({cartItems.length})</h2>
              
              <div className="divide-y divide-[#e7e5e4]/60 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <div className="relative w-16 h-16 bg-[#f5f5f4] rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#b45309] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1c1917] truncate">{item.name}</p>
                      <p className="text-xs text-[#57534e] mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <p className="text-sm font-bold text-[#1c1917]">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-[#e7e5e4]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#57534e] font-medium">Tạm tính</span>
                  <span className="text-[#1c1917] font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#57534e] font-medium">Phí vận chuyển</span>
                  <span className={shipping === 0 ? "text-green-600 font-bold" : "text-[#1c1917] font-bold"}>
                    {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#e7e5e4]">
                  <span className="text-lg font-bold text-[#1c1917]">Tổng cộng</span>
                  <span className="text-2xl font-bold text-[#b45309] tracking-tighter">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="bg-[#fffbf5] p-4 rounded-xl border border-[#b45309]/10">
                <p className="text-[11px] text-[#b45309] font-bold uppercase tracking-widest mb-1">Chính sách giao hàng</p>
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

