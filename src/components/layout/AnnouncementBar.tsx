"use client";

import { motion } from "framer-motion";

import { useWebsite } from "@/context/WebsiteContext";

export default function AnnouncementBar() {
  const { settings } = useWebsite();
  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white h-[40px] flex items-center overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-8 text-xs font-medium uppercase tracking-wider">
            Miễn phí vận chuyển cho đơn hàng từ {formatPrice(settings.shipping.freeshipThreshold)} • Đặt hàng ngay hôm nay qua Zalo: {settings.contact.phone}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

