"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Save, Eye, Image as ImageIcon, Link as LinkIcon, 
  Heading, Bold, Italic, List, ListOrdered, Quote, Code, Sparkles,
  Clock, Calendar, Search, X, Upload, Grid, Facebook, Send,
  CheckCircle, AlertCircle, ChevronDown, Type, AlignLeft,
  Hash, Tag, FileText, Settings, Trash2, Copy
} from "lucide-react";

const ToolbarButton = ({ icon, active, onClick, title }: { icon: React.ReactNode; active?: boolean; onClick?: () => void; title?: string }) => (
  <button 
    onClick={onClick} 
    title={title}
    className={`p-2 rounded hover:bg-[#f5f5f4] transition-colors ${active ? "bg-[#f5f5f4] text-[#b45309]" : "text-[#57534e]"}`}
  >
    {icon}
  </button>
);

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "media" | "ai" | "schedule" | "seo">("content");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    status: "draft",
    excerpt: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
    tags: "",
    scheduleDate: "",
    scheduleTime: ""
  });

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-").substring(0, 100);

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title, slug: prev.slug || generateSlug(title) }));
  };

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setThumbnail(url);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    router.push("/admin/posts");
  };

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const newContent = text.substring(0, start) + before + selected + after + text.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
    setTimeout(() => { textarea.focus(); textarea.setSelectionRange(start + before.length, end + before.length); }, 0);
  };

  const mediaLibrary = [
    "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&q=80",
    "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=300&q=80",
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&q=80",
    "https://images.unsplash.com/photo-1615486511484-92e78cc6c4ea?w=300&q=80",
  ];

  const aiSuggestions = [
    "Viết bài hướng dẫn thêu cơ bản",
    "Tạo mô tả sản phẩm tranh thêu",
    "Viết SEO meta description",
    "Tạo câu hỏi Q&A về tranh thêu",
    "Viết caption Facebook",
    "Tóm tắt bài viết dài"
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f4]">
      {/* Header - Full Width */}
      <div className="bg-white border-b border-[#e7e5e4] sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/admin/posts" className="p-2 text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f5f4] rounded-lg transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif text-[#1c1917]">Tạo bài viết mới</h1>
                <p className="text-sm text-[#57534e]">Trình soạn thảo đầy đủ tính năng</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-[#57534e] bg-white border border-[#e7e5e4] rounded-lg hover:bg-[#f5f5f4] transition-colors">
                <Eye size={16} />
                <span className="hidden sm:inline">Xem trước</span>
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={isLoading} 
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors disabled:opacity-50"
              >
                <Save size={16} className={isLoading ? "animate-spin" : ""} />
                <span>{isLoading ? "Đang lưu..." : "Lưu bài viết"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Panel - Editor */}
          <div className="xl:col-span-3 space-y-6">
            {/* Title Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-[#e7e5e4] space-y-4">
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => handleTitleChange(e.target.value)} 
                placeholder="Nhập tiêu đề bài viết..." 
                className="w-full text-2xl sm:text-3xl font-bold text-[#1c1917] placeholder-[#a8a29e] border-0 focus:outline-none focus:ring-0 bg-transparent"
                required 
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Slug URL</label>
                  <input 
                    type="text" 
                    value={formData.slug} 
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))} 
                    placeholder="ten-bai-viet" 
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Danh mục</label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} 
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none bg-white text-sm"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="hoa-sen">Hoa sen</option>
                    <option value="chim-hac">Chim hạc</option>
                    <option value="phong-thuy">Phong thủy</option>
                    <option value="huong-dan">Hướng dẫn</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Tóm tắt</label>
                <textarea 
                  value={formData.excerpt} 
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))} 
                  placeholder="Tóm tắt ngắn về bài viết (200 ký tự)..." 
                  rows={2} 
                  maxLength={200} 
                  className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none text-sm"
                />
                <p className="text-xs text-[#a8a29e] mt-1 text-right">{formData.excerpt.length}/200</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
              <div className="flex border-b border-[#e7e5e4] overflow-x-auto">
                {[
                  { id: "content", label: "Nội dung", icon: FileText },
                  { id: "media", label: "Kho ảnh", icon: ImageIcon },
                  { id: "ai", label: "AI viết hộ", icon: Sparkles },
                  { id: "schedule", label: "Hẹn giờ", icon: Clock },
                  { id: "seo", label: "SEO", icon: Settings },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id 
                        ? "border-b-2 border-[#b45309] text-[#b45309]" 
                        : "text-[#57534e] hover:text-[#1c1917]"
                    }`}
                  >
                    <tab.icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content Tab */}
              {activeTab === "content" && (
                <div className="p-4">
                  {/* Full Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 p-2 border border-[#e7e5e4] rounded-lg mb-4 bg-[#f5f5f4]">
                    <ToolbarButton icon={<Heading size={18} />} onClick={() => insertText("<h2>", "</h2>")} title="Heading" />
                    <div className="w-px h-5 bg-[#e7e5e4] mx-1" />
                    <ToolbarButton icon={<Bold size={18} />} onClick={() => insertText("<b>", "</b>")} title="Bold" />
                    <ToolbarButton icon={<Italic size={18} />} onClick={() => insertText("<i>", "</i>")} title="Italic" />
                    <div className="w-px h-5 bg-[#e7e5e4] mx-1" />
                    <ToolbarButton icon={<List size={18} />} onClick={() => insertText("<ul>\n  <li>", "</li>\n</ul>")} title="List" />
                    <ToolbarButton icon={<ListOrdered size={18} />} onClick={() => insertText("<ol>\n  <li>", "</li>\n</ol>")} title="Ordered List" />
                    <div className="w-px h-5 bg-[#e7e5e4] mx-1" />
                    <ToolbarButton icon={<LinkIcon size={18} />} onClick={() => insertText('<a href="">', "</a>")} title="Link" />
                    <ToolbarButton icon={<ImageIcon size={18} />} title="Image" />
                    <ToolbarButton icon={<Quote size={18} />} onClick={() => insertText("<blockquote>", "</blockquote>")} title="Quote" />
                    <ToolbarButton icon={<Code size={18} />} onClick={() => insertText("<code>", "</code>")} title="Code" />
                    <ToolbarButton icon={<AlignLeft size={18} />} onClick={() => insertText("<p>", "</p>")} title="Paragraph" />
                  </div>
                  <textarea 
                    id="content" 
                    value={formData.content} 
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} 
                    placeholder="Viết nội dung bài viết tại đây..." 
                    rows={15} 
                    className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-y font-mono text-sm min-h-[300px]"
                  />
                  <div className="flex items-center justify-between mt-2 text-xs text-[#a8a29e]">
                    <span>Hỗ trợ HTML cơ bản</span>
                    <span>{formData.content.length} ký tự</span>
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === "media" && (
                <div className="p-4 space-y-6">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-[#e7e5e4] rounded-lg p-6 sm:p-8 text-center hover:border-[#b45309] transition-colors cursor-pointer">
                    <Upload className="mx-auto mb-4 text-[#57534e]" size={40} />
                    <p className="text-[#57534e] mb-2 text-sm">Kéo thả ảnh vào đây hoặc click để tải lên</p>
                    <p className="text-xs text-[#a8a29e]">JPG, PNG, WebP (tối đa 5MB)</p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>

                  {/* Media Library */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-[#1c1917] text-sm">Kho ảnh</h3>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={14} />
                          <input type="text" placeholder="Tìm kiếm..." className="pl-9 pr-3 py-1.5 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm" />
                        </div>
                        <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                          <Grid size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {mediaLibrary.map((img, i) => (
                        <div key={i} className="relative group aspect-square">
                          <img src={img} alt={`Image ${i}`} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <button className="p-1.5 bg-white rounded hover:bg-[#fffbf5] transition-colors">
                              <Copy size={14} />
                            </button>
                            <button className="p-1.5 bg-white rounded hover:bg-[#fffbf5] transition-colors text-red-600">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* AI Tab */}
              {activeTab === "ai" && (
                <div className="p-4 space-y-6">
                  <div className="bg-gradient-to-br from-[#b45309]/10 to-[#fffbf5] rounded-lg p-4 sm:p-6 border border-[#b45309]/20">
                    <div className="flex items-start gap-4">
                      <div className="p-2 sm:p-3 bg-[#b45309] rounded-lg shrink-0">
                        <Sparkles className="text-white" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1c1917] mb-2">AI viết hộ</h3>
                        <p className="text-sm text-[#57534e] mb-4">
                          Nhập chủ đề hoặc ý tưởng, AI sẽ giúp bạn viết nội dung bài viết.
                        </p>
                        <textarea 
                          placeholder="Ví dụ: Viết bài về cách thêu hoa sen cho người mới bắt đầu..." 
                          className="w-full p-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none h-24 text-sm"
                        />
                        <button className="mt-3 px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors flex items-center gap-2 text-sm">
                          <Sparkles size={14} />
                          Viết nội dung
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#1c1917] mb-3 text-sm">Gợi ý nhanh</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {aiSuggestions.map((suggestion, i) => (
                        <button key={i} className="p-3 border border-[#e7e5e4] rounded-lg hover:border-[#b45309] hover:bg-[#b45309]/5 transition-colors text-left text-sm">
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Schedule Tab */}
              {activeTab === "schedule" && (
                <div className="p-4 space-y-6">
                  <div className="bg-[#fffbf5] rounded-lg p-4 sm:p-6 border border-[#e7e5e4]">
                    <div className="flex items-start gap-4">
                      <div className="p-2 sm:p-3 bg-[#b45309] rounded-lg shrink-0">
                        <Clock className="text-white" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1c1917] mb-2">Hẹn giờ đăng</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-[#57534e] mb-1.5">Ngày đăng</label>
                            <input 
                              type="date" 
                              value={formData.scheduleDate}
                              onChange={(e) => setFormData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                              className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#57534e] mb-1.5">Giờ đăng</label>
                            <input 
                              type="time" 
                              value={formData.scheduleTime}
                              onChange={(e) => setFormData(prev => ({ ...prev, scheduleTime: e.target.value }))}
                              className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                            />
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors flex items-center gap-2 text-sm">
                          <Calendar size={14} />
                          Lên lịch đăng
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#1c1917] mb-3 text-sm">Bài viết đã lên lịch</h3>
                    <div className="space-y-2">
                      {[
                        { title: "10 bí quyết chọn tranh thêu", date: "15/04/2026 09:00" },
                        { title: "Cách bảo quản tranh thêu", date: "18/04/2026 14:00" },
                      ].map((item, i) => (
                        <div key={i} className="bg-white border border-[#e7e5e4] rounded-lg p-3 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#1c1917] text-sm">{item.title}</p>
                            <p className="text-xs text-[#57534e]">Đăng vào {item.date}</p>
                          </div>
                          <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors text-red-600">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === "seo" && (
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1c1917] mb-1.5">SEO Title</label>
                    <input 
                      type="text" 
                      value={formData.seoTitle} 
                      onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))} 
                      placeholder="Tiêu đề hiển thị trên Google (60 ký tự)" 
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                    />
                    <p className="text-xs text-[#a8a29e] mt-1">{formData.seoTitle.length}/60 ký tự</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1c1917] mb-1.5">SEO Description</label>
                    <textarea 
                      value={formData.seoDescription} 
                      onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))} 
                      placeholder="Mô tả hiển thị trên Google (160 ký tự)" 
                      rows={3} 
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none text-sm"
                    />
                    <p className="text-xs text-[#a8a29e] mt-1">{formData.seoDescription.length}/160 ký tự</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Tags</label>
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-[#a8a29e]" />
                      <input 
                        type="text" 
                        value={formData.tags} 
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))} 
                        placeholder="tranh thêu, hoa sen, nghệ thuật (phân cách bằng dấu phẩy)" 
                        className="flex-1 px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Sidebar */}
          <div className="xl:col-span-1 space-y-4">
            {/* Publish */}
            <div className="bg-white p-4 rounded-lg border border-[#e7e5e4] space-y-4">
              <h3 className="font-medium text-[#1c1917] text-sm">Xuất bản</h3>
              <div>
                <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Trạng thái</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))} 
                  className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none bg-white text-sm"
                >
                  <option value="draft">Bản nháp</option>
                  <option value="published">Xuất bản ngay</option>
                  <option value="scheduled">Lên lịch</option>
                </select>
              </div>
              {formData.status === "scheduled" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Thời gian</label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm" />
                </motion.div>
              )}
              <div className="pt-3 border-t border-[#e7e5e4] flex gap-2">
                <button type="button" className="flex-1 px-3 py-2 text-sm font-medium text-[#57534e] bg-[#f5f5f4] rounded-lg hover:bg-[#e7e5e4] transition-colors">
                  Lưu nháp
                </button>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="bg-white p-4 rounded-lg border border-[#e7e5e4] space-y-3">
              <h3 className="font-medium text-[#1c1917] text-sm">Ảnh đại diện</h3>
              {thumbnail ? (
                <div className="relative aspect-video bg-[#f5f5f4] rounded-lg overflow-hidden">
                  <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setThumbnail(null)} 
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video bg-[#f5f5f4] border-2 border-dashed border-[#e7e5e4] rounded-lg cursor-pointer hover:border-[#b45309] transition-colors">
                  <ImageIcon className="w-8 h-8 text-[#a8a29e] mb-2" />
                  <span className="text-sm text-[#57534e]">Click để upload</span>
                  <span className="text-xs text-[#a8a29e]">PNG, JPG tối đa 5MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            {/* Social Share */}
            <div className="bg-white p-4 rounded-lg border border-[#e7e5e4] space-y-3">
              <h3 className="font-medium text-[#1c1917] text-sm">Chia sẻ MXH</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#e7e5e4]" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>
                    <span className="text-sm text-[#57534e]">Facebook</span>
                  </div>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#e7e5e4]" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <Send size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-[#57534e]">Zalo</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-[#f5f5f4] p-4 rounded-lg">
              <h4 className="font-medium text-[#1c1917] text-sm mb-2">Mẹo viết bài</h4>
              <ul className="text-xs text-[#57534e] space-y-1.5 list-disc list-inside">
                <li>Tiêu đề nên 50-60 ký tự</li>
                <li>Thêm ảnh để tăng tương tác</li>
                <li>Sử dụng heading H2-H4</li>
                <li>Tóm tắt nên 150-200 ký tự</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
