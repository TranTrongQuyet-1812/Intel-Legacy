# 🎞️ Scroll-Triggered Frame Animation — Kỹ Thuật Cốt Lõi

> **Mục đích**: Tài liệu kỹ thuật thuần túy. Bất kỳ AI nào đọc file này sẽ hiểu CÁCH tạo ra một trang web có hiệu ứng "vật thể xoay/nổ tung" mượt mà khi cuộn chuột — bất kể sản phẩm, nội dung, hay phong cách thiết kế.

---

## 1. Nguyên Lý Hoạt Động

### Ý tưởng cốt lõi
Kỹ thuật này dùng một chuỗi ảnh (image sequence) — giống các frame trong video — và **hiển thị từng frame tương ứng với vị trí scroll** của người dùng. Kết quả: người dùng cuộn chuột → vật thể trên màn hình xoay, nổ tung, biến hình... một cách mượt mà.

### Tại sao dùng image sequence thay vì video?
- **Video** không thể tua chính xác theo pixel scroll — sẽ bị giật, delay
- **Image sequence** cho phép nhảy đến bất kỳ frame nào tức thì, không phụ thuộc codec hay buffering
- Canvas vẽ ảnh tĩnh nhanh hơn nhiều so với video seek

### Công thức cơ bản
```
scrollProgress = scrollY / maxScrollableHeight    → giá trị từ 0.0 đến 1.0
frameIndex = Math.floor(scrollProgress * (totalFrames - 1))
canvas.drawImage(frames[frameIndex])
```

---

## 2. Kiến Trúc Layer (Bắt Buộc)

```
┌─────────────────────────────────────────┐
│  z-50+  │ Navbar (fixed)                │
├─────────┤                               │
│  z-10   │ Text Overlays (fixed)         │
│         │ Main Content (relative)       │
├─────────┤                               │
│  z-0    │ Canvas (fixed, full-screen)   │  ← Layer thấp nhất
└─────────────────────────────────────────┘
```

### Quy tắc vàng
- **Canvas** phải là `position: fixed; inset: 0; z-index: 0` — luôn nằm dưới cùng, phủ kín viewport
- **Nội dung** nằm trên canvas với `position: relative; z-index: ≥ 1`
- **Text overlays** dùng `position: fixed` để đứng yên trên viewport, fade in/out theo scroll
- **KHÔNG BAO GIỜ** dùng `overflow: hidden` trên thẻ cha chứa canvas — sẽ phá `position: fixed`

---

## 3. Hero Spacer — Vùng Cuộn Trống

### Khái niệm
Để animation có "không gian" để chạy, cần tạo một `<div>` rỗng có chiều cao rất lớn (thường `400vh` – `600vh`). Khi người dùng cuộn qua vùng này, canvas sẽ phát animation.

```html
<div id="heroSpacer" style="height: 500vh; position: relative; z-index: 1;"></div>
```

### Tại sao cần?
- Viewport chỉ cao `100vh`, nhưng animation cần hàng ngàn pixel cuộn để chạy mượt
- `500vh` = người dùng cần cuộn 5 lần chiều cao màn hình → 96 frame chia đều = ~19px mỗi frame
- **Nhiều vh hơn** = animation chậm, mượt hơn. **Ít vh hơn** = animation nhanh, có thể giật

### Quy tắc chọn chiều cao

| Số frame | Chiều cao khuyến nghị | Lý do |
|----------|----------------------|-------|
| 30-50    | 300vh – 400vh        | Ít frame, không cần cuộn quá dài |
| 50-100   | 400vh – 500vh        | Cân bằng giữa mượt và chiều dài trang |
| 100-200  | 500vh – 700vh        | Nhiều frame cần nhiều không gian hơn |
| 200+     | 700vh – 1000vh       | Frame rất nhiều, cần cuộn rất dài |

**Công thức tham khảo**: `height ≈ totalFrames × 5vh` (tối thiểu 300vh)

---

## 4. Canvas Setup — Chi Tiết Kỹ Thuật

### 4.1. HTML
```html
<canvas id="productCanvas"></canvas>
```
Chỉ 1 dòng. Mọi thứ khác xử lý bằng CSS + JS.

### 4.2. CSS
```css
#productCanvas {
    position: fixed;
    inset: 0;           /* top: 0; right: 0; bottom: 0; left: 0 */
    z-index: 0;
    width: 100vw;
    height: 100vh;
    display: block;      /* Loại bỏ khoảng trắng inline mặc định */
}
```

### 4.3. JavaScript — Resize Handler (High-DPI)

```javascript
const canvas = document.getElementById("productCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    
    // Canvas resolution = viewport × pixel ratio (cho màn Retina/4K)
    canvas.width  = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    // CSS size = viewport thực tế
    canvas.style.width  = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    
    // Scale context để vẽ ở tọa độ CSS, không phải tọa độ pixel
    ctx.scale(dpr, dpr);
    
    // Vẽ lại frame hiện tại sau resize
    drawFrame(currentFrame);
}

window.addEventListener("resize", resizeCanvas);
```

> **TẠI SAO CẦN High-DPI?**
> - Màn hình Retina (MacBook) có `devicePixelRatio = 2`, nghĩa là 1 CSS pixel = 4 physical pixels
> - Nếu không nhân DPR, ảnh canvas sẽ bị mờ/nhòe trên màn hình đó
> - `ctx.scale(dpr, dpr)` cho phép tiếp tục vẽ bằng tọa độ CSS bình thường

### 4.4. JavaScript — Draw Frame (Object-Cover)

```javascript
function drawFrame(index) {
    const img = frames[index];
    if (!img || !img.complete) return;  // Guard: ảnh chưa load xong

    const cw = window.innerWidth;   // Canvas CSS width
    const ch = window.innerHeight;  // Canvas CSS height
    const iw = img.naturalWidth;    // Ảnh gốc width
    const ih = img.naturalHeight;   // Ảnh gốc height

    // ═══ THUẬT TOÁN OBJECT-COVER ═══
    // Mục tiêu: ảnh phủ kín canvas, giữ tỉ lệ, cắt bớt phần thừa
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;  // Chiều rộng ảnh sau scale
    const sh = ih * scale;  // Chiều cao ảnh sau scale
    const sx = (cw - sw) / 2;  // Offset X để căn giữa
    const sy = (ch - sh) / 2;  // Offset Y để căn giữa

    ctx.clearRect(0, 0, cw, ch);   // Xóa frame cũ
    ctx.drawImage(img, sx, sy, sw, sh);  // Vẽ frame mới
}
```

> **TẠI SAO DÙNG `Math.max` CHỨ KHÔNG PHẢI `Math.min`?**
> - `Math.max` đảm bảo ảnh **phủ kín** canvas (object-cover) — cắt bớt nếu tỉ lệ khác
> - `Math.min` sẽ làm ảnh **nằm gọn** trong canvas (object-contain) — có viền đen hai bên
> - Scrollytelling luôn cần `Math.max` để không bao giờ lộ nền trống

---

## 5. Preload Ảnh — Đảm Bảo Không Giật

### 5.1. Tại sao phải preload?
- Nếu ảnh chưa load mà người dùng cuộn → canvas trống → nhấp nháy → trải nghiệm tệ
- Phải load **TẤT CẢ** frame vào bộ nhớ trước khi cho phép cuộn

### 5.2. Kỹ thuật Preload

```javascript
const totalFrames = 96;
const imgDir = "asset/img/";
const frames = [];
let imagesLoaded = 0;

function preloadFrames() {
    return new Promise((resolve) => {
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const num = String(i).padStart(3, "0");  // 1 → "001"
            img.src = `${imgDir}ezgif-frame-${num}.jpg`;

            img.onload = () => {
                imagesLoaded++;
                const pct = Math.round((imagesLoaded / totalFrames) * 100);
                // → Cập nhật loading bar ở đây
                
                if (imagesLoaded === totalFrames) {
                    resolve();  // Tất cả ảnh đã load xong
                }
            };

            img.onerror = () => {
                // Frame lỗi → vẫn đếm để không bị kẹt
                imagesLoaded++;
                if (imagesLoaded === totalFrames) resolve();
            };

            frames[i - 1] = img;  // Lưu vào mảng (0-indexed)
        }
    });
}
```

### 5.3. Loading Screen Pattern

```
1. Hiển thị loading screen (fixed, z-index cao nhất)
2. Gọi preloadFrames() → cập nhật progress bar theo imagesLoaded/totalFrames
3. Khi resolve() → fade out loading screen → cho phép tương tác
```

```javascript
async function init() {
    await preloadFrames();           // Chờ TẤT CẢ ảnh load xong
    
    resizeCanvas();
    drawFrame(0);                    // Vẽ frame đầu tiên
    
    // Fade out loading screen
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 700);  // Đợi CSS transition xong rồi mới ẩn hẳn
    
    // Bind scroll
    window.addEventListener("scroll", () => {
        requestAnimationFrame(onScroll);
    });
    window.addEventListener("resize", resizeCanvas);
    
    onScroll();  // Xử lý trạng thái ban đầu
}

init();
```

> [!IMPORTANT]
> **Phải dùng `await`** để chờ load xong. Nếu không, người dùng cuộn sẽ thấy canvas trống.

### 5.4. Quy ước đặt tên file ảnh

| Pattern | Ví dụ | Ghi chú |
|---------|-------|---------|
| `ezgif-frame-NNN.jpg` | `ezgif-frame-001.jpg` → `ezgif-frame-096.jpg` | Mặc định từ ezgif.com |
| `frame-NNN.png` | `frame-001.png` → `frame-120.png` | Tùy chỉnh |
| `NNN.webp` | `001.webp` → `200.webp` | Gọn nhất |

**Bắt buộc**: dùng zero-padding (`padStart(3, "0")`) để sắp xếp đúng thứ tự.

---

## 6. Scroll Handler — Trái Tim Của Hệ Thống

### 6.1. Tính toán scroll progress

```javascript
function onScroll() {
    const scrollY = window.scrollY;
    const heroHeight = document.getElementById("heroSpacer").offsetHeight - window.innerHeight;

    // heroProgress: 0.0 (đầu trang) → 1.0 (cuối hero spacer)
    const heroProgress = Math.min(scrollY / heroHeight, 1);

    // Map progress → frame index
    const frameIndex = Math.min(
        Math.floor(heroProgress * (totalFrames - 1)),
        totalFrames - 1
    );

    // CHỈ vẽ lại khi frame thực sự thay đổi (tối ưu hiệu năng)
    if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        drawFrame(currentFrame);
    }
}
```

### 6.2. Tại sao dùng `heroHeight` thay vì `maxScroll`?

- `maxScroll = document.scrollHeight - window.innerHeight` = toàn bộ trang có thể cuộn
- `heroHeight = heroSpacer.offsetHeight - window.innerHeight` = chỉ vùng hero spacer

**Animation chỉ chạy trong vùng hero spacer**, không phải toàn trang. Nếu dùng `maxScroll`, animation sẽ chưa kết thúc khi cuộn hết hero vì còn nội dung phía dưới.

### 6.3. requestAnimationFrame — Tối Ưu Hiệu Năng

```javascript
// ❌ SAI — gọi onScroll cho MỖI event, có thể 60-120 lần/giây
window.addEventListener("scroll", onScroll);

// ✅ ĐÚNG — gom lại, chỉ xử lý 1 lần mỗi frame render
window.addEventListener("scroll", () => {
    requestAnimationFrame(onScroll);
});
```

> **Giải thích**: Trình duyệt fire event `scroll` rất nhiều lần. `requestAnimationFrame` đảm bảo chỉ xử lý **1 lần mỗi frame render** (~60fps), tránh tính toán thừa.

### 6.4. Guard kiểm tra thay đổi frame

```javascript
if (frameIndex !== currentFrame) {
    currentFrame = frameIndex;
    drawFrame(currentFrame);
}
```

Nếu không có guard này, mỗi pixel cuộn đều gọi `drawFrame()` dù frame không đổi → lãng phí CPU/GPU.

---

## 7. Text Overlay Animation — Fade In/Out Theo Scroll

### 7.1. Hàm nội suy tuyến tính (Linear Interpolation)

```javascript
function mapRange(value, inMin, inMax, outMin, outMax) {
    const clamped = Math.max(inMin, Math.min(inMax, value));
    return outMin + ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin);
}
```

**Giải thích**: Chuyển đổi giá trị từ thang [inMin, inMax] sang thang [outMin, outMax].
- `mapRange(0.5, 0, 1, 0, 100)` → `50`
- `mapRange(0.1, 0, 0.2, 0, 1)` → `0.5` (50% opacity)

### 7.2. 3 pha của mỗi overlay

Mỗi text overlay có vòng đời 3 pha trong khoảng scroll `[start, end]`:

```
|--fadeIn--|---hold---|--fadeOut--|
   25%        45%        30%        ← tỉ lệ trong khoảng [start,end]

● fadeIn:  opacity 0→1, translateY +40px → 0
● hold:   opacity 1, translateY 0 (đứng yên)
● fadeOut: opacity 1→0, translateY 0 → -30px
```

### 7.3. Code overlay handler

```javascript
function updateOverlay(id, progress, start, end) {
    const el = document.getElementById(id);
    
    // Tính các mốc thời gian trong khoảng [start, end]
    const fadeInEnd   = start + (end - start) * 0.25;
    const holdEnd     = start + (end - start) * 0.70;
    // fadeInStart = start
    // fadeOutEnd  = end

    let opacity = 0;
    let translateY = 40;

    if (progress >= start && progress <= fadeInEnd) {
        // ── Fade In ──
        opacity    = mapRange(progress, start, fadeInEnd, 0, 1);
        translateY = mapRange(progress, start, fadeInEnd, 40, 0);
    } else if (progress > fadeInEnd && progress <= holdEnd) {
        // ── Hold ──
        opacity    = 1;
        translateY = 0;
    } else if (progress > holdEnd && progress <= end) {
        // ── Fade Out ──
        opacity    = mapRange(progress, holdEnd, end, 1, 0);
        translateY = mapRange(progress, holdEnd, end, 0, -30);
    }

    el.style.opacity   = opacity;
    el.style.transform  = `translateY(${translateY}px)`;
}
```

### 7.4. Gọi trong scroll handler

```javascript
// Trong onScroll():
updateOverlay("overlay1", heroProgress, 0.00, 0.18);
updateOverlay("overlay2", heroProgress, 0.20, 0.38);
updateOverlay("overlay3", heroProgress, 0.42, 0.62);
updateOverlay("overlay4", heroProgress, 0.68, 1.00);
```

### 7.5. Bảng khoảng scroll cho overlay

| Overlay | Start | End | Mô tả vị trí |
|---------|-------|-----|---------------|
| 1 | 0.00 | 0.18 | Đầu trang, góc trái |
| 2 | 0.20 | 0.38 | Sau overlay 1, góc phải |
| 3 | 0.42 | 0.62 | Giữa trang, góc trái |
| 4 | 0.68 | 1.00 | Cuối hero, chính giữa |

> **Khoảng trống giữa các overlay** (0.18→0.20, 0.38→0.42, 0.62→0.68) là cần thiết để tránh 2 overlay hiện cùng lúc.

### 7.6. CSS cho overlay

```css
.text-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;       /* Căn giữa dọc */
    z-index: 10;
    pointer-events: none;      /* Cho phép click xuyên qua */
    opacity: 0;                /* Ẩn mặc định */
    will-change: opacity, transform;  /* Hint cho GPU */
    transition: none;          /* JS kiểm soát, KHÔNG dùng CSS transition */
}
```

> [!WARNING]
> **`transition: none` là bắt buộc!** Nếu dùng CSS transition trên overlay, nó sẽ bị delay/lag khi cuộn nhanh vì transition cần thời gian để hoàn thành, trong khi scroll cần phản hồi tức thì.

---

## 8. Section Reveal — Hiệu Ứng Xuất Hiện Khi Cuộn Đến

### Khác với overlay
- **Overlay**: fixed, chỉ sống trong vùng hero spacer, JS kiểm soát trực tiếp
- **Section reveal**: relative, là nội dung thật bên dưới hero, CSS transition kích hoạt 1 lần

### CSS
```css
section {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

section.visible {
    opacity: 1;
    transform: translateY(0);
}
```

### JS
```javascript
function revealSection(id) {
    const el = document.getElementById(id);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
        el.classList.add("visible");
    }
}

// Gọi trong onScroll():
revealSection("story");
revealSection("freshness");
revealSection("store");
```

> **0.85** = section bắt đầu hiện khi đỉnh của nó đi vào 85% viewport từ trên xuống. Giá trị nhỏ hơn = phải cuộn sâu hơn mới thấy.

---

## 9. Loading Screen Pattern

### Mục đích
Che toàn bộ trang cho đến khi tất cả frame đã load xong. Không cho người dùng cuộn khi ảnh chưa sẵn sàng.

### Cấu trúc HTML
```html
<div id="loadingScreen" style="position: fixed; inset: 0; z-index: 100; 
     display: flex; align-items: center; justify-content: center;
     transition: opacity 0.7s ease;">
    <!-- Logo/icon -->
    <!-- Progress bar -->
    <div id="loadingBar" style="width: 0%; transition: width 0.3s ease;"></div>
    <!-- Loading text -->
    <p id="loadingText">Loading... 0%</p>
</div>
```

### Logic
```javascript
// Trong img.onload callback:
const pct = Math.round((imagesLoaded / totalFrames) * 100);
loadingBar.style.width = pct + "%";
loadingText.textContent = `Loading... ${pct}%`;

// Sau khi tất cả load xong:
loadingScreen.style.opacity = "0";       // Fade out
setTimeout(() => {
    loadingScreen.style.display = "none"; // Xóa khỏi DOM flow
}, 700);  // Khớp với transition duration
```

> ⚠️ **`display: none`** phải đặt sau khi transition hoàn thành. Nếu đặt ngay, sẽ không thấy hiệu ứng fade.

---

## 10. Navbar Adaptive

### Hành vi
- `scrollY = 0`: Navbar trong suốt, hòa vào background
- `scrollY > 50`: Navbar có nền mờ, tách biệt khỏi nội dung

### CSS
```css
nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 50;
    transition: all 0.5s ease;
}

nav.scrolled {
    background: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

### JS
```javascript
// Trong onScroll():
if (scrollY > 50) {
    navbar.classList.add("scrolled");
} else {
    navbar.classList.remove("scrolled");
}
```

---

## 11. Checklist Triển Khai Nhanh

Khi tạo trang scrollytelling mới, làm theo thứ tự:

```
□ 1. Chuẩn bị ảnh frame (đặt trong thư mục, đặt tên có zero-padding)
□ 2. Tạo <canvas> fixed full-screen (z-index: 0)
□ 3. Tạo hero spacer (height = totalFrames × 5vh, tối thiểu 300vh)
□ 4. Viết resizeCanvas() với High-DPI support
□ 5. Viết drawFrame() với thuật toán object-cover
□ 6. Viết preloadFrames() trả về Promise
□ 7. Tạo loading screen + progress bar
□ 8. Viết onScroll() với requestAnimationFrame
□ 9. Trong onScroll(): map scrollY → frameIndex → drawFrame()
□ 10. Thêm text overlays (fixed, pointer-events: none)
□ 11. Viết updateOverlay() với 3 pha fadeIn/hold/fadeOut
□ 12. Thêm section reveal cho nội dung bên dưới hero
□ 13. Thêm navbar adaptive
□ 14. Init: await preload → resize → draw(0) → hide loading → bind events
□ 15. Test: cuộn từ đầu đến cuối, kiểm tra mượt mà
```

---

## 12. Lỗi Thường Gặp & Cách Khắc Phục

| Lỗi | Nguyên nhân | Giải pháp |
|-----|------------|-----------|
| Canvas mờ/nhòe | Không nhân `devicePixelRatio` | Dùng kỹ thuật High-DPI ở mục 4.3 |
| Animation giật khi cuộn nhanh | Thiếu `requestAnimationFrame` | Wrap scroll handler trong `rAF` |
| Canvas trống/nhấp nháy | Ảnh chưa preload xong | Dùng loading screen, `await preloadFrames()` |
| Animation xong sớm/muộn | Dùng `maxScroll` thay vì `heroHeight` | Tính progress chỉ trong vùng hero spacer |
| 2 overlay hiện cùng lúc | Khoảng scroll chồng chéo | Đảm bảo có gap giữa các overlay |
| Ảnh méo/kéo dãn | Dùng `canvas.width/height` trực tiếp | Dùng thuật toán object-cover ở mục 4.4 |
| Overlay lag khi cuộn | Dùng CSS transition cho overlay | Đặt `transition: none`, chỉ control bằng JS |
| Fixed element bị lệch | `overflow: hidden` trên thẻ cha | Xóa `overflow: hidden`, dùng `overflow-x: hidden` trên `body` nếu cần |
| Vẽ lại canvas mỗi pixel cuộn | Thiếu guard check `frameIndex !== currentFrame` | Thêm guard condition trước `drawFrame()` |

---

## 13. Tối Ưu Hiệu Năng Nâng Cao (Tùy Chọn)

### Batch Loading
Thay vì load tất cả cùng lúc (có thể quá tải mạng yếu):
```javascript
async function preloadBatch(startIdx, endIdx) {
    const promises = [];
    for (let i = startIdx; i <= endIdx; i++) {
        promises.push(new Promise(resolve => {
            const img = new Image();
            img.src = `${imgDir}frame-${String(i).padStart(3,"0")}.jpg`;
            img.onload = resolve;
            img.onerror = resolve;
            frames[i - 1] = img;
        }));
    }
    await Promise.all(promises);
}

// Load 20 ảnh mỗi batch
for (let batch = 0; batch < totalFrames; batch += 20) {
    await preloadBatch(batch + 1, Math.min(batch + 20, totalFrames));
    updateProgress();
}
```

### WebP thay JPG
- WebP nhỏ hơn 25-35% so với JPG cùng chất lượng → load nhanh hơn
- Mọi trình duyệt hiện đại đều hỗ trợ WebP

### Throttle vs rAF
- `requestAnimationFrame` là đủ tốt cho hầu hết trường hợp
- Chỉ cần throttle thêm nếu `onScroll()` có logic phức tạp ngoài canvas drawing

---

*Tài liệu kỹ thuật v1.0 — Chỉ focus vào cơ chế hoạt động, không bao gồm nội dung hay thiết kế.*
