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
    const projectIcons = document.querySelectorAll(".project-icon");
    const mainWireframe = document.getElementById("main-wireframe");
    const wireframeSContainer = document.getElementById("wireframe-scroll-container");
    const projectTitle = document.getElementById("project-title");
    const projectDescription = document.getElementById("project-description");

    const projects = {
        tireSure: {
            mainImage: "tireSure/wireFrames/1.png",
            title: "TireSure - Tire Monitoring Application",
            description: "BookLink was a project I developed as part of my NCIII Java course. My team and I conceptualized and decided to create a library management system with both admin and user-side functionalities. We used Java and MySQL to build the application, ensuring smooth interaction between the two sides of the application.  One of the key challenges we faced was syncing the data between the admin and user interfaces, ensuring both were updated in real-time. Through collaboration and persistence, we successfully overcame this obstacle, ultimately delivering a seamless system. The project was presented to our instructor, demonstrating our ability to work as a team and solve complex technical issues effectively.",
            wireframes: [
                "tireSure/wireFrames/2.png",
                "tireSure/wireFrames/4.png",
                "tireSure/wireFrames/3.png",
                "tireSure/wireFrames/5.png",
                "tireSure/wireFrames/6.png",
                "tireSure/wireFrames/7.png",
                "tireSure/wireFrames/8.png",
            ],
        },
        bookLink: {
            mainImage: "bookLink/1.png",
            title: "BookLink - Libary Management System",
            description: "BookLink was a project I developed as part of my NCIII Java course. My team and I conceptualized and decided to create a library management system with both admin and user-side functionalities. We used Java and MySQL to build the backend, ensuring smooth interaction between the two sides of the application. One of the key challenges we faced was syncing the data between the admin and user interfaces, ensuring both were updated in real-time. Through collaboration and persistence, we successfully overcame this obstacle, ultimately delivering a seamless system. The project was presented to our instructor, demonstrating our ability to work as a team and solve complex technical issues effectively.",
            wireframes: [
                { src: "bookLink/2.png", alt: "BookLink Wireframe 1" },
                  { src: "bookLink/3.png", alt: "BookLink Wireframe 2" },
                "bookLink/4.png",
                "bookLink/5.png",
                "bookLink/6.png",
                "bookLink/7.png",
                "bookLink/8.png",
                "bookLink/9.png",
                "bookLink/10.png",
                "bookLink/11.png",
                "bookLink/12.png",
            ],
        },
        // project3: {
        //   mainImage: "project3/wireFrames/1.png",
        //   wireframes: [
        //     "project3/wireFrames/2.png",
        //     "project3/wireFrames/3.png",
        //     "project3/wireFrames/4.png",
        //   ],
        // },
    };
    function updateWorksRight(project) {
        mainWireframe.src = project.mainImage;
        wireframeSContainer.innerHTML = "";
        projectTitle.innerText = project.title;
        projectDescription.innerText = project.description;

        const wireframes = [...project.wireframes, ...project.wireframes]; // Duplicate wireframes for smooth looping
        wireframes.forEach((wireframe) => {
            const wireframeContainer = document.createElement("div");
            wireframeContainer.classList.add("wireframe-container");
            const img = document.createElement("img");
            img.src = wireframe;
            img.classList.add("wireframe");
            wireframeContainer.appendChild(img);
            wireframeSContainer.appendChild(wireframeContainer);
        });
        enableContinuousScroll();
    }
    function enableContinuousScroll() {
        let scrollSpeed = 1;
        let isUserScrolling = false;
        let timeout;

        function autoScroll() {
            if (!isUserScrolling) {
                wireframeSContainer.scrollTop += scrollSpeed;

                // When reaching the end, smoothly reset to the beginning
                if (wireframeSContainer.scrollTop >= wireframeSContainer.scrollHeight - wireframeSContainer.clientHeight) {
                    wireframeSContainer.scrollTop = 0;
                }
            }

            requestAnimationFrame(autoScroll);
        }
        wireframeSContainer.addEventListener("scroll", () => {
            isUserScrolling = true;
            clearTimeout(timeout); // Prevent multiple triggers
    
            // Restart auto-scroll after 2 seconds of inactivity
            timeout = setTimeout(() => {
                isUserScrolling = false;
            }, 2000);
        });
        requestAnimationFrame(autoScroll);
    }

    function setActiveProjectIcon(activeIcon) {
        projectIcons.forEach((icon) => {
            icon.classList.remove("active"); // Remove active class from all icons
        });
        activeIcon.classList.add("active"); // Add active class to the clicked icon
    }

    projectIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            const projectName = this.getAttribute("data-project");
            const projectData = projects[projectName];
            if (projectData) {
                updateWorksRight(projectData);
                setActiveProjectIcon(this);
            }
        });
    });

    // Load the first project by default
    if (projectIcons.length > 0) {
        const defaultProject = projectIcons[0].getAttribute("data-project");
        const defaultProjectData = projects[defaultProject];
        if (defaultProjectData) {
            updateWorksRight(defaultProjectData);
            setActiveProjectIcon(projectIcons[0]);
        }
    }
});
