"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Search, Grid, List, Upload, Folder, Image as ImageIcon,
  Trash2, Download, Copy, X, CheckSquare, MoreVertical,
  RefreshCcw, AlertCircle, ExternalLink, Globe
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { uploadImage } from "@/lib/upload";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size?: string;
  dimensions?: string;
  folder: string;
  createdAt: any;
  type: string;
}

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState("all");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const folders = [
    { id: "all", name: "Tất cả", count: mediaItems.length },
    { id: "products", name: "Sản phẩm", count: mediaItems.filter(i => i.folder === "products").length },
    { id: "posts", name: "Bài viết", count: mediaItems.filter(i => i.folder === "posts").length },
    { id: "banners", name: "Banner", count: mediaItems.filter(i => i.folder === "banners").length },
    { id: "gallery", name: "Thư viện", count: mediaItems.filter(i => i.folder === "gallery").length },
  ];

  // Fetch media from Firestore
  useEffect(() => {
    if (!db) return;

    const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MediaItem[];
      setMediaItems(items);
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadImage(file);
        
        if (url && db) {
          await addDoc(collection(db, "media"), {
            name: file.name,
            url: url,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            folder: currentFolder === "all" ? "gallery" : currentFolder,
            createdAt: Timestamp.now(),
            type: file.type
          });
        }
      }
    } catch (error: any) {
      alert(error.message || "Lỗi khi tải ảnh lên.");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa ảnh này khỏi thư viện? (Ảnh trên ImgBB sẽ không bị xóa)")) return;
    if (!db) return;
    
    try {
      await deleteDoc(doc(db, "media", id));
      setSelectedItems(prev => prev.filter(i => i !== id));
    } catch (error) {
      alert("Không thể xóa ảnh.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Đã sao chép link ảnh!");
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesFolder = currentFolder === "all" || item.folder === currentFolder;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-serif text-[#1c1917]">Thư viện ảnh</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý hình ảnh tập trung (Tự động tải lên ImgBB)</p>
        </div>
        <div className="flex items-center gap-2">
          <label className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-colors cursor-pointer ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {isUploading ? <RefreshCcw size={16} className="animate-spin" /> : <Upload size={16} />}
            <span>{isUploading ? "Đang tải..." : "Tải ảnh lên"}</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
          </label>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
        <Globe size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <strong>Mẹo nhân bản:</strong> Khi bạn tải ảnh lên đây, chúng sẽ được lưu trực tiếp vào tài khoản ImgBB đã cấu hình. Bạn có thể sử dụng những ảnh này cho bất kỳ bài viết hay sản phẩm nào.
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm ảnh theo tên..."
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

      {/* Grid View */}
      {isLoading ? (
        <div className="py-20 text-center text-[#57534e]">Đang tải thư viện ảnh...</div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-[#e7e5e4] rounded-xl bg-white">
          <ImageIcon size={48} className="mx-auto text-[#a8a29e] mb-4" />
          <p className="text-[#57534e]">Không tìm thấy ảnh nào trong thư mục này.</p>
          <p className="text-xs text-[#a8a29e] mt-1">Hãy thử tải ảnh mới lên!</p>
        </div>
      ) : (
        viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className={`group relative bg-white rounded-lg border overflow-hidden transition-all shadow-sm ${
                  selectedItems.includes(item.id) ? "border-[#b45309] ring-2 ring-[#b45309]/20" : "border-[#e7e5e4] hover:border-[#b45309]"
                }`}
              >
                {/* Image Preview */}
                <div className="aspect-square bg-[#f5f5f4] relative overflow-hidden">
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => toggleSelection(item.id)}
                      className={`p-2 rounded-full transition-colors ${
                        selectedItems.includes(item.id) ? "bg-[#b45309] text-white" : "bg-white text-[#1c1917]"
                      }`}
                    >
                      <CheckSquare size={16} />
                    </button>
                    <button 
                      onClick={() => copyToClipboard(item.url)}
                      className="p-2 bg-white rounded-full text-[#1c1917] hover:bg-[#b45309] hover:text-white transition-colors"
                      title="Copy URL"
                    >
                      <Copy size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-white rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-2 bg-white">
                  <p className="text-[10px] font-medium text-[#1c1917] truncate" title={item.name}>{item.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-[#a8a29e] uppercase">{item.folder}</span>
                    <span className="text-[10px] text-[#a8a29e]">{item.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e7e5e4] bg-[#fffbf5]">
                    <th className="text-left py-3 px-4 w-10">
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
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Ảnh</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Tên file</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Thư mục</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Kích thước</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#57534e]">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-[#e7e5e4] hover:bg-[#fffbf5] transition-colors">
                      <td className="py-3 px-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-[#e7e5e4]"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelection(item.id)}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 bg-[#f5f5f4] rounded overflow-hidden border border-[#e7e5e4]">
                          <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-[#1c1917] truncate max-w-[200px]">{item.name}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#b45309] flex items-center gap-1 hover:underline">
                          <ExternalLink size={10} /> Xem ảnh gốc
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-[#f5f5f4] text-[#57534e] text-[10px] uppercase font-medium border border-[#e7e5e4]">
                          {item.folder}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#57534e]">{item.size}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => copyToClipboard(item.url)}
                            className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors"
                          >
                            <Copy size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 hover:bg-red-50 rounded transition-colors text-red-600"
                          >
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
        )
      )}
    </div>
  );
}
