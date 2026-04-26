// --- AUTHENTICATION & FORM VALIDATION SYSTEM ---
// Simulated Database using LocalStorage

// 1. Elements & Tabs Setup
const authTabs = document.querySelectorAll(".auth-tab");
const tabIndicator = document.querySelector(".tab-indicator");
const authPanels = document.querySelectorAll(".auth-panel");

const notificationBox = document.getElementById("authNotification");

// Shells
const authShell = document.querySelector(".auth-shell");
const dashboardShell = document.getElementById("dashboardShell");

// Forms
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Tab Switching Logic
authTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // UI Update
    authTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Indicator animation
    tabIndicator.style.transform = `translateX(${index * 100}%)`;

    // Panel switch
    const targetId = tab.dataset.target;
    authPanels.forEach(panel => {
      if (panel.id === targetId) {
        panel.classList.add("active");
      } else {
        panel.classList.remove("active");
      }
    });

    hideNotification();
  });
});

// Helper: Show Notification
function showNotification(msg, type = "error") {
  notificationBox.textContent = msg;
  notificationBox.className = `auth-notification ${type}`;
  notificationBox.classList.remove("hidden");
}

function hideNotification() {
  notificationBox.classList.add("hidden");
  notificationBox.className = "auth-notification hidden mono";
}

// Helper: Show Input Error
function setInputError(inputId, msg) {
  const input = document.getElementById(inputId);
  const group = input.parentElement;
  const errMsg = document.getElementById(`err-${inputId}`);
  group.classList.add("error");
  errMsg.textContent = msg;
}

// Helper: Clear Input Error
function clearInputError(inputId) {
  const input = document.getElementById(inputId);
  const group = input.parentElement;
  group.classList.remove("error");
}

// Clear all errors in a form
function clearFormErrors(form) {
  form.querySelectorAll(".input-group").forEach(g => g.classList.remove("error"));
}

// Standard Regex for Email Validation
function isValidEmail(email) {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email.toLowerCase());
}

// Simulate Network Delay
function simulateNetwork(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Toggle Spinner on Button
function toggleBtnLoading(btn, isLoading) {
  const spinner = btn.querySelector(".spinner-btn");
  if (isLoading) {
    btn.disabled = true;
    spinner.classList.remove("hidden");
  } else {
    btn.disabled = false;
    spinner.classList.add("hidden");
  }
}

// 2. Registration Logic
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearFormErrors(registerForm);
  hideNotification();

  // Get values
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirm = document.getElementById("regConfirm").value;

  let hasError = false;

  // Validation Check
  if (name.length < 2) {
    setInputError("regName", "Tên phải có ít nhất 2 ký tự");
    hasError = true;
  }

  if (!email || !isValidEmail(email)) {
    setInputError("regEmail", "Định dạng email không hợp lệ (vd: account@intel.com)");
    hasError = true;
  }

  if (password.length < 6) {
    setInputError("regPassword", "Mật khẩu phải lớn hơn 6 ký tự");
    hasError = true;
  }

  if (password !== confirm) {
    setInputError("regConfirm", "Xác nhận mật khẩu không khớp");
    hasError = true;
  }

  if (hasError) return;

  // Fake Network Submission
  const submitBtn = registerForm.querySelector(".auth-submit-btn");
  toggleBtnLoading(submitBtn, true);

  // Sử dụng Link API từ file config.js
  const GOOGLE_APP_SCRIPT_URL = APP_CONFIG.GOOGLE_SHEET_API;

  try {
    // 1. Kiểm tra Email trùng lặp trên Google Sheets
    const checkRes = await fetch(`${GOOGLE_APP_SCRIPT_URL}?action=checkEmail&email=${encodeURIComponent(email)}`);
    const checkData = await checkRes.json();

    if (checkData.exists) {
      toggleBtnLoading(submitBtn, false);
      showNotification("Email này đã được ghi danh trong hệ thống (Google Sheets).", "error");
      return;
    }

    // 2. Nếu không trùng, Gửi thông tin đăng ký
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    // Không cần dùng no-cors vì Script đã trả về chuẩn JSON
    await fetch(GOOGLE_APP_SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    toggleBtnLoading(submitBtn, false);
    showNotification("Ghi danh thành công! Vui lòng Đăng Nhập.", "success");
    registerForm.reset();

    // Auto switch to login tab after success
    setTimeout(() => {
      authTabs[0].click();
    }, 2000);
  } catch (err) {
    toggleBtnLoading(submitBtn, false);
    showNotification("Lỗi kết nối tới máy chủ.", "error");
    console.error(err);
  }
});

// 3. Login Logic
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearFormErrors(loginForm);
  hideNotification();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  let hasError = false;

  if (!email) {
    setInputError("loginEmail", "Vui lòng nhập Email");
    hasError = true;
  }
  if (!password) {
    setInputError("loginPassword", "Vui lòng nhập mật khẩu");
    hasError = true;
  }

  if (hasError) return;

  const submitBtn = loginForm.querySelector(".auth-submit-btn");
  toggleBtnLoading(submitBtn, true);

  // Sử dụng Link API từ file config.js
  const GOOGLE_APP_SCRIPT_URL = APP_CONFIG.GOOGLE_SHEET_API;

  try {
    // FETCH Xác thực lên Google Sheets
    const res = await fetch(`${GOOGLE_APP_SCRIPT_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const data = await res.json();

    toggleBtnLoading(submitBtn, false);

    if (data.success) {
      if (typeof db !== 'undefined') {
        db.setSession(data.user);
        checkAuthSession();
      }
    } else {
      showNotification("Sai tài khoản hoặc mật khẩu hệ thống theo Google Sheets.", "error");
    }
  } catch (err) {
    toggleBtnLoading(submitBtn, false);
    showNotification("Lỗi cấu hình CSDL Google Sheets, hoặc API bị chặn.", "error");
    console.error(err);
  }
});

// 4. Session Management
function checkAuthSession() {
  if (typeof db === 'undefined') return;
  const user = db.getSession();

  if (user) {
    authShell.classList.add("hidden");
    dashboardShell.classList.remove("hidden");
    document.getElementById("userDisplayName").textContent = user.name;

    // Mute tabs in Navbar
    const loginNavBtn = document.querySelector(".login-btn-nav");
    if (loginNavBtn) loginNavBtn.textContent = user.name;
  } else {
    authShell.classList.remove("hidden");
    dashboardShell.classList.add("hidden");

    const loginNavBtn = document.querySelector(".login-btn-nav");
    if (loginNavBtn) loginNavBtn.textContent = "Portal";
  }
}

// Logout Bind
document.getElementById("logoutBtn").addEventListener("click", () => {
  if (typeof db !== 'undefined') {
    db.clearSession();
    checkAuthSession();
  }
});

// Init on Load
document.addEventListener("DOMContentLoaded", () => {
  // Setup realtime validation clearance
  document.querySelectorAll(".input-group input").forEach(input => {
    input.addEventListener("input", function () {
      clearInputError(this.id);
    });
  });

  checkAuthSession();
});
