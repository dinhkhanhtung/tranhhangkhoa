"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Chrome, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email hoặc mật khẩu không đúng");
      setIsLoading(false);
    } else {
      router.push("/tai-khoan");
      router.refresh();
    }
  };

  const handleGoogleSignIn = () => {
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
            <h1 className="text-2xl font-serif text-[#1c1917] mb-2">
              Đăng nhập
            </h1>
            <p className="text-sm text-[#57534e]">
              Chào mừng bạn quay trở lại
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#e7e5e4] rounded-lg hover:bg-[#f5f5f4] transition-colors mb-6"
          >
            <Chrome size={20} className="text-[#4285F4]" />
            <span className="text-sm font-medium text-[#1c1917]">
              Đăng nhập với Google
            </span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e7e5e4]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs text-[#57534e]">
                Hoặc đăng nhập với email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534e]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#57534e] hover:text-[#1c1917]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#e7e5e4] text-[#b45309] focus:ring-[#b45309]"
                />
                <span className="text-[#57534e]">Ghi nhớ đăng nhập</span>
              </label>
              <Link
                href="/quen-mat-khau"
                className="text-[#b45309] hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#b45309] text-white font-medium rounded-lg hover:bg-[#92400e] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#57534e]">
            Chưa có tài khoản?{" "}
            <Link href="/dang-ky" className="text-[#b45309] hover:underline font-medium">
              Đăng ký ngay
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
