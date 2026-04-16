"use client";

import { useState, useEffect } from "react";
import { 
  Save, CheckCircle, AlertCircle, Lock, Unlock, Copy,
  Facebook, Image as ImageIcon, Mail, Zap, Settings as SettingsIcon,
  RefreshCcw, Trash2
} from "lucide-react";
import { configStore, APISettings } from "@/lib/config-store";

export default function APISettingsPage() {
  const [showSecrets, setShowSecrets] = useState(false);
  const [settings, setSettings] = useState<APISettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const loadedSettings = configStore.getSettings();
    setSettings(loadedSettings);
  }, []);

  const handleSave = () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      configStore.saveSettings(settings);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ cài đặt? Hành động này sẽ khôi phục về mặc định.")) {
      configStore.clearSettings();
    }
  };

  if (!settings) return <div className="p-8 text-center text-[#57534e]">Đang tải cấu hình...</div>;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-30 bg-[#fffbf5]/80 backdrop-blur-md py-4 border-b border-[#e7e5e4]">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Cài đặt API</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý các API key và tích hợp dịch vụ cho việc nhân bản dự án</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} /> Xóa trắng
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg transition-all ${
              saveStatus === "success" ? "bg-green-600" : "bg-[#b45309] hover:bg-[#1c1917]"
            } disabled:opacity-50`}
          >
            {isSaving ? <RefreshCcw size={16} className="animate-spin" /> : <Save size={16} />}
            {saveStatus === "success" ? "Đã lưu!" : "Lưu cài đặt"}
          </button>
        </div>
      </div>

      {/* API Settings */}
      <div className="space-y-6">
        {/* Firebase - Core Database */}
        <div className="bg-white rounded-lg border border-[#e7e5e4] p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <Zap size={24} className="text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1c1917]">Firebase (Database & Auth)</h3>
                <p className="text-sm text-[#57534e]">Cấu hình cốt lõi để lưu trữ dữ liệu và quản lý người dùng</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                settings.firebase.apiKey ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {settings.firebase.apiKey ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                {settings.firebase.apiKey ? "Đã cấu hình" : "Chưa cấu hình"}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#57534e]">API Key</label>
              <input
                type={showSecrets ? "text" : "password"}
                value={settings.firebase.apiKey}
                onChange={(e) => setSettings({...settings, firebase: {...settings.firebase, apiKey: e.target.value}})}
                placeholder="AIzaSy..."
                className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#57534e]">Project ID</label>
              <input
                type="text"
                value={settings.firebase.projectId}
                onChange={(e) => setSettings({...settings, firebase: {...settings.firebase, projectId: e.target.value}})}
                placeholder="my-project-id"
                className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#57534e]">Auth Domain</label>
              <input
                type="text"
                value={settings.firebase.authDomain}
                onChange={(e) => setSettings({...settings, firebase: {...settings.firebase, authDomain: e.target.value}})}
                placeholder="project.firebaseapp.com"
                className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#57534e]">Storage Bucket</label>
              <input
                type="text"
                value={settings.firebase.storageBucket}
                onChange={(e) => setSettings({...settings, firebase: {...settings.firebase, storageBucket: e.target.value}})}
                placeholder="project.appspot.com"
                className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#57534e]">App ID</label>
              <input
                type="text"
                value={settings.firebase.appId}
                onChange={(e) => setSettings({...settings, firebase: {...settings.firebase, appId: e.target.value}})}
                placeholder="1:123456789:web:abcdef"
                className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#57534e]">Messaging Sender ID</label>
              <input
                type="text"
                value={settings.firebase.messagingSenderId}
                onChange={(e) => setSettings({...settings, firebase: {...settings.firebase, messagingSenderId: e.target.value}})}
                placeholder="123456789"
                className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none"
              />
            </div>
          </div>
        </div>

        {/* ImgBB - Image Hosting */}
        <div className="bg-white rounded-lg border border-[#e7e5e4] p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#b45309]/10 rounded-xl flex items-center justify-center">
                <ImageIcon size={24} className="text-[#b45309]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1c1917]">ImgBB (Lưu trữ ảnh)</h3>
                <p className="text-sm text-[#57534e]">Sử dụng để lưu trữ hình ảnh sản phẩm và bài viết</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                settings.imgbb.apiKey ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {settings.imgbb.apiKey ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                {settings.imgbb.apiKey ? "Đã cấu hình" : "Chưa cấu hình"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#57534e]">API Key</label>
              <div className="relative">
                <input
                  type={showSecrets ? "text" : "password"}
                  value={settings.imgbb.apiKey}
                  onChange={(e) => setSettings({...settings, imgbb: {...settings.imgbb, apiKey: e.target.value}})}
                  placeholder="Nhập API Key từ imgbb.com"
                  className="w-full px-4 py-2.5 pr-12 border border-[#e7e5e4] rounded-lg focus:ring-2 focus:ring-[#b45309]/20 focus:border-[#b45309] outline-none"
                />
                <button
                  onClick={() => setShowSecrets(!showSecrets)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#a8a29e] hover:text-[#b45309] transition-colors"
                >
                  {showSecrets ? <Lock size={18} /> : <Unlock size={18} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#57534e]">API URL</label>
              <input
                type="text"
                value={settings.imgbb.apiUrl}
                onChange={(e) => setSettings({...settings, imgbb: {...settings.imgbb, apiUrl: e.target.value}})}
                className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg bg-[#f5f5f4] text-[#a8a29e] cursor-not-allowed"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Facebook API */}
        <div className="bg-white rounded-lg border border-[#e7e5e4] p-6 shadow-sm opacity-60">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1877F2]/10 rounded-xl flex items-center justify-center">
                <Facebook size={24} className="text-[#1877F2]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1c1917]">Facebook Marketing</h3>
                <p className="text-sm text-[#57534e]">Tích hợp Fanpage và đồng bộ bình luận (Sắp ra mắt)</p>
              </div>
            </div>
            <span className="px-2 py-1 rounded text-[10px] font-bold bg-[#1877F2] text-white uppercase tracking-wider">Coming Soon</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-[#b45309]/5 border border-[#b45309]/20 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#b45309]/10 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle size={20} className="text-[#b45309]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1c1917]">Hướng dẫn nhân bản dự án</h4>
              <p className="text-sm text-[#57534e] mt-2 leading-relaxed">
                Để nhân bản website này cho khách hàng mới:
                <br />1. Tạo một dự án mới trên <strong className="text-[#b45309]">Firebase Console</strong>.
                <br />2. Lấy các thông số cấu hình và dán vào đây.
                <br />3. Sau khi nhấn <strong>"Lưu cài đặt"</strong>, trang web sẽ tự động kết nối với cơ sở dữ liệu mới của khách hàng.
                <br /><br />
                <span className="text-xs italic">* Lưu ý: Các thiết lập này được lưu trữ an toàn trong trình duyệt/hệ thống cấu hình riêng biệt.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

