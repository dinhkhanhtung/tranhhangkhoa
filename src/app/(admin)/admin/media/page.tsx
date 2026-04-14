"use client";

import { useState } from "react";
import { 
  Search, Grid, List, Upload, Folder, Image as ImageIcon,
  Trash2, Download, Copy, X, CheckSquare, MoreVertical
} from "lucide-react";

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState("all");

  const folders = [
    { id: "all", name: "Tất cả", count: 156 },
    { id: "products", name: "Sản phẩm", count: 89 },
    { id: "posts", name: "Bài viết", count: 34 },
    { id: "banners", name: "Banner", count: 18 },
    { id: "gallery", name: "Thư viện", count: 15 },
  ];

  const mediaItems = [
    { id: "1", name: "tranh-hoa-sen.jpg", size: "2.4 MB", dimensions: "1920x1080", folder: "products", date: "2024-04-14" },
    { id: "2", name: "banner-tet-2024.jpg", size: "1.8 MB", dimensions: "1920x600", folder: "banners", date: "2024-04-13" },
    { id: "3", name: "khoa-hoc-theu-1.jpg", size: "3.2 MB", dimensions: "1280x720", folder: "posts", date: "2024-04-12" },
    { id: "4", name: "phu-kien-kim-theu.jpg", size: "1.1 MB", dimensions: "800x800", folder: "products", date: "2024-04-11" },
    { id: "5", name: "showroom-1.jpg", size: "4.5 MB", dimensions: "2560x1440", folder: "gallery", date: "2024-04-10" },
    { id: "6", name: "tranh-chim-cong.jpg", size: "2.8 MB", dimensions: "1920x1080", folder: "products", date: "2024-04-09" },
  ];

  const filteredItems = currentFolder === "all" 
    ? mediaItems 
    : mediaItems.filter(item => item.folder === currentFolder);

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-serif text-[#1c1917]">Thư viện ảnh</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý hình ảnh và media</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-colors">
          <Upload size={16} />
          <span>Tải lên</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => setCurrentFolder(folder.id)}
            className={`p-3 md:p-4 rounded-lg border text-left transition-colors ${
              currentFolder === folder.id 
                ? "border-[#b45309] bg-[#b45309]/5" 
                : "border-[#e7e5e4] bg-white hover:border-[#b45309]"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Folder size={16} className={currentFolder === folder.id ? "text-[#b45309]" : "text-[#57534e]"} />
              <span className={`text-xs md:text-sm font-medium ${currentFolder === folder.id ? "text-[#b45309]" : "text-[#1c1917]"}`}>
                {folder.name}
              </span>
            </div>
            <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{folder.count}</p>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={16} />
            <input
              type="text"
              placeholder="Tìm kiếm ảnh..."
              className="w-full pl-10 pr-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex border border-[#e7e5e4] rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-[#b45309] text-white" : "bg-white text-[#57534e] hover:bg-[#e7e5e4]"}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-[#b45309] text-white" : "bg-white text-[#57534e] hover:bg-[#e7e5e4]"}`}
            >
              <List size={16} />
            </button>
          </div>
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2 bg-[#fffbf5] px-3 py-2 rounded-lg border border-[#e7e5e4]">
              <span className="text-sm text-[#57534e]">{selectedItems.length} đã chọn</span>
              <button 
                onClick={() => setSelectedItems([])}
                className="p-1 hover:bg-[#e7e5e4] rounded"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-[#fffbf5] rounded-lg border border-[#e7e5e4]">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#57534e] hover:bg-[#e7e5e4] rounded transition-colors">
            <Download size={14} />
            Tải xuống
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#57534e] hover:bg-[#e7e5e4] rounded transition-colors">
            <Copy size={14} />
            Sao chép URL
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors ml-auto">
            <Trash2 size={14} />
            Xóa
          </button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className={`group relative bg-white rounded-lg border overflow-hidden transition-all ${
                selectedItems.includes(item.id) ? "border-[#b45309] ring-2 ring-[#b45309]/20" : "border-[#e7e5e4] hover:border-[#b45309]"
              }`}
            >
              {/* Image Placeholder */}
              <div className="aspect-square bg-[#f5f5f4] flex items-center justify-center">
                <ImageIcon size={32} className="text-[#a8a29e]" />
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => toggleSelection(item.id)}
                  className={`p-2 rounded-full transition-colors ${
                    selectedItems.includes(item.id) ? "bg-[#b45309] text-white" : "bg-white text-[#1c1917]"
                  }`}
                >
                  <CheckSquare size={16} />
                </button>
                <button className="p-2 bg-white rounded-full text-[#1c1917] hover:bg-[#fffbf5] transition-colors">
                  <Copy size={16} />
                </button>
                <button className="p-2 bg-white rounded-full text-[#1c1917] hover:bg-[#fffbf5] transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              {/* Info */}
              <div className="p-2">
                <p className="text-xs font-medium text-[#1c1917] truncate">{item.name}</p>
                <p className="text-xs text-[#57534e]">{item.size}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e7e5e4] bg-[#fffbf5]">
                  <th className="text-left py-3 px-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-[#e7e5e4]"
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(filteredItems.map(i => i.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Tên file</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Thư mục</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Kích thước</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Ngày tải</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#57534e]">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-[#e7e5e4] hover:bg-[#fffbf5]">
                    <td className="py-3 px-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-[#e7e5e4]"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#f5f5f4] rounded flex items-center justify-center">
                          <ImageIcon size={16} className="text-[#a8a29e]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1c1917]">{item.name}</p>
                          <p className="text-xs text-[#57534e]">{item.dimensions}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#57534e]">
                      {folders.find(f => f.id === item.folder)?.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#57534e]">{item.size}</td>
                    <td className="py-3 px-4 text-sm text-[#57534e]">{item.date}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                          <Copy size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                          <Download size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
