"use client";

import { useState, useEffect } from "react";
import { X, Gift, Tag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useWebsite } from "@/context/WebsiteContext";

export default function PopupModal() {
  const { settings } = useWebsite();
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    // Check if popup is enabled
    if (!settings.popup.enabled) return;

    // Check if user has seen popup (if showOnce is true)
    if (settings.popup.showOnce) {
      const seen = localStorage.getItem("popup_seen");
      if (seen) return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, settings.popup.showAfter * 1000);

    return () => clearTimeout(timer);
  }, [settings.popup]);

  const handleClose = () => {
    setIsOpen(false);

    // Mark as seen if showOnce is true
    if (settings.popup.showOnce) {
      localStorage.setItem("popup_seen", "true");
      setHasSeen(true);
    }
  };

  if (!isOpen || hasSeen) return null;

  const renderContent = () => {
    switch (settings.popup.template) {
      case "image":
        return (
          <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden rounded-t-lg">
            {settings.popup.image ? (
              <Image
                src={settings.popup.image}
                alt="Popup"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
            )}
          </div>
        );

      case "text":
        return (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-2xl font-serif text-[var(--color-dark)] mb-3">
              {settings.popup.title || "Thông báo"}
            </h3>
            <p className="text-[#57534e] leading-relaxed">
              {settings.popup.content || "Nội dung thông báo"}
            </p>
          </div>
        );

      case "promotion":
      default:
        return (
          <div className="p-8 text-center bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/30">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[var(--color-primary)] mb-3">
              {settings.popup.title || "ƯU ĐÃI ĐẶC BIỆT"}
            </h3>
            <p className="text-lg text-[#57534e] leading-relaxed mb-6">
              {settings.popup.content || "Giảm 20% cho đơn hàng đầu tiên!"}
            </p>
            <div className="inline-block px-6 py-2 bg-[var(--color-dark)] text-white text-sm font-medium rounded-full">
              Mã: NEW20
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          aria-label="Đóng"
        >
          <X size={18} className="text-white" />
        </button>

        {/* Content */}
        {renderContent()}

        {/* Button */}
        {settings.popup.template !== "image" && (
          <div className="p-6 pt-0">
            {settings.popup.buttonLink ? (
              <Link
                href={settings.popup.buttonLink}
                onClick={handleClose}
                className="block w-full py-3 px-6 bg-[var(--color-primary)] hover:bg-[var(--color-dark)] text-white font-medium text-center rounded-lg transition-colors"
              >
                {settings.popup.buttonText || "Xem ngay"}
              </Link>
            ) : (
              <button
                onClick={handleClose}
                className="w-full py-3 px-6 bg-[var(--color-primary)] hover:bg-[var(--color-dark)] text-white font-medium rounded-lg transition-colors"
              >
                {settings.popup.buttonText || "Đóng"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

