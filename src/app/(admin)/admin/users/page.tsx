"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, User, Mail, Phone, Calendar, Trash2 } from "lucide-react";

export default function UsersPage() {
  const users = [
    { id: "USER-001", name: "Nguyễn Văn A", email: "vana@gmail.com", phone: "0987654321", joinDate: "12/04/2026", orders: 3, totalSpent: 7500000 },
    { id: "USER-002", name: "Trần Thị B", email: "thib@gmail.com", phone: "0912345678", joinDate: "10/04/2026", orders: 1, totalSpent: 1200000 },
    { id: "USER-003", name: "Lê Văn C", email: "vanc@gmail.com", phone: "0900112233", joinDate: "05/04/2026", orders: 5, totalSpent: 15800000 },
    { id: "USER-004", name: "Phạm Thị D", email: "thid@gmail.com", phone: "0933445566", joinDate: "01/04/2026", orders: 0, totalSpent: 0 },
  ];

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Người dùng</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý khách hàng và thành viên</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm người dùng..." 
              className="pl-10 pr-4 py-2 bg-white border border-[#e7e5e4] rounded-xl text-sm focus:border-[#b45309] focus:outline-none"
            />
          </div>
          <button className="p-2 border border-[#e7e5e4] rounded-xl hover:bg-[#f5f5f4] transition-colors press-feedback">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e7e5e4] shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#f5f5f4]">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-bold text-[#57534e] uppercase tracking-wider">Khách hàng</th>
              <th className="py-4 px-6 text-left text-sm font-bold text-[#57534e] uppercase tracking-wider">Thông tin liên hệ</th>
              <th className="py-4 px-6 text-left text-sm font-bold text-[#57534e] uppercase tracking-wider">Ngày tham gia</th>
              <th className="py-4 px-6 text-left text-sm font-bold text-[#57534e] uppercase tracking-wider text-center">Đơn hàng</th>
              <th className="py-4 px-6 text-left text-sm font-bold text-[#57534e] uppercase tracking-wider text-right">Tổng chi tiêu</th>
              <th className="py-4 px-6 text-right text-sm font-bold text-[#57534e] uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e5e4]">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#fffbf5]/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#b45309]/10 text-[#b45309] rounded-full flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#1c1917]">{user.name}</p>
                      <p className="text-xs text-[#a8a29e] font-medium">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-[#57534e]">
                      <Mail size={14} />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#57534e]">
                      <Phone size={14} />
                      {user.phone}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-[#57534e]">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {user.joinDate}
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="px-2.5 py-0.5 bg-[#f5f5f4] text-[#1c1917] text-xs font-bold rounded-full border border-[#e7e5e4]">
                    {user.orders}
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-bold text-[#1c1917]">
                  {formatPrice(user.totalSpent)}
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

