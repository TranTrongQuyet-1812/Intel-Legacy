/**
 * ╔══════════════════════════════════════════════════════════════╗
 *  CẤU HÌNH ỨNG DỤNG — Intel Legacy
 *  File này chứa các thông số nhạy cảm (API key, endpoints).
 *  ⚠️  KHÔNG commit file này lên Git public repository.
 *  Nếu dùng Git, thêm dòng: Access/Js/config.js vào .gitignore
 * ╚══════════════════════════════════════════════════════════════╝
 */

const APP_CONFIG = Object.freeze({
  // ── NewsAPI ──────────────────────────────────────────
  // Đăng ký miễn phí tại: https://newsapi.org/register
  // Lưu ý: API key miễn phí chỉ hoạt động từ localhost
  NEWS_API_KEY: "a66e6e019da24ba0a06c0563bc702493",
  NEWS_API_BASE: "https://newsapi.org/v2/everything",

  // ── Cloudinary CDN ───────────────────────────────────
  // Dùng cho hệ thống Dual-Layer image loading (trang chủ)
  CLOUDINARY_BASE: "https://res.cloudinary.com/dreyjycrh/image/upload/",

  // ── Ứng dụng ────────────────────────────────────────
  APP_NAME: "Intel Legacy",
  APP_VERSION: "1.0.0",
  UNIVERSITY: "Đại học Lạc Hồng",
  TEAM: "aesieunhan",

  // ── Database Hệ Thống ───────────────────────────────────
  GOOGLE_SHEET_API: "https://script.google.com/macros/s/AKfycbznw4E2ibVKoJItsH-CYn5vBYV1aP82tXFekrkkWcPiph-huMuMQnV9DIh4gBn_nqEP/exec"
});
