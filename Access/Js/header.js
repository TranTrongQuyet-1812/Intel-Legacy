document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburgerMenu");
  const navLinks = document.getElementById("navLinks");
  const navbar = document.getElementById("globalNavbar");
  
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Scroll effect for navbar
  window.addEventListener("scroll", () => {
    if(!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Global Auth Check for Navbar
  const loginNavBtn = document.querySelector(".login-btn-nav");
  if (loginNavBtn && typeof db !== 'undefined') {
    const user = db.getSession();
    if (user && user.name) {
      loginNavBtn.textContent = user.name;
    }
  }

  // Set active link visually based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.global-navbar .nav-link');
  
  links.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Handle smooth page transitions
  const internalLinks = document.querySelectorAll('.global-navbar .nav-link, .global-navbar .brand a');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.getAttribute('href');
      
      // If clicking current page active link, just jump to top or do nothing
      if (link.classList.contains('active')) {
         window.scrollTo({top: 0, behavior: 'smooth'});
         return;
      }
      
      document.body.classList.add('page-exit');
      
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 350); // Matches CSS animation exit duration
    });
  });
});
