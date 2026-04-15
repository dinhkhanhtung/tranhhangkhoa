"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ShoppingBag, BookOpen, Store } from "lucide-react";
import { useCart } from "@/context/CartContext";

const menuItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/san-pham", label: "Shop", icon: Store },
  { href: "/gio-hang", label: "Giỏ hàng", icon: ShoppingBag, badge: true },
  { href: "/tai-nguyen", label: "Mẫu thêu", icon: BookOpen },
  { href: "/bai-viet", label: "Tin tức", icon: BookOpen },
];

export default function MobileBottomBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    // Only show on mobile devices
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't show on admin pages
  if (pathname?.startsWith("/admin")) return null;

  if (!isVisible) return null;

  return (
    <>
      {/* Main Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-[#e7e5e4] z-50 lg:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-around h-16 pb-safe">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full relative group active:scale-90 transition-transform duration-200"
              >
                <div className="relative p-1">
                  <Icon 
                    size={22} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-all duration-300 ${isActive ? "text-[#b45309] scale-110" : "text-[#57534e]"}`}
                  />
                  {/* Cart Badge */}
                  {item.badge && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[#b45309] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 font-bold tracking-tight transition-colors duration-300 ${isActive ? "text-[#b45309]" : "text-[#57534e]"}`}>
                  {item.label}
                </span>
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-1 w-1 h-1 bg-[#b45309] rounded-full" 
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
