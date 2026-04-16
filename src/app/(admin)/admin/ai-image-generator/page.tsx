"use client";

import { useState } from "react";
import { 
  Sparkles, Download, RefreshCw, Image as ImageIcon, 
  Palette, Layout, Wand2, Save, Copy, CheckCircle
} from "lucide-react";

export default function AIImageGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedImages] = useState<string[]>([]);

  const promptTemplates = [
    "Tranh thêu hoa sen treo trong phòng khách hiện đại",
    "Nội thất phòng ngủ với tranh thêu truyền thống Việt Nam",
    "Tranh thêu chim công trong không gian sang trọng",
    "Phòng làm việc với tranh thêu phong thủy",
    "Không gian thêu truyền thống với ánh sáng tự nhiên",
    "Bộ sưu tập tranh thêu treo trong showroom nghệ thuật",
  ];

  const stylePresets = [
    { name: "Thực tế", icon: <ImageIcon size={16} /> },
    { name: "Nghệ thuật", icon: <Palette size={16} /> },
    { name: "Nhiệt đới", icon: <Wand2 size={16} /> },
    { name: "Tối giản", icon: <Layout size={16} /> },
  ];

  const aspectRatios = [
    { name: "9:16 (Story)", width: 1080, height: 1920, active: true },
    { name: "1:1 (Square)", width: 1080, height: 1080, active: false },
    { name: "16:9 (Landscape)", width: 1920, height: 1080, active: false },
    { name: "4:5 (Instagram)", width: 1080, height: 1350, active: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Công cụ Tạo Ảnh AI</h1>
          <p className="text-sm text-[#57534e] mt-1">Tạo ảnh nội thất và sản phẩm tranh thêu bằng AI (tỷ lệ 9:16)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Generator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prompt Input */}
          <div className="bg-white rounded-lg border border-[#e7e5e4] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={20} className="text-[#b45309]" />
              <h3 className="font-semibold text-[#1c1917]">Nhập mô tả ảnh</h3>
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ví dụ: Tranh thêu hoa sen treo trong phòng khách hiện đại với ánh sáng ấm áp..."
              rows={4}
              className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none"
            />

            {/* Quick Templates */}
            <div className="mt-4">
              <p className="text-sm font-medium text-[#57534e] mb-2">Gợi ý nhanh:</p>
              <div className="flex flex-wrap gap-2">
                {promptTemplates.map((template, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(template)}
                    className="px-3 py-1.5 text-xs border border-[#e7e5e4] rounded-full hover:border-[#b45309] hover:bg-[#b45309]/5 transition-colors"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">Tỷ lệ ảnh</label>
                <select className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm">
                  {aspectRatios.map((ratio) => (
                    <option key={ratio.name} value={ratio.name}>
                      {ratio.name} ({ratio.width}x{ratio.height})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">Phong cách</label>
                <select className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm">
                  {stylePresets.map((style) => (
                    <option key={style.name} value={style.name}>{style.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setIsGenerating(true)}
              disabled={isGenerating || !prompt}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Wand2 size={16} />
                  Tạo ảnh
                </>
              )}
            </button>
          </div>

          {/* Generated Images */}
          <div className="bg-white rounded-lg border border-[#e7e5e4] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1c1917]">Ảnh đã tạo</h3>
              <span className="text-sm text-[#57534e]">{generatedImages.length} ảnh</span>
            </div>

            {generatedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {generatedImages.map((img, i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-[9/16] rounded-lg overflow-hidden bg-[#e7e5e4]">
                      <img src={img} alt={`Generated ${i}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <button className="p-2 bg-white rounded hover:bg-[#fffbf5] transition-colors">
                        <Download size={16} />
                      </button>
                      <button className="p-2 bg-white rounded hover:bg-[#fffbf5] transition-colors">
                        <Save size={16} />
                      </button>
                      <button className="p-2 bg-white rounded hover:bg-[#fffbf5] transition-colors">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#e7e5e4] rounded-lg p-12 text-center">
                <ImageIcon size={48} className="mx-auto mb-4 text-[#a8a29e]" />
                <p className="text-[#57534e]">Nhập mô tả và nhấn &quot;Tạo ảnh&quot; để bắt đầu</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Options & History */}
        <div className="lg:col-span-1 space-y-6">
          {/* Save Options */}
          <div className="bg-white rounded-lg border border-[#e7e5e4] p-6 sticky top-24">
            <h3 className="font-semibold text-[#1c1917] mb-4">Lưu ảnh</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">
                  Lưu vào
                </label>
                <select className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm">
                  <option>Kho ảnh chung</option>
                  <option>Ảnh sản phẩm</option>
                  <option>Ảnh banner</option>
                  <option>Ảnh bài viết</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">
                  Tên ảnh
                </label>
                <input
                  type="text"
                  placeholder="tranh-theu-hoa-sen-1"
                  className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">
                  Tag
                </label>
                <input
                  type="text"
                  placeholder="hoa sen, tranh thêu, nội thất"
                  className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                />
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors text-sm">
                <Save size={16} />
                Lưu tất cả
              </button>
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-lg border border-[#e7e5e4] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1c1917]">Lịch sử tạo</h3>
              <button className="text-sm text-[#57534e] hover:text-[#b45309]">Xóa tất cả</button>
            </div>
            
            <div className="space-y-3">
              {[
                { prompt: "Tranh thêu hoa sen phòng khách", date: "2 giờ trước", count: 4 },
                { prompt: "Nội thất phòng ngủ tranh thêu", date: "1 ngày trước", count: 3 },
                { prompt: "Tranh thêu chim công showroom", date: "2 ngày trước", count: 2 },
              ].map((history, i) => (
                <div key={i} className="p-3 bg-[#fffbf5] rounded-lg">
                  <p className="text-sm font-medium text-[#1c1917] line-clamp-1">{history.prompt}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-[#57534e]">
                    <span>{history.date}</span>
                    <span>{history.count} ảnh</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="text-xs text-[#b45309] hover:underline">Tạo lại</button>
                    <button className="text-xs text-red-600 hover:underline">Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Tips */}
          <div className="bg-gradient-to-br from-[#b45309]/10 to-[#fffbf5] rounded-lg border border-[#b45309]/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles size={20} className="text-[#b45309]" />
              <h3 className="font-semibold text-[#1c1917]">Mẹo sử dụng</h3>
            </div>
            <ul className="space-y-2 text-sm text-[#57534e]">
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="text-[#b45309] shrink-0 mt-0.5" />
                <span>Mô tả chi tiết về không gian, ánh sáng, màu sắc</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="text-[#b45309] shrink-0 mt-0.5" />
                <span>Sử dụng tỷ lệ 9:16 cho Story Facebook/Instagram</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="text-[#b45309] shrink-0 mt-0.5" />
                <span>Lưu ảnh vào kho để dùng cho bài viết sau</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

