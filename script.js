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
  // 3. Scroll Reveal Animation
  // ==========================================
  const projectItems = document.querySelectorAll(".project-item");
  const observerOptions = {
    threshold: 0.15, // 15% visibility triggers animation
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
});
