"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ChevronLeft, ChevronRight, ShoppingBag, Heart, Minus, Plus } from "lucide-react";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    gallery?: string[];
    category: string;
    rating: number;
    reviewCount: number;
    description: string;
    colors?: string[];
    sizes?: string[];
    inStock: boolean;
  } | null;
}

export default function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const gallery = product.gallery || [product.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white z-50 overflow-auto"
          >
            {/* Close Button Only */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white shadow-sm border border-[#e7e5e4] transition-all rounded-lg"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Left: Image Gallery */}
              <div className="relative bg-[#f5f5f4] p-8 pt-20 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  <Image
                    src={gallery[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                  
                  {/* Wishlist Button - Overlay on Image */}
                  <button
                    className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center bg-white shadow-md rounded-full hover:scale-110 hover:shadow-lg transition-all z-10"
                    title="Thêm vào yêu thích"
                  >
                    <Heart size={20} className="text-[var(--color-dark)]" />
                  </button>
                </div>
                
                {/* Navigation Arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Dots */}
                {gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {gallery.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          selectedImage === idx ? "bg-[var(--color-primary)]" : "bg-[#57534e]"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="space-y-6 p-6 lg:p-8 pt-6 lg:pt-8">
                <div>
                  <p className="text-sm text-[var(--color-primary)] mb-1">{product.category}</p>
                  <h2 className="text-2xl font-serif text-[var(--color-dark)]">{product.name}</h2>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < product.rating ? "fill-[var(--color-primary)] text-[var(--color-primary)]" : "text-[#e7e5e4]"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#57534e]">({product.reviewCount} đánh giá)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl font-medium text-[var(--color-primary)]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-[#57534e] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-[#57534e] mb-6">{product.description}</p>

                {/* Color Selection */}
                {product.colors && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-[var(--color-dark)] mb-3">Màu sắc</p>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            selectedColor === color ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20" : "border-[#e7e5e4]"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-[var(--color-dark)] mb-3">Kích thước</p>
                    <div className="flex gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border text-sm transition-all ${
                            selectedSize === size 
                              ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" 
                              : "border-[#e7e5e4] text-[#57534e] hover:border-[var(--color-primary)]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="flex items-center border border-[#e7e5e4] w-full sm:w-auto">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-[#f5f5f4]"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-[#f5f5f4]"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="flex-1 bg-[var(--color-primary)] text-white py-4 px-6 font-medium tracking-wide hover:bg-[var(--color-dark)] transition-colors uppercase text-sm flex items-center justify-center gap-2">
                    <ShoppingBag size={18} />
                    Thêm vào giỏ hàng
                  </button>
                </div>

                {/* View Full Details */}
                <Link
                  href={`/san-pham/${product.id}`}
                  onClick={onClose}
                  className="block text-center text-[var(--color-primary)] hover:underline text-sm"
                >
                  Xem chi tiết đầy đủ →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

