document.addEventListener("DOMContentLoaded", () => {
  const workImages = document.querySelectorAll(".work-image, .project-image");
  workImages.forEach((imageContainer) => {
    const img = imageContainer.querySelector("img");
    imageContainer.addEventListener("mousemove", (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      img.style.transform = "scale(2)";
    });
    imageContainer.addEventListener("mouseleave", () => {
      img.style.transformOrigin = "center center";
      img.style.transform = "scale(1)";
    });
  });
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
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      element.style.setProperty("--mouse-x", `${x}px`);
      element.style.setProperty("--mouse-y", `${y}px`);
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    element.addEventListener("mouseleave", () => {
      element.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

  // Scroll Reveal Animation for Project Items
  const projectItems = document.querySelectorAll(".project-item");

  const observerOptions = {
    threshold: 0.15, // Trigger when 15% of the item is visible
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
    // Even index (0, 2...) -> from Left
    // Odd index (1, 3...) -> from Right
    if (index % 2 === 0) {
      item.classList.add("from-left");
    } else {
      item.classList.add("from-right");
    }
    observer.observe(item);
  });
});
