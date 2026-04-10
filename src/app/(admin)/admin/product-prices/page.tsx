"use client";

import { 
  Search, Filter, Edit, Save, Percent, DollarSign, TrendingUp,
  Calendar, Package, MoreVertical
} from "lucide-react";

export default function ProductPricesPage() {
  const products = [
    {
      id: "1",
      name: "Tranh thêu hoa sen - Size 50x70",
      sku: "TS-HS-5070",
      category: "Tranh thêu hoa",
      currentPrice: 2500000,
      originalPrice: 3000000,
      discount: 17,
      stock: 15,
      status: "active",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=60&q=80"
    },
    {
      id: "2",
      name: "Tranh thêu chim công - Size 60x80",
      sku: "TS-CC-6080",
      category: "Tranh thêu chim",
      currentPrice: 3500000,
      originalPrice: 4000000,
      discount: 13,
      stock: 8,
      status: "active",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=60&q=80"
    },
    {
      id: "3",
      name: "Tranh thêu cô gái cổ phục - Size 40x60",
      sku: "TS-CG-4060",
      category: "Tranh thêu cô gái",
      currentPrice: 1800000,
      originalPrice: 2000000,
      discount: 10,
      stock: 20,
      status: "active",
      image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=60&q=80"
    },
    {
      id: "4",
      name: "Khóa học thêu cơ bản",
      sku: "KH-T-CB",
      category: "Khóa học thêu",
      currentPrice: 500000,
      originalPrice: 600000,
      discount: 17,
      stock: 999,
      status: "active",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=60&q=80"
    },
    {
      id: "5",
      name: "Bộ kim thêu cao cấp",
      sku: "PK-KT-CC",
      category: "Phụ kiện thêu",
      currentPrice: 150000,
      originalPrice: 180000,
      discount: 17,
      stock: 50,
      status: "active",
      image: "https://images.unsplash.com/photo-1615486511484-92e78cc6c4ea?w=60&q=80"
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Quản lý Giá Sản Phẩm</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý giá, khuyến mãi và điều chỉnh giá hàng loạt</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors">
          <Percent size={16} /> Tạo khuyến mãi
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <Package size={20} className="text-[#b45309]" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">89</p>
              <p className="text-sm text-[#57534e]">Tổng sản phẩm</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">15</p>
              <p className="text-sm text-[#57534e]">Đang khuyến mãi</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">8.5M</p>
              <p className="text-sm text-[#57534e]">Tổng giá trị kho</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Percent size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">14%</p>
              <p className="text-sm text-[#57534e]">Giảm trung bình</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-[#fffbf5] rounded-lg border border-[#e7e5e4] p-4">
        <h3 className="font-semibold text-[#1c1917] mb-4">Điều chỉnh giá hàng loạt</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#57534e] mb-2">
              Danh mục
            </label>
            <select className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none">
              <option value="all">Tất cả danh mục</option>
              <option value="hoa">Tranh thêu hoa</option>
              <option value="chim">Tranh thêu chim</option>
              <option value="co-gai">Tranh thêu cô gái</option>
              <option value="khoa-hoc">Khóa học thêu</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534e] mb-2">
              Loại điều chỉnh
            </label>
            <select className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none">
              <option value="discount">Giảm giá theo %</option>
              <option value="increase">Tăng giá theo %</option>
              <option value="set">Đặt giá cố định</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534e] mb-2">
              Giá trị
            </label>
            <input
              type="number"
              placeholder="10"
              className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors flex items-center justify-center gap-2">
              <Save size={16} />
              Áp dụng
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-[#e7e5e4]">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#e7e5e4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={16} />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10 pr-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm w-64"
              />
            </div>
            <button className="p-2 hover:bg-[#e7e5e4] rounded-lg transition-colors">
              <Filter size={16} />
            </button>
            <select className="px-3 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm">
              <option value="all">Tất cả danh mục</option>
              <option value="hoa">Tranh thêu hoa</option>
              <option value="chim">Tranh thêu chim</option>
              <option value="co-gai">Tranh thêu cô gái</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm text-[#57534e] hover:text-[#b45309] transition-colors">
              Xuất Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e5e4]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">
                  <input type="checkbox" className="rounded border-[#e7e5e4]" />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Sản phẩm</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">SKU</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Giá gốc</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Giá hiện tại</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Giảm</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Kho</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#57534e]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-[#e7e5e4] hover:bg-[#fffbf5]">
                  <td className="py-3 px-4">
                    <input type="checkbox" className="rounded border-[#e7e5e4]" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-medium text-[#1c1917]">{product.name}</p>
                        <p className="text-sm text-[#57534e]">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#57534e]">{product.sku}</td>
                  <td className="py-3 px-4 text-sm text-[#57534e] line-through">{formatPrice(product.originalPrice)}</td>
                  <td className="py-3 px-4 text-sm font-medium text-[#b45309]">{formatPrice(product.currentPrice)}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      <Percent size={10} />
                      {product.discount}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#57534e]">{product.stock}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price History */}
      <div className="bg-white rounded-lg border border-[#e7e5e4] p-6">
        <h3 className="font-semibold text-[#1c1917] mb-4">Lịch sử điều chỉnh giá</h3>
        <div className="space-y-3">
          {[
            { action: "Giảm giá 20%", products: "Tranh thêu hoa sen", date: "2 giờ trước", user: "Admin" },
            { action: "Tăng giá 5%", products: "Bộ kim thêu cao cấp", date: "1 ngày trước", user: "Admin" },
            { action: "Giảm giá 15%", products: "Tất cả tranh thêu chim", date: "3 ngày trước", user: "Admin" },
          ].map((history, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#fffbf5] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#b45309]/10 rounded flex items-center justify-center">
                  <Calendar size={14} className="text-[#b45309]" />
                </div>
                <div>
                  <p className="font-medium text-[#1c1917]">{history.action}</p>
                  <p className="text-sm text-[#57534e]">{history.products}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#57534e]">{history.date}</p>
                <p className="text-xs text-[#a8a29e]">{history.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
