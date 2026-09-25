/**
 * Desai Nitya - Flutter Developer Portfolio
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Navbar & Active Section Tracking ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky navbar styling
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active navigation link based on scroll position
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // --- 2. Mobile Hamburger Menu Toggle ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // --- 3. Skills Filter Tabs ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- 4. Copy-to-Clipboard with Toast Notification ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimeout;

  const showToast = (message) => {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast(`Copied to clipboard!`);
        });
      }
    });
  });

  // --- 5. Contact Form Handler (Mailto + UI Confirmation) ---
  const contactForm = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !message) {
        if (formResponse) {
          formResponse.className = 'form-response error';
          formResponse.textContent = 'Please fill in all required fields.';
        }
        return;
      }

      // Compose mailto link
      const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject || 'Flutter Dev Role'}`);
      const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:desainitya8@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

      // Open email client
      window.location.href = mailtoUrl;

      if (formResponse) {
        formResponse.className = 'form-response success';
        formResponse.textContent = 'Opening your email client... Thank you for reaching out!';
      }

      showToast('Opening your email client...');
      contactForm.reset();
    });
  }

  // --- 6. Back to Top Smooth Scroll ---
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
