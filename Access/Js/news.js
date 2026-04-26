/**
 * ╔══════════════════════════════════════════════════════════════╗
 *  MODULE: News Feed — Intel Legacy
 *  Lấy tin tức trực tiếp từ NewsAPI.org theo từ khóa.
 *  API key được nạp từ file config.js (bảo mật).
 *  Yêu cầu: Chạy trên localhost (Live Server) để NewsAPI hoạt động.
 * ╚══════════════════════════════════════════════════════════════╝
 */

// Đọc API key từ file cấu hình (config.js) thay vì hardcode
const API_KEY = APP_CONFIG.NEWS_API_KEY;
const BASE_URL = APP_CONFIG.NEWS_API_BASE;

// DOM Elements
const newsGrid = document.getElementById("newsGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentKeyword = "Intel OR AI OR Technology"; // Default broad query

// Format date helper
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
}

// Render a single news card
function createNewsCard(article) {
  // Use a placeholder if image is missing
  const imageUrl = article.urlToImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const sourceName = article.source.name || 'Nguồn không xác định';
  const desc = article.description || 'Không có mô tả chi tiết cho bài viết này.';
  
  return `
    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-card hardcore-glass">
      <div class="news-img-wrap">
        <img src="${imageUrl}" alt="${article.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'" />
      </div>
      <div class="news-content">
        <div class="news-meta mono">
          <span>Tin Tức</span>
          <span>${formatDate(article.publishedAt)}</span>
        </div>
        <h3 class="news-title">${article.title}</h3>
        <p class="news-desc">${desc}</p>
        <div class="news-source mono">${sourceName}</div>
      </div>
    </a>
  `;
}

// Fetch news from API
async function fetchNews(query) {
  newsGrid.innerHTML = `
    <div class="status-msg">
      <div class="spinner"></div>
      <p class="mono">Đang kết nối tới trạm tin tức trực tiếp...</p>
    </div>
  `;

  try {
    const encodedQuery = encodeURIComponent(query);
    const targetUrl = `${BASE_URL}?q=${encodedQuery}&language=vi&sortBy=publishedAt&pageSize=12&apiKey=${API_KEY}`;
    
    // Đã hủy bỏ Proxy vì NewsAPI chặn IP của máy chủ Proxy (Lỗi 403)
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      if(response.status === 426 || response.status === 429 || response.status === 401) {
          throw new Error("Lỗi API (Đã hết hạn hoặc sai Key). Mở bằng Live Server nếu bạn đang dùng file:///.");
      }
      if(response.status === 403) {
          throw new Error("Lỗi 403 Forbidden: NewsAPI từ chối kết nối. Hãy đảm bảo bạn mở trang web bằng Live Server (localhost) thay vì nháy đúp file HTML.");
      }
      throw new Error(`Lỗi kết nối gốc: ${response.status}`);
    }

    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      // Filter out removed articles
      const validArticles = data.articles.filter(article => article.title !== "[Removed]");
      newsGrid.innerHTML = validArticles.map(article => createNewsCard(article)).join("");
    } else {
      newsGrid.innerHTML = `
        <div class="status-msg">
          <p class="mono">Không tìm thấy bản ghi nào khớp với truy vấn: "${query}"</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    newsGrid.innerHTML = `
      <div class="status-msg">
        <p class="mono" style="color: #ff3366;">[ LỖI HỆ THỐNG ]<br>${error.message}</p>
      </div>
    `;
  }
}

// Handle Search
function handleSearch() {
  const customQuery = searchInput.value.trim();
  if (customQuery) {
    // Reset tabs visually when searching custom text
    filterBtns.forEach(btn => btn.classList.remove("active"));
    currentKeyword = customQuery;
    fetchNews(currentKeyword);
  }
}

// Event Listeners
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    // UI Update
    filterBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    
    // Logic Update
    const filterType = e.target.dataset.filter;
    searchInput.value = ""; // Clear custom search
    
    if (filterType === "all") {
      currentKeyword = "Intel OR AI OR Technology";
    } else {
      currentKeyword = filterType;
    }
    
    fetchNews(currentKeyword);
  });
});

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
  fetchNews(currentKeyword);
});
