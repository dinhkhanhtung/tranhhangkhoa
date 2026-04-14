"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, BookOpen, Search, User } from "lucide-react";

const menuItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/san-pham", label: "Sản phẩm", icon: Search },
  { href: "/gio-hang", label: "Giỏ hàng", icon: ShoppingBag, badge: true },
  { href: "/bai-viet", label: "Tin tức", icon: BookOpen },
];

export default function MobileBottomBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [cartCount] = useState(2); // Mock cart count

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
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e7e5e4] z-50 lg:hidden">
        <div className="flex items-center justify-around h-16 safe-area-pb">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                <div className="relative">
                  <Icon 
                    size={22} 
                    className={`transition-colors ${isActive ? "text-[#b45309]" : "text-[#57534e]"}`}
                  />
                  {/* Cart Badge */}
                  {item.badge && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#b45309] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-[#b45309]" : "text-[#57534e]"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-[1px] left-0 right-0 flex justify-center">
                    <div className="w-8 h-[2px] bg-[#b45309] rounded-full" />
                  </div>
                )}
              </Link>
            );
          })}
          
          {/* Account Button */}
          {(() => {
            const isActive = pathname === "/tai-khoan" || pathname?.startsWith("/tai-khoan/");
            return (
              <Link
                href="/tai-khoan"
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                <User size={22} className={`transition-colors ${isActive ? "text-[#b45309]" : "text-[#57534e]"}`} />
                <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-[#b45309]" : "text-[#57534e]"}`}>Tài khoản</span>
                {isActive && (
                  <div className="absolute -top-[1px] left-0 right-0 flex justify-center">
                    <div className="w-8 h-[2px] bg-[#b45309] rounded-full" />
                  </div>
                )}
              </Link>
            );
          })()}
        </div>
      </nav>

    </>
  );
}
