    // Typing Animation
    const typingText = document.getElementById('typingText');
    const roles = ['Software Engineer', 'Fullstack Developer', 'UI/UX Designer', 'AI Coding Enthusiast'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeWriter() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
      } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingDelay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500;
      }

      setTimeout(typeWriter, typingDelay);
    }

    // Cursor Glow Effect
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Dark Mode Toggle
    function initDarkMode() {
      const savedMode = localStorage.getItem('darkMode');
      let isDark;
      if (savedMode !== null) {
        isDark = savedMode === 'true';
      } else {
        // System preference
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      if (isDark) {
        document.body.classList.add('dark');
        updateDarkModeIcons(true);
      }
    }

    function toggleDarkMode() {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('darkMode', isDark);
      updateDarkModeIcons(isDark);
    }

    function updateDarkModeIcons(isDark) {
      document.querySelectorAll('.dark-mode-icon').forEach(icon => {
        // Use classList for cleaner toggling and to preserve other classes
        if (isDark) {
          icon.classList.remove('fa-moon', 'text-gray-700');
          icon.classList.add('fa-sun', 'text-yellow-400');
        } else {
          icon.classList.remove('fa-sun', 'text-yellow-400');
          icon.classList.add('fa-moon', 'text-gray-700');
        }
        icon.classList.add('fa-fw'); // Fixed width to prevent jumping
      });
    }

    // Consolidated Component Initializer
    document.addEventListener('DOMContentLoaded', () => {
      // Core Branding & Logic
      initDarkMode();
      typeWriter();

      // Event Listeners for Theme Toggles
      const desktopToggle = document.getElementById('darkModeToggle');
      const mobileToggle = document.getElementById('darkModeToggleMobile');
      
      desktopToggle?.addEventListener('click', toggleDarkMode);
      mobileToggle?.addEventListener('click', toggleDarkMode);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.remove('w-full', 'top-0');
        navbar.classList.add('top-4', 'rounded-full', 'w-[95%]', 'max-w-6xl', 'right-0', 'mx-auto', 'shadow-lg', 'border', 'border-gray-200/20', 'px-4', 'md:px-8', 'overflow-hidden');
      } else {
        navbar.classList.add('w-full', 'top-0');
        navbar.classList.remove('top-4', 'rounded-full', 'w-[95%]', 'max-w-6xl', 'right-0', 'mx-auto', 'shadow-lg', 'border', 'border-gray-200/20', 'px-4', 'md:px-8', 'overflow-hidden');
      }

      // Scroll progress bar
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.getElementById('scrollProgress').style.width = scrollPercent + '%';
    });

    // Preloader
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('preloader').classList.add('loaded');
      }, 300);
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      // Update desktop links
      navLinks.forEach(link => {
        link.classList.remove('nav-link-active');
        if (link.getAttribute('data-section') === current) {
          link.classList.add('nav-link-active');
        }
      });
      // Update mobile links
      document.querySelectorAll('.mobile-link').forEach(link => {
        link.classList.remove('nav-link-active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('nav-link-active');
        }
      });
    });

    // Back to Top button
    window.addEventListener("scroll", () => {
      const btn = document.getElementById("backToTop");
      if (window.scrollY > 200) {
        btn.classList.remove("opacity-0", "pointer-events-none");
        btn.classList.add("opacity-100", "pointer-events-auto");
      } else {
        btn.classList.add("opacity-0", "pointer-events-none");
        btn.classList.remove("opacity-100", "pointer-events-auto");
      }
    });

    // Modal Toggle
    function toggleModal() {
      const modal = document.getElementById("contactModal");
      const content = document.getElementById("modalContent");
      const isOpen = modal.classList.contains("opacity-100");
      if (!isOpen) {
        modal.classList.remove("opacity-0", "pointer-events-none");
        modal.classList.add("opacity-100", "pointer-events-auto");
        content.classList.remove("opacity-0", "scale-95", "translate-y-4");
        content.classList.add("opacity-100", "scale-100", "translate-y-0");
      } else {
        modal.classList.remove("opacity-100", "pointer-events-auto");
        modal.classList.add("opacity-0", "pointer-events-none");
        content.classList.remove("opacity-100", "scale-100", "translate-y-0");
        content.classList.add("opacity-0", "scale-95", "translate-y-4");
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("contactModal");
      const content = document.getElementById("modalContent");
      modal.addEventListener("click", () => {
        const isOpen = modal.classList.contains("opacity-100");
        if (isOpen) toggleModal();
      });
      content.addEventListener("click", (e) => { e.stopPropagation(); });
    });

    // Mobile Menu
    document.addEventListener("DOMContentLoaded", () => {
      const menuBtn = document.getElementById("menu-btn");
      const closeBtn = document.getElementById("close-btn");
      const mobileMenu = document.getElementById("mobile-menu");
      const mobileOverlay = document.getElementById("mobile-menu-overlay");

      function toggleMenu(open) {
        if (open) {
          mobileMenu.classList.remove("translate-x-full");
          mobileMenu.classList.add("translate-x-0", "open");
          menuBtn?.classList.add("open");
          mobileOverlay.classList.remove("opacity-0", "pointer-events-none");
          mobileOverlay.classList.add("opacity-100", "pointer-events-auto");
          mobileMenu.setAttribute("aria-hidden", "false");
          document.body.style.overflow = 'hidden';
        } else {
          mobileMenu.classList.remove("translate-x-0", "open");
          mobileMenu.classList.add("translate-x-full");
          menuBtn?.classList.remove("open");
          mobileOverlay.classList.add("opacity-0", "pointer-events-none");
          mobileOverlay.classList.remove("opacity-100", "pointer-events-auto");
          mobileMenu.setAttribute("aria-hidden", "true");
          document.body.style.overflow = '';
        }
      }

      menuBtn?.addEventListener("click", () => toggleMenu(true));
      closeBtn?.addEventListener("click", () => toggleMenu(false));
      mobileOverlay?.addEventListener("click", () => toggleMenu(false));
      document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => { setTimeout(() => toggleMenu(false), 150); });
      });
    });

    // Scroll Reveal Animations
    document.addEventListener("DOMContentLoaded", () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.classList.add('animated');
              });
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      document.querySelectorAll('.reveal-section').forEach(el => { observer.observe(el); });
    });

    // Counter Animation
    document.addEventListener("DOMContentLoaded", () => {
      const counters = document.querySelectorAll('.counter');
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const counter = entry.target;
              const target = +counter.getAttribute('data-target');
              const duration = 1500;
              const step = target / (duration / 16);
              let current = 0;

              const updateCounter = () => {
                current += step;
                if (current < target) {
                  counter.textContent = Math.ceil(current);
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target + '+';
                }
              };
              updateCounter();
              counterObserver.unobserve(counter);
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach(counter => { counterObserver.observe(counter); });
    });

    // Project Card 3D Tilt with subtle effect
    document.addEventListener("DOMContentLoaded", () => {
      const projectCards = document.querySelectorAll(".project-card");
      projectCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 30;
          const rotateY = (centerX - x) / 30;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Project Filtering
    document.addEventListener("DOMContentLoaded", () => {
      const filterBtns = document.querySelectorAll(".filter-btn");
      const projectCards = document.querySelectorAll(".project-card");

      filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          // Remove active class from all buttons
          filterBtns.forEach(b => {
            b.classList.remove("active", "bg-[#AA96DD]", "text-white");
            b.classList.add("bg-gray-100", "text-gray-600");
          });
          
          // Add active class to clicked button
          btn.classList.add("active", "bg-[#AA96DD]", "text-white");
          btn.classList.remove("bg-gray-100", "text-gray-600");

          const filterValue = btn.getAttribute("data-filter");

          projectCards.forEach(card => {
            if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
              card.style.display = "block";
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
              }, 10);
            } else {
              card.style.opacity = "0";
              card.style.transform = "scale(0.8)";
              setTimeout(() => {
                if (card.style.opacity === "0") {
                  card.style.display = "none";
                }
              }, 300);
            }
          });
        });
      });
    });

    // AJAX Contact Form Submission
    document.addEventListener("DOMContentLoaded", () => {
      const contactForm = document.getElementById("contactForm");
      const toast = document.getElementById("toast");
      
      if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
          e.preventDefault(); // Prevent default redirection
          
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalBtnText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
          submitBtn.disabled = true;

          const formData = new FormData(contactForm);
          const ajaxUrl = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

          fetch(ajaxUrl, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          }).then(response => {
            if (response.ok) {
              showToast("Message sent successfully!");
              contactForm.reset();
              setTimeout(() => {
                toggleModal(); // Close modal after 2 seconds
              }, 2000);
            } else {
              showToast("Oops! There was a problem submitting your form", false);
            }
          }).catch(error => {
            showToast("Oops! There was a problem submitting your form", false);
          }).finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          });
        });
      }
      
      function showToast(message, isSuccess = true) {
        if (!toast) return;
        const toastMsg = document.getElementById("toastMessage");
        const iconContainer = document.getElementById("toastIconContainer");
        const icon = document.getElementById("toastIcon");
        
        toastMsg.textContent = message;
        
        if (!isSuccess) {
          iconContainer.classList.remove("bg-green-500/20", "text-green-400");
          iconContainer.classList.add("bg-red-500/20", "text-red-400");
          icon.classList.remove("fa-check");
          icon.classList.add("fa-exclamation");
        } else {
          iconContainer.classList.remove("bg-red-500/20", "text-red-400");
          iconContainer.classList.add("bg-green-500/20", "text-green-400");
          icon.classList.remove("fa-exclamation");
          icon.classList.add("fa-check");
        }
        
        toast.classList.remove("translate-y-20", "opacity-0");
        toast.classList.add("translate-y-0", "opacity-100");
        
        setTimeout(() => {
          toast.classList.remove("translate-y-0", "opacity-100");
          toast.classList.add("translate-y-20", "opacity-0");
        }, 3000);
      }
    });
