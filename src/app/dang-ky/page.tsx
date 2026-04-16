"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Chrome, Eye, EyeOff, User, Phone } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    // Mock registration - replace with real API
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dang-nhap?registered=true");
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/tai-khoan" });
  };

  return (
    <div className="min-h-screen bg-[#fffbf5] pt-[100px] lg:pt-[120px] pb-12">
      <div className="mx-auto max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-sm border border-[#e7e5e4]"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif text-[var(--color-dark)] mb-2">
              Tạo tài khoản
            </h1>
            <p className="text-sm text-[#57534e]">
              Tham gia cộng đồng yêu thích thêu tay
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#e7e5e4] rounded-lg hover:bg-[#f5f5f4] transition-colors mb-6"
          >
            <Chrome size={20} className="text-[#4285F4]" />
            <span className="text-sm font-medium text-[var(--color-dark)]">
              Đăng ký với Google
            </span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e7e5e4]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs text-[#57534e]">
                Hoặc đăng ký với email
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                Họ và tên
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none text-sm"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none text-sm"
                  placeholder="0982 581 222"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none text-sm"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#57534e] hover:text-[var(--color-dark)]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[#e7e5e4] text-[var(--color-primary)] focus:ring-[var(--color-primary)] mt-0.5"
                required
              />
              <span className="text-[#57534e]">
                Tôi đồng ý với{" "}
                <Link href="/dieu-khoan" className="text-[var(--color-primary)] hover:underline">
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link href="/bao-mat" className="text-[var(--color-primary)] hover:underline">
                  Chính sách bảo mật
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-secondary)] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#57534e]">
            Đã có tài khoản?{" "}
            <Link href="/dang-nhap" className="text-[var(--color-primary)] hover:underline font-medium">
              Đăng nhập ngay
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}


