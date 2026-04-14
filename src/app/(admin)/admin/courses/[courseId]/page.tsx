"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  ArrowLeft, Plus, Trash2, Edit2, Save, X, Play, GripVertical,
  Clock, CheckCircle2, ExternalLink, FolderOpen, Video, RefreshCw,
  Loader2, ChevronDown, ChevronUp, Copy, Link2, Users
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";

interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration: string;
  videoUrl: string;
  videoType: "youtube" | "drive" | "direct";
  order: number;
  isPublished: boolean;
  createdAt?: Timestamp;
}

interface Course {
  id: string;
  title: string;
  description?: string;
  image: string;
  lessons: Lesson[];
  isPublished: boolean;
  createdAt?: Timestamp;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  size?: string;
  createdTime: string;
}

const LEVELS = {
  beginner: "Cơ bản",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Drive integration states
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [driveFolderId, setDriveFolderId] = useState("");
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [loadingDrive, setLoadingDrive] = useState(false);
  const [selectedDriveFiles, setSelectedDriveFiles] = useState<Set<string>>(new Set());
  const [driveApiKey, setDriveApiKey] = useState("");

  // Form states
  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    title: "",
    description: "",
    duration: "10:00",
    videoUrl: "",
    videoType: "youtube",
    isPublished: false,
  });

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    if (!db || !courseId) return;

    try {
      const courseRef = doc(db, "courses", courseId);
      const snapshot = await getDoc(courseRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        const courseData = { id: snapshot.id, ...data } as Course;
        setCourse(courseData);
        setLessons(courseData.lessons || []);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch videos from Google Drive folder
  const fetchDriveVideos = async () => {
    if (!driveFolderId || !driveApiKey) {
      alert("Vui lòng nhập Folder ID và API Key");
      return;
    }

    setLoadingDrive(true);
    try {
      // Google Drive API v3 - list files in folder
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${driveFolderId}'+in+parents+and+mimeType+contains+'video/'&key=${driveApiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink,thumbnailLink,size,createdTime)&orderBy=createdTime`
      );

      const data = await response.json();
      
      if (data.error) {
        console.error("Drive API error:", data.error);
        alert("Lỗi Drive API: " + data.error.message);
        return;
      }

      setDriveFiles(data.files || []);
    } catch (error) {
      console.error("Error fetching drive files:", error);
      alert("Không thể lấy video từ Drive. Kiểm tra Folder ID và API Key.");
    } finally {
      setLoadingDrive(false);
    }
  };

  // Convert Drive file to direct video link
  const getDriveDirectLink = (fileId: string) => {
    // Option 1: Direct download link (may not work for large files without auth)
    // return `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Option 2: Using Google Drive streaming (requires proper setup)
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  // Add selected videos from Drive
  const addSelectedDriveVideos = () => {
    const selectedFiles = driveFiles.filter(f => selectedDriveFiles.has(f.id));
    
    const newLessons: Lesson[] = selectedFiles.map((file, index) => ({
      id: `lesson-drive-${Date.now()}-${index}`,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      description: `Video từ Google Drive: ${file.name}`,
      duration: "10:00", // Default, user can edit
      videoUrl: getDriveDirectLink(file.id),
      videoType: "drive",
      order: lessons.length + index + 1,
      isPublished: false,
      createdAt: Timestamp.now(),
    }));

    const updatedLessons = [...lessons, ...newLessons];
    setLessons(updatedLessons);
    saveLessonsToFirebase(updatedLessons);
    
    setIsDriveModalOpen(false);
    setSelectedDriveFiles(new Set());
    alert(`Đã thêm ${newLessons.length} video từ Drive!`);
  };

  const toggleDriveFileSelection = (fileId: string) => {
    setSelectedDriveFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };

  // Save lessons order
  const saveLessonsToFirebase = async (updatedLessons: Lesson[]) => {
    if (!db || !courseId) return;

    try {
      await updateDoc(doc(db, "courses", courseId), {
        lessons: updatedLessons,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error saving lessons:", error);
    }
  };

  // Add new lesson
  const addLesson = () => {
    if (!newLesson.title || !newLesson.videoUrl) {
      alert("Vui lòng nhập tên bài học và link video");
      return;
    }

    const lesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: newLesson.title,
      description: newLesson.description || "",
      duration: newLesson.duration || "10:00",
      videoUrl: newLesson.videoUrl,
      videoType: newLesson.videoType || "youtube",
      order: lessons.length + 1,
      isPublished: newLesson.isPublished || false,
      createdAt: Timestamp.now(),
    };

    const updatedLessons = [...lessons, lesson];
    setLessons(updatedLessons);
    saveLessonsToFirebase(updatedLessons);
    
    setIsAddModalOpen(false);
    setNewLesson({
      title: "",
      description: "",
      duration: "10:00",
      videoUrl: "",
      videoType: "youtube",
      isPublished: false,
    });
  };

  // Update lesson
  const updateLesson = async () => {
    if (!editingLesson) return;

    const updatedLessons = lessons.map(l => 
      l.id === editingLesson.id ? editingLesson : l
    );
    
    setLessons(updatedLessons);
    await saveLessonsToFirebase(updatedLessons);
    setEditingLesson(null);
  };

  // Delete lesson
  const deleteLesson = async (lessonId: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài học này?")) return;

    const updatedLessons = lessons.filter(l => l.id !== lessonId);
    // Reorder remaining lessons
    const reordered = updatedLessons.map((l, idx) => ({ ...l, order: idx + 1 }));
    
    setLessons(reordered);
    await saveLessonsToFirebase(reordered);
  };

  // Reorder lessons
  const handleReorder = async (newOrder: Lesson[]) => {
    const reordered = newOrder.map((l, idx) => ({ ...l, order: idx + 1 }));
    setLessons(reordered);
    await saveLessonsToFirebase(reordered);
  };

  // Toggle publish status
  const togglePublish = async (lessonId: string) => {
    const updatedLessons = lessons.map(l => 
      l.id === lessonId ? { ...l, isPublished: !l.isPublished } : l
    );
    setLessons(updatedLessons);
    await saveLessonsToFirebase(updatedLessons);
  };

  // Format video URL for display
  const getVideoThumbnail = (lesson: Lesson) => {
    if (lesson.videoType === "youtube") {
      const videoId = lesson.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=)([^&\s]+)/)?.[1];
      return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
    }
    return null;
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

  if (!course) {
    return (
      <div className="p-6 lg:p-10">
        <div className="text-center py-12">
          <p className="text-[#57534e]">Không tìm thấy khóa học</p>
          <Link href="/admin/courses" className="text-[#b45309] hover:underline mt-2 inline-block">
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/courses"
          className="p-2 hover:bg-[#f5f5f4] rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-[#57534e]" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#1c1917]">{course.title}</h1>
          <p className="text-[#57534e]">Quản lý bài học và nội dung video</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsDriveModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6] transition-colors"
          >
            <FolderOpen size={18} />
            Thêm từ Drive
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors"
          >
            <Plus size={18} />
            Thêm bài học
          </button>
        </div>
      </div>

      {/* Course Info Card */}
      <div className="bg-white rounded-xl border border-[#e7e5e4] p-4 flex items-center gap-4">
        <img
          src={course.image || "https://via.placeholder.com/160x90"}
          alt={course.title}
          className="w-40 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${course.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
              {course.isPublished ? "Công khai" : "Bản nháp"}
            </span>
            <span className="text-sm text-[#57534e]">
              {lessons.length} bài học
            </span>
          </div>
          <p className="text-sm text-[#57534e] line-clamp-2">{course.description}</p>
        </div>
        <Link
          href={`/admin/courses/${courseId}/students`}
          className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f4] text-[#1c1917] rounded-lg hover:bg-[#e7e5e4] transition-colors"
        >
          <Users size={18} />
          <span className="hidden sm:inline">Học viên</span>
        </Link>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1c1917]">Danh sách bài học</h2>
          <p className="text-sm text-[#57534e]">Kéo thả để sắp xếp thứ tự</p>
        </div>

        <Reorder.Group axis="y" values={lessons} onReorder={handleReorder} className="space-y-3">
          {lessons.map((lesson) => (
            <Reorder.Item key={lesson.id} value={lesson}>
              <div className="bg-white rounded-xl border border-[#e7e5e4] p-4 group hover:border-[#b45309] transition-colors">
                <div className="flex items-start gap-4">
                  {/* Drag Handle */}
                  <div className="p-2 cursor-grab active:cursor-grabbing text-[#a8a29e]">
                    <GripVertical size={18} />
                  </div>

                  {/* Thumbnail */}
                  <div className="w-28 h-16 bg-[#f5f5f4] rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                    {getVideoThumbnail(lesson) ? (
                      <img
                        src={getVideoThumbnail(lesson)!}
                        alt={lesson.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Play size={20} className="text-[#a8a29e]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 bg-[#b45309] text-white rounded flex items-center justify-center text-xs font-medium">
                            {lesson.order}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs ${lesson.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                            {lesson.isPublished ? "Công khai" : "Bản nháp"}
                          </span>
                          <span className="px-2 py-0.5 bg-[#f5f5f4] text-[#57534e] rounded text-xs flex items-center gap-1">
                            {lesson.videoType === "youtube" && <ExternalLink size={10} />}
                            {lesson.videoType === "drive" && <FolderOpen size={10} />}
                            {lesson.videoType === "direct" && <Video size={10} />}
                            {lesson.videoType}
                          </span>
                        </div>
                        <h3 className="font-medium text-[#1c1917]">{lesson.title}</h3>
                        {lesson.description && (
                          <p className="text-sm text-[#57534e] line-clamp-1">{lesson.description}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => togglePublish(lesson.id)}
                          className={`p-2 rounded-lg transition-colors ${lesson.isPublished ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"}`}
                          title={lesson.isPublished ? "Ẩn bài học" : "Công khai"}
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button
                          onClick={() => setEditingLesson(lesson)}
                          className="p-2 text-[#57534e] hover:bg-[#f5f5f4] rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <a
                          href={lesson.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[#57534e] hover:bg-[#f5f5f4] rounded-lg transition-colors"
                          title="Xem video"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button
                          onClick={() => deleteLesson(lesson.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[#57534e]">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {lesson.duration}
                      </span>
                      <span className="text-xs text-[#a8a29e] truncate max-w-xs">
                        {lesson.videoUrl}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {lessons.length === 0 && (
          <div className="text-center py-12 bg-[#f5f5f4] rounded-xl border border-dashed border-[#e7e5e4]">
            <Play size={48} className="mx-auto text-[#a8a29e] mb-4" />
            <p className="text-[#57534e]">Chưa có bài học nào</p>
            <div className="flex gap-2 justify-center mt-4">
              <button
                onClick={() => setIsDriveModalOpen(true)}
                className="px-4 py-2 bg-[#4285f4] text-white rounded-lg text-sm"
              >
                Thêm từ Drive
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-[#b45309] text-white rounded-lg text-sm"
              >
                Thêm thủ công
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Lesson Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#e7e5e4] flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1c1917]">Thêm bài học mới</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-[#f5f5f4] rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#1c1917]">Tên bài học <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newLesson.title || ""}
                    onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    placeholder="Ví dụ: Bài 1: Giới thiệu"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1c1917]">Mô tả</label>
                  <textarea
                    value={newLesson.description || ""}
                    onChange={(e) => setNewLesson(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1c1917]">Thời lượng</label>
                    <input
                      type="text"
                      value={newLesson.duration || ""}
                      onChange={(e) => setNewLesson(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      placeholder="10:00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1c1917]">Loại video</label>
                    <select
                      value={newLesson.videoType || "youtube"}
                      onChange={(e) => setNewLesson(prev => ({ ...prev, videoType: e.target.value as Lesson["videoType"] }))}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="drive">Google Drive</option>
                      <option value="direct">Link trực tiếp</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1c1917]">Link video <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newLesson.videoUrl || ""}
                    onChange={(e) => setNewLesson(prev => ({ ...prev, videoUrl: e.target.value }))}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    placeholder={newLesson.videoType === "youtube" ? "https://youtube.com/watch?v=..." : "https://..."}
                  />
                  <p className="text-xs text-[#57534e] mt-1">
                    {newLesson.videoType === "youtube" && "🔗 Hỗ trợ link YouTube watch hoặc embed"}
                    {newLesson.videoType === "drive" && "🔗 Dùng nút 'Thêm từ Drive' để lấy link tự động"}
                    {newLesson.videoType === "direct" && "🔗 Link video trực tiếp (MP4, v.v.)"}
                  </p>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newLesson.isPublished || false}
                    onChange={(e) => setNewLesson(prev => ({ ...prev, isPublished: e.target.checked }))}
                    className="w-4 h-4 rounded border-[#e7e5e4] text-[#b45309]"
                  />
                  <span className="text-sm text-[#1c1917]">Công khai ngay</span>
                </label>
              </div>
              <div className="p-6 border-t border-[#e7e5e4] flex gap-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-[#e7e5e4] text-[#1c1917] rounded-lg hover:bg-[#f5f5f4]"
                >
                  Hủy
                </button>
                <button
                  onClick={addLesson}
                  className="flex-1 px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e]"
                >
                  Thêm bài học
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Lesson Modal */}
      <AnimatePresence>
        {editingLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setEditingLesson(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#e7e5e4] flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1c1917]">Sửa bài học</h2>
                <button onClick={() => setEditingLesson(null)} className="p-2 hover:bg-[#f5f5f4] rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#1c1917]">Tên bài học</label>
                  <input
                    type="text"
                    value={editingLesson.title}
                    onChange={(e) => setEditingLesson(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1c1917]">Mô tả</label>
                  <textarea
                    value={editingLesson.description || ""}
                    onChange={(e) => setEditingLesson(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={2}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1c1917]">Thời lượng</label>
                    <input
                      type="text"
                      value={editingLesson.duration}
                      onChange={(e) => setEditingLesson(prev => prev ? { ...prev, duration: e.target.value } : null)}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1c1917]">Loại video</label>
                    <select
                      value={editingLesson.videoType}
                      onChange={(e) => setEditingLesson(prev => prev ? { ...prev, videoType: e.target.value as Lesson["videoType"] } : null)}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="drive">Google Drive</option>
                      <option value="direct">Link trực tiếp</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1c1917]">Link video</label>
                  <input
                    type="text"
                    value={editingLesson.videoUrl}
                    onChange={(e) => setEditingLesson(prev => prev ? { ...prev, videoUrl: e.target.value } : null)}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingLesson.isPublished}
                    onChange={(e) => setEditingLesson(prev => prev ? { ...prev, isPublished: e.target.checked } : null)}
                    className="w-4 h-4 rounded border-[#e7e5e4] text-[#b45309]"
                  />
                  <span className="text-sm text-[#1c1917]">Công khai</span>
                </label>
              </div>
              <div className="p-6 border-t border-[#e7e5e4] flex gap-3">
                <button
                  onClick={() => setEditingLesson(null)}
                  className="flex-1 px-4 py-2 border border-[#e7e5e4] text-[#1c1917] rounded-lg hover:bg-[#f5f5f4]"
                >
                  Hủy
                </button>
                <button
                  onClick={updateLesson}
                  className="flex-1 px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e]"
                >
                  Lưu thay đổi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Drive Modal */}
      <AnimatePresence>
        {isDriveModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsDriveModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#e7e5e4] flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#1c1917]">Thêm video từ Google Drive</h2>
                  <p className="text-sm text-[#57534e]">Lấy video từ folder Drive để thêm nhanh vào khóa học</p>
                </div>
                <button onClick={() => setIsDriveModalOpen(false)} className="p-2 hover:bg-[#f5f5f4] rounded-lg">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Setup Guide */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                  <p className="font-medium text-blue-900 mb-2">📋 Hướng dẫn thiết lập:</p>
                  <ol className="list-decimal list-inside space-y-1 text-blue-800">
                    <li>Vào <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                    <li>Tạo project → Bật <strong>Google Drive API</strong></li>
                    <li>Tạo <strong>API Key</strong> (Credentials → Create Credentials)</li>
                    <li>Chia sẻ folder Drive ở chế độ "Anyone with the link can view"</li>
                    <li>Copy <strong>Folder ID</strong> từ URL: drive.google.com/drive/folders/<strong>FOLDER_ID</strong></li>
                  </ol>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1c1917]">Drive API Key</label>
                    <input
                      type="password"
                      value={driveApiKey}
                      onChange={(e) => setDriveApiKey(e.target.value)}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      placeholder="AIzaSy..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1c1917]">Folder ID</label>
                    <input
                      type="text"
                      value={driveFolderId}
                      onChange={(e) => setDriveFolderId(e.target.value)}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                    />
                  </div>
                </div>

                <button
                  onClick={fetchDriveVideos}
                  disabled={loadingDrive || !driveFolderId || !driveApiKey}
                  className="w-full py-2 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loadingDrive ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                  {loadingDrive ? "Đang tải..." : "Lấy danh sách video"}
                </button>

                {/* Drive Files List */}
                {driveFiles.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#1c1917]">
                        Tìm thấy {driveFiles.length} video
                      </p>
                      <p className="text-xs text-[#57534e]">
                        Đã chọn {selectedDriveFiles.size} video
                      </p>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-2 border border-[#e7e5e4] rounded-lg p-2">
                      {driveFiles.map((file) => (
                        <label
                          key={file.id}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedDriveFiles.has(file.id) ? "bg-blue-50 border border-blue-200" : "bg-[#f5f5f4] hover:bg-[#e7e5e4]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedDriveFiles.has(file.id)}
                            onChange={() => toggleDriveFileSelection(file.id)}
                            className="w-4 h-4 rounded border-[#e7e5e4] text-[#4285f4]"
                          />
                          <div className="w-12 h-8 bg-[#4285f4]/10 rounded flex items-center justify-center">
                            <Video size={16} className="text-[#4285f4]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#1c1917] truncate">{file.name}</p>
                            <p className="text-xs text-[#57534e]">
                              {file.size ? (parseInt(file.size) / 1024 / 1024).toFixed(1) + " MB" : "Unknown size"}
                            </p>
                          </div>
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[#57534e] hover:bg-white rounded"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={14} />
                          </a>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {driveFiles.length === 0 && !loadingDrive && driveFolderId && (
                  <div className="text-center py-8 text-[#57534e]">
                    <FolderOpen size={48} className="mx-auto mb-2 text-[#a8a29e]" />
                    <p>Chưa tìm thấy video nào trong folder</p>
                    <p className="text-sm">Kiểm tra lại Folder ID và quyền truy cập</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-[#e7e5e4] flex gap-3">
                <button
                  onClick={() => setIsDriveModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-[#e7e5e4] text-[#1c1917] rounded-lg hover:bg-[#f5f5f4]"
                >
                  Hủy
                </button>
                <button
                  onClick={addSelectedDriveVideos}
                  disabled={selectedDriveFiles.size === 0}
                  className="flex-1 px-4 py-2 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6] transition-colors disabled:opacity-50"
                >
                  Thêm {selectedDriveFiles.size} video đã chọn
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
