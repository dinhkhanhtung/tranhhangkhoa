"use client";

import { useState } from "react";
import { 
  Search, Shield, MoreVertical, Trash2, Key,
  UserPlus, Crown, ShieldCheck, Clock, CheckCircle
} from "lucide-react";

export default function AdminUsersPage() {
  const [isAddingUser, setIsAddingUser] = useState(false);

  const adminUsers = [
    {
      id: "1",
      name: "Admin chính",
      email: "admin@example.com",
      role: "super_admin",
      status: "active",
      lastLogin: "Vừa xong",
      createdAt: "01/01/2024",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80"
    },
    {
      id: "2",
      name: "Nguyễn Văn A",
      email: "user1@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2 giờ trước",
      createdAt: "15/02/2024",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&q=80"
    },
    {
      id: "3",
      name: "Trần Thị B",
      email: "user2@example.com",
      role: "editor",
      status: "active",
      lastLogin: "1 ngày trước",
      createdAt: "20/03/2024",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80"
    },
    {
      id: "4",
      name: "Lê Văn C",
      email: "user3@example.com",
      role: "editor",
      status: "inactive",
      lastLogin: "7 ngày trước",
      createdAt: "25/03/2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80"
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700"><Crown size={10} /> Super Admin</span>;
      case "admin":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"><ShieldCheck size={10} /> Admin</span>;
      case "editor":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><Shield size={10} /> Editor</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{role}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle size={10} /> Hoạt động</span>;
      case "inactive":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Không hoạt động</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Quản lý Quản trị viên</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý quyền truy cập và thêm quản trị viên mới</p>
        </div>
        <button 
          onClick={() => setIsAddingUser(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors"
        >
          <UserPlus size={16} /> Thêm quản trị viên
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-[#b45309]" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">4</p>
              <p className="text-sm text-[#57534e]">Tổng quản trị viên</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">3</p>
              <p className="text-sm text-[#57534e]">Đang hoạt động</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Crown size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">1</p>
              <p className="text-sm text-[#57534e]">Super Admin</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">2</p>
              <p className="text-sm text-[#57534e]">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Form */}
      {isAddingUser && (
        <div className="bg-white rounded-lg border border-[#b45309] p-6">
          <h3 className="font-semibold text-[#1c1917] mb-4">Thêm quản trị viên mới</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-2">
                Tên hiển thị
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-2">
                Vai trò
              </label>
              <select className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none">
                <option value="editor">Editor - Chỉ sửa nội dung</option>
                <option value="admin">Admin - Quản lý đầy đủ</option>
                <option value="super_admin">Super Admin - Toàn quyền</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-2">
                Mật khẩu (tùy chọn)
              </label>
              <input
                type="password"
                placeholder="Để trống để tự động tạo"
                className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button className="px-6 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors text-sm">
              Thêm quản trị viên
            </button>
            <button 
              onClick={() => setIsAddingUser(false)}
              className="px-4 py-2 border border-[#e7e5e4] rounded-lg hover:bg-[#e7e5e4] transition-colors text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-lg border border-[#e7e5e4]">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#e7e5e4] flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={16} />
            <input
              type="text"
              placeholder="Tìm kiếm quản trị viên..."
              className="pl-10 pr-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm w-64"
            />
          </div>
        </div>

        {/* Users */}
        <div className="divide-y divide-[#e7e5e4]">
          {adminUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-[#fffbf5] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-[#1c1917]">{user.name}</p>
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>
                    <p className="text-sm text-[#57534e]">{user.email}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-[#57534e]">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Đăng nhập: {user.lastLogin}
                      </span>
                      <span>Thêm: {user.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#57534e] hover:text-[#b45309] hover:bg-[#e7e5e4] rounded transition-colors">
                    <Key size={14} />
                    Đổi mật khẩu
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#57534e] hover:text-[#b45309] hover:bg-[#e7e5e4] rounded transition-colors">
                    <Shield size={14} />
                    Đổi vai trò
                  </button>
                  {user.role !== "super_admin" && (
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={14} />
                      Xóa
                    </button>
                  )}
                  <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Info */}
      <div className="bg-[#fffbf5] rounded-lg border border-[#e7e5e4] p-6">
        <h3 className="font-semibold text-[#1c1917] mb-4">Mô tả vai trò</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={16} className="text-purple-600" />
              <h4 className="font-medium text-[#1c1917]">Super Admin</h4>
            </div>
            <p className="text-sm text-[#57534e]">Toàn quyền truy cập, quản lý users, cài đặt hệ thống</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-blue-600" />
              <h4 className="font-medium text-[#1c1917]">Admin</h4>
            </div>
            <p className="text-sm text-[#57534e]">Quản lý nội dung, sản phẩm, orders, không quản lý users</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-green-600" />
              <h4 className="font-medium text-[#1c1917]">Editor</h4>
            </div>
            <p className="text-sm text-[#57534e]">Chỉ sửa bài viết, media, contacts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

