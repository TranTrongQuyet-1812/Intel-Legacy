/**
 * ╔══════════════════════════════════════════════════════════════╗
 *  MODULE: Database Layer (db.js) — Intel Legacy
 *  Tầng Session giả lập bằng LocalStorage.
 *  Đã xóa bỏ DB Users nội bộ, hiện chỉ lưu phiên đăng nhập.
 * ╚══════════════════════════════════════════════════════════════╝
 */

const db = (function() {
  const SESSION_KEY = "intel_session";

  return {
    // ── PHIÊN ĐĂNG NHẬP (SESSION) ─────────────────────────────

    /**
     * Lấy thông tin phiên làm việc hiện tại
     * @returns {Object|null} - Session người dùng
     */
    getSession: function() {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    },

    /**
     * Khởi tạo phiên làm việc mới (Đăng nhập)
     * @param {Object} userObj - Thông tin phiên (không lưu mật khẩu vào session)
     */
    setSession: function(userObj) {
      // Loại bỏ thông tin nhạy cảm trước khi lưu session
      const { password, ...safeUser } = userObj;
      localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    },

    /**
     * Xóa phiên làm việc (Đăng xuất)
     */
    clearSession: function() {
      localStorage.removeItem(SESSION_KEY);
    }
  };
})();
