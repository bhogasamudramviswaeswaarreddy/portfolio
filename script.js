// ====== Dynamic Navbar Contrast ======
function updateNavbarContrast() {
  const navbar = document.querySelector('.navbar');
  const isScrolled = window.scrollY > 50;
  const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
  
  navbar.classList.toggle('scrolled', isScrolled);
  
  if (isScrolled) {
    const bgColor = getComputedStyle(navbar).backgroundColor;
    const luminance = calculateLuminance(bgColor);
    
    if (luminance > 0.5 && !isDarkTheme) {
      document.documentElement.style.setProperty('--text', '#333333');
    } else {
      document.documentElement.style.setProperty('--text', '#ffffff');
    }
  } else {
    document.documentElement.style.setProperty('--text', '#ffffff');
  }
}

function calculateLuminance(color) {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return 0.5;
  
  const [r, g, b] = rgb.map(val => {
    val = parseInt(val) / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// ====== Theme Toggle ======
function setupThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  body.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateNavbarContrast();
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('.theme-toggle i');
  if (theme === 'dark') {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
}

// ====== Mobile Menu ======
function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ====== Smooth Scrolling ======
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ====== Typing Animation ======
function setupTypingAnimation() {
  const typingText = document.querySelector('.typing-text');
  const tagline = document.querySelector('.tagline');
  const textToType = "Hi, I'm Visweswar Reddy";
  const taglineText = "Full-stack Developer building modern web applications";
  
  let charIndex = 0;
  function typeWriter() {
    if (charIndex < textToType.length) {
      typingText.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    } else {
      setTimeout(() => {
        tagline.textContent = taglineText;
        tagline.classList.add('show');
      }, 500);
    }
  }
  setTimeout(typeWriter, 1000);
}

// ====== Initialize Everything ======
document.addEventListener('DOMContentLoaded', function() {
  setupThemeToggle();
  setupMobileMenu();
  setupSmoothScrolling();
  setupTypingAnimation();
  
  // Initialize navbar contrast
  updateNavbarContrast();
  
  // Set up event listeners
  window.addEventListener('scroll', updateNavbarContrast);
  window.addEventListener('resize', updateNavbarContrast);
  
  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
  
  // Intersection Observer for animations
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => observer.observe(section));
});