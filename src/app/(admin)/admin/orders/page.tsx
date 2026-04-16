"use client";

import { useState, useEffect } from "react";
import { 
  Search, Filter, Download, Eye, Truck, Package, 
  Clock, DollarSign, MoreVertical, CheckCircle, XCircle,
  CreditCard, MapPin, Phone, User, Calendar, ChevronDown,
  Loader2, RefreshCw
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, doc, updateDoc, Timestamp, where } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

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

const statusMap: Record<string, string> = {
  "Chờ xác nhận": "pending",
  "Chờ thanh toán": "pending",
  "Đang xử lý": "processing",
  "Đang giao": "shipped",
  "Đã giao": "delivered",
  "Đã hủy": "cancelled",
  "Đã thanh toán": "processing"
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled">("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Fetch orders from Firebase
  useEffect(() => {
    const fetchOrders = async () => {
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const ordersData: Order[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!db) return;

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      
      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Có lỗi xảy ra khi cập nhật đơn hàng");
    }
  };

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Chờ xác nhận" || o.status === "Chờ thanh toán").length,
    processing: orders.filter(o => o.status === "Đang xử lý" || o.status === "Đã thanh toán").length,
    shipped: orders.filter(o => o.status === "Đang giao").length,
    revenue: orders.reduce((sum, o) => sum + (o.total || 0), 0)
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700"
    };
    const labels: Record<string, string> = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      shipped: "Đang giao",
      delivered: "Đã giao",
      cancelled: "Đã hủy"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  // Filter orders
  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(o => statusMap[o.status] === filter);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-serif text-[#1c1917]">Quản lý Đơn hàng</h1>
          <p className="text-sm text-[#57534e] mt-1">Theo dõi và xử lý đơn hàng</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-[#e7e5e4] rounded-lg hover:bg-[#e7e5e4] transition-colors press-feedback">
            <Download size={16} />
            <span className="hidden sm:inline">Xuất</span>
          </button>
        </div>
      </div>

      {/* Stats - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <Package size={16} className="md:w-5 md:h-5 text-[#b45309]" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{loading ? "-" : stats.total}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Tổng đơn</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Clock size={16} className="md:w-5 md:h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{loading ? "-" : stats.pending}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Chờ xử lý</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Truck size={16} className="md:w-5 md:h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{loading ? "-" : stats.shipped}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Đang giao</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign size={16} className="md:w-5 md:h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">
                {loading ? "-" : (stats.revenue / 1000000).toFixed(0) + "M"}
              </p>
              <p className="text-xs md:text-sm text-[#57534e]">Doanh thu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs - Horizontal Scroll on Mobile */}
      <div className="bg-white rounded-lg border border-[#e7e5e4] p-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm whitespace-nowrap transition-colors ${
                filter === status ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              {status === "all" ? "Tất cả" : 
               status === "pending" ? "Chờ xử lý" :
               status === "processing" ? "Đang xử lý" :
               status === "shipped" ? "Đang giao" :
               status === "delivered" ? "Đã giao" : "Đã hủy"}
            </button>
          ))}
        </div>
      </div>

      {/* Search - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={16} />
          <input
            type="text"
            placeholder="Tìm đơn hàng..."
            className="w-full pl-10 pr-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#e7e5e4] rounded-lg hover:bg-[#e7e5e4] transition-colors text-sm">
          <Filter size={16} />
          <span className="sm:hidden">Lọc</span>
        </button>
      </div>

      {/* Orders List - Card View on Mobile, Table on Desktop */}
      {loading ? (
        <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-[#e7e5e4]">
          <Loader2 size={32} className="animate-spin text-[#b45309]" />
        </div>
      ) : (
      <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e5e4] bg-[#fffbf5]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Mã đơn</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Khách hàng</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Tổng tiền</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Trạng thái</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Ngày</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#57534e]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#e7e5e4] hover:bg-[#fffbf5]">
                  <td className="py-3 px-4">
                    <p className="font-medium text-[#1c1917]">HK{order.id.substring(0, 6).toUpperCase()}</p>
                    <p className="text-xs text-[#57534e]">{order.items?.length || 0} sản phẩm</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-[#1c1917]">{order.customer?.name}</p>
                    <p className="text-xs text-[#57534e]">{order.customer?.phone}</p>
                  </td>
                  <td className="py-3 px-4 font-medium text-[#b45309]">{formatPrice(order.total)}</td>
                  <td className="py-3 px-4">{getStatusBadge(statusMap[order.status] || "pending")}</td>
                  <td className="py-3 px-4 text-sm text-[#57534e]">
                    {order.createdAt?.toDate?.() 
                      ? order.createdAt.toDate().toLocaleDateString("vi-VN")
                      : new Date().toLocaleDateString("vi-VN")
                    }
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedOrder(order); setIsDetailOpen(true); }}
                        className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-[#e7e5e4]">
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-[#1c1917]">HK{order.id.substring(0, 6).toUpperCase()}</p>
                  <p className="text-xs text-[#57534e]">
                    {order.createdAt?.toDate?.() 
                      ? order.createdAt.toDate().toLocaleDateString("vi-VN")
                      : new Date().toLocaleDateString("vi-VN")
                    }
                  </p>
                </div>
                {getStatusBadge(statusMap[order.status] || "pending")}
              </div>
              <div>
                <p className="text-sm text-[#1c1917]">{order.customer?.name}</p>
                <p className="text-xs text-[#57534e]">{order.customer?.phone}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#b45309]">{formatPrice(order.total)}</p>
                  <p className="text-xs text-[#57534e]">{order.items?.length || 0} sản phẩm • {order.paymentMethod}</p>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => { setSelectedOrder(order); setIsDetailOpen(true); }}
                    className="p-2 hover:bg-[#e7e5e4] rounded transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Order Detail Modal */}
      <AnimatePresence>
        {isDetailOpen && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsDetailOpen(false)}
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
                  Chi tiết đơn hàng HK{selectedOrder.id.substring(0, 6).toUpperCase()}
                </h2>
                <button 
                  onClick={() => setIsDetailOpen(false)}
                  className="p-2 hover:bg-[#f5f5f4] rounded-lg transition-colors"
                >
                  <XCircle size={20} className="text-[#57534e]" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="space-y-3">
                  <h3 className="font-medium text-[#1c1917] flex items-center gap-2">
                    <User size={16} className="text-[#b45309]" />
                    Thông tin khách hàng
                  </h3>
                  <div className="bg-[#f5f5f4] p-4 rounded-lg space-y-2 text-sm">
                    <p><span className="text-[#57534e]">Tên:</span> {selectedOrder.customer?.name}</p>
                    <p><span className="text-[#57534e]">SĐT:</span> {selectedOrder.customer?.phone}</p>
                    <p><span className="text-[#57534e]">Email:</span> {selectedOrder.customer?.email || "-"}</p>
                    <p><span className="text-[#57534e]">Địa chỉ:</span> {selectedOrder.customer?.address}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <h3 className="font-medium text-[#1c1917] flex items-center gap-2">
                    <Package size={16} className="text-[#b45309]" />
                    Sản phẩm ({selectedOrder.items?.length || 0})
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border border-[#e7e5e4] rounded-lg">
                        <div className="w-12 h-12 bg-[#f5f5f4] rounded-lg overflow-hidden">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1c1917]">{item.name}</p>
                          <p className="text-xs text-[#57534e]">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-[#b45309]">
                          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-3">
                  <h3 className="font-medium text-[#1c1917] flex items-center gap-2">
                    <CreditCard size={16} className="text-[#b45309]" />
                    Thanh toán
                  </h3>
                  <div className="bg-[#f5f5f4] p-4 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#57534e]">Phương thức:</span>
                      <span className="font-medium">
                        {selectedOrder.paymentMethod === "BANK" ? "Chuyển khoản" : 
                         selectedOrder.paymentMethod === "COD" ? "COD" : selectedOrder.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#57534e]">Tạm tính:</span>
                      <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#57534e]">Phí ship:</span>
                      <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(selectedOrder.shipping)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#e7e5e4]">
                      <span className="font-medium text-[#1c1917]">Tổng:</span>
                      <span className="font-bold text-[#b45309]">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="space-y-3">
                  <h3 className="font-medium text-[#1c1917]">Cập nhật trạng thái</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Chờ xác nhận", "Đang xử lý", "Đang giao", "Đã giao", "Đã hủy"].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrder.id, status)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          selectedOrder.status === status
                            ? "bg-[#b45309] text-white"
                            : "bg-[#f5f5f4] text-[#1c1917] hover:bg-[#e7e5e4]"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

