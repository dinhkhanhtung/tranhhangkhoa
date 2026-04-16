"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Phone, MapPin } from "lucide-react";
import { useWebsite } from "@/context/WebsiteContext";

export default function FloatingContactBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { settings } = useWebsite();

  const contactButtons = [
    {
      id: "zalo",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="w-8 h-8" />,
      label: "Chat Zalo",
      href: `https://zalo.me/${settings.contact.zalo}`,
      color: "#0068ff",
    },
    {
      id: "messenger",
      icon: <MessageCircle size={24} />,
      label: "Messenger",
      href: settings.contact.facebook,
      color: "#0084ff",
    },
    {
      id: "phone",
      icon: <Phone size={24} />,
      label: "Gọi điện",
      href: `tel:${settings.contact.phone}`,
      color: "#10b981",
    },
    {
      id: "map",
      icon: <MapPin size={24} />,
      label: "Chỉ đường",
      href: `https://www.google.com/maps/search/${encodeURIComponent(settings.contact.address)}`,
      color: "#ef4444",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="hidden lg:flex fixed right-6 bottom-24 z-40 flex-col gap-3">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 mb-2"
              >
                {contactButtons.map((button, index) => (
                  <motion.a
                    key={button.id}
                    href={button.href}
                    target={button.id === "map" ? "_blank" : undefined}
                    rel={button.id === "map" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: (contactButtons.length - index) * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="group relative flex items-center justify-end gap-3"
                  >
                    <span className="bg-white/90 backdrop-blur-sm text-[var(--color-dark)] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-[#e7e5e4] opacity-0 group-hover:opacity-100 lg:opacity-0 transition-opacity whitespace-nowrap uppercase tracking-wider">
                      {button.label}
                    </span>
                    <div
                      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center overflow-hidden border-2 border-white"
                      style={{ backgroundColor: button.color }}
                    >
                      {button.icon}
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[var(--color-primary)] text-white shadow-2xl hover:shadow-xl transition-all flex items-center justify-center border-2 border-white relative"
          >
            {isExpanded ? <X size={28} /> : <MessageCircle size={28} />}
            {!isExpanded && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
