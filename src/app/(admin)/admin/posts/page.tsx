"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock3, Download } from "lucide-react";

const mockPosts = [
  { id: "1", title: "Tranh thêu hoa sen - Ý nghĩa và cách chọn", category: "Hoa sen", status: "published", views: 1250, createdAt: "2024-01-15", thumbnail: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=100&q=80" },
  { id: "2", title: "Kỹ thuật thêu tay cơ bản cho người mới", category: "Hướng dẫn", status: "published", views: 890, createdAt: "2024-01-14", thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=100&q=80" },
  { id: "3", title: "Bộ sưu tập tranh phong thủy 2024", category: "Phong thủy", status: "draft", views: 0, createdAt: "2024-01-13", thumbnail: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=100&q=80" },
  { id: "4", title: "Cách bảo quản tranh thêu đúng cách", category: "Bảo quản", status: "published", views: 567, createdAt: "2024-01-12", thumbnail: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=100&q=80" },
  { id: "5", title: "Hướng dẫn mua hàng", category: "Hỗ trợ", status: "published", views: 320, createdAt: "2024-01-10", thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&q=80" },
  { id: "6", title: "Chính sách đổi trả", category: "Chính sách", status: "published", views: 280, createdAt: "2024-01-09", thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&q=80" },
  { id: "7", title: "Vận chuyển và giao hàng", category: "Hỗ trợ", status: "published", views: 150, createdAt: "2024-01-08", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&q=80" },
  { id: "8", title: "Câu hỏi thường gặp", category: "FAQ", status: "published", views: 420, createdAt: "2024-01-07", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80" },
];

const categories = ["Tất cả", "Hoa sen", "Chim hạc", "Phong thủy", "Hướng dẫn", "Bảo quản", "Hỗ trợ", "Chính sách", "FAQ"];

export default function PostsPage() {
  const [posts, setPosts] = useState(mockPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || post.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === paginatedPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(paginatedPosts.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published": return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle2 size={12} /> Đã đăng</span>;
      case "draft": return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><Clock3 size={12} /> Bản nháp</span>;
      default: return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"><XCircle size={12} /> Ẩn</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Quản lý bài viết</h1>
          <p className="text-sm text-[#57534e] mt-1">{filteredPosts.length} bài viết</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#57534e] bg-white border border-[#e7e5e4] rounded-lg hover:bg-[#f5f5f4] transition-colors press-feedback"><Download size={16} /> Export</button>
          <Link href="/admin/posts/new" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors press-feedback"><Plus size={16} /> Thêm bài viết</Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-[#e7e5e4] space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]" size={18} />
            <input type="text" placeholder="Tìm kiếm bài viết..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none" />
          </div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none bg-white">{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none bg-white"><option value="all">Tất cả trạng thái</option><option value="published">Đã đăng</option><option value="draft">Bản nháp</option></select>
        </div>

        {selectedPosts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 pt-3 border-t border-[#e7e5e4]">
            <span className="text-sm text-[#57534e]">{selectedPosts.length} đã chọn</span>
            <button onClick={() => setPosts(posts.filter(p => !selectedPosts.includes(p.id)))} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"><Trash2 size={14} /> Xóa</button>
          </motion.div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f5f5f4]">
              <tr>
                <th className="w-10 px-4 py-3"><input type="checkbox" checked={selectedPosts.length === paginatedPosts.length && paginatedPosts.length > 0} onChange={toggleSelectAll} className="rounded border-[#e7e5e4] text-[#b45309] focus:ring-[#b45309]" /></th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Bài viết</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Danh mục</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Trạng thái</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Lượt xem</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Ngày tạo</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-[#57534e]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e5e4]">
              {paginatedPosts.map((post) => (
                <motion.tr key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-[#f5f5f4] transition-colors">
                  <td className="px-4 py-3"><input type="checkbox" checked={selectedPosts.includes(post.id)} onChange={() => toggleSelect(post.id)} className="rounded border-[#e7e5e4] text-[#b45309] focus:ring-[#b45309]" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#f5f5f4] rounded-lg overflow-hidden flex-shrink-0">{post.thumbnail && <img src={post.thumbnail} alt="" className="w-full h-full object-cover" />}</div>
                      <div><p className="font-medium text-[#1c1917]">{post.title}</p><p className="text-xs text-[#57534e]">ID: {post.id}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-sm text-[#57534e]">{post.category}</span></td>
                  <td className="px-4 py-3">{getStatusBadge(post.status)}</td>
                  <td className="px-4 py-3"><span className="text-sm text-[#57534e]">{post.views.toLocaleString()}</span></td>
                  <td className="px-4 py-3"><span className="text-sm text-[#57534e]">{post.createdAt}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/bai-viet/${post.id}`} target="_blank" className="p-2 text-[#57534e] hover:text-[#b45309] hover:bg-[#f5f5f4] rounded-lg transition-colors"><Eye size={16} /></Link>
                      <Link href={`/admin/posts/${post.id}`} className="p-2 text-[#57534e] hover:text-[#b45309] hover:bg-[#f5f5f4] rounded-lg transition-colors"><Edit size={16} /></Link>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-[#57534e] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#e7e5e4]">
            <p className="text-sm text-[#57534e]">Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredPosts.length)} / {filteredPosts.length}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 text-[#57534e] hover:bg-[#f5f5f4] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeft size={18} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#f5f5f4]"}`}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 text-[#57534e] hover:bg-[#f5f5f4] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

