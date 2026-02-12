document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Zomm Effect on Image Hover
  // ==========================================
  const workImages = document.querySelectorAll(".work-image, .project-image");
  workImages.forEach((imageContainer) => {
    const img = imageContainer.querySelector("img");

    // Compute mouse position relative to image and apply zoom
    imageContainer.addEventListener("mousemove", (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Percentage coordinates
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Move transform origin and scale
      img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      img.style.transform = "scale(2)";
    });

    // Reset zoom on mouse leave
    imageContainer.addEventListener("mouseleave", () => {
      img.style.transformOrigin = "center center";
      img.style.transform = "scale(1)";
    });
  });

  // ==========================================
  // 2. 3D Tilt Effect (About Me & Tech Stack)
  // ==========================================
  const tiltElements = document.querySelectorAll(
    ".about-content, .tech-stack-header",
  );
  tiltElements.forEach((element) => {
    element.style.transition = "transform 0.1s ease";
    element.style.willChange = "transform";

    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation amount
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      // Update CSS variables for glare effect
      element.style.setProperty("--mouse-x", `${x}px`);
      element.style.setProperty("--mouse-y", `${y}px`);

      // Apply 3D rotation
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

  // ==========================================
  // 3. Scroll Reveal Animation (Projects)
  // ==========================================
  const projectItems = document.querySelectorAll(".project-item");
  const observerOptions = {
    threshold: 0.2, // 20% visibility triggers animation
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target); // Run only once
      }
    });
  }, observerOptions);

  projectItems.forEach((item, index) => {
    // Set direction based on odd/even index
    if (index % 2 === 0) {
      item.classList.add("from-left");
    } else {
      item.classList.add("from-right");
    }
    observer.observe(item);
  });

  // ==========================================
  // 4. Work Cards Scroll Reveal (Staggered)
  // ==========================================
  const workCards = document.querySelectorAll(".work-card");
  let cardRevealCounter = 0;

  const workCardObserver = new IntersectionObserver(
    (entries) => {
      // Collect newly visible cards in this batch
      const newlyVisible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => {
          // Sort left-to-right, top-to-bottom
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          if (Math.abs(rectA.top - rectB.top) < 20) {
            return rectA.left - rectB.left;
          }
          return rectA.top - rectB.top;
        });

      newlyVisible.forEach((entry, i) => {
        entry.target.style.setProperty("--card-index", i);
        entry.target.classList.add("card-visible");
        workCardObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  workCards.forEach((card) => {
    workCardObserver.observe(card);
  });

  // ==========================================
  // 5. Sticky Scroll for Project Images
  // ==========================================
  const projectBodies = document.querySelectorAll(".project-body");
  let stickyTicking = false;

  function updateStickyImages() {
    // Skip on mobile (single-column layout)
    if (window.innerWidth <= 768) {
      projectBodies.forEach((body) => {
        const img = body.querySelector(".project-image");
        if (img) img.style.transform = "";
      });
      stickyTicking = false;
      return;
    }

    const offset = 32; // 2rem top gap

    projectBodies.forEach((body) => {
      const img = body.querySelector(".project-image");
      if (!img) return;

      const bodyRect = body.getBoundingClientRect();
      const imgHeight = img.offsetHeight;
      const maxTranslate = body.offsetHeight - imgHeight;

      // Only apply when body top has scrolled past the offset point
      // and there is room to move (text taller than image)
      if (maxTranslate <= 0) {
        img.style.transform = "";
        return;
      }

      if (bodyRect.top < offset) {
        // How many px the body has scrolled past the offset
        const scrolled = offset - bodyRect.top;
        const translate = Math.min(Math.max(0, scrolled), maxTranslate);
        img.style.transform = `translateY(${translate}px)`;
      } else {
        img.style.transform = "";
      }
    });

    stickyTicking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!stickyTicking) {
        requestAnimationFrame(updateStickyImages);
        stickyTicking = true;
      }
    },
    { passive: true },
  );
});
