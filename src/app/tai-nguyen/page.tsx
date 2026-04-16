"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Search, Filter, FileImage, FileText, Heart, Share2, Eye } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  fileUrl: string;
  fileType: "pdf" | "image" | "video";
  fileSize: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  downloads: number;
  likes: number;
  author?: string;
  createdAt: string;
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Mẫu hoa sen cơ bản",
    description: "Mẫu thêu hoa sen dành cho người mới bắt đầu, bao gồm hướng dẫn chi tiết từng bước.",
    thumbnail: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
    fileUrl: "/samples/lotus-basic.pdf",
    fileType: "pdf",
    fileSize: "2.5 MB",
    category: "Hoa sen",
    difficulty: "beginner",
    downloads: 1234,
    likes: 89,
    author: "Nghệ nhân",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "Mẫu chim hạc nâng cao",
    description: "Mẫu thêu chim hạc phức tạp với nhiều chi tiết, phù hợp cho người đã có kinh nghiệm.",
    thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    fileUrl: "/samples/crane-advanced.pdf",
    fileType: "pdf",
    fileSize: "4.2 MB",
    category: "Chim hạc",
    difficulty: "advanced",
    downloads: 567,
    likes: 45,
    author: "Nghệ nhân",
    createdAt: "2024-03-10",
  },
  {
    id: "3",
    title: "Bộ mẫu hoa đào Tết",
    description: "Bộ sưu tập 5 mẫu hoa đào để thêu trang trí dịp Tết Nguyên Đán.",
    thumbnail: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    fileUrl: "/samples/peach-blossom.zip",
    fileType: "image",
    fileSize: "8.7 MB",
    category: "Hoa đào",
    difficulty: "intermediate",
    downloads: 2341,
    likes: 156,
    author: "Nghệ nhân",
    createdAt: "2024-02-28",
  },
  {
    id: "4",
    title: "Mẫu cá chép phong thủy",
    description: "Mẫu thêu cá chép mang ý nghĩa may mắn, tài lộc trong phong thủy.",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c8ed1b31bc3b?w=600&q=80",
    fileUrl: "/samples/koi-fengshui.pdf",
    fileType: "pdf",
    fileSize: "3.1 MB",
    category: "Cá chép",
    difficulty: "intermediate",
    downloads: 892,
    likes: 67,
    author: "Nghệ nhân",
    createdAt: "2024-02-20",
  },
];

const categories = ["Tất cả", "Hoa sen", "Chim hạc", "Hoa đào", "Cá chép", "Phong cảnh", "Khác"];
const difficulties = [
  { value: "all", label: "Tất cả cấp độ" },
  { value: "beginner", label: "Cơ bản" },
  { value: "intermediate", label: "Trung cấp" },
  { value: "advanced", label: "Nâng cao" },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || resource.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return { label: "Cơ bản", color: "bg-green-100 text-green-700" };
      case "intermediate": return { label: "Trung cấp", color: "bg-yellow-100 text-yellow-700" };
      case "advanced": return { label: "Nâng cao", color: "bg-red-100 text-red-700" };
      default: return { label: "Cơ bản", color: "bg-green-100 text-green-700" };
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText size={16} className="text-red-500" />;
      case "image": return <FileImage size={16} className="text-blue-500" />;
      case "video": return <FileText size={16} className="text-purple-500" />;
      default: return <FileText size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[var(--color-dark)] text-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-serif mb-4"
          >
            Tài Nguyên Mẫu Thêu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#a8a29e] max-w-2xl mx-auto"
          >
            Bộ sưu tập mẫu thêu tay miễn phí dành cho học viên và người yêu thích nghệ thuật thêu
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white border-b border-[#e7e5e4] z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm mẫu thêu..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-nowrap gap-2 sm:gap-3 overflow-x-auto pb-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 sm:px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none bg-white text-sm whitespace-nowrap"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 sm:px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none bg-white text-sm whitespace-nowrap"
              >
                {difficulties.map((diff) => (
                  <option key={diff.value} value={diff.value}>{diff.label}</option>
                ))}
              </select>

              <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 border border-[#e7e5e4] rounded-lg hover:bg-[#f5f5f4] transition-colors whitespace-nowrap lg:hidden">
                <Filter size={18} />
                <span className="hidden sm:inline">Lọc</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#57534e]">
            Hiển thị <strong>{filteredResources.length}</strong> mẫu thêu
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#57534e]">Sắp xếp:</span>
            <select className="px-3 py-1.5 text-sm border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none">
              <option>Mới nhất</option>
              <option>Tải nhiều nhất</option>
              <option>Phổ biến nhất</option>
            </select>
          </div>
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-16">
            <FileImage size={64} className="mx-auto text-[#a8a29e] mb-4" />
            <h3 className="text-lg font-medium text-[var(--color-dark)] mb-2">Không tìm thấy mẫu thêu</h3>
            <p className="text-[#57534e]">Vui lòng thử tìm kiếm với từ khóa khác</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource, index) => {
              const difficulty = getDifficultyLabel(resource.difficulty);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white border border-[#e7e5e4] rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={resource.thumbnail}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Overlay Actions */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${difficulty.color}`}>
                        {difficulty.label}
                      </span>
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-[#f5f5f4] transition-colors">
                        <Heart size={16} className="text-[#57534e]" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {getFileTypeIcon(resource.fileType)}
                      <span className="text-xs text-[#57534e]">{resource.fileSize}</span>
                    </div>

                    <h3 className="font-medium text-[var(--color-dark)] mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {resource.title}
                    </h3>

                    <p className="text-sm text-[#57534e] mb-4 line-clamp-2">
                      {resource.description}
                    </p>

                    {resource.author && (
                      <p className="text-xs text-[#a8a29e] mb-3">
                        Bởi {resource.author}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-[#57534e] mb-4">
                      <div className="flex items-center gap-1">
                        <Download size={14} />
                        <span>{resource.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={14} />
                        <span>{resource.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{(resource.downloads * 3).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] transition-colors text-sm font-medium">
                        <Download size={16} />
                        Tải xuống
                      </button>
                      <button className="p-2 border border-[#e7e5e4] rounded-lg hover:bg-[#f5f5f4] transition-colors">
                        <Share2 size={16} className="text-[#57534e]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-[#f5f5f4] py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-serif text-[var(--color-dark)] mb-4">
            Bạn có mẫu thêu muốn chia sẻ?
          </h2>
          <p className="text-[#57534e] mb-6 max-w-2xl mx-auto">
            Hãy gửi mẫu thêu của bạn để cùng chia sẻ với cộng đồng yêu nghệ thuật thêu tay.
            Chúng tôi sẽ xem xét và đăng tải lên hệ thống.
          </p>
          <button className="px-6 py-3 bg-[var(--color-dark)] text-white rounded-lg hover:bg-[#2d2a26] transition-colors">
            Gửi mẫu thêu của bạn
          </button>
        </div>
      </div>
    </div>
  );
}

