Master Design Guide: Hardcore Glassmorphism
Ngôn ngữ thiết kế: Mechanical Refraction & Physical Layering (Kính mờ cơ khí và Phân lớp vật lý)

1. Bảng Màu Hệ Thống (Atomic Colors)
Để né "mùi AI", chúng ta sử dụng bảng màu cực kỳ tiết chế và tập trung vào độ tương phản:

Background (Obsidian): #050505 (Đen sâu hơn để làm nổi bật lớp kính).

Primary (Intel Cyan): #00F2FF (Dùng cho các đường line, viền sáng và điểm nhấn).

Accent (Electric Blue): #0066FF (Dùng cho hiệu ứng đổ bóng hoặc gradient cực nhẹ).

Glass Surface: rgba(255, 255, 255, 0.03) (Lớp nền kính cực mỏng).

2. Thông Số "Hardcore Glass" (CSS Spec)
Đây là "linh hồn" của thiết kế. Tuyệt đối không dùng Glassmorphism mờ đục thông thường.

Cấu trúc lớp (Stacking):
Backdrop Blur: blur(25px) (Tạo độ sâu cho linh kiện 3D bên dưới).

Border (Refraction Line): 1px solid rgba(255, 255, 255, 0.1) ở cạnh trên và trái, rgba(0, 242, 255, 0.3) ở cạnh dưới để tạo hiệu ứng khúc xạ ánh sáng.

Inner Glow: inset 0 0 20px rgba(0, 242, 255, 0.05) (Ánh sáng nhẹ từ bên trong lõi chip).

CSS
/* Class chuẩn cho Antigravity */
.hardcore-glass {
  background: rgba(10, 10, 10, 0.4);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
}
3. Typography (Thiết kế chữ)
Sử dụng phông chữ Outfit (Google Fonts) với các quy tắc sau:

Headline: font-weight: 900, letter-spacing: -0.05em, text-transform: uppercase.

Sub-headline: font-weight: 300, color: var(--intel-cyan), letter-spacing: 0.2em.

Technical Specs: Sử dụng phông Monospace (JetBrains Mono hoặc Space Mono) cho các con số để tăng tính kỹ thuật.

4. Các Thành Phần Giao Diện (Components)
Navigation Bar
Style: Trong suốt hoàn toàn khi ở trên cùng, chỉ hiện lớp kính mờ khi bắt đầu cuộn.

Logo: Logo aeSieuNhan sử dụng hiệu ứng Chrome/Silver phản chiếu.

Feature Cards (3 Ô sản phẩm Page Home)
Interaction: Khi hover, viền Cyan sẽ sáng rực lên (Glow effect) và thẻ hơi nghiêng theo góc nhìn (Tilt effect).

Journey Milestone (Page Hành trình)
Các mốc thời gian nằm trên một trục tọa độ mảnh. Mỗi mốc là một khối kính chứa con chip "bung lớp" bên trong.

5. Lệnh thực thi cho AI Agent
"Hãy đọc file MASTER_STYLE_GUIDE.md này để thiết lập hệ thống CSS biến (Variables) cho toàn bộ dự án. Đảm bảo mọi thẻ Card, Button và Navbar đều tuân thủ đúng thông số Hardcore Glassmorphism. Tuyệt đối không sử dụng màu sắc rực rỡ ngoài bảng màu Obsidian/Cyan. Hãy ưu tiên sự tinh tế của các đường kẻ mảnh và hiệu ứng khúc xạ ánh sáng."

6. Responsive Baseline (Desktop ↔ Mobile)
- Breakpoints khuyến nghị: 900px (tablet), 720px (phone), 540px (small phone). Luôn kiểm tra canvas + overlay ở cả 3 mốc.
- Navbar: ẩn metadata phụ dưới 720px; giữ brand rõ ràng, padding thu gọn (14–18px).
- Tab picker (dock dưới đáy): width ≈ 90–95vw, min column 120–150px; gap nhỏ hơn khi <540px; bottom offset 18–32px để không đè gesture bar.
- Overlay hero: tăng nền đậm (rgba(5,5,5,0.65+)), padding 18–26px; h2 clamp về 24–52px tùy viewport; copy font 14–16px, line-height ≥1.6; luôn text-shadow để nổi trên frame.
- Section nội dung: padding 22–34px, radius 16–20px; grid dùng `auto-fit` với min 170–240px cho spec/feature cards; content padding 14–18px trên mobile.
- Giữ canvas fixed full-screen, không dùng overflow hidden trên cha; hero spacer ≥300vh và có thể giảm nhẹ trên mobile nếu cần, nhưng vẫn đủ pixel cuộn cho toàn bộ frame.