"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative hover-lift"
    >
      <Link href={`/san-pham/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground shadow-lg press-feedback"
            >
              <Eye className="h-4 w-4" />
              Xem nhanh
            </motion.div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-[var(--color-primary)] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

