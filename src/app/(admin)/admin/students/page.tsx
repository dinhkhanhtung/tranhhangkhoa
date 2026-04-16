"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, Search, GraduationCap, BookOpen, Award,
  CheckCircle2, Circle, Clock, Loader2, TrendingUp,
  Download, Filter, ArrowLeft, ChevronRight
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

interface Course {
  id: string;
  title: string;
  lessons: { id: string; title: string; order: number }[];
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Timestamp;
  completedLessons: string[];
  lastAccessedAt?: Timestamp;
  lastAccessedLessonId?: string;
}

interface StudentData {
  enrollment: Enrollment;
  user: User | null;
  course: Course | null;
  progress: number;
  lastLessonTitle?: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  useEffect(() => {
    fetchStudentsAndCourses();
  }, []);

  const fetchStudentsAndCourses = async () => {
    if (!db) {
      setLoading(false);
      return;
    }

    try {
      // Fetch all courses first
      const coursesRef = collection(db, "courses");
      const coursesSnap = await getDocs(coursesRef);
      const coursesData: Course[] = [];
      const coursesMap = new Map<string, Course>();

      coursesSnap.docs.forEach((doc) => {
        const course = { id: doc.id, ...doc.data() } as Course;
        coursesData.push(course);
        coursesMap.set(doc.id, course);
      });

      setCourses(coursesData);

      // Fetch all enrollments
      const enrollmentsRef = collection(db, "enrollments");
      const enrollmentSnap = await getDocs(enrollmentsRef);

      const studentDataList: StudentData[] = [];

      for (const enrollmentDoc of enrollmentSnap.docs) {
        const enrollmentData = { id: enrollmentDoc.id, ...enrollmentDoc.data() } as Enrollment;
        
        // Get course info
        const course = coursesMap.get(enrollmentData.courseId) || null;
        
        // Fetch user details
        let user: User | null = null;
        try {
          const userRef = doc(db, "users", enrollmentData.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            user = { id: userSnap.id, ...userSnap.data() } as User;
          }
        } catch (e) {
          console.log("User not found:", enrollmentData.userId);
        }

        // Calculate progress
        const totalLessons = course?.lessons?.length || 0;
        const completedCount = enrollmentData.completedLessons?.length || 0;
        const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

        // Get last lesson title
        let lastLessonTitle: string | undefined;
        if (enrollmentData.lastAccessedLessonId && course?.lessons) {
          const lastLesson = course.lessons.find(l => l.id === enrollmentData.lastAccessedLessonId);
          lastLessonTitle = lastLesson?.title;
        }

        studentDataList.push({
          enrollment: enrollmentData,
          user,
          course,
          progress,
          lastLessonTitle,
        });
      }

      // Sort by last accessed (most recent first)
      studentDataList.sort((a, b) => {
        const aTime = a.enrollment.lastAccessedAt?.toMillis() || 0;
        const bTime = b.enrollment.lastAccessedAt?.toMillis() || 0;
        return bTime - aTime;
      });

      setStudents(studentDataList);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;

    const matchesCourse = selectedCourse === "all" || student.enrollment.courseId === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  // Stats
  const stats = {
    total: students.length,
    uniqueStudents: new Set(students.map(s => s.enrollment.userId)).size,
    completed: students.filter(s => s.progress === 100).length,
    active: students.filter(s => s.progress > 0 && s.progress < 100).length,
    inactive: students.filter(s => s.progress === 0).length,
    avgProgress: students.length > 0 
      ? Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)
      : 0,
  };

  // Format date
  const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return "Chưa có";
    return new Date(timestamp.toMillis()).toLocaleDateString("vi-VN");
  };

  // Format relative time
  const formatRelativeTime = (timestamp?: Timestamp) => {
    if (!timestamp) return "Chưa truy cập";
    const now = Date.now();
    const diff = now - timestamp.toMillis();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    return formatDate(timestamp);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Tên", "Email", "Khóa học", "Tiến độ", "Bài đã hoàn thành", "Tổng bài", "Đăng ký", "Lần cuối truy cập"];
    const rows = students.map(s => [
      s.user?.name || "Không tên",
      s.user?.email || "",
      s.course?.title || "",
      `${s.progress}%`,
      s.enrollment.completedLessons?.length || 0,
      s.course?.lessons?.length || 0,
      formatDate(s.enrollment.enrolledAt),
      formatDate(s.enrollment.lastAccessedAt),
    ]);

    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `students-all-courses-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
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
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#1c1917]">Quản lý học viên</h1>
          <p className="text-[#57534e]">Theo dõi tất cả học viên từ các khóa học</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f4] text-[#1c1917] rounded-lg hover:bg-[#e7e5e4] transition-colors"
        >
          <Download size={18} />
          Xuất CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Tổng đăng ký", value: stats.total, icon: Users, color: "bg-blue-500" },
          { label: "Học viên", value: stats.uniqueStudents, icon: GraduationCap, color: "bg-purple-500" },
          { label: "Đã hoàn thành", value: stats.completed, icon: Award, color: "bg-green-500" },
          { label: "Đang học", value: stats.active, icon: TrendingUp, color: "bg-[#b45309]" },
          { label: "Chưa bắt đầu", value: stats.inactive, icon: Circle, color: "bg-gray-500" },
          { label: "Tiến độ TB", value: `${stats.avgProgress}%`, icon: CheckCircle2, color: "bg-indigo-500" },
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
            placeholder="Tìm học viên theo tên, email hoặc khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none bg-white"
        >
          <option value="all">Tất cả khóa học</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border border-[#e7e5e4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f5f5f4] border-b border-[#e7e5e4]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Học viên</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Khóa học</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Tiến độ</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Bài học gần nhất</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Đăng ký</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#57534e]">Truy cập gần nhất</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e5e4]">
              {filteredStudents.map((student, idx) => (
                <motion.tr
                  key={student.enrollment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="hover:bg-[#f5f5f4]/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#b45309]/10 rounded-full flex items-center justify-center text-[#b45309] font-medium">
                        {student.user?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-[#1c1917]">{student.user?.name || "Không tên"}</p>
                        <p className="text-sm text-[#57534e]">{student.user?.email || student.enrollment.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link 
                      href={`/admin/courses/${student.enrollment.courseId}`}
                      className="text-sm text-[#b45309] hover:underline"
                    >
                      {student.course?.title || "Không xác định"}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full max-w-[150px]">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-[#57534e]">{student.progress}%</span>
                        <span className="text-xs text-[#a8a29e]">
                          {student.enrollment.completedLessons?.length || 0}/{student.course?.lessons?.length || 0}
                        </span>
                      </div>
                      <div className="h-2 bg-[#f5f5f4] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            student.progress === 100 ? "bg-green-500" : "bg-[#b45309]"
                          }`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {student.lastLessonTitle ? (
                      <span className="text-sm text-[#1c1917]">{student.lastLessonTitle}</span>
                    ) : (
                      <span className="text-sm text-[#a8a29e]">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-[#57534e]">
                      <Clock size={14} />
                      {formatDate(student.enrollment.enrolledAt)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-[#57534e]">
                      <Clock size={14} />
                      {formatRelativeTime(student.enrollment.lastAccessedAt)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-[#a8a29e] mb-4" />
            <p className="text-[#57534e]">Chưa có học viên nào</p>
            <p className="text-sm text-[#a8a29e] mt-1">Học viên sẽ xuất hiện khi đăng ký khóa học</p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-[#f5f5f4] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[#57534e]">
          Hiển thị <strong>{filteredStudents.length}</strong> / {students.length} đăng ký
        </p>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            Hoàn thành: {stats.completed}
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#b45309] rounded-full" />
            Đang học: {stats.active}
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
            Chưa bắt đầu: {stats.inactive}
          </span>
        </div>
      </div>
    </div>
  );
}

