/**
 * ╔══════════════════════════════════════════════════════════════╗
 *  MODULE: Team Page Interactions — Intel Legacy
 *  Hiệu ứng tương tác cho trang giới thiệu thành viên:
 *  1. Reveal animation khi card xuất hiện trong viewport
 *  2. Hover tilt effect (nghiêng nhẹ theo vị trí chuột)
 *  3. Stagger animation cho từng card
 * ╚══════════════════════════════════════════════════════════════╝
 */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".member-card");

  // ── 1. Intersection Observer: Reveal khi cuộn tới ──────────
  // Mỗi card sẽ fade-in + slide-up khi người dùng cuộn tới
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target); // Chỉ chạy 1 lần
        }
      });
    },
    { threshold: 0.15 } // Trigger khi card hiện 15% trong viewport
  );

  cards.forEach((card, index) => {
    // Đặt trạng thái ban đầu: ẩn + xuống dưới
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`;
    revealObserver.observe(card);
  });

  // CSS class để kích hoạt animation
  const style = document.createElement("style");
  style.textContent = `
    .member-card.revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .member-card {
      transition: box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .member-card:hover {
      border-color: rgba(0, 242, 255, 0.4);
      box-shadow: inset 0 0 18px rgba(0, 242, 255, 0.08), 0 16px 48px rgba(0, 0, 0, 0.5), 0 0 24px rgba(0, 242, 255, 0.15);
    }
  `;
  document.head.appendChild(style);

  // ── 2. Hover Tilt Effect: Nghiêng nhẹ theo chuột ───────────
  // Tạo cảm giác 3D khi rê chuột qua card (chỉ desktop)
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;   // Vị trí X trong card
      const y = e.clientY - rect.top;    // Vị trí Y trong card
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Tính góc nghiêng (tối đa ±4 độ)
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(0)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ── 3. Badge counter animation ─────────────────────────────
  // Đếm số kỹ năng trong mỗi stack-list để hiển thị trên badge
  cards.forEach((card) => {
    const stackItems = card.querySelectorAll(".stack-list li");
    const badge = card.querySelector(".badge");
    if (badge && stackItems.length > 0) {
      badge.title = `${stackItems.length} kỹ năng đóng góp`;
    }
  });

  console.log(`[Team] Initialized: ${cards.length} member cards with reveal + tilt effects.`);
});
