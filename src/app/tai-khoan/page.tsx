"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  User, ShoppingBag, Heart, BookOpen, Settings,
  LogOut, MapPin, Phone, Mail, Camera, ChevronRight,
  Star, Clock, Award, Package, Eye
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";

const tabs = [
  { id: "profile", label: "Hồ sơ", icon: User },
  { id: "courses", label: "Khóa học", icon: BookOpen },
  { id: "orders", label: "Đơn hàng", icon: ShoppingBag },
  { id: "wishlist", label: "Yêu thích", icon: Heart },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

interface EnrolledCourse {
  id: string;
  courseId: string;
  title: string;
  instructor?: string;
  thumbnail?: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson?: string;
  lastAccessedLessonId?: string;
}

// Real order from Firebase
interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: string;
  paymentStatus?: string;
  createdAt: Timestamp;
}

export default function AccountPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  // Fetch orders from Firebase
  useEffect(() => {
    const fetchOrders = async () => {
      if (!db || !session?.user?.email) return;
      
      setOrdersLoading(true);
      try {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("customer.email", "==", session.user.email),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        
        const ordersData: Order[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab, session?.user?.email]);

  // Fetch enrolled courses from Firebase
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!db || !session?.user?.id) return;
      
      setCoursesLoading(true);
      try {
        // Fetch enrollments
        const enrollmentsRef = collection(db, "enrollments");
        const q = query(
          enrollmentsRef,
          where("userId", "==", session.user.id)
        );
        const enrollmentSnap = await getDocs(q);
        
        const coursesData: EnrolledCourse[] = [];
        
        for (const enrollmentDoc of enrollmentSnap.docs) {
          const enrollment = enrollmentDoc.data();
          const courseId = enrollment.courseId;
          
          // Fetch course details
          const courseRef = doc(db, "courses", courseId);
          const courseSnap = await getDoc(courseRef);
          
          if (courseSnap.exists()) {
            const courseData = courseSnap.data();
            const totalLessons = courseData.lessons?.length || 0;
            const completedLessons = enrollment.completedLessons?.length || 0;
            const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            
            // Get next lesson title
            let nextLesson: string | undefined;
            if (enrollment.lastAccessedLessonId && courseData.lessons) {
              const lastLesson = courseData.lessons.find((l: {id: string, title: string}) => l.id === enrollment.lastAccessedLessonId);
              const lastIndex = courseData.lessons.findIndex((l: {id: string}) => l.id === enrollment.lastAccessedLessonId);
              const nextLessonData = courseData.lessons[lastIndex + 1];
              nextLesson = nextLessonData?.title || lastLesson?.title;
            }
            
            coursesData.push({
              id: enrollmentDoc.id,
              courseId: courseId,
              title: courseData.title || "Khóa học",
              instructor: courseData.instructor,
              thumbnail: courseData.image || courseData.thumbnail,
              progress,
              totalLessons,
              completedLessons,
              nextLesson,
              lastAccessedLessonId: enrollment.lastAccessedLessonId,
            });
          }
        }
        
        setEnrolledCourses(coursesData);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setCoursesLoading(false);
      }
    };

    if (activeTab === "courses") {
      fetchEnrolledCourses();
    }
  }, [activeTab, session?.user?.id]);

  if (status === "loading" || typeof window === "undefined") {
    return (
      <div className="min-h-screen bg-[#fffbf5] pt-[100px] lg:pt-[120px] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#b45309] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session) {
    if (typeof window !== "undefined") {
      router.push("/dang-nhap");
    }
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-[#fffbf5] pt-[100px] lg:pt-[120px] pb-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-serif text-[#1c1917]">Tài khoản của tôi</h1>
          <p className="text-sm text-[#57534e] mt-1">
            Quản lý thông tin cá nhân, khóa học và đơn hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
              {/* User Info */}
              <div className="p-6 border-b border-[#e7e5e4]">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={session.user?.image || "/avatar-placeholder.png"}
                      alt={session.user?.name || "User"}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[#1c1917]">{session.user?.name}</p>
                    <p className="text-sm text-[#57534e]">{session.user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                        activeTab === tab.id
                          ? "bg-[#b45309]/10 text-[#b45309] font-medium"
                          : "text-[#57534e] hover:bg-[#f5f5f4]"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
                <hr className="my-2 border-[#e7e5e4]" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Đăng xuất</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-[#e7e5e4] p-6"
              >
                <h2 className="text-lg font-medium text-[#1c1917] mb-6">Thông tin cá nhân</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#57534e] mb-2">Họ và tên</label>
                      <input
                        type="text"
                        defaultValue={session.user?.name || ""}
                        className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#57534e] mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={session.user?.email || ""}
                        readOnly
                        className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg bg-[#f5f5f4] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#57534e] mb-2">Số điện thoại</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]" />
                        <input
                          type="tel"
                          placeholder="Thêm số điện thoại"
                          className="w-full pl-10 pr-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[#57534e] mb-2">Địa chỉ</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]" />
                        <input
                          type="text"
                          placeholder="Thêm địa chỉ"
                          className="w-full pl-10 pr-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-[#e7e5e4]">
                    <button className="px-6 py-2.5 border border-[#e7e5e4] rounded-lg text-sm hover:bg-[#f5f5f4] transition-colors">
                      Hủy
                    </button>
                    <button className="px-6 py-2.5 bg-[#b45309] text-white rounded-lg text-sm hover:bg-[#92400e] transition-colors">
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "courses" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-medium text-[#1c1917] mb-4">Khóa học của tôi</h2>
                {coursesLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin w-8 h-8 border-2 border-[#b45309] border-t-transparent rounded-full"></div>
                  </div>
                ) : enrolledCourses.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-[#e7e5e4]">
                    <BookOpen size={48} className="mx-auto text-[#a8a29e] mb-4" />
                    <p className="text-[#57534e]">Bạn chưa đăng ký khóa học nào</p>
                    <Link href="/khoa-hoc" className="text-[#b45309] hover:underline mt-2 inline-block">
                      Khám phá khóa học
                    </Link>
                  </div>
                ) : (
                  enrolledCourses.map((course: EnrolledCourse) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-lg border border-[#e7e5e4] p-4 flex gap-4"
                    >
                      <div className="relative w-32 h-24 shrink-0">
                        <Image
                          src={course.thumbnail || "https://via.placeholder.com/128x96"}
                          alt={course.title}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-[#1c1917] mb-1">{course.title}</h3>
                        <p className="text-sm text-[#57534e] mb-2">Giảng viên: {course.instructor || "Chưa có"}</p>
                        {course.nextLesson && (
                          <div className="flex items-center gap-4 text-xs text-[#57534e] mb-3">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              Bài tiếp theo: {course.nextLesson}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-[#e7e5e4] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#b45309] rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-[#b45309]">{course.progress}%</span>
                        </div>
                        <p className="text-xs text-[#57534e] mt-2">
                          {course.completedLessons}/{course.totalLessons} bài học
                        </p>
                      </div>
                      <Link
                        href={`/hoc-tap/${course.courseId}/${course.lastAccessedLessonId || "lesson-1"}`}
                        className="shrink-0 self-center p-2 text-[#b45309] hover:bg-[#b45309]/10 rounded-lg transition-colors"
                      >
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-medium text-[#1c1917] mb-4">Đơn hàng của tôi</h2>
                
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin w-8 h-8 border-2 border-[#b45309] border-t-transparent rounded-full"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-[#e7e5e4]">
                    <Package size={48} className="mx-auto text-[#e7e5e4] mb-4" />
                    <h3 className="text-lg font-medium text-[#1c1917] mb-2">
                      Chưa có đơn hàng
                    </h3>
                    <p className="text-sm text-[#57534e] mb-4">
                      Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!
                    </p>
                    <Link
                      href="/san-pham"
                      className="inline-block px-6 py-2.5 bg-[#b45309] text-white rounded-lg text-sm hover:bg-[#92400e] transition-colors"
                    >
                      Mua sắm ngay
                    </Link>
                  </div>
                ) : (
                  orders.map((order: Order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-lg border border-[#e7e5e4] p-4"
                    >
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#e7e5e4]">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-[#1c1917]">
                            HK{order.id.substring(0, 6).toUpperCase()}
                          </span>
                          <span className="text-xs text-[#57534e]">
                            {order.createdAt?.toDate?.() 
                              ? order.createdAt.toDate().toLocaleDateString("vi-VN")
                              : new Date().toLocaleDateString("vi-VN")
                            }
                          </span>
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            order.status === "Đã giao"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Đã thanh toán"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Chờ thanh toán"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={order.items?.[0]?.image || "https://via.placeholder.com/100"}
                            alt={order.items?.[0]?.name || "Sản phẩm"}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1c1917]">
                            {order.items?.[0]?.name || "Sản phẩm"}
                          </p>
                          <p className="text-xs text-[#57534e]">
                            x{order.items?.[0]?.quantity || 1}
                            {order.items && order.items.length > 1 && (
                              <span className="ml-1">+{order.items.length - 1} sản phẩm khác</span>
                            )}
                          </p>
                          <p className="text-xs text-[#57534e] mt-1">
                            {order.paymentMethod === "VNPAY" && "Thanh toán VNPay"}
                            {order.paymentMethod === "MOMO" && "Thanh toán Momo"}
                            {order.paymentMethod === "COD" && "Thanh toán khi nhận"}
                            {order.paymentMethod === "BANK" && "Chuyển khoản"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#b45309]">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(order.total)}
                          </p>
                          <Link
                            href={`/don-hang/${order.id}`}
                            className="text-xs text-[#b45309] hover:underline inline-flex items-center gap-1 mt-1"
                          >
                            <Eye size={12} />
                            Xem chi tiết
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === "wishlist" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Heart size={48} className="mx-auto text-[#e7e5e4] mb-4" />
                <h3 className="text-lg font-medium text-[#1c1917] mb-2">
                  Danh sách yêu thích trống
                </h3>
                <p className="text-sm text-[#57534e] mb-4">
                  Lưu sản phẩm yêu thích để mua sắm sau
                </p>
                <Link
                  href="/san-pham"
                  className="inline-block px-6 py-2.5 bg-[#b45309] text-white rounded-lg text-sm hover:bg-[#92400e] transition-colors"
                >
                  Khám phá sản phẩm
                </Link>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-[#e7e5e4] p-6"
              >
                <h2 className="text-lg font-medium text-[#1c1917] mb-6">Cài đặt tài khoản</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-4 border-b border-[#e7e5e4]">
                    <div>
                      <p className="font-medium text-[#1c1917]">Đổi mật khẩu</p>
                      <p className="text-sm text-[#57534e]">Cập nhật mật khẩu định kỳ để bảo mật</p>
                    </div>
                    <button className="px-4 py-2 border border-[#e7e5e4] rounded-lg text-sm hover:bg-[#f5f5f4] transition-colors">
                      Đổi mật khẩu
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-[#e7e5e4]">
                    <div>
                      <p className="font-medium text-[#1c1917]">Thông báo email</p>
                      <p className="text-sm text-[#57534e]">Nhận thông báo về khóa học và ưu đãi</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#e7e5e4] peer-focus:ring-2 peer-focus:ring-[#b45309]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-[#e7e5e4]">
                    <div>
                      <p className="font-medium text-[#1c1917]">Thông báo SMS</p>
                      <p className="text-sm text-[#57534e]">Nhận thông báo về đơn hàng qua SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#e7e5e4] peer-focus:ring-2 peer-focus:ring-[#b45309]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium text-red-600">Xóa tài khoản</p>
                      <p className="text-sm text-[#57534e]">Xóa vĩnh viễn tài khoản và dữ liệu</p>
                    </div>
                    <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors">
                      Xóa tài khoản
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
