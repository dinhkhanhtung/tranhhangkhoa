"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Search, Filter, Edit2, Trash2, Eye, X, Upload, Loader2,
  ShoppingBag, Tag, DollarSign, Package, Star, Image as ImageIcon,
  ChevronDown, CheckCircle
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  salePrice?: number | null;
  stock: number;
  status: "active" | "inactive" | "outofstock";
  featured: boolean;
  image?: string;
  images?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const CATEGORIES = [
  "Hoa sen", "Chim hạc", "Phong cảnh", "Phong thủy", 
  "Hoa đào", "Hoa mẫu đơn", "Tùng hạc", "Cá chép", "Rồng phượng", "Khác"
];

export default function ProductsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "outofstock">("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "",
    description: "",
    price: 0,
    salePrice: null,
    stock: 0,
    status: "active",
    featured: false,
    image: "",
  });

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const productsData: Product[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Upload image to imgbb
  const uploadImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      }
      throw new Error("Upload failed");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Lỗi upload ảnh. Vui lòng thử lại.");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  // Open modal for new product
  const openNewProductModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "",
      description: "",
      price: 0,
      salePrice: null,
      stock: 0,
      status: "active",
      featured: false,
      image: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  // Save product (create or update)
  const saveProduct = async () => {
    if (!db || !formData.name || !formData.category) {
      alert("Vui lòng nhập tên và danh mục sản phẩm");
      return;
    }

    try {
      const productData = {
        ...formData,
        price: Number(formData.price) || 0,
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
        stock: Number(formData.stock) || 0,
        updatedAt: serverTimestamp(),
      };

      if (editingProduct) {
        // Update
        const productRef = doc(db, "products", editingProduct.id);
        await updateDoc(productRef, productData);
        
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id ? { 
            ...p, 
            name: formData.name || p.name,
            category: formData.category || p.category,
            description: formData.description,
            price: Number(formData.price) || 0,
            salePrice: formData.salePrice ? Number(formData.salePrice) : null,
            stock: Number(formData.stock) || 0,
            status: formData.status || p.status,
            featured: formData.featured || false,
            image: formData.image,
          } : p
        ));
      } else {
        // Create
        const newProductRef = await addDoc(collection(db, "products"), {
          ...productData,
          createdAt: serverTimestamp(),
        });
        
        const newProduct: Product = {
          id: newProductRef.id,
          name: formData.name || "",
          category: formData.category || "",
          description: formData.description,
          price: Number(formData.price) || 0,
          salePrice: formData.salePrice ? Number(formData.salePrice) : null,
          stock: Number(formData.stock) || 0,
          status: (formData.status as "active" | "inactive" | "outofstock") || "active",
          featured: formData.featured || false,
          image: formData.image,
        };
        
        setProducts(prev => [newProduct, ...prev]);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Có lỗi xảy ra khi lưu sản phẩm");
    }
  };

  // Delete product
  const deleteProduct = async (productId: string) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    
    if (!db) return;

    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  // Calculate stats
  const stats = {
    total: products.length,
    active: products.filter(p => p.status === "active").length,
    outofstock: products.filter(p => p.stock === 0).length,
    featured: products.filter(p => p.featured).length,
  };

  // Loading placeholder
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-[#b45309]" />
      </div>
    );
  }

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
        <button 
          onClick={openNewProductModal}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-colors"
        >
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
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{stats.total}</p>
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
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{stats.active}</p>
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
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{stats.outofstock}</p>
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
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{stats.featured}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Nổi bật</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Tất cả", count: stats.total },
          { id: "active", label: "Đang bán", count: stats.active },
          { id: "outofstock", label: "Hết hàng", count: stats.outofstock },
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
                    <button 
                      onClick={() => openEditModal(product)}
                      className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors text-red-600"
                    >
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
                <button 
                  onClick={() => openEditModal(product)}
                  className="p-2 hover:bg-[#e7e5e4] rounded transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 hover:bg-[#e7e5e4] rounded transition-colors text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#e7e5e4] flex items-center justify-between">
                <h2 className="text-lg font-medium text-[#1c1917]">
                  {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-[#f5f5f4] rounded-lg transition-colors"
                >
                  <X size={20} className="text-[#57534e]" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1c1917]">Hình ảnh sản phẩm</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-[#f5f5f4] rounded-lg overflow-hidden flex items-center justify-center">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={32} className="text-[#a8a29e]" />
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f4] text-[#1c1917] rounded-lg cursor-pointer hover:bg-[#e7e5e4] transition-colors">
                        {uploadingImage ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Upload size={16} />
                        )}
                        <span className="text-sm">{uploadingImage ? "Đang upload..." : "Chọn ảnh"}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                        />
                      </label>
                      <p className="text-xs text-[#57534e] mt-1">JPG, PNG tối đa 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1c1917]">Tên sản phẩm <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ví dụ: Tranh thêu hoa sen"
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1c1917]">Danh mục <span className="text-red-500">*</span></label>
                  <select
                    value={formData.category || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  >
                    <option value="">Chọn danh mục</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1c1917]">Mô tả</label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Mô tả chi tiết về sản phẩm..."
                    rows={4}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none"
                  />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1c1917]">Giá gốc (VNĐ)</label>
                    <input
                      type="number"
                      value={formData.price || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                      placeholder="2500000"
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1c1917]">Giá sale (VNĐ)</label>
                    <input
                      type="number"
                      value={formData.salePrice || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, salePrice: e.target.value ? Number(e.target.value) : null }))}
                      placeholder="2200000"
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1c1917]">Tồn kho</label>
                    <input
                      type="number"
                      value={formData.stock || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                      placeholder="5"
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1c1917]">Trạng thái</label>
                    <select
                      value={formData.status || "active"}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Product["status"] }))}
                      className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    >
                      <option value="active">Đang bán</option>
                      <option value="outofstock">Hết hàng</option>
                      <option value="inactive">Tạm ẩn</option>
                    </select>
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-[#e7e5e4] text-[#b45309] focus:ring-[#b45309]"
                  />
                  <label htmlFor="featured" className="text-sm text-[#1c1917]">
                    Sản phẩm nổi bật (hiển thị trên trang chủ)
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-[#e7e5e4]">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-[#e7e5e4] text-[#1c1917] rounded-lg hover:bg-[#f5f5f4] transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={saveProduct}
                    disabled={uploadingImage}
                    className="flex-1 px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors disabled:opacity-50"
                  >
                    {editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
