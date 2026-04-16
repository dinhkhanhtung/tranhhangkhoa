"use client";

import { useState } from "react";
import {
  Globe, Phone, Clock, Save, Upload,
  Image as ImageIcon, Palette, Layout,
  CreditCard, Truck, Search as SearchIcon,
  Facebook, Mail, MapPin, Zap, CheckCircle2,
  Layers, BookOpen, FileText, GraduationCap,
  Gift
} from "lucide-react";
import { useWebsite } from "@/context/WebsiteContext";

export default function WebsiteSettingsPage() {
  const { settings, updateSettings } = useWebsite();
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "seo" | "appearance" | "payment" | "shipping" | "modules" | "popup" | "facebook" | "hero">("general");
  const [tempSettings, setTempSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    updateSettings(tempSettings);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-20 bg-[#fffbf5]/80 backdrop-blur-md py-4 border-b border-[#e7e5e4]">
        <div>
          <h1 className="text-2xl font-bold text-[#1c1917] tracking-tight">Cài đặt Website</h1>
          <p className="text-sm text-[#57534e] mt-1 font-medium">Cấu hình thông tin, giao diện và vận hành website</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-6 py-2.5 text-white font-bold rounded-xl transition-all press-feedback ${
            saveSuccess ? "bg-green-600" : "bg-[#b45309] hover:bg-[#1c1917]"
          }`}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : saveSuccess ? (
            <CheckCircle2 size={18} />
          ) : (
            <Save size={18} />
          )}
          {saveSuccess ? "Đã lưu thành công" : "Lưu tất cả thay đổi"}
        </button>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-3 sticky top-28 shadow-sm">
            <nav className="space-y-1">
              {[
                { id: "general", label: "Thương hiệu", icon: Globe },
                { id: "contact", label: "Liên hệ", icon: Phone },
                { id: "seo", label: "Cấu hình SEO", icon: SearchIcon },
                { id: "appearance", label: "Giao diện", icon: Palette },
                { id: "hero", label: "Slide Banner", icon: Layout },
                { id: "payment", label: "Thanh toán", icon: CreditCard },
                { id: "shipping", label: "Vận chuyển", icon: Truck },
                { id: "modules", label: "Tính năng", icon: Layers },
                { id: "facebook", label: "Facebook Comments", icon: Facebook },
                { id: "popup", label: "Popup quảng cáo", icon: Gift },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${
                    activeTab === tab.id
                      ? "bg-[#b45309] text-white shadow-md shadow-[#b45309]/20"
                      : "text-[#57534e] hover:bg-[#b45309]/5 hover:text-[#b45309]"
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-8 shadow-sm">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#b45309]/10 rounded-2xl flex items-center justify-center text-[#b45309]">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Thông tin thương hiệu</h3>
                    <p className="text-sm text-[#57534e] font-medium">Thiết lập tên tuổi và hình ảnh cốt lõi</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Tên website</label>
                    <input 
                      type="text" 
                      value={tempSettings.brand.name} 
                      onChange={(e) => setTempSettings({...tempSettings, brand: {...tempSettings.brand, name: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Slogan</label>
                    <input 
                      type="text" 
                      value={tempSettings.brand.slogan} 
                      onChange={(e) => setTempSettings({...tempSettings, brand: {...tempSettings.brand, slogan: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Mô tả ngắn</label>
                  <textarea
                    value={tempSettings.brand.description}
                    onChange={(e) => setTempSettings({...tempSettings, brand: {...tempSettings.brand, description: e.target.value}})}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none font-medium resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Logo Website</label>
                    <div className="aspect-[3/1] bg-[#fffbf5] border-2 border-dashed border-[#e7e5e4] rounded-2xl flex flex-col items-center justify-center hover:border-[#b45309] transition-all cursor-pointer overflow-hidden">
                      {tempSettings.brand.logo ? (
                        <img src={tempSettings.brand.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                      ) : (
                        <>
                          <Upload size={24} className="mb-2 text-[#57534e]" />
                          <p className="text-xs font-bold text-[#57534e]">Tải lên logo</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Favicon</label>
                    <div className="w-24 h-24 bg-[#fffbf5] border-2 border-dashed border-[#e7e5e4] rounded-2xl flex flex-col items-center justify-center hover:border-[#b45309] transition-all cursor-pointer overflow-hidden">
                      {tempSettings.brand.favicon ? (
                        <img src={tempSettings.brand.favicon} alt="Favicon" className="w-full h-full object-contain p-2" />
                      ) : (
                        <>
                          <ImageIcon size={24} className="mb-2 text-[#57534e]" />
                          <p className="text-[10px] font-bold text-[#57534e]">Tải lên</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Settings */}
            {activeTab === "contact" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#b45309]/10 rounded-2xl flex items-center justify-center text-[#b45309]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Thông tin liên hệ</h3>
                    <p className="text-sm text-[#57534e] font-medium">Thông tin hiển thị tại Header, Footer và Liên hệ</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Số điện thoại</label>
                    <input 
                      type="tel" 
                      value={tempSettings.contact.phone} 
                      onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, phone: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Email hỗ trợ</label>
                    <input 
                      type="email" 
                      value={tempSettings.contact.email} 
                      onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, email: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Zalo</label>
                    <input 
                      type="text" 
                      value={tempSettings.contact.zalo} 
                      onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, zalo: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Facebook Page</label>
                    <input 
                      type="text" 
                      value={tempSettings.contact.facebook} 
                      onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, facebook: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Địa chỉ Showroom</label>
                  <input 
                    type="text" 
                    value={tempSettings.contact.address} 
                    onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, address: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                  />
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === "seo" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600">
                    <SearchIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Cấu hình SEO</h3>
                    <p className="text-sm text-[#57534e] font-medium">Tối ưu hóa website trên Google</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Meta Title mặc định</label>
                    <input 
                      type="text" 
                      value={tempSettings.seo.title} 
                      onChange={(e) => setTempSettings({...tempSettings, seo: {...tempSettings.seo, title: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Meta Description</label>
                    <textarea 
                      rows={3} 
                      value={tempSettings.seo.description} 
                      onChange={(e) => setTempSettings({...tempSettings, seo: {...tempSettings.seo, description: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none resize-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Từ khóa (Keywords)</label>
                    <input 
                      type="text" 
                      value={tempSettings.seo.keywords} 
                      onChange={(e) => setTempSettings({...tempSettings, seo: {...tempSettings.seo, keywords: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Modules Settings */}
            {activeTab === "modules" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#b45309]/10 rounded-2xl flex items-center justify-center text-[#b45309]">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1c1917]">Tính năng</h2>
                    <p className="text-sm text-[#57534e]">Bật/tắt các chức năng của website</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Courses Toggle */}
                  <div className="flex items-center justify-between p-4 border border-[#e7e5e4] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1c1917]">Khóa học Online</h3>
                        <p className="text-sm text-[#57534e]">Hiển thị trang khóa học và chức năng đào tạo</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.modules?.courses ?? true}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          modules: { ...tempSettings.modules, courses: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>

                  {/* Resources Toggle */}
                  <div className="flex items-center justify-between p-4 border border-[#e7e5e4] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1c1917]">Tài nguyên / Mẫu thêu</h3>
                        <p className="text-sm text-[#57534e]">Hiển thị trang tải mẫu thêu miễn phí</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.modules?.resources ?? true}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          modules: { ...tempSettings.modules, resources: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>

                  {/* Blog Toggle */}
                  <div className="flex items-center justify-between p-4 border border-[#e7e5e4] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1c1917]">Tin tức / Blog</h3>
                        <p className="text-sm text-[#57534e]">Hiển thị trang tin tức và bài viết</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.modules?.blog ?? true}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          modules: { ...tempSettings.modules, blog: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#b45309]/10 rounded-2xl flex items-center justify-center text-[#b45309]">
                    <Palette size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Màu sắc chủ đạo</h3>
                    <p className="text-sm text-[#57534e] font-medium">Chọn bảng màu phù hợp với thương hiệu của bạn</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Theme Presets */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-[#1c1917] uppercase tracking-wider">Bảng màu có sẵn</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { id: "amber", name: "Hổ Phách", desc: "Truyền thống, ấm áp", color: "#b45309" },
                        { id: "emerald", name: "Ngọc Lục", desc: "Tự nhiên, thanh bình", color: "#047857" },
                        { id: "blue", name: "Xanh Cobalt", desc: "Hiện đại, chuyên nghiệp", color: "#1d4ed8" },
                        { id: "rose", name: "Hồng Đào", desc: "Nữ tính, tinh tế", color: "#be123c" },
                        { id: "violet", name: "Tím Cẩm Thạch", desc: "Sang trọng, nghệ thuật", color: "#7c3aed" },
                        { id: "orange", name: "Cam Đất", desc: "Năng động, Việt Nam", color: "#c2410c" },
                        { id: "custom", name: "Tùy chỉnh", desc: "Màu của riêng bạn", color: "#78716c" },
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            const newSettings = {
                              ...tempSettings,
                              theme: { ...tempSettings.theme, preset: preset.id as any }
                            };
                            // If not custom, auto-fill colors from preset
                            if (preset.id !== "custom") {
                              const presetData = {
                                amber: { primary: "#b45309", secondary: "#d97706", accent: "#fbbf24", dark: "#1c1917" },
                                emerald: { primary: "#047857", secondary: "#059669", accent: "#34d399", dark: "#064e3b" },
                                blue: { primary: "#1d4ed8", secondary: "#2563eb", accent: "#60a5fa", dark: "#1e3a8a" },
                                rose: { primary: "#be123c", secondary: "#e11d48", accent: "#fb7185", dark: "#881337" },
                                violet: { primary: "#7c3aed", secondary: "#8b5cf6", accent: "#a78bfa", dark: "#4c1d95" },
                                orange: { primary: "#c2410c", secondary: "#ea580c", accent: "#fb923c", dark: "#7c2d12" },
                              }[preset.id];
                              if (presetData) {
                                newSettings.theme = {
                                  ...newSettings.theme,
                                  primaryColor: presetData.primary,
                                  secondaryColor: presetData.secondary,
                                  accentColor: presetData.accent,
                                  darkColor: presetData.dark,
                                };
                              }
                            }
                            setTempSettings(newSettings);
                          }}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            tempSettings.theme?.preset === preset.id
                              ? "border-[#b45309] bg-[#b45309]/5"
                              : "border-[#e7e5e4] hover:border-[#b45309]/30"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                              style={{ backgroundColor: preset.color }}
                            />
                            {tempSettings.theme?.preset === preset.id && (
                              <div className="text-[#b45309]">✓</div>
                            )}
                          </div>
                          <div className="font-medium text-[#1c1917] text-sm">{preset.name}</div>
                          <div className="text-xs text-[#57534e] mt-1">{preset.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors (only when custom preset selected) */}
                  {tempSettings.theme?.preset === "custom" && (
                    <div className="space-y-4 p-6 bg-[#f5f5f4] rounded-xl border border-[#e7e5e4]">
                      <h4 className="font-medium text-[#1c1917]">Tùy chỉnh màu sắc</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-[#57534e]">Màu chính (Buttons, Links)</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={tempSettings.theme?.primaryColor || "#b45309"}
                              onChange={(e) => setTempSettings({
                                ...tempSettings,
                                theme: { ...tempSettings.theme, primaryColor: e.target.value }
                              })}
                              className="w-12 h-10 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={tempSettings.theme?.primaryColor || "#b45309"}
                              onChange={(e) => setTempSettings({
                                ...tempSettings,
                                theme: { ...tempSettings.theme, primaryColor: e.target.value }
                              })}
                              className="flex-1 px-3 py-2 border border-[#e7e5e4] rounded-lg text-sm"
                              placeholder="#b45309"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-[#57534e]">Màu phụ (Hover, Gradient)</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={tempSettings.theme?.secondaryColor || "#d97706"}
                              onChange={(e) => setTempSettings({
                                ...tempSettings,
                                theme: { ...tempSettings.theme, secondaryColor: e.target.value }
                              })}
                              className="w-12 h-10 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={tempSettings.theme?.secondaryColor || "#d97706"}
                              onChange={(e) => setTempSettings({
                                ...tempSettings,
                                theme: { ...tempSettings.theme, secondaryColor: e.target.value }
                              })}
                              className="flex-1 px-3 py-2 border border-[#e7e5e4] rounded-lg text-sm"
                              placeholder="#d97706"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-[#57534e]">Màu nhấn (Badges, Tags)</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={tempSettings.theme?.accentColor || "#fbbf24"}
                              onChange={(e) => setTempSettings({
                                ...tempSettings,
                                theme: { ...tempSettings.theme, accentColor: e.target.value }
                              })}
                              className="w-12 h-10 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={tempSettings.theme?.accentColor || "#fbbf24"}
                              onChange={(e) => setTempSettings({
                                ...tempSettings,
                                theme: { ...tempSettings.theme, accentColor: e.target.value }
                              })}
                              className="flex-1 px-3 py-2 border border-[#e7e5e4] rounded-lg text-sm"
                              placeholder="#fbbf24"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-[#57534e]">Màu tối (Text nền đen)</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={tempSettings.theme?.darkColor || "#1c1917"}
                              onChange={(e) => setTempSettings({
                                ...tempSettings,
                                theme: { ...tempSettings.theme, darkColor: e.target.value }
                              })}
                              className="w-12 h-10 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={tempSettings.theme?.darkColor || "#1c1917"}
                              onChange={(e) => setTempSettings({
                                ...tempSettings,
                                theme: { ...tempSettings.theme, darkColor: e.target.value }
                              })}
                              className="flex-1 px-3 py-2 border border-[#e7e5e4] rounded-lg text-sm"
                              placeholder="#1c1917"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Preview */}
                  <div className="p-6 rounded-xl border border-[#e7e5e4]">
                    <h4 className="font-medium text-[#1c1917] mb-4">Xem trước</h4>
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="px-4 py-2 rounded-lg text-white font-medium"
                        style={{ backgroundColor: tempSettings.theme?.primaryColor || "#b45309" }}
                      >
                        Nút chính
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg text-white font-medium"
                        style={{ backgroundColor: tempSettings.theme?.secondaryColor || "#d97706" }}
                      >
                        Nút phụ
                      </button>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: tempSettings.theme?.accentColor || "#fbbf24", color: tempSettings.theme?.darkColor || "#1c1917" }}
                      >
                        Nhãn
                      </span>
                      <div
                        className="px-4 py-2 rounded-lg text-white font-medium"
                        style={{ backgroundColor: tempSettings.theme?.darkColor || "#1c1917" }}
                      >
                        Nền tối
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Popup Settings */}
            {activeTab === "popup" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#b45309]/10 rounded-2xl flex items-center justify-center text-[#b45309]">
                    <Gift size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Popup quảng cáo</h3>
                    <p className="text-sm text-[#57534e] font-medium">Hiển thị thông báo cho khách lần đầu ghé thăm</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Enable/Disable */}
                  <div className="flex items-center justify-between p-4 bg-[#fffbf5] rounded-xl border border-[#e7e5e4]">
                    <div>
                      <h4 className="font-medium text-[#1c1917]">Bật popup</h4>
                      <p className="text-sm text-[#57534e]">Hiển thị popup cho khách hàng</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.popup?.enabled ?? false}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, enabled: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>

                  {/* Template Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-[#1c1917]">Mẫu popup</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "promotion", label: "Khuyến mãi", icon: "🎁" },
                        { value: "text", label: "Văn bản", icon: "📝" },
                        { value: "image", label: "Ảnh", icon: "🖼️" },
                      ].map((template) => (
                        <button
                          key={template.value}
                          type="button"
                          onClick={() => setTempSettings({
                            ...tempSettings,
                            popup: { ...tempSettings.popup, template: template.value as any }
                          })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            tempSettings.popup?.template === template.value
                              ? "border-[#b45309] bg-[#b45309]/5"
                              : "border-[#e7e5e4] hover:border-[#b45309]/30"
                          }`}
                        >
                          <div className="text-2xl mb-2">{template.icon}</div>
                          <div className="text-sm font-medium text-[#1c1917]">{template.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload (only for image template) */}
                  {tempSettings.popup?.template === "image" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Ảnh popup</label>
                      <div className="p-4 border-2 border-dashed border-[#e7e5e4] rounded-xl">
                        <input
                          type="text"
                          value={tempSettings.popup?.image || ""}
                          onChange={(e) => setTempSettings({
                            ...tempSettings,
                            popup: { ...tempSettings.popup, image: e.target.value }
                          })}
                          placeholder="Dán đường dẫn ảnh từ ImgBB..."
                          className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                        />
                        <p className="text-xs text-[#57534e] mt-2">Tải ảnh lên ImgBB và dán link vào đây</p>
                      </div>
                    </div>
                  )}

                  {/* Title (only for text and promotion templates) */}
                  {tempSettings.popup?.template !== "image" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Tiêu đề</label>
                      <input
                        type="text"
                        value={tempSettings.popup?.title || ""}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, title: e.target.value }
                        })}
                        placeholder="VD: ƯU ĐÃI ĐẶC BIỆT"
                        className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Content (only for text and promotion templates) */}
                  {tempSettings.popup?.template !== "image" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Nội dung</label>
                      <textarea
                        value={tempSettings.popup?.content || ""}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, content: e.target.value }
                        })}
                        placeholder="VD: Giảm 20% cho đơn hàng đầu tiên!"
                        rows={3}
                        className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none"
                      />
                    </div>
                  )}

                  {/* Button Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Text nút</label>
                      <input
                        type="text"
                        value={tempSettings.popup?.buttonText || ""}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, buttonText: e.target.value }
                        })}
                        placeholder="VD: Mua ngay"
                        className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Link nút</label>
                      <input
                        type="text"
                        value={tempSettings.popup?.buttonLink || ""}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, buttonLink: e.target.value }
                        })}
                        placeholder="VD: /san-pham"
                        className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Show After */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-[#1c1917]">Hiện sau bao nhiêu giây</label>
                    <input
                      type="number"
                      value={tempSettings.popup?.showAfter || 3}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        popup: { ...tempSettings.popup, showAfter: parseInt(e.target.value) || 3 }
                      })}
                      min="0"
                      max="30"
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    />
                  </div>

                  {/* Show Once */}
                  <div className="flex items-center justify-between p-4 bg-[#fffbf5] rounded-xl border border-[#e7e5e4]">
                    <div>
                      <h4 className="font-medium text-[#1c1917]">Chỉ hiện 1 lần</h4>
                      <p className="text-sm text-[#57534e]">Không hiện lại cho khách đã xem</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.popup?.showOnce ?? true}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, showOnce: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Facebook Comments Settings */}
            {activeTab === "facebook" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center text-[#1877F2]">
                    <Facebook size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Facebook Comments</h3>
                    <p className="text-sm text-[#57534e] font-medium">Tích hợp bình luận Facebook vào website</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Enable/Disable */}
                  <div className="flex items-center justify-between p-4 bg-[#fffbf5] rounded-xl border border-[#e7e5e4]">
                    <div>
                      <h4 className="font-medium text-[#1c1917]">Bật Facebook Comments</h4>
                      <p className="text-sm text-[#57534e]">Hiển thị bình luận Facebook trên các trang sản phẩm và bài viết</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.facebookComments?.enabled ?? false}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          facebookComments: { ...tempSettings.facebookComments, enabled: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1877F2]"></div>
                    </label>
                  </div>

                  {/* App ID */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-[#1c1917] uppercase tracking-wider">Facebook App ID</label>
                    <input
                      type="text"
                      value={tempSettings.facebookComments?.appId || ""}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        facebookComments: { ...tempSettings.facebookComments, appId: e.target.value }
                      })}
                      placeholder="123456789012345"
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#1877F2] focus:outline-none"
                    />
                    <p className="text-xs text-[#57534e]">Lấy App ID từ Facebook Developers Console</p>
                  </div>

                  {/* SDK Code */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-[#1c1917] uppercase tracking-wider">Mã SDK Facebook</label>
                    <textarea
                      rows={6}
                      value={tempSettings.facebookComments?.sdkCode || ""}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        facebookComments: { ...tempSettings.facebookComments, sdkCode: e.target.value }
                      })}
                      placeholder="<!-- Dán mã SDK Facebook của bạn vào đây -->"
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#1877F2] focus:outline-none resize-none font-mono text-sm"
                    />
                    <p className="text-xs text-[#57534e]">Dán đoạn mã SDK từ Facebook Developers vào đây. Hệ thống sẽ tự động chèn vào website.</p>
                  </div>

                  {/* Instructions */}
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Hướng dẫn lấy mã SDK:</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Vào <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Facebook Developers</a></li>
                      <li>Tạo ứng dụng mới hoặc chọn ứng dụng có sẵn</li>
                      <li>Vào Settings → Basic để lấy App ID</li>
                      <li>Vào Products → Facebook Comments → Setup</li>
                      <li>Copy đoạn mã SDK và dán vào ô bên trên</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Banner Settings */}
            {activeTab === "hero" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
                    <Layout size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Slide Banner</h3>
                    <p className="text-sm text-[#57534e] font-medium">Quản lý slide banner trang chủ</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Show Overlay Text Toggle */}
                  <div className="flex items-center justify-between p-4 bg-[#fffbf5] rounded-xl border border-[#e7e5e4]">
                    <div>
                      <h4 className="font-medium text-[#1c1917]">Hiển thị text trên slide</h4>
                      <p className="text-sm text-[#57534e]">Tắt nếu banner đã thiết kế sẵn có chữ, bật nếu cần thêm text overlay</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.hero?.showOverlayText ?? true}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          hero: { ...tempSettings.hero, showOverlayText: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                  </div>

                  {/* Slides Management */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-[#1c1917]">Quản lý slides</h4>
                    {(tempSettings.hero?.slides || []).map((slide, index) => (
                      <div key={slide.id} className="p-4 border border-[#e7e5e4] rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-[#1c1917]">Slide {index + 1}</h5>
                          <button
                            onClick={() => {
                              const newSlides = tempSettings.hero?.slides.filter(s => s.id !== slide.id) || [];
                              setTempSettings({
                                ...tempSettings,
                                hero: { ...tempSettings.hero, slides: newSlides }
                              });
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Xóa
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={slide.image}
                            onChange={(e) => {
                              const newSlides = [...(tempSettings.hero?.slides || [])];
                              newSlides[index].image = e.target.value;
                              setTempSettings({
                                ...tempSettings,
                                hero: { ...tempSettings.hero, slides: newSlides }
                              });
                            }}
                            placeholder="URL ảnh"
                            className="px-4 py-2 border border-[#e7e5e4] rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const newSlides = [...(tempSettings.hero?.slides || [])];
                              newSlides[index].title = e.target.value;
                              setTempSettings({
                                ...tempSettings,
                                hero: { ...tempSettings.hero, slides: newSlides }
                              });
                            }}
                            placeholder="Tiêu đề"
                            className="px-4 py-2 border border-[#e7e5e4] rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            value={slide.subtitle}
                            onChange={(e) => {
                              const newSlides = [...(tempSettings.hero?.slides || [])];
                              newSlides[index].subtitle = e.target.value;
                              setTempSettings({
                                ...tempSettings,
                                hero: { ...tempSettings.hero, slides: newSlides }
                              });
                            }}
                            placeholder="Mô tả"
                            className="px-4 py-2 border border-[#e7e5e4] rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            value={slide.cta}
                            onChange={(e) => {
                              const newSlides = [...(tempSettings.hero?.slides || [])];
                              newSlides[index].cta = e.target.value;
                              setTempSettings({
                                ...tempSettings,
                                hero: { ...tempSettings.hero, slides: newSlides }
                              });
                            }}
                            placeholder="Nút CTA"
                            className="px-4 py-2 border border-[#e7e5e4] rounded-lg text-sm"
                          />
                        </div>
                        <input
                          type="text"
                          value={slide.href}
                          onChange={(e) => {
                            const newSlides = [...(tempSettings.hero?.slides || [])];
                            newSlides[index].href = e.target.value;
                            setTempSettings({
                              ...tempSettings,
                              hero: { ...tempSettings.hero, slides: newSlides }
                            });
                          }}
                          placeholder="Link đích"
                          className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg text-sm"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newSlide = {
                          id: Date.now().toString(),
                          image: "",
                          title: "Tiêu đề mới",
                          subtitle: "Mô tả",
                          cta: "Xem thêm",
                          href: "/"
                        };
                        setTempSettings({
                          ...tempSettings,
                          hero: { 
                            ...tempSettings.hero, 
                            slides: [...(tempSettings.hero?.slides || []), newSlide] 
                          }
                        });
                      }}
                      className="w-full py-3 border-2 border-dashed border-[#e7e5e4] rounded-xl text-[#57534e] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      + Thêm slide mới
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

