import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bài Viết - Tên Thương Hiệu",
  description: "Khám phá câu chuyện, tin tức và kiến thức về nghệ thuật thêu tay truyền thống.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


