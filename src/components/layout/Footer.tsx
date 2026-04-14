"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Facebook } from "@thesvg/react";
import { useWebsite } from "@/context/WebsiteContext";

const footerLinks = {
  shop: [
    { name: "Tranh Thêu Tay", href: "/san-pham" },
    { name: "Phụ Kiện Thêu", href: "/phu-kien" },
    { name: "Khóa Học Online", href: "/khoa-hoc" },
    { name: "Khung Tranh", href: "/phu-kien" },
  ],
  support: [
    { name: "Hướng Dẫn Mua Hàng", href: "#" },
    { name: "Chính Sách Đổi Trả", href: "#" },
    { name: "Vận Chuyển & Giao Hàng", href: "#" },
    { name: "Câu Hỏi Thường Gặp", href: "#" },
  ],
  company: [
    { name: "Về Chúng Tôi", href: "/gioi-thieu" },
    { name: "Câu Chuyện Thương Hiệu", href: "/gioi-thieu" },
    { name: "Liên Hệ", href: "/lien-he" },
    { name: "Tuyển Dụng", href: "#" },
  ],
};

export default function Footer() {
  const { settings } = useWebsite();

  return (
    <footer className="bg-[#1c1917] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-center lg:text-left">
              {settings.brand.logo ? (
                <img src={settings.brand.logo} alt={settings.brand.name} className="h-8 lg:h-10 w-auto object-contain brightness-0 invert" />
              ) : (
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-xl font-serif text-white tracking-wide uppercase">
                    {settings.brand.name}
                  </div>
                  <div className="text-[10px] tracking-[0.3em] text-white/60 uppercase font-medium mt-1">
                    {settings.brand.slogan}
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm mt-4">
              {settings.brand.description}
            </p>
            <div className="flex gap-4 pt-4">
              <a href={settings.contact.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#b45309] hover:text-[#b45309] transition-all rounded-full">
                <Facebook width={18} height={18} variant="mono" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-6 text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              Cửa Hàng
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-[#b45309] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-6 text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              Hỗ Trợ
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-[#b45309] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              Liên Hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#b45309] mt-0.5" />
                <span className="text-sm text-white/60">{settings.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#b45309] mt-0.5" />
                <span className="text-sm text-white/60">{settings.contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#b45309] mt-0.5" />
                <span className="text-sm text-white/60">{settings.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-white/30 uppercase tracking-widest">
              © {new Date().getFullYear()} {settings.brand.name}. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="text-[10px] text-white/30 uppercase tracking-widest hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="#" className="text-[10px] text-white/30 uppercase tracking-widest hover:text-white transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
