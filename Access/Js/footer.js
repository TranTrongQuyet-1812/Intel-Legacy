/**
 * ╔══════════════════════════════════════════════════════════════╗
 *  MODULE: Footer — Intel Legacy
 *  Quản lý footer toàn cục:
 *  1. Tự động cập nhật năm bản quyền
 *  2. Nút cuộn lên đầu trang (Scroll to top)
 *  3. Hiệu ứng fade-in khi footer xuất hiện
 * ╚══════════════════════════════════════════════════════════════╝
 */

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".global-footer");
  if (!footer) return;

  // ── 1. Dynamic Copyright Year ──────────────────────────────
  // Tự động cập nhật năm hiện tại vào footer
  const groupName = footer.querySelector(".group-name");
  if (groupName) {
    const year = new Date().getFullYear();
    groupName.textContent = `© ${year} Nhóm Phát Triển: aesieunhan`;
  }

  // ── 2. Scroll-to-Top khi click Brand Name ──────────────────
  // Người dùng click vào tên "Intel Legacy" ở footer → cuộn lên đầu
  const brandName = footer.querySelector(".brand-name");
  if (brandName) {
    brandName.style.cursor = "pointer";
    brandName.title = "Cuộn lên đầu trang";
    brandName.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ── 3. Footer Reveal Animation ─────────────────────────────
  // Footer fade-in khi người dùng cuộn tới (chỉ chạy 1 lần)
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.style.opacity = "1";
          footer.style.transform = "translateY(0)";
          footerObserver.unobserve(footer);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Khởi tạo trạng thái ẩn (trừ trang Journey — footer hiển thị khác)
  const isJourneyPage = window.location.pathname.includes("journey");
  if (!isJourneyPage) {
    footer.style.opacity = "0";
    footer.style.transform = "translateY(20px)";
    footer.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    footerObserver.observe(footer);
  }

  console.log("Footer Initialized: Intel Legacy — Nhóm aesieunhan");
});
