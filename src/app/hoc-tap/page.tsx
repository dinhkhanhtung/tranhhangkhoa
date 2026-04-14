"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Clock, CheckCircle, Circle, Lock, Award, BookOpen } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: Lesson[];
  instructor?: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
}

interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: Timestamp;
  completedLessons: string[];
  lastAccessedAt?: Timestamp;
}

export default function LearningPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<Array<{ enrollment: Enrollment; course: Course }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dang-nhap");
      return;
    }

    if (status === "authenticated" && session?.user?.id) {
      fetchEnrolledCourses(session.user.id);
    }
  }, [status, session, router]);

  const fetchEnrolledCourses = async (userId: string) => {
    if (!db) {
      setLoading(false);
      return;
    }

    try {
      // Fetch enrollments
      const enrollmentsRef = collection(db, "enrollments");
      const q = query(enrollmentsRef, where("userId", "==", userId));
      const enrollmentSnapshot = await getDocs(q);

      const enrolledData: Array<{ enrollment: Enrollment; course: Course }> = [];

      for (const enrollmentDoc of enrollmentSnapshot.docs) {
        const enrollmentData = enrollmentDoc.data() as Enrollment;
        enrollmentData.id = enrollmentDoc.id;

        // Fetch course details
        const courseRef = doc(db, "courses", enrollmentData.courseId);
        const courseSnapshot = await getDoc(courseRef);

        if (courseSnapshot.exists()) {
          const courseData = courseSnapshot.data() as Course;
          courseData.id = courseSnapshot.id;
          enrolledData.push({ enrollment: enrollmentData, course: courseData });
        }
      }

      setEnrolledCourses(enrolledData);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (enrollment: Enrollment, course: Course) => {
    if (!course.lessons || course.lessons.length === 0) return 0;
    return Math.round((enrollment.completedLessons?.length || 0) / course.lessons.length * 100);
  };

  const getLastAccessedLesson = (enrollment: Enrollment, course: Course) => {
    if (!enrollment.lastAccessedAt) return null;
    // Return the first incomplete lesson or the last lesson
    const completedIds = enrollment.completedLessons || [];
    const incompleteLesson = course.lessons?.find(l => !completedIds.includes(l.id));
    return incompleteLesson || course.lessons?.[course.lessons.length - 1];
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#fffbf5] pt-20 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b45309]" />
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="min-h-screen bg-[#fffbf5] pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto text-[#a8a29e] mb-4" />
            <h1 className="text-2xl font-serif text-[#1c1917] mb-2">Bạn chưa đăng ký khóa học nào</h1>
            <p className="text-[#57534e] mb-6">Khám phá các khóa học thêu tay và bắt đầu hành trình sáng tạo của bạn</p>
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors"
            >
              <Play size={20} />
              Khám phá khóa học
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf5] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif text-[#1c1917] mb-2">Khóa học của tôi</h1>
          <p className="text-[#57534e]">Tiếp tục hành trình học tập của bạn</p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(({ enrollment, course }, index) => {
            const progress = calculateProgress(enrollment, course);
            const lastLesson = getLastAccessedLesson(enrollment, course);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-[#e7e5e4] overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Course Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-medium text-lg line-clamp-2">{course.title}</h3>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-4 space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-[#57534e]">Tiến độ</span>
                      <span className="font-medium text-[#b45309]">{progress}%</span>
                    </div>
                    <div className="h-2 bg-[#f5f5f4] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#b45309] rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#57534e] mt-1">
                      {enrollment.completedLessons?.length || 0}/{course.lessons?.length || 0} bài học
                    </p>
                  </div>

                  {/* Last Lesson */}
                  {lastLesson && (
                    <div className="flex items-center gap-2 text-sm text-[#57534e]">
                      <Play size={14} className="text-[#b45309]" />
                      <span className="line-clamp-1">{lastLesson.title}</span>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link
                    href={`/hoc-tap/${course.id}/${lastLesson?.id || course.lessons?.[0]?.id || "lesson-1"}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors"
                  >
                    {progress === 100 ? (
                      <>
                        <Award size={18} />
                        Xem lại khóa học
                      </>
                    ) : progress === 0 ? (
                      <>
                        <Play size={18} />
                        Bắt đầu học
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        Tiếp tục học
                      </>
                    )}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
