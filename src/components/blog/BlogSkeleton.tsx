"use client";

import { motion } from "framer-motion";

export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg overflow-hidden shadow-sm"
        >
          {/* Image Skeleton */}
          <div className="aspect-[4/3] bg-gradient-to-r from-[#f5f5f4] via-[#e7e5e4] to-[#f5f5f4] animate-pulse bg-[length:200%_100%]" />
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Category & Date */}
            <div className="flex items-center gap-4">
              <div className="h-4 w-20 bg-[#e7e5e4] rounded animate-pulse" />
              <div className="h-4 w-24 bg-[#e7e5e4] rounded animate-pulse" />
            </div>
            
            {/* Title */}
            <div className="h-6 w-full bg-[#e7e5e4] rounded animate-pulse" />
            <div className="h-6 w-2/3 bg-[#e7e5e4] rounded animate-pulse" />
            
            {/* Excerpt */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-[#e7e5e4] rounded animate-pulse" />
              <div className="h-4 w-full bg-[#e7e5e4] rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-[#e7e5e4] rounded animate-pulse" />
            </div>
            
            {/* Read More Button */}
            <div className="h-10 w-32 bg-[#e7e5e4] rounded animate-pulse mt-4" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

