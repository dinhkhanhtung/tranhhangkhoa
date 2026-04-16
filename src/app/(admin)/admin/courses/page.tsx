"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Edit2, Trash2, X, Upload, Loader2,
  Play, Users, Clock, DollarSign, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, GripVertical, ExternalLink, Settings2
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, Timestamp } from "firebase/firestore";

interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration: string;
  videoUrl: string;
  order: number;
  isPublished: boolean;
}

interface Course {
  id: string;
  title: string;
  description?: string;
  image: string;
  instructor?: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  lessons: Lesson[];
  isPublished: boolean;
  featured: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const LEVELS = [
  { value: "beginner", label: "Cơ bản", color: "bg-green-100 text-green-700" },
  { value: "intermediate", label: "Trung cấp", color: "bg-yellow-100 text-yellow-700" },
  { value: "advanced", label: "Nâng cao", color: "bg-red-100 text-red-700" },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Course>>({
    title: "",
    description: "",
    image: "",
    instructor: "",
    level: "beginner",
    price: 0,
    isPublished: false,
    featured: false,
    lessons: [],
  });

  // Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    if (!db) {
      setLoading(false);
      return;
    }

    try {
      const coursesRef = collection(db, "courses");
      const q = query(coursesRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const coursesData: Course[] = [];
      snapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() } as Course);
      });

      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || 
      (filter === "published" && course.isPublished) ||
      (filter === "draft" && !course.isPublished);
    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = {
    total: courses.length,
    published: courses.filter(c => c.isPublished).length,
    draft: courses.filter(c => !c.isPublished).length,
    totalStudents: courses.reduce((sum, c) => sum + (c.lessons?.length || 0) * 10, 0),
  };

  // Open new course modal
  const openNewModal = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      instructor: "",
      level: "beginner",
      price: 0,
      isPublished: false,
      featured: false,
      lessons: [],
    });
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormData({ ...course });
    setIsModalOpen(true);
  };

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
        method: "POST",
        body: formDataImg,
      });
      
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.data.url }));
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  // Save course
  const saveCourse = async () => {
    if (!db || !formData.title) return;

    try {
      const courseData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        instructor: formData.instructor || "Giảng viên",
        level: formData.level || "beginner",
        price: Number(formData.price) || 0,
        isPublished: formData.isPublished || false,
        featured: formData.featured || false,
        lessons: formData.lessons || [],
        updatedAt: serverTimestamp(),
      };

      if (editingCourse) {
        await updateDoc(doc(db, "courses", editingCourse.id), courseData);
        setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...courseData, id: editingCourse.id } as Course : c));
      } else {
        const newDoc = await addDoc(collection(db, "courses"), {
          ...courseData,
          createdAt: serverTimestamp(),
        });
        setCourses(prev => [{
          ...courseData,
          id: newDoc.id,
        } as Course, ...prev]);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Có lỗi xảy ra khi lưu khóa học");
    }
  };

  // Delete course
  const deleteCourse = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa khóa học này?")) return;
    
    if (!db) return;
    
    try {
      await deleteDoc(doc(db, "courses", id));
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Add lesson
  const addLesson = () => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: "Bài học mới",
      duration: "10:00",
      videoUrl: "",
      order: (formData.lessons?.length || 0) + 1,
      isPublished: false,
    };
    setFormData(prev => ({
      ...prev,
      lessons: [...(prev.lessons || []), newLesson],
    }));
  };

  // Update lesson
  const updateLesson = (lessonId: string, field: keyof Lesson, value: any) => {
    setFormData(prev => ({
      ...prev,
      lessons: prev.lessons?.map(l => l.id === lessonId ? { ...l, [field]: value } : l) || [],
    }));
  };

  // Remove lesson
  const removeLesson = (lessonId: string) => {
    setFormData(prev => ({
      ...prev,
      lessons: prev.lessons?.filter(l => l.id !== lessonId) || [],
    }));
  };

  // Format price
  const formatPrice = (price: number) => {
    return price === 0 ? "Miễn phí" : `${price.toLocaleString("vi-VN")}đ`;
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-10">
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-[#b45309]" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c1917]">Quản lý khóa học</h1>
          <p className="text-[#57534e] mt-1">Tạo và quản lý khóa học video</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#b45309] text-white rounded-xl font-medium hover:bg-[#92400e] transition-colors"
        >
          <Plus size={18} />
          Thêm khóa học
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tổng khóa học", value: stats.total, icon: Play, color: "bg-blue-500" },
          { label: "Đang công khai", value: stats.published, icon: CheckCircle2, color: "bg-green-500" },
          { label: "Bản nháp", value: stats.draft, icon: XCircle, color: "bg-gray-500" },
          { label: "Tổng học viên", value: stats.totalStudents, icon: Users, color: "bg-purple-500" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-[#e7e5e4]">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-[#1c1917]">{stat.value}</p>
                <p className="text-xs text-[#57534e]">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {[
            { id: "all", label: "Tất cả" },
            { id: "published", label: "Công khai" },
            { id: "draft", label: "Bản nháp" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f.id
                  ? "bg-[#b45309] text-white"
                  : "bg-white border border-[#e7e5e4] text-[#57534e] hover:border-[#b45309]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-[#e7e5e4] overflow-hidden">
            {/* Course Header */}
            <div className="p-4 flex items-start gap-4">
              <img
                src={course.image || "https://via.placeholder.com/160x90"}
                alt={course.title}
                className="w-32 h-20 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${LEVELS.find(l => l.value === course.level)?.color}`}>
                        {LEVELS.find(l => l.value === course.level)?.label}
                      </span>
                      {course.isPublished ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Công khai</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">Bản nháp</span>
                      )}
                      {course.featured && (
                        <span className="px-2 py-0.5 bg-[#b45309]/10 text-[#b45309] rounded text-xs">Nổi bật</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[#1c1917]">{course.title}</h3>
                    <p className="text-sm text-[#57534e] line-clamp-1">{course.description}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      href={`/admin/courses/${course.id}`}
                      className="p-2 text-[#57534e] hover:bg-[#f5f5f4] rounded-lg transition-colors"
                      title="Quản lý bài học"
                    >
                      <Settings2 size={16} />
                    </Link>
                    <button
                      onClick={() => openEditModal(course)}
                      className="p-2 text-[#57534e] hover:bg-[#f5f5f4] rounded-lg transition-colors"
                      title="Sửa thông tin"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa khóa học"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-[#57534e]">
                  <span className="flex items-center gap-1">
                    <Play size={14} />
                    {course.lessons?.length || 0} bài học
                  </span>
                  <span className="font-medium text-[#b45309]">{formatPrice(course.price)}</span>
                </div>
              </div>
            </div>

            {/* Expandable Lessons */}
            {course.lessons && course.lessons.length > 0 && (
              <div className="border-t border-[#e7e5e4]">
                <button
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  className="w-full px-4 py-2 flex items-center justify-between text-sm text-[#57534e] hover:bg-[#f5f5f4]"
                >
                  <span>Danh sách bài học ({course.lessons.length})</span>
                  {expandedCourse === course.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <AnimatePresence>
                  {expandedCourse === course.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-2">
                        {course.lessons.map((lesson, idx) => (
                          <div key={lesson.id} className="flex items-center gap-3 p-2 bg-[#f5f5f4] rounded-lg text-sm">
                            <span className="w-6 h-6 bg-[#b45309] text-white rounded flex items-center justify-center text-xs">
                              {lesson.order}
                            </span>
                            <span className="flex-1">{lesson.title}</span>
                            <span className="text-[#a8a29e]">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Course Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#e7e5e4] flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1c1917]">
                  {editingCourse ? "Sửa khóa học" : "Thêm khóa học mới"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-[#f5f5f4] rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Image */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1c1917]">Hình ảnh khóa học</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 bg-[#f5f5f4] rounded-lg overflow-hidden flex items-center justify-center">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Play size={24} className="text-[#a8a29e]" />
                      )}
                    </div>
                    <label className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f4] rounded-lg cursor-pointer hover:bg-[#e7e5e4] transition-colors">
                      {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                      <span className="text-sm">{uploadingImage ? "Đang upload..." : "Chọn ảnh"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                    </label>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#1c1917]">Tên khóa học <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      placeholder="Ví dụ: Thêu Cơ Bản cho Người Mới"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#1c1917]">Mô tả</label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none"
                      placeholder="Mô tả ngắn về khóa học..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#1c1917]">Cấp độ</label>
                      <select
                        value={formData.level || "beginner"}
                        onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as Course["level"] }))}
                        className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      >
                        {LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1c1917]">Giá (VNĐ)</label>
                      <input
                        type="number"
                        value={formData.price || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                        className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                        placeholder="0 = Miễn phí"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#1c1917]">Giảng viên</label>
                    <input
                      type="text"
                      value={formData.instructor || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      placeholder="Tên giảng viên"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isPublished || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                      className="w-4 h-4 rounded border-[#e7e5e4] text-[#b45309]"
                    />
                    <span className="text-sm text-[#1c1917]">Công khai</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 rounded border-[#e7e5e4] text-[#b45309]"
                    />
                    <span className="text-sm text-[#1c1917]">Khóa học nổi bật</span>
                  </label>
                </div>

                {/* Lessons */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#1c1917]">Danh sách bài học</label>
                    <button
                      onClick={addLesson}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#b45309] bg-[#b45309]/10 rounded-lg hover:bg-[#b45309]/20 transition-colors"
                    >
                      <Plus size={16} />
                      Thêm bài học
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.lessons?.map((lesson, idx) => (
                      <div key={lesson.id} className="p-3 bg-[#f5f5f4] rounded-lg space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-[#b45309] text-white rounded flex items-center justify-center text-xs">{lesson.order}</span>
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => updateLesson(lesson.id, "title", e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-[#e7e5e4] rounded-lg text-sm focus:border-[#b45309] focus:outline-none"
                            placeholder="Tên bài học"
                          />
                          <button onClick={() => removeLesson(lesson.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) => updateLesson(lesson.id, "duration", e.target.value)}
                            className="w-24 px-3 py-1.5 border border-[#e7e5e4] rounded-lg text-sm focus:border-[#b45309] focus:outline-none"
                            placeholder="10:00"
                          />
                          <input
                            type="text"
                            value={lesson.videoUrl}
                            onChange={(e) => updateLesson(lesson.id, "videoUrl", e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-[#e7e5e4] rounded-lg text-sm focus:border-[#b45309] focus:outline-none"
                            placeholder="Link video (YouTube hoặc URL trực tiếp)"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-[#e7e5e4]">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-[#e7e5e4] text-[#1c1917] rounded-lg hover:bg-[#f5f5f4] transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={saveCourse}
                    disabled={uploadingImage || !formData.title}
                    className="flex-1 px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors disabled:opacity-50"
                  >
                    {editingCourse ? "Lưu thay đổi" : "Tạo khóa học"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

