"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialCartItems = [
  {
    id: "1",
    name: "Tranh thêu hoa sen - Tinh khiết từ bùn",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&q=80",
    quantity: 1,
    category: "Tranh thêu tay",
  },
  {
    id: "3",
    name: "Tranh thêu cô gái Việt - Dịu dàng áo dài",
    price: 4200000,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&q=80",
    quantity: 1,
    category: "Tranh thêu tay",
  },
];

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  const shipping = subtotal > 500000 || cartItems.length === 0 ? 0 : 30000;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#fffbf5]">
      {/* Header */}
      <div className="bg-white border-b border-[#e7e5e4]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-serif text-[var(--color-dark)] text-center">
            Giỏ Hàng
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white p-6 flex gap-6"
                  >
                    <Link href={`/san-pham/${item.id}`} className="relative w-24 h-24 flex-shrink-0 bg-[#f5f5f4] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-[var(--color-primary)] mb-1">{item.category}</p>
                          <Link href={`/san-pham/${item.id}`} className="font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                            {item.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-[#57534e] hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-[#e7e5e4]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-[#f5f5f4] transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-[#f5f5f4] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-medium text-[var(--color-dark)]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue Shopping */}
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 text-sm text-[#57534e] hover:text-[var(--color-primary)] transition-colors"
              >
                <ArrowRight size={16} className="rotate-180" />
                Tiếp tục mua sắm
              </Link>
            </div>

            {/* Cart Summary */}
            <div className="bg-white p-6 h-fit">
              <h2 className="text-lg font-medium text-[var(--color-dark)] mb-6 uppercase tracking-wider">
                Tóm Tắt Đơn Hàng
              </h2>
              
              <div className="space-y-4 pb-6 border-b border-[#e7e5e4]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#57534e]">Tạm tính</span>
                  <span className="text-[var(--color-dark)]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#57534e]">Phí vận chuyển</span>
                  <span className={shipping === 0 ? "text-green-600" : "text-[var(--color-dark)]"}>
                    {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between py-6 border-b border-[#e7e5e4]">
                <span className="font-medium text-[var(--color-dark)]">Tổng cộng</span>
                <span className="font-medium text-xl text-[var(--color-primary)]">{formatPrice(total)}</span>
              </div>

              {/* Free Shipping Progress */}
              {subtotal < 500000 && (
                <div className="py-4">
                  <p className="text-xs text-[#57534e] mb-2">
                    Mua thêm {formatPrice(500000 - subtotal)} để được miễn phí vận chuyển
                  </p>
                  <div className="h-1 bg-[#e7e5e4] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--color-primary)] rounded-full"
                      style={{ width: `${Math.min(100, (subtotal / 500000) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <Link href="/thanh-toan" className="block w-full text-center bg-[var(--color-dark)] text-white py-4 font-medium tracking-wide hover:bg-[var(--color-primary)] transition-colors mt-6 uppercase text-sm">
                Thanh Toán Ngay
              </Link>

              <p className="text-xs text-[#57534e] text-center mt-4">
                Miễn phí vận chuyển cho đơn hàng từ 500.000đ
              </p>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="text-center py-20">
            <ShoppingBag size={64} className="mx-auto text-[#e7e5e4] mb-6" />
            <h2 className="text-xl font-medium text-[var(--color-dark)] mb-2">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-[#57534e] mb-8">
              Hãy khám phá các sản phẩm tranh thêu tay tuyệt đẹp của chúng tôi
            </p>
            <Link
              href="/san-pham"
              className="inline-block bg-[var(--color-dark)] text-white px-8 py-3 font-medium tracking-wide hover:bg-[var(--color-primary)] transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


