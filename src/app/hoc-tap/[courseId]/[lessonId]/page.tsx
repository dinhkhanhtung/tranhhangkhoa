"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Play, CheckCircle, Circle, ChevronLeft, ChevronRight, 
  Clock, BookOpen, Award, Menu, X, FileText
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion, Timestamp, collection, query, where, getDocs } from "firebase/firestore";

interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration: string;
  videoUrl: string;
  order: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  instructor?: string;
}

interface Enrollment {
  id: string;
  completedLessons: string[];
  lastAccessedAt?: Timestamp;
  lastAccessedLessonId?: string;
  lastAccessedCourseId?: string;
}

export default function LessonPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dang-nhap");
      return;
    }

    if (status === "authenticated" && courseId && lessonId) {
      fetchData();
    }
  }, [status, courseId, lessonId, router]);

  const fetchData = async () => {
    if (!db || !session?.user?.id) return;

    try {
      // Fetch course
      const courseRef = doc(db, "courses", courseId);
      const courseSnap = await getDoc(courseRef);

      if (!courseSnap.exists()) {
        router.push("/hoc-tap");
        return;
      }

      const courseData = { id: courseSnap.id, ...courseSnap.data() } as Course;
      // Sort lessons by order
      courseData.lessons = courseData.lessons?.sort((a, b) => a.order - b.order) || [];
      setCourse(courseData);

      // Find current lesson
      const lesson = courseData.lessons.find(l => l.id === lessonId);
      if (!lesson) {
        // Redirect to first lesson if not found
        if (courseData.lessons.length > 0) {
          router.push(`/hoc-tap/${courseId}/${courseData.lessons[0].id}`);
        }
        return;
      }
      setCurrentLesson(lesson);

      // Fetch enrollment
      const enrollmentsRef = collection(db, "enrollments");
      const q = query(
        enrollmentsRef, 
        where("userId", "==", session.user.id),
        where("courseId", "==", courseId)
      );
      const enrollmentSnap = await getDocs(q);

      if (!enrollmentSnap.empty) {
        const enrollmentData = { id: enrollmentSnap.docs[0].id, ...enrollmentSnap.docs[0].data() } as Enrollment;
        setEnrollment(enrollmentData);
        setIsCompleted(enrollmentData.completedLessons?.includes(lessonId) || false);

        // Update last accessed - save both timestamp and current lesson ID for resume
        await updateDoc(doc(db, "enrollments", enrollmentData.id), {
          lastAccessedAt: Timestamp.now(),
          lastAccessedLessonId: lessonId,
          lastAccessedCourseId: courseId,
        });
      } else {
        // Not enrolled, redirect to course page
        router.push(`/khoa-hoc/${courseId}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async () => {
    if (!db || !enrollment?.id || !lessonId) return;

    try {
      const enrollmentRef = doc(db, "enrollments", enrollment.id);
      await updateDoc(enrollmentRef, {
        completedLessons: arrayUnion(lessonId)
      });
      setIsCompleted(true);
      setEnrollment(prev => prev ? {
        ...prev,
        completedLessons: [...(prev.completedLessons || []), lessonId]
      } : null);
    } catch (error) {
      console.error("Error marking lesson complete:", error);
    }
  };

  const navigateToLesson = (lesson: Lesson) => {
    router.push(`/hoc-tap/${courseId}/${lesson.id}`);
    setIsSidebarOpen(false);
  };

  const getNextLesson = () => {
    if (!course?.lessons || !currentLesson) return null;
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id);
    return course.lessons[currentIndex + 1] || null;
  };

  const getPrevLesson = () => {
    if (!course?.lessons || !currentLesson) return null;
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id);
    return course.lessons[currentIndex - 1] || null;
  };

  const calculateProgress = () => {
    if (!course?.lessons || !enrollment) return 0;
    return Math.round((enrollment.completedLessons?.length || 0) / course.lessons.length * 100);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#1c1917] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b45309]" />
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-[#fffbf5] pt-20 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-[#a8a29e] mb-4" />
          <p className="text-[#57534e]">Không tìm thấy bài học</p>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();
  const nextLesson = getNextLesson();
  const prevLesson = getPrevLesson();

  return (
    <div className="min-h-screen bg-[#1c1917]">
      {/* Header */}
      <header className="bg-[#1c1917] border-b border-[#292524] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Back & Course Title */}
            <div className="flex items-center gap-4">
              <Link
                href="/hoc-tap"
                className="flex items-center gap-2 text-[#a8a29e] hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Quay lại</span>
              </Link>
              <div className="h-6 w-px bg-[#44403c] hidden sm:block" />
              <h1 className="text-white font-medium truncate max-w-xs sm:max-w-md">
                {course.title}
              </h1>
            </div>

            {/* Right: Progress & Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="w-32 h-2 bg-[#292524] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#b45309] rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[#a8a29e]">{progress}%</span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 text-[#a8a29e] hover:text-white"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar - Lesson List */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-80 bg-[#1c1917] border-r border-[#292524] transform transition-transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="h-full flex flex-col pt-14 lg:pt-0">
            {/* Close button for mobile */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#292524]">
              <span className="text-white font-medium">Danh sách bài học</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-[#a8a29e] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress mobile */}
            <div className="lg:hidden px-4 py-3 border-b border-[#292524]">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[#a8a29e]">Tiến độ</span>
                <span className="text-white">{progress}%</span>
              </div>
              <div className="h-2 bg-[#292524] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#b45309] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Lesson List */}
            <div className="flex-1 overflow-y-auto">
              {course.lessons?.map((lesson, index) => {
                const isActive = lesson.id === lessonId;
                const isLessonCompleted = enrollment?.completedLessons?.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigateToLesson(lesson)}
                    className={`
                      w-full flex items-start gap-3 p-4 text-left transition-colors border-b border-[#292524]
                      ${isActive ? "bg-[#292524]" : "hover:bg-[#292524]/50"}
                    `}
                  >
                    <div className="mt-0.5">
                      {isLessonCompleted ? (
                        <CheckCircle size={18} className="text-green-500" />
                      ) : isActive ? (
                        <Play size={18} className="text-[#b45309]" />
                      ) : (
                        <Circle size={18} className="text-[#57534e]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${isActive ? "text-white" : "text-[#a8a29e]"}`}>
                        {index + 1}. {lesson.title}
                      </p>
                      <p className="text-xs text-[#57534e] mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        {lesson.duration}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Video Player */}
          <div className="aspect-video bg-black relative">
            {currentLesson.videoUrl ? (
              <video
                src={currentLesson.videoUrl}
                controls
                className="w-full h-full"
                poster="/images/video-poster.jpg"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play size={64} className="mx-auto text-[#44403c] mb-4" />
                  <p className="text-[#a8a29e]">Video đang được cập nhật</p>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Info */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentLesson.id}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-medium text-white mb-2">
                    {currentLesson.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-[#a8a29e]">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {currentLesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      Bài {course.lessons.findIndex(l => l.id === currentLesson.id) + 1}/{course.lessons.length}
                    </span>
                  </div>
                </div>

                {/* Complete Button */}
                <button
                  onClick={markAsComplete}
                  disabled={isCompleted}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                    ${isCompleted
                      ? "bg-green-500/20 text-green-400 cursor-default"
                      : "bg-[#b45309] text-white hover:bg-[#92400e]"
                    }
                  `}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle size={18} />
                      Đã hoàn thành
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Đánh dấu hoàn thành
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              {currentLesson.description && (
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-[#a8a29e] leading-relaxed">
                    {currentLesson.description}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-[#292524]">
                <button
                  onClick={() => prevLesson && navigateToLesson(prevLesson)}
                  disabled={!prevLesson}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                    ${prevLesson
                      ? "text-white hover:bg-[#292524]"
                      : "text-[#57534e] cursor-not-allowed"
                    }
                  `}
                >
                  <ChevronLeft size={18} />
                  Bài trước
                </button>

                <button
                  onClick={() => nextLesson && navigateToLesson(nextLesson)}
                  disabled={!nextLesson}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                    ${nextLesson
                      ? "bg-[#b45309] text-white hover:bg-[#92400e]"
                      : "bg-[#292524] text-[#57534e] cursor-not-allowed"
                    }
                  `}
                >
                  {nextLesson ? "Bài tiếp theo" : "Đã hoàn thành khóa học"}
                  {nextLesson && <ChevronRight size={18} />}
                </button>
              </div>

              {/* Completion Message */}
              {progress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 bg-gradient-to-r from-[#b45309]/20 to-[#d97706]/20 border border-[#b45309]/30 rounded-xl text-center"
                >
                  <Award size={48} className="mx-auto text-[#b45309] mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">
                    Chúc mừng! Bạn đã hoàn thành khóa học
                  </h3>
                  <p className="text-[#a8a29e] mb-4">
                    Hãy tiếp tục học tập và rèn luyện để nâng cao kỹ năng thêu tay của bạn
                  </p>
                  <Link
                    href="/hoc-tap"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors"
                  >
                    <BookOpen size={18} />
                    Khám phá khóa học khác
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
