/**
 * Demo data cho từng ngành - Export để dùng chung
 */

import { IndustryType } from "@/lib/industry-themes";

export const industryContent: Record<IndustryType, { brandName: string; slogan: string; products: any[] }> = {
  "tranh-theu": {
    brandName: "Tranh Thêu Tâm Linh",
    slogan: "Tinh hoa thêu thùa - Di sản bản địa",
    products: [
      { id: 1, name: "Tranh thêu hoa sen", price: 2800000, image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400" },
      { id: 2, name: "Tranh thêu chim hạc", price: 3500000, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
      { id: 3, name: "Tranh thêu phong cảnh", price: 4200000, image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400" },
      { id: 4, name: "Tranh thêu chân dung", price: 5500000, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400" },
    ]
  },
  "do-go": {
    brandName: "Đồ Gỗ Hoàng Gia",
    slogan: "Bền vững theo thời gian - Tinh xảo từng chi tiết",
    products: [
      { id: 1, name: "Bàn ăn gỗ sồi", price: 8500000, image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400" },
      { id: 2, name: "Tủ quần áo gỗ óc chó", price: 12000000, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400" },
      { id: 3, name: "Giường ngủ gỗ tự nhiên", price: 15000000, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400" },
      { id: 4, name: "Kệ sách gỗ xoan đào", price: 3200000, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400" },
    ]
  },
  "gom-su": {
    brandName: "Gốm Sứ Bát Tràng",
    slogan: "Tinh hoa đất Việt - Nghệ thuật từ lòng đất",
    products: [
      { id: 1, name: "Bộ ấm chén Bát Tràng", price: 1200000, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400" },
      { id: 2, name: "Lọ hoa gốm sứ cao cấp", price: 850000, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400" },
      { id: 3, name: "Đĩa trang trí handmade", price: 450000, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400" },
      { id: 4, name: "Tượng gốm nghệ thuật", price: 2800000, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400" },
    ]
  },
  "trang-suc": {
    brandName: "Jewelry Artisan",
    slogan: "Tinh xảo từng đường nét - Độc bản cho bạn",
    products: [
      { id: 1, name: "Vòng tay bạc khắc tay", price: 850000, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
      { id: 2, name: "Dây chuyền đá tự nhiên", price: 1200000, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400" },
      { id: 3, name: "Khuyên tai thiết kế độc", price: 650000, image: "https://images.unsplash.com/photo-1630019852942-f89202989c31?w=400" },
      { id: 4, name: "Nhẫn bạc cao cấp", price: 950000, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400" },
    ]
  },
  "thoi-trang": {
    brandName: "Fashionista",
    slogan: "Phong cách của bạn - Xu hướng mới nhất",
    products: [
      { id: 1, name: "Váy maxi hoa", price: 850000, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400" },
      { id: 2, name: "Áo blazer nữ", price: 1200000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
      { id: 3, name: "Quần jeans cao cấp", price: 750000, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
      { id: 4, name: "Áo thun oversize", price: 350000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    ]
  },
  "my-pham": {
    brandName: "Beauty Glow",
    slogan: "Vẻ đẹp tự nhiên - Chăm sóc từ thiên nhiên",
    products: [
      { id: 1, name: "Serum vitamin C", price: 450000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
      { id: 2, name: "Kem dưỡng da", price: 680000, image: "https://images.unsplash.com/photo-1570194065650-d99fb4a8ccb0?w=400" },
      { id: 3, name: "Sữa rửa mặt organic", price: 280000, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
      { id: 4, name: "Mặt nạ dưỡng ẩm", price: 150000, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400" },
    ]
  },
  "giay-dep": {
    brandName: "Walk In Style",
    slogan: "Mỗi bước chân đều tự tin",
    products: [
      { id: 1, name: "Giày sneaker cao cấp", price: 1200000, image: "https://images.unsplash.com/photo-1549298916-b41d8f1085de?w=400" },
      { id: 2, name: "Túi xách thời trang", price: 850000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
      { id: 3, name: "Ví cầm tay nữ", price: 450000, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400" },
      { id: 4, name: "Thắt lưng da cao cấp", price: 380000, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400" },
    ]
  },
  "do-gia-dung": {
    brandName: "Gia Dụng Plus",
    slogan: "Tiện nghi cho ngôi nhà của bạn",
    products: [
      { id: 1, name: "Nồi chiên không dầu", price: 1200000, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400" },
      { id: 2, name: "Máy xay sinh tố", price: 850000, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400" },
      { id: 3, name: "Bình giữ nhiệt", price: 250000, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
      { id: 4, name: "Bộ dao kéo nhà bếp", price: 450000, image: "https://images.unsplash.com/photo-1593618998160-c9adf8c0185a?w=400" },
    ]
  },
  "noi-that": {
    brandName: "Nhà Xinh",
    slogan: "Không gian sống đẳng cấp",
    products: [
      { id: 1, name: "Sofa phòng khách", price: 8500000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
      { id: 2, name: "Bàn trà thông minh", price: 1200000, image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400" },
      { id: 3, name: "Đèn trang trí LED", price: 650000, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400" },
      { id: 4, name: "Thảm trải sàn cao cấp", price: 1800000, image: "https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=400" },
    ]
  },
  "den-trang-tri": {
    brandName: "Light & Art",
    slogan: "Thắp sáng không gian sống",
    products: [
      { id: 1, name: "Đèn chùm pha lê", price: 3500000, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400" },
      { id: 2, name: "Đèn bàn vintage", price: 850000, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400" },
      { id: 3, name: "Đèn ngủ thông minh", price: 450000, image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400" },
      { id: 4, name: "Dây đèn trang trí", price: 250000, image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400" },
    ]
  },
  "do-dien-tu": {
    brandName: "Tech Store",
    slogan: "Công nghệ hiện đại - Giá tốt nhất",
    products: [
      { id: 1, name: "Tai nghe Bluetooth", price: 850000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
      { id: 2, name: "Loa thông minh", price: 1200000, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
      { id: 3, name: "Sạc dự phòng 20000mAh", price: 350000, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400" },
      { id: 4, name: "Cáp sạc nhanh", price: 150000, image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400" },
    ]
  },
  "phu-kien-cong-nghe": {
    brandName: "Tech Gear",
    slogan: "Phụ kiện chất lượng cho công nghệ",
    products: [
      { id: 1, name: "Bàn phím cơ gaming", price: 1200000, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400" },
      { id: 2, name: "Chuột không dây", price: 450000, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400" },
      { id: 3, name: "Webcam HD 1080p", price: 850000, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400" },
      { id: 4, name: "Giá đỡ laptop", price: 280000, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
    ]
  },
  "am-thuc": {
    brandName: "Đặc Sản Quê Hương",
    slogan: "Hương vị truyền thống - Tươi ngon mỗi ngày",
    products: [
      { id: 1, name: "Mắm tôm Thanh Hóa", price: 120000, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400" },
      { id: 2, name: "Nước mắm Phú Quốc", price: 85000, image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400" },
      { id: 3, name: "Bánh đậu xanh Hải Dương", price: 75000, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" },
      { id: 4, name: "Chả bò Đà Nẵng", price: 180000, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
    ]
  },
  "do-uong": {
    brandName: "Coffee House",
    slogan: "Hương vị cafe đích thực",
    products: [
      { id: 1, name: "Cà phê Arabica", price: 180000, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" },
      { id: 2, name: "Trà ô long Đài Loan", price: 220000, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400" },
      { id: 3, name: "Matcha Nhật Bản", price: 280000, image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400" },
      { id: 4, name: "Cacao nguyên chất", price: 150000, image: "https://images.unsplash.com/photo-1621267145070-8e9653e2fe1e?w=400" },
    ]
  },
  "suc-khoe": {
    brandName: "Wellness Shop",
    slogan: "Sức khỏe là vàng - Chăm sóc từ thiên nhiên",
    products: [
      { id: 1, name: "Nhân sâm Hàn Quốc", price: 2500000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
      { id: 2, name: "Đông trùng hạ thảo", price: 1800000, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400" },
      { id: 3, name: "Tinh dầu thiên nhiên", price: 350000, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400" },
      { id: 4, name: "Mật ong rừng nguyên chất", price: 280000, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400" },
    ]
  },
  "y-te": {
    brandName: "MediCare Plus",
    slogan: "Chăm sóc sức khỏe tại nhà",
    products: [
      { id: 1, name: "Máy đo huyết áp", price: 850000, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400" },
      { id: 2, name: "Máy đo đường huyết", price: 1200000, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400" },
      { id: 3, name: "Nhiệt kế điện tử", price: 250000, image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400" },
      { id: 4, name: "Máy massage cầm tay", price: 650000, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400" },
    ]
  },
  "giao-duc": {
    brandName: "EduPro Academy",
    slogan: "Tri thức mở ra tương lai",
    products: [
      { id: 1, name: "Khóa học Web Development", price: 2500000, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" },
      { id: 2, name: "Khóa học Marketing", price: 1800000, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400" },
      { id: 3, name: "Khóa học Design", price: 1500000, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400" },
      { id: 4, name: "Khóa học Photography", price: 1200000, image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400" },
    ]
  },
  "sach-vpp": {
    brandName: "Book World",
    slogan: "Sách hay mỗi ngày",
    products: [
      { id: 1, name: "Sách Đắc Nhân Tâm", price: 85000, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
      { id: 2, name: "Sách Nhà Giả Kim", price: 95000, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
      { id: 3, name: "Bộ bút cao cấp", price: 280000, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400" },
      { id: 4, name: "Sổ tay handmade", price: 150000, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400" },
    ]
  },
  "du-lich": {
    brandName: "Travel Joy",
    slogan: "Khám phá thế giới cùng nhau",
    products: [
      { id: 1, name: "Tour Hạ Long 2N1Đ", price: 2500000, image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400" },
      { id: 2, name: "Tour Sapa 3N2Đ", price: 3500000, image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400" },
      { id: 3, name: "Tour Đà Nẵng 4N3Đ", price: 4500000, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400" },
      { id: 4, name: "Tour Phú Quốc", price: 5500000, image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400" },
    ]
  },
  "the-thao": {
    brandName: "Fit & Strong",
    slogan: "Khỏe mạnh mỗi ngày",
    products: [
      { id: 1, name: "Tạ tay 10kg", price: 350000, image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400" },
      { id: 2, name: "Thảm yoga cao cấp", price: 280000, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400" },
      { id: 3, name: "Bộ dây nhảy", price: 150000, image: "https://images.unsplash.com/photo-1434608519344-49d77a699ded?w=400" },
      { id: 4, name: "Bình shaker 800ml", price: 120000, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
    ]
  },
  "nong-san": {
    brandName: "Farm Fresh",
    slogan: "Tươi ngon từ nông trại",
    products: [
      { id: 1, name: "Rau hữu cơ túi 1kg", price: 85000, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" },
      { id: 2, name: "Trái cây nhập khẩu", price: 180000, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400" },
      { id: 3, name: "Gạo lứt hữu cơ", price: 120000, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
      { id: 4, name: "Trứng gà ta", price: 45000, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400" },
    ]
  },
  "cay-canh": {
    brandName: "Green Life",
    slogan: "Không gian xanh cho cuộc sống",
    products: [
      { id: 1, name: "Cây Monstera", price: 280000, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
      { id: 2, name: "Cây Lưỡi Hổ", price: 150000, image: "https://images.unsplash.com/photo-1599598425947-5201d152757c?w=400" },
      { id: 3, name: "Sen đá mix 5 cây", price: 120000, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400" },
      { id: 4, name: "Chậu gốm trồng cây", price: 180000, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" },
    ]
  },
  "custom": {
    brandName: "Cửa Hàng",
    slogan: "Chất lượng - Uy tín - Tận tâm",
    products: [
      { id: 1, name: "Sản phẩm mẫu 1", price: 500000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
      { id: 2, name: "Sản phẩm mẫu 2", price: 750000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
      { id: 3, name: "Sản phẩm mẫu 3", price: 1200000, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400" },
      { id: 4, name: "Sản phẩm mẫu 4", price: 2800000, image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400" },
    ]
  }
};
