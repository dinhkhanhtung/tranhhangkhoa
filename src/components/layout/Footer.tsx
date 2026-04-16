"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { TiktokIcon, TwitterIcon } from "@/components/icons";
import { useWebsite } from "@/context/WebsiteContext";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

const footerLinks = {
  shop: [
    { name: "Tranh Thêu Tay", href: "/san-pham" },
    { name: "Phụ Kiện Thêu", href: "/phu-kien" },
    { name: "Khóa Học Online", href: "/khoa-hoc" },
    { name: "Mẫu Thêu Miễn Phí", href: "/tai-nguyen" },
    { name: "Khung Tranh", href: "/phu-kien" },
  ],
  company: [
    { name: "Về Chúng Tôi", href: "/gioi-thieu" },
    { name: "Câu Chuyện Thương Hiệu", href: "/gioi-thieu" },
    { name: "Liên Hệ", href: "/lien-he" },
    { name: "Tuyển Dụng", href: "#" },
  ],
};

// Default support links (fallback if no posts)
const defaultSupportLinks = [
  { name: "Hướng Dẫn Mua Hàng", href: "#" },
  { name: "Chính Sách Đổi Trả", href: "#" },
  { name: "Vận Chuyển & Giao Hàng", href: "#" },
  { name: "Câu Hỏi Thường Gặp", href: "#" },
];

interface SupportPost {
  id: string;
  title: string;
  slug: string;
  category: string;
}

export default function Footer() {
  const { settings } = useWebsite();
  const [supportLinks, setSupportLinks] = useState<{name: string, href: string}[]>(defaultSupportLinks);
  const [loading, setLoading] = useState(true);

  // Fetch support posts from Firebase
  useEffect(() => {
    const fetchSupportPosts = async () => {
      if (!db) return;
      
      try {
        // Query posts with category "Hỗ trợ" or "Hướng dẫn"
        const postsRef = collection(db, "posts");
        const q = query(
          postsRef,
          where("category", "in", ["Hỗ trợ", "Hướng dẫn", "Chính sách"]),
          where("status", "==", "published"),
          limit(6)
        );
        
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const posts = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              name: data.title,
              href: `/bai-viet/${data.slug || doc.id}`,
            };
          });
          setSupportLinks(posts);
        }
      } catch (error) {
        console.error("Error fetching support posts:", error);
        // Keep default links on error
      } finally {
        setLoading(false);
      }
    };

    fetchSupportPosts();
  }, []);

  return (
    <footer className="bg-[var(--color-dark)] text-white">
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
            <div className="flex gap-3 pt-4 flex-wrap">
              {settings.contact.facebook && (
                <a href={settings.contact.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all rounded-full">
                  <Facebook size={18} />
                </a>
              )}
              {settings.contact.instagram && (
                <a href={settings.contact.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all rounded-full">
                  <Instagram size={18} />
                </a>
              )}
              {settings.contact.youtube && (
                <a href={settings.contact.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all rounded-full">
                  <Youtube size={18} />
                </a>
              )}
              {settings.contact.tiktok && (
                <a href={settings.contact.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all rounded-full">
                  <TiktokIcon size={18} />
                </a>
              )}
              {settings.contact.twitter && (
                <a href={settings.contact.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all rounded-full">
                  <TwitterIcon size={18} />
                </a>
              )}
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
                  <Link href={link.href} className="text-sm text-white/50 hover:text-[var(--color-primary)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links - Dynamic from Firebase */}
          <div>
            <h4 className="mb-6 text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              Hỗ Trợ
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link: {name: string, href: string}) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-[var(--color-primary)] transition-colors">
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
                <Phone className="h-4 w-4 shrink-0 text-[var(--color-primary)] mt-0.5" />
                <span className="text-sm text-white/60">{settings.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[var(--color-primary)] mt-0.5" />
                <span className="text-sm text-white/60">{settings.contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--color-primary)] mt-0.5" />
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

