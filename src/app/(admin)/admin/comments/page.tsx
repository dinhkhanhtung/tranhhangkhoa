"use client";

import { useState } from "react";
import { 
  Search, Filter, Trash2, Reply, CheckCircle, XCircle, 
  MoreVertical, Shield, AlertTriangle, Clock, User
} from "lucide-react";

export default function CommentsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "spam">("all");

  const comments = [
    {
      id: "1",
      author: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      content: "Tranh thêu rất đẹp, chất lượng tốt. Mình rất ưng ý!",
      post: "Tranh thêu hoa sen - Ý nghĩa và cách chọn",
      status: "approved",
      date: "2 giờ trước",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80"
    },
    {
      id: "2",
      author: "Trần Thị B",
      email: "tranthib@email.com",
      content: "Giá hơi cao so với thị trường, có giảm giá không shop?",
      post: "Bộ sưu tập tranh phong thủy 2024",
      status: "pending",
      date: "5 giờ trước",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80"
    },
    {
      id: "3",
      author: "Lê Văn C",
      email: "levanc@email.com",
      content: "Spam content - ignore this comment",
      post: "Kỹ thuật thêu tay cơ bản",
      status: "spam",
      date: "1 ngày trước",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&q=80"
    },
    {
      id: "4",
      author: "Phạm Thị D",
      email: "phamthid@email.com",
      content: "Mình đã đặt hàng 3 ngày rồi chưa nhận được, shop check giúp mình với",
      post: "Tranh thêu hoa sen - Ý nghĩa và cách chọn",
      status: "pending",
      date: "2 ngày trước",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle size={10} /> Đã duyệt</span>;
      case "pending":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><Clock size={10} /> Chờ duyệt</span>;
      case "spam":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><AlertTriangle size={10} /> Spam</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const filteredComments = filter === "all" ? comments : comments.filter(c => c.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Quản lý Comment</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý và kiểm duyệt bình luận trên website</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <User size={20} className="text-[#b45309]" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">156</p>
              <p className="text-sm text-[#57534e]">Tổng comment</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">12</p>
              <p className="text-sm text-[#57534e]">Chờ duyệt</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">138</p>
              <p className="text-sm text-[#57534e]">Đã duyệt</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">6</p>
              <p className="text-sm text-[#57534e]">Spam</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="bg-white rounded-lg border border-[#e7e5e4]">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#e7e5e4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={16} />
              <input
                type="text"
                placeholder="Tìm kiếm comment..."
                className="pl-10 pr-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm w-64"
              />
            </div>
            <button className="p-2 hover:bg-[#e7e5e4] rounded-lg transition-colors">
              <Filter size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === "all" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === "pending" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Chờ duyệt
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === "approved" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Đã duyệt
            </button>
            <button
              onClick={() => setFilter("spam")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === "spam" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Spam
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="divide-y divide-[#e7e5e4]">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="p-4 hover:bg-[#fffbf5] transition-colors">
              <div className="flex items-start gap-4">
                <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#1c1917]">{comment.author}</p>
                        <p className="text-sm text-[#57534e]">{comment.email}</p>
                        {getStatusBadge(comment.status)}
                      </div>
                      <p className="text-sm text-[#57534e] mt-1">{comment.post}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-[#1c1917]">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-[#57534e]">{comment.date}</span>
                    <div className="flex items-center gap-2">
                      {comment.status === "pending" && (
                        <>
                          <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded transition-colors">
                            <CheckCircle size={12} />
                            Duyệt
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition-colors">
                            <XCircle size={12} />
                            Từ chối
                          </button>
                        </>
                      )}
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#57534e] hover:bg-[#e7e5e4] rounded transition-colors">
                        <Reply size={12} />
                        Trả lời
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={12} />
                        Xóa
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#57534e] hover:bg-[#e7e5e4] rounded transition-colors">
                        <Shield size={12} />
                        Đánh dấu spam
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

