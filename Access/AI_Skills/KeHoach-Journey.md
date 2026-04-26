### **🎡 1\. Cơ chế "Focus 3D & Content Reveal"**

Trang web sẽ hoạt động dựa trên một "Vùng tiêu điểm" (Focus Zone) nằm chính giữa màn hình:

* **Hiệu ứng 3D Pop-out (Tầng Giữa \- Middle):**  
  * Khi một con chip tiến vào giữa màn hình, nó sẽ phóng to (`scale: 1.25`) và đẩy về phía người dùng (`translateZ`).  
  * Các con chip chưa đến hoặc đã đi qua sẽ tự động thu nhỏ lại và mờ đi (`opacity: 0.4`), tạo chiều sâu không gian (Depth of Field).

**Chức năng Hiển thị Có điều kiện (Tầng Dưới \- Bottom):**

* Mặc định, phần nội dung **Data Glass** (thông tin chi tiết từ `Data-journey.md`) sẽ có `opacity: 0` và `transform: translateY(50px)` (ẩn và nằm sâu phía dưới).  
* Chỉ khi thẻ Milestone nằm trong vùng Focus, phần nội dung này mới trồi lên và hiện rõ (`opacity: 1`, `translateY: 0`) với hiệu ứng mượt mà.

	**Kế hoạch Logic Kỹ thuật (Cho Leader Duyệt)**

Để làm được điều này mà không bị lag, bạn thành viên đó cần triển khai logic sau:

1. **Tính toán vị trí tương đối:** Sử dụng hàm getBoundingClientRect().left để biết mỗi thẻ đang cách tâm màn hình bao xa.  
2. **Hàm nội suy (Interpolation):**  
   * Khoảng cách tới tâm \= 0 $\\rightarrow$ Scale \= 1.25, Opacity nội dung \= 1\.  
   * Khoảng cách tới tâm \> 300px $\\rightarrow$ Scale \= 1.0, Opacity nội dung \= 0\.  
3. **CSS Transition:** Sử dụng transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1\) để mọi chuyển động phóng to/thu nhỏ và hiện nội dung trông "êm" như robot đang vận hành.  
   ---

   ## **🎨 2\. Kế hoạch Thiết kế (Theo MASTER\_STYLE\_GUIDE.md)**

Mọi chi tiết phải tuân thủ nghiêm ngặt phong cách **Hardcore Glassmorphism** để đồng bộ với trang Home.

### **Bố cục Thẻ Milestone (Top-Middle-Bottom)**

| Tầng | Thành phần | Quy tắc Thiết kế |
| :---- | :---- | :---- |
| **Trên (Top)** | **Năm lịch sử** | Font **Outfit**, weight **900**, size cực lớn. Dùng màu trắng mờ hoặc viền Cyan rỗng. |
| **Giữa (Middle)** | **Hình ảnh Chip** | Sử dụng ảnh từ folder Img/Intel Arc Frame/. Hiệu ứng trôi lơ lửng (Floating) và đổ bóng vật lý. |
| **Dưới (Bottom)** | **Thông tin Kỹ thuật** | Thẻ kính mờ .hardcore-glass (blur(25px)). Chữ dùng font **Space Mono**. |

*   
  **Màu sắc chủ đạo**: Nền Obsidian \#050505, điểm nhấn Cyan \#00F2FF.  
* **Hiệu ứng kính**: Viền trên/trái màu trắng mờ, viền dưới màu Cyan mờ để tạo hiệu ứng khúc xạ ánh sáng thực tế.  
  ---

  ## **📜 3\. Nội dung Hành trình (Trích xuất từ Data-journey.md)**

Vì có tới 20 cột mốc, nhóm nên chia thành các "Kỷ nguyên" để người xem không bị ngợp:

1. **Kỷ nguyên Khai sinh (1971 \- 1982\)**: Từ Intel 4004 (Microprocessor đầu tiên) đến 80286 (Tiêu chuẩn doanh nghiệp).  
2. **Kỷ nguyên PC Đại chúng (1985 \- 1999\)**: Bước ngoặt 32-bit với 80386 và sự bùng nổ của dòng Pentium.  
3. **Cuộc đua Xung nhịp & Di động (2000 \- 2006\)**: Kỷ nguyên GHz với Pentium 4 và sự ra đời của nền tảng Centrino cho laptop.  
4. **Kỷ nguyên Core i Series (2008 \- 2015\)**: Sự thống trị của kiến trúc Nehalem, Sandy Bridge và Skylake.  
5. **Kỷ nguyên Hybrid & AI PC (2021 \- 2025\)**: Đột phá với kiến trúc nhân hỗn hợp (Alder Lake) và kỷ nguyên Core Ultra tối ưu AI.  
   ---

   ## **🚀 4\. Kế hoạch Thực thi (Action Plan) cho thành viên**

Quyết hãy giao nhiệm vụ kèm theo bộ Prompt này để đảm bảo kết quả chuẩn 100%:

**Prompt cho Page Journey:**

"Hãy tạo file **journey.html** sử dụng Tailwind CSS và Vanilla JS.

1. Thiết lập cơ chế **Horizontal Scroll** bằng cách map window.scrollY vào translateX của một dải nội dung ngang.  
2. Đổ dữ liệu từ file **Data-journey.md** vào các thẻ Card có cấu trúc: Năm (trên), Ảnh chip (giữa), Specs (dưới).  
3. Áp dụng class .hardcore-glass với backdrop-filter: blur(25px) cho các thẻ nội dung.  
4. Sử dụng font **Outfit** cho tiêu đề và **Space Mono** cho các thông số kỹ thuật (transistor, xung nhịp, tiến trình).  
5. Đảm bảo mọi hình ảnh chip đều có hiệu ứng đổ bóng và trôi lơ lửng nhẹ nhàng."  
* 

