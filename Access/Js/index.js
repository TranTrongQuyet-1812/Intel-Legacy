const IntelScrollyTelling = (function () {
  const CONFIG = {
    HIGH_RES_FETCH_DELAY_MS: 120,
    LOADER_FADEOUT_MS: 700,
    HERO_HEIGHT_MULTIPLIER: 2.5,
    SCROLL_HEADER_THRESHOLD: 80
  };

  const canvas = document.getElementById("productCanvas");
  const ctx = canvas.getContext("2d");
const heroSpacer = document.getElementById("heroSpacer");
const loadingScreen = document.getElementById("loadingScreen");
const loadingBar = document.getElementById("loadingBar");
const loadingText = document.getElementById("loadingText");

const tabGrid = document.getElementById("productTabs");
const tabButtons = Array.from(document.querySelectorAll(".tab-card"));

const overlayEls = [
  document.getElementById("overlay1"),
  document.getElementById("overlay2"),
  document.getElementById("overlay3"),
];

const products = {
  arc: {
    name: "Intel Arc",
    label: "Intel Arc A-series | Desktop GPU",
    title: "Đưa gameplay lên chuẩn ray tracing + AV1",
    summary:
      "GPU rời Intel Arc mang kiến trúc Xe HPG, hỗ trợ ray tracing phần cứng, XeSS 2.0 và encode AV1 gốc cho streamer. Hoàn hảo cho PC chơi game 2K/4K và dựng phim nhẹ; driver Game On tối ưu liên tục và hỗ trợ cả Windows lẫn Linux.",
    folder: "Intel Arc Frame",

    // Tích hợp Cloudinary
    frames: 191,
    cdnBase: "https://res.cloudinary.com/dreyjycrh/image/upload/",
    cdnVersion: "v1774977142",
    framePrefix: "frame_",
    frameSuffix: ".webp",
    padLength: 4,
    startFrame: 0,

    overlays: [
      {
        tag: "Xe HPG",
        title: "Hiệu năng khung hình ổn định",
        desc: "Ray tracing thế hệ mới, XeSS 2.0, cải thiện FPS trên tựa game AAA, tối ưu cho DirectX 12 Ultimate và Vulkan.",
        start: 0.0,
        end: 0.24,
      },
      {
        tag: "Creator-ready",
        title: "Encode AV1 gốc",
        desc: "Streamer bitrate thấp vẫn giữ chi tiết nhờ encoder AV1 tích hợp và pipeline OBS plugin chính thức.",
        start: 0.28,
        end: 0.54,
      },
      {
        tag: "Thermal & Power",
        title: "Tối ưu công suất",
        desc: "Thiết kế năng lượng linh hoạt cho build ATX nhỏ gọn, hỗ trợ Resizable BAR, XMX cho AI filter và ReBAR trên mainboard mới.",
        start: 0.6,
        end: 0.92,
      },
    ],
    features: [
      {
        title: "Ray tracing + XeSS",
        desc: "Nhảy FPS trên Cyberpunk, Forza, Starfield khi bật XeSS; vẫn giữ chi tiết cảnh vật ray tracing.",
      },
      {
        title: "AV1 dành cho streamer",
        desc: "Xuất hình 4K/60 mà không vỡ khối khi bitrate giới hạn.",
      },
      {
        title: "Xe Media Engine",
        desc: "Decode/encode HEVC, VP9, AV1 giúp timeline dựng phim mượt hơn.",
      },
      {
        title: "Driver Game On",
        desc: "Cập nhật tối ưu ngay ngày phát hành game mới, tương thích Windows + Linux.",
      },
      {
        title: "Creator workflow",
        desc: "Hỗ trợ Adobe Premiere, DaVinci Resolve với tăng tốc GPU và AV1 export native.",
      },
    ],
    specs: [
      { label: "Nhân Xe", value: "32", desc: "Kiến trúc Xe HPG, tối ưu hiệu suất/điện." },
      { label: "VRAM", value: "16GB GDDR6", desc: "Băng thông cao cho game và dựng phim." },
      { label: "Encode", value: "Dual AV1", desc: "Song song 2 stream 4K/60." },
      { label: "Bus", value: "PCIe 4.0", desc: "Độ trễ thấp trên mainboard mới." },
      { label: "API", value: "DX12U / Vulkan", desc: "Hỗ trợ ray tracing, mesh shading, sampler feedback." },
      { label: "AI", value: "XMX Engine", desc: "Tăng tốc XeSS, filter AI, upscaling hình ảnh." },
    ],
  },
  cpu: {
    name: "Intel Core Ultra",
    label: "Intel Core Ultra | Meteor Lake",
    title: "Hybrid core + NPU sẵn sàng AI tại máy",
    summary:
      "Kiến trúc big.LITTLE với P-core & E-core, GPU Arc tích hợp và NPU AI tăng tốc tác vụ Copilot. Thiết kế cho laptop mỏng nhẹ, thời lượng pin dài, dựng video 4K cơ bản và chạy AI on-device không cần cloud.",
    folder: "Intel CPU Frame",

    // Tích hợp Cloudinary Dual-Layer
    frames: 191,
    cdnBase: "https://res.cloudinary.com/dreyjycrh/image/upload/",
    cdnVersion: "v1774979716",
    framePrefix: "CPU_",
    frameSuffix: ".webp",
    padLength: 4,
    startFrame: 0,

    overlays: [
      {
        tag: "Hybrid Core",
        title: "Hiệu năng + hiệu suất",
        desc: "P-core xử lý burst, E-core giữ đa nhiệm mượt mà; Thread Director phân luồng theo thời gian thực.",
        start: 0.0,
        end: 0.24,
      },
      {
        tag: "NPU on-die",
        title: "AI chạy cục bộ",
        desc: "Tăng tốc Copilot+, xử lý giọng nói, dịch và ổn định hình ảnh ngay trên máy; hỗ trợ ONNX Runtime.",
        start: 0.28,
        end: 0.54,
      },
      {
        tag: "Xe Graphics",
        title: "Đồ họa tích hợp đột phá",
        desc: "GPU Xe-LPG hỗ trợ AV1, chơi eSport 1080p ổn định và tăng tốc Premiere/DaVinci cơ bản.",
        start: 0.6,
        end: 0.92,
      },
    ],
    features: [
      { title: "AI-ready NPU", desc: "Xử lý AI nền như khử ồn, nhận dạng, tóm tắt văn bản ngay trên máy." },
      { title: "Thunderbolt 4 & Wi-Fi 6E", desc: "Băng thông ngoại vi và mạng không dây tốc độ cao cho studio di động." },
      { title: "Xe iGPU", desc: "Encode AV1, dựng video 4K cơ bản không cần eGPU." },
      { title: "Pin thông minh", desc: "Media Engine và E-core giúp tiết kiệm điện khi họp online dài giờ." },
      { title: "Tương thích AI Framework", desc: "Chạy local Stable Diffusion, Whisper qua OpenVINO/ONNX." },
    ],
    specs: [
      { label: "Nhân", value: "16 (6P+8E+2LP)", desc: "Cân bằng burst và nền." },
      { label: "NPU", value: "AI Boost", desc: "Tăng tốc Copilot+, Stable Diffusion cục bộ." },
      { label: "GPU", value: "Xe-LPG 8 lõi", desc: "Hỗ trợ AV1 encode/decode." },
      { label: "I/O", value: "TB4, PCIe 5", desc: "Kết nối SSD/eGPU tốc độ cao." },
      { label: "Memory", value: "LPDDR5/X", desc: "Băng thông cao, tiết kiệm điện cho ultrabook." },
      { label: "AI stack", value: "OpenVINO", desc: "Triển khai nhanh các mô hình thị giác và NLP." },
    ],
  },
  gaudi: {
    name: "Intel Gaudi",
    label: "Intel Gaudi | AI Accelerator",
    title: "Huấn luyện LLM tối ưu chi phí",
    summary:
      "Intel Gaudi mang kiến trúc Ethernet-first, băng thông HBM cao và phần mềm open chuẩn. Giúp team AI huấn luyện/ suy luận mô hình lớn với chi phí/TFLOPS hấp dẫn, hỗ trợ PyTorch, ONNX và thư viện Habana SynapseAI; phù hợp cluster training và inference LLM quy mô production.",
    folder: "Intel Gaudi Frame",

    // Tích hợp Cloudinary Dual-Layer
    frames: 191,
    cdnBase: "https://res.cloudinary.com/dreyjycrh/image/upload/",
    cdnVersion: "v1774979841",
    framePrefix: "Gaudi_",
    frameSuffix: ".webp",
    padLength: 4,
    startFrame: 0,

    overlays: [
      {
        tag: "HBM",
        title: "Băng thông bộ nhớ lớn",
        desc: "HBM độ trễ thấp cho batch lớn, pipeline ổn định và gradient checkpointing hiệu quả.",
        start: 0.0,
        end: 0.24,
      },
      {
        tag: "Ethernet Fabric",
        title: "Kết nối cụm mở",
        desc: "Networking chuẩn Ethernet, dễ scale-out trên hạ tầng có sẵn, tránh phụ thuộc InfiniBand; hỗ trợ RoCE v2 và RDMA.",
        start: 0.28,
        end: 0.54,
      },
      {
        tag: "Software Stack",
        title: "PyTorch/ONNX ready",
        desc: "Hỗ trợ ROCm-style API, open source driver và toolkit Habana; tối ưu cho LLM và computer vision.",
        start: 0.6,
        end: 0.92,
      },
    ],
    features: [
      { title: "Hiệu năng/giá cạnh tranh", desc: "Giảm TCO khi huấn luyện LLM so với giải pháp GPU thuần túy." },
      { title: "Ethernet-first", desc: "Không khóa vào InfiniBand, tận dụng switch sẵn có." },
      { title: "Framework mở", desc: "Gaudi hỗ trợ PyTorch, ONNX, TensorFlow qua oneAPI/ SynapseAI." },
      { title: "Operator tối ưu", desc: "Thư viện kernel cho attention, matmul, BF16/FP8 để tăng throughput." },
      { title: "Inference scale-out", desc: "Multi-node với DeepSpeed/Megatron, phục vụ LLM realtime." },
    ],
    specs: [
      { label: "HBM", value: "96GB", desc: "Độ trễ thấp cho batch lớn." },
      { label: "Throughput", value: "2.5x/chi phí", desc: "Tối ưu $/TFLOPS huấn luyện." },
      { label: "Fabric", value: "Ethernet 100/200G", desc: "Scale-out theo rack sẵn có." },
      { label: "Stack", value: "oneAPI, SynapseAI", desc: "Triển khai nhanh cho LLM/vision." },
      { label: "Precision", value: "BF16/FP8", desc: "Tối ưu tốc độ mà vẫn giữ chất lượng." },
      { label: "Framework", value: "DeepSpeed, Megatron", desc: "Tương thích thư viện phân mảnh mô hình phổ biến." },
    ],
  },
};

let currentProduct = null;
let activeFrames = [];
let totalFrames = 0;
let currentFrame = 0;
let heroHeight = 0;
let isScrolling = false;
const frameCache = {};

// --- DUAL-LAYER / PROGRESSIVE LOADING VARIABLES ---
let highResTimer = null;
let currentHighResImg = null;

function setHeroHeight(frames) {
  const vh = Math.max(Math.floor(frames * CONFIG.HERO_HEIGHT_MULTIPLIER), 300); // Điều chỉnh tỷ lệ do số lượng frame tăng gấp đôi (191)
  heroSpacer.style.height = `${vh}vh`;
  heroHeight = heroSpacer.offsetHeight - window.innerHeight;
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  drawFrame(currentFrame);
}

function drawFrame(index) {
  const img = activeFrames[index];
  if (!img || !img.complete) return;

  const cw = window.innerWidth;
  const ch = window.innerHeight;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh);

  // Nếu ảnh siêu nét hiện tại khớp với frame đang xem thì đập đè lên
  if (currentHighResImg && currentHighResImg.frameIndex === index && currentHighResImg.complete) {
    ctx.drawImage(currentHighResImg, sx, sy, sw, sh);
  }
}

// --- CLOUDINARY HYBRID FETCH LOGIC ---
function triggerHighResFetch() {
  clearTimeout(highResTimer);
  if (!currentProduct || !currentProduct.cdnBase) return;

  highResTimer = setTimeout(() => {
    fetchHighRes(currentFrame);
  }, CONFIG.HIGH_RES_FETCH_DELAY_MS); // Dừng cuộn thì bắn tải ảnh 4K
}

function fetchHighRes(index) {
  const p = currentProduct;
  // ÉP BUỘC CHẤT LƯỢNG CAO NHẤT (q_100) VÀ GIỮ NGUYÊN GỐC 4K KHI DỪNG CHUỘT
  const num = String(index + p.startFrame).padStart(p.padLength, "0");
  const src = `${p.cdnBase}f_auto,q_100/${p.cdnVersion}/${p.framePrefix}${num}${p.frameSuffix}`;

  const img = new Image();
  img.src = src;
  img.frameIndex = index;

  img.onload = () => {
    // Hủy bỏ nếu trong lúc chờ tải xong, khách đã click sang sản phẩm khác
    if (currentProduct !== p) return;

    // Chỉ chèn đè nếu khách vẫn chưa lăn chuột đi qua frame khác
    if (currentFrame === index && !isScrolling) {
      currentHighResImg = img;
      drawFrame(index); // Draw lần nữa để lồng ảnh siêu nét lên
    }
  };
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const clamped = Math.max(inMin, Math.min(inMax, value));
  return outMin + ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function updateOverlay(el, progress, start, end, data) {
  const fadeInEnd = start + (end - start) * 0.25;
  const holdEnd = start + (end - start) * 0.7;
  let opacity = 0;
  let translateY = 40;

  if (progress >= start && progress <= fadeInEnd) {
    opacity = mapRange(progress, start, fadeInEnd, 0, 1);
    translateY = mapRange(progress, start, fadeInEnd, 40, 0);
  } else if (progress > fadeInEnd && progress <= holdEnd) {
    opacity = 1;
    translateY = 0;
  } else if (progress > holdEnd && progress <= end) {
    opacity = mapRange(progress, holdEnd, end, 1, 0);
    translateY = mapRange(progress, holdEnd, end, 0, -30);
  }

  el.style.opacity = opacity;
  el.style.transform = `translateY(${translateY}px)`;

  if (!el.dataset.bound) {
    el.innerHTML = `<div class="copy"><p class="eyebrow mono">${data.tag}</p><h2>${data.title}</h2><p>${data.desc}</p></div>`;
    el.dataset.bound = "true";
  }
}

function revealSection(id) {
  const el = document.getElementById(id);
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    el.classList.add("visible");
  }
}

function updateTabVisibility(scrollY) {
  if (scrollY > CONFIG.SCROLL_HEADER_THRESHOLD) {
    tabGrid.classList.add("hide");
  } else {
    tabGrid.classList.remove("hide");
  }
}

function onScroll() {
  isScrolling = false;
  const scrollY = window.scrollY;
  updateTabVisibility(scrollY);
  heroHeight = heroSpacer.offsetHeight - window.innerHeight;
  const heroProgress = Math.max(0, Math.min(1, scrollY / heroHeight));

  if (activeFrames.length) {
    const frameIndex = Math.min(
      Math.floor(heroProgress * (totalFrames - 1)),
      totalFrames - 1
    );
    if (frameIndex !== currentFrame) {
      currentFrame = frameIndex;
      drawFrame(currentFrame);
      triggerHighResFetch();
    }
  }

  if (currentProduct) {
    currentProduct.overlays.forEach((item, idx) => {
      updateOverlay(overlayEls[idx], heroProgress, item.start, item.end, item);
    });
  }

  revealSection("intro");
  revealSection("specs");
  revealSection("cta");
}

function bindScroll() {
  window.addEventListener("scroll", () => {
    // Đánh dấu để dừng việc vẽ chèn ảnh Nét
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(onScroll);
    }
  });
}

function setActiveTab(key) {
  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.product === key);
  });
}

function renderContent(product) {
  document.getElementById("productLabel").textContent = product.label;
  document.getElementById("productTitle").textContent = product.title;
  document.getElementById("productSummary").textContent = product.summary;

  const featureList = document.getElementById("featureList");
  featureList.innerHTML = product.features
    .map(
      (f) => `
      <div class="feature">
        <strong>${f.title}</strong>
        <p>${f.desc}</p>
      </div>`
    )
    .join("");

  const specGrid = document.getElementById("specGrid");
  specGrid.innerHTML = product.specs
    .map(
      (s) => `
      <div class="spec">
        <span>${s.label}</span>
        <strong>${s.value}</strong>
        <p>${s.desc}</p>
      </div>`
    )
    .join("");

  overlayEls.forEach((el) => {
    el.dataset.bound = "";
  });
}

function preloadProduct(key) {
  if (frameCache[key]) {
    loadingBar.style.width = "100%";
    loadingText.textContent = "100%";
    return Promise.resolve();
  }

  const product = products[key];
  const frames = [];
  let imagesLoaded = 0;

  // KIỂM TRA: Nếu có CDN, dùng ảnh mờ từ CDN (rất nhẹ để load vòng đầu)
  // Nếu không, xài folder local ở máy
  const isCdn = !!product.cdnBase;

  return new Promise((resolve) => {
    // Chế độ Lazy Load: Đợi đúng 5 khung hình đầu tiên tải xong để đảm bảo khúc đầu cuộn mượt mà nhất có thể, sau đó mới tắt chữ Loading.
    const thresholdToResolve = isCdn ? 5 : product.frames;
    let hasResolved = false;

    for (let i = 0; i < product.frames; i++) {
      const img = new Image();
      const num = String(i + product.startFrame).padStart(product.padLength, "0");

      if (isCdn) {
        // Source gốc là 1080p (Full HD), nên mình gỡ ép kích thước (w_xxx) để lấy đúng kích thước ngang dọc nguyên bản. Lấy chất lượng Q_80 cho cuộn.
        img.src = `${product.cdnBase}q_80,f_auto/${product.cdnVersion}/${product.framePrefix}${num}${product.frameSuffix}`;
      } else {
        img.src = `../Access/Img/${encodeURIComponent(product.folder)}/${product.framePrefix}${num}${product.frameSuffix}`;
      }

      img.onload = () => {
        imagesLoaded++;
        const pct = Math.round((imagesLoaded / product.frames) * 100);

        // Cập nhật thanh Loading (nếu chưa vào)
        if (!hasResolved) {
          // Ép progress ảo cho nhanh
          let fakePct = Math.min(100, Math.round((imagesLoaded / thresholdToResolve) * 100));
          loadingBar.style.width = `${fakePct}%`;
          loadingText.textContent = `${fakePct}%`;
        }

        if (imagesLoaded >= thresholdToResolve && !hasResolved) {
          hasResolved = true;
          frameCache[key] = frames;
          resolve();
        }
      };

      img.onerror = () => {
        imagesLoaded++;
        if (imagesLoaded >= thresholdToResolve && !hasResolved) {
          hasResolved = true;
          frameCache[key] = frames;
          resolve();
        }
      };
      frames[i] = img;
    }
  });
}

function showLoader() {
  loadingScreen.style.opacity = "1";
  loadingScreen.style.display = "flex";
  loadingBar.style.width = "0%";
  loadingText.textContent = "0%";
}

function hideLoader() {
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, CONFIG.LOADER_FADEOUT_MS);
}

async function setProduct(key) {
  if (currentProduct === products[key]) return;
  currentProduct = products[key];
  
  // Xóa rác tàn dư của ảnh 4K từ sản phẩm trước đó
  currentHighResImg = null;
  clearTimeout(highResTimer);

  setActiveTab(key);
  renderContent(currentProduct);
  setHeroHeight(currentProduct.frames);
  showLoader();
  await preloadProduct(key);
  activeFrames = frameCache[key];
  totalFrames = currentProduct.frames;
  currentFrame = 0;

  // Khởi động render
  resizeCanvas();
  drawFrame(0);
  triggerHighResFetch(); // Kích lập tức frame 4K đầu tiên

  hideLoader();
  window.scrollTo({ top: 0, behavior: "smooth" });
  onScroll();
}

function bindTabs() {
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.product;
      setProduct(key);
    });
  });
}

function initOverlays(product) {
  overlayEls.forEach((el, idx) => {
    const data = product.overlays[idx];
    el.innerHTML = `<div class="copy"><p class="eyebrow mono">${data.tag}</p><h2>${data.title}</h2><p>${data.desc}</p></div>`;
  });
}

function init() {
  bindTabs();
  bindScroll();
  window.addEventListener("resize", resizeCanvas);
  setProduct("arc");
}

  init();
})();
