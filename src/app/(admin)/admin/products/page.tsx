"use client";

import { useState } from "react";
import { 
  Plus, Search, Filter, MoreHorizontal, Edit2, Trash2, Eye,
  ShoppingBag, Tag, DollarSign, Package, Star, Image as ImageIcon
} from "lucide-react";

export default function ProductsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "outofstock">("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const products = [
    {
      id: "PROD-001",
      name: "Tranh thêu hoa sen",
      category: "Hoa sen",
      price: 2500000,
      salePrice: 2200000,
      stock: 5,
      status: "active",
      featured: true,
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=100&q=80"
    },
    {
      id: "PROD-002",
      name: "Tranh thêu chim hạc",
      category: "Chim hạc",
      price: 3200000,
      salePrice: null,
      stock: 3,
      status: "active",
      featured: false,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=100&q=80"
    },
    {
      id: "PROD-003",
      name: "Tranh thêu phong cảnh",
      category: "Phong cảnh",
      price: 4500000,
      salePrice: 3990000,
      stock: 0,
      status: "outofstock",
      featured: false,
      image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=100&q=80"
    },
    {
      id: "PROD-004",
      name: "Tranh thêu mã đáo thành công",
      category: "Phong thủy",
      price: 5500000,
      salePrice: null,
      stock: 2,
      status: "active",
      featured: true,
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100&q=80"
    },
    {
      id: "PROD-005",
      name: "Tranh thêu cá chép hoa sen",
      category: "Phong thủy",
      price: 3800000,
      salePrice: 3500000,
      stock: 8,
      status: "active",
      featured: false,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&q=80"
    },
  ];

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.status === filter);

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Đang bán</span>;
      case "inactive":
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Tạm ẩn</span>;
      case "outofstock":
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Hết hàng</span>;
      default:
        return null;
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-serif text-[#1c1917]">Sản phẩm</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý sản phẩm tranh thêu</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-colors">
          <Plus size={16} />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <Package size={16} className="md:w-5 md:h-5 text-[#b45309]" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{products.length}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Tổng sản phẩm</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <ShoppingBag size={16} className="md:w-5 md:h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{products.filter(p => p.status === "active").length}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Đang bán</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <Tag size={16} className="md:w-5 md:h-5 text-red-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{products.filter(p => p.stock === 0).length}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Hết hàng</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Star size={16} className="md:w-5 md:h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{products.filter(p => p.featured).length}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Nổi bật</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Tất cả", count: products.length },
          { id: "active", label: "Đang bán", count: products.filter(p => p.status === "active").length },
          { id: "outofstock", label: "Hết hàng", count: products.filter(p => p.status === "outofstock").length },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm transition-colors ${
              filter === f.id 
                ? "bg-[#b45309] text-white" 
                : "bg-white border border-[#e7e5e4] text-[#57534e] hover:border-[#b45309]"
            }`}
          >
            {f.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
              filter === f.id ? "bg-white/20" : "bg-[#e7e5e4]"
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={16} />
          <input 
            type="text" 
            placeholder="Tìm sản phẩm..." 
            className="w-full pl-10 pr-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#e7e5e4] rounded-lg hover:bg-[#e7e5e4] transition-colors text-sm">
          <Filter size={16} />
          <span className="hidden sm:inline">Lọc</span>
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-[#fffbf5] rounded-lg border border-[#e7e5e4]">
          <span className="text-sm text-[#57534e]">{selectedItems.length} đã chọn</span>
          <button className="px-3 py-1.5 text-sm text-[#57534e] hover:bg-[#e7e5e4] rounded transition-colors ml-auto">
            Ẩn
          </button>
          <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
            Xóa
          </button>
        </div>
      )}

      {/* Products List - Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#f5f5f4]">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-[#57534e]">
                <input 
                  type="checkbox" 
                  className="rounded border-[#e7e5e4]"
                  checked={selectedItems.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={(e) => setSelectedItems(e.target.checked ? filteredProducts.map(p => p.id) : [])}
                />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-[#57534e]">Sản phẩm</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-[#57534e]">Danh mục</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-[#57534e]">Giá</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-[#57534e]">Tồn kho</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-[#57534e]">Trạng thái</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-[#57534e]">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e5e4]">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-[#fffbf5]">
                <td className="py-3 px-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-[#e7e5e4]"
                    checked={selectedItems.includes(product.id)}
                    onChange={() => toggleSelection(product.id)}
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#f5f5f4] rounded-lg flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={20} className="text-[#a8a29e]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[#1c1917]">{product.name}</p>
                      <p className="text-xs text-[#a8a29e]">{product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-[#57534e]">{product.category}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-[#1c1917]">{formatPrice(product.salePrice || product.price)}</span>
                    {product.salePrice && (
                      <span className="text-xs text-[#a8a29e] line-through">{formatPrice(product.price)}</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-[#57534e]">{product.stock}</td>
                <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                      <Eye size={14} />
                    </button>
                    <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Products List - Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg border border-[#e7e5e4] space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-[#f5f5f4] rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={24} className="text-[#a8a29e]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1c1917]">{product.name}</p>
                <p className="text-xs text-[#a8a29e]">{product.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-medium text-[#b45309]">{formatPrice(product.salePrice || product.price)}</span>
                  {product.salePrice && (
                    <span className="text-xs text-[#a8a29e] line-through">{formatPrice(product.price)}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#e7e5e4]">
              <div className="flex items-center gap-2">
                {getStatusBadge(product.status)}
                <span className="text-xs text-[#57534e]">Tồn: {product.stock}</span>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-[#e7e5e4] rounded transition-colors">
                  <Eye size={16} />
                </button>
                <button className="p-2 hover:bg-[#e7e5e4] rounded transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 hover:bg-[#e7e5e4] rounded transition-colors text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
