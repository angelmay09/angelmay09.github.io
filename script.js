document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main > section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const wireframeScrollContainer = document.querySelector(".wireframe-scroll-container");
    const milestones = document.querySelectorAll(".milestone");
    const contactForm = document.getElementById("contactForm");

  // Handle form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! I'll get back to you soon.");
    contactForm.reset();
  });

  // Smooth animations for contact section
  const contactSection = document.getElementById("contact");
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.5,
  });

  contactObserver.observe(contactSection);
    // Animate milestones on scroll
    const milestoneObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 300); // Staggered delay
            }
        });
    }, {
        threshold: 0.5,
    });

    milestones.forEach((milestone) => {
        milestoneObserver.observe(milestone);
    });

    function autoScroll() {
        if (!wireframeScrollContainer) return;

        let scrollSpeed = 1;
        let scrollDelay = 20;

        function scroll() {
            if (wireframeScrollContainer.scrollTop + wireframeScrollContainer.clientHeight < wireframeScrollContainer.scrollHeight) {
                wireframeScrollContainer.scrollBy(0, scrollSpeed);
            } else {
                wireframeScrollContainer.scrollTo(0, 0);
            }
            setTimeout(scroll, scrollDelay);
        }
        scroll();
    }
    autoScroll();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.id;
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                navLinks.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href").substring(1) === id);
                });
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSection = document.getElementById(link.getAttribute("href").substring(1));
            targetSection?.scrollIntoView({ behavior: "smooth" });
        });
    });
});
