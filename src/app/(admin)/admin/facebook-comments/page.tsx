"use client";

import { useState } from "react";
import { 
  Search, Filter, Reply, Trash2, MoreVertical, ExternalLink,
  Facebook, MessageCircle, Heart, Share2, Clock, CheckCircle
} from "lucide-react";

export default function FacebookCommentsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "replied">("all");

  const fbComments = [
    {
      id: "1",
      author: "Nguyễn Thị Mai",
      facebookId: "100000123456",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80",
      content: "Tranh thêu đẹp quá shop ơi, mình muốn đặt tranh hoa sen nhưng chưa biết chọn size nào. Shop tư vấn giúp mình với nhé!",
      post: "Bộ sưu tập tranh thêu hoa sen 2024",
      reactions: { likes: 12, loves: 5, haha: 2 },
      replies: 2,
      date: "30 phút trước",
      status: "unread",
      postUrl: "https://facebook.com/post/12345"
    },
    {
      id: "2",
      author: "Trần Văn Nam",
      facebookId: "100000789012",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&q=80",
      content: "Đã nhận được tranh, chất lượng rất tốt! Mình sẽ ủng hộ shop thêm nhiều nữa.",
      post: "Khuyến mãi tháng 4 - Giảm 20%",
      reactions: { likes: 8, loves: 3, haha: 1 },
      replies: 1,
      date: "2 giờ trước",
      status: "replied",
      postUrl: "https://facebook.com/post/67890"
    },
    {
      id: "3",
      author: "Lê Minh Tuấn",
      facebookId: "100000345678",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80",
      content: "Shop có khóa học thêu online không? Mình muốn học nhưng ở xa quá.",
      post: "Giới thiệu khóa học thêu cơ bản",
      reactions: { likes: 5, loves: 2, haha: 0 },
      replies: 0,
      date: "5 giờ trước",
      status: "unread",
      postUrl: "https://facebook.com/post/11111"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"><MessageCircle size={10} /> Chưa đọc</span>;
      case "replied":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle size={10} /> Đã trả lời</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const filteredComments = filter === "all" ? fbComments : fbComments.filter(c => c.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Quản lý Comment Facebook</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý và trả lời bình luận từ Fanpage Facebook</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors">
          <Facebook size={16} /> Kết nối Fanpage
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1877F2]/10 rounded-lg flex items-center justify-center">
              <MessageCircle size={20} className="text-[#1877F2]" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">89</p>
              <p className="text-sm text-[#57534e]">Tổng comment</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">15</p>
              <p className="text-sm text-[#57534e]">Chưa đọc</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Reply size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">74</p>
              <p className="text-sm text-[#57534e]">Đã trả lời</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
              <Heart size={20} className="text-pink-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">342</p>
              <p className="text-sm text-[#57534e]">Tổng reactions</p>
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
              onClick={() => setFilter("unread")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === "unread" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Chưa đọc
            </button>
            <button
              onClick={() => setFilter("replied")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === "replied" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Đã trả lời
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
                        <Facebook size={12} className="text-[#1877F2]" />
                        {getStatusBadge(comment.status)}
                      </div>
                      <p className="text-sm text-[#57534e]">{comment.post}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={comment.postUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-[#57534e] hover:text-[#1877F2] transition-colors">
                        <ExternalLink size={12} />
                        Xem bài viết
                      </a>
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-[#1c1917]">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-3 text-xs text-[#57534e]">
                      <span className="flex items-center gap-1">
                        <Heart size={12} className="text-pink-500" />
                        {comment.reactions.likes + comment.reactions.loves + comment.reactions.haha}
                      </span>
                      <span className="flex items-center gap-1">
                        <Reply size={12} />
                        {comment.replies} trả lời
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {comment.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#1877F2] hover:bg-blue-50 rounded transition-colors">
                        <Reply size={12} />
                        Trả lời
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#57534e] hover:bg-[#e7e5e4] rounded transition-colors">
                        <Share2 size={12} />
                        Chia sẻ
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={12} />
                        Ẩn
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

