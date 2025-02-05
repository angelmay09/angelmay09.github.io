document.addEventListener("DOMContentLoaded", () => {
    // Select all sections, navigation links, and other elements
    const sections = document.querySelectorAll("main > section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const wireframeScrollContainer = document.querySelector(".wireframe-scroll-container");
    const milestones = document.querySelectorAll(".milestone");
    const contactForm = document.getElementById("contactForm");

    // ==============================================
    // 1. Handle Form Submission
    // ==============================================
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for reaching out! I'll get back to you soon.");
            contactForm.reset();
        });
    }

    // ==============================================
    // 2. Section Animations (Fade-in on Scroll)
    // ==============================================
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active"); // Add .active class for animation
                } else {
                    entry.target.classList.remove("active"); // Remove .active class
                }
            });
        },
        { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    // Observe all sections
    sections.forEach((section) => sectionObserver.observe(section));

    // ==============================================
    // 3. Navigation Highlighting
    // ==============================================
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href").substring(1) === id
                        );
                    });
                }
            });
        },
        { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    // Observe all sections for navigation highlighting
    sections.forEach((section) => navObserver.observe(section));

    // ==============================================
    // 4. Smooth Scrolling for Navigation Links
    // ==============================================
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSection = document.getElementById(
                link.getAttribute("href").substring(1)
            );
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ==============================================
    // 5. Milestone Animations (Fade-in on Scroll)
    // ==============================================
    const milestoneObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, index * 300); // Staggered delay for each milestone
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the milestone is visible
    );

    // Observe all milestones
    milestones.forEach((milestone) => milestoneObserver.observe(milestone));

    // ==============================================
    // 6. Auto-Scroll for Wireframe Section
    // ==============================================
    if (wireframeScrollContainer) {
        let scrollSpeed = 1;
        let scrollDelay = 20;

        function autoScroll() {
            if (
                wireframeScrollContainer.scrollTop + wireframeScrollContainer.clientHeight <
                wireframeScrollContainer.scrollHeight
            ) {
                wireframeScrollContainer.scrollBy(0, scrollSpeed);
            } else {
                wireframeScrollContainer.scrollTo(0, 0);
            }
            setTimeout(autoScroll, scrollDelay);
        }

        autoScroll();

        // Pause auto-scroll on hover
        wireframeScrollContainer.addEventListener("mouseenter", () => {
            scrollSpeed = 0;
        });

        wireframeScrollContainer.addEventListener("mouseleave", () => {
            scrollSpeed = 1;
        });
    }

    // Get all buttons that open modals
    const links = document.querySelectorAll(".cert-link");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    // Open modal when a button is clicked
    links.forEach((link) => {
        link.addEventListener("click", () => {
            const modalId = link.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
                document.body.style.overflow = "hidden"; 
            }
        });
    });

    // Close modal when the close button is clicked
    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            if (modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    });

    // Close modal when clicking outside the modal content
    modals.forEach((modal) => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    });
});