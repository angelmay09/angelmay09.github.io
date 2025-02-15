document.addEventListener("DOMContentLoaded", () => {
    // Select all sections, navigation links, and other elements
    const sections = document.querySelectorAll("main > section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const wireframeScrollContainer = document.querySelector(".wireframe-scroll-container");
    const milestones = document.querySelectorAll(".milestone");
    const contactForm = document.getElementById("contactForm");

    //  Section Animations (Fade-in on Scroll)
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active"); 
                } else {
                    entry.target.classList.remove("active"); 
                }
            });
        },
        { threshold: 0.3 } 
    );

    sections.forEach((section) => sectionObserver.observe(section));

    //  Navigation Highlighting
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
        { threshold: 0.3 } 
    );

    sections.forEach((section) => navObserver.observe(section));

    // Smooth Scrolling for Navigation Links
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

    // Milestone Animations (Fade-in on Scroll)
    const milestoneObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, index * 300); 
                }
            });
        },
        { threshold: 0.5 } 
    );

    milestones.forEach((milestone) => milestoneObserver.observe(milestone));

    // Auto-Scroll for Wireframe Section
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

        wireframeScrollContainer.addEventListener("mouseenter", () => {
            scrollSpeed = 0;
        });

        wireframeScrollContainer.addEventListener("mouseleave", () => {
            scrollSpeed = 1;
        });
    }

    const links = document.querySelectorAll(".cert-link");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-modal");

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

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            if (modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    });

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
            mainImage: "assets/tireSure/wireFrames/1.png",
            title: "TireSure - Tire Monitoring Application",
            description: "BookLink was a project I developed as part of my NCIII Java course. My team and I conceptualized and decided to create a library management system with both admin and user-side functionalities. We used Java and MySQL to build the application, ensuring smooth interaction between the two sides of the application.  One of the key challenges we faced was syncing the data between the admin and user interfaces, ensuring both were updated in real-time. Through collaboration and persistence, we successfully overcame this obstacle, ultimately delivering a seamless system. The project was presented to our instructor, demonstrating our ability to work as a team and solve complex technical issues effectively.",
            wireframes: [
                "assets/tireSure/wireFrames/2.png",
                "assets/tireSure/wireFrames/4.png",
                "assets/tireSure/wireFrames/3.png",
                "assets/tireSure/wireFrames/5.png",
                "assets/tireSure/wireFrames/6.png",
                "assets/tireSure/wireFrames/7.png",
                "assets/tireSure/wireFrames/8.png",
            ],
        },
        bookLink: {
            mainImage: "assets/bookLink/wireFrames/1.png",
            title: "BookLink - Libary Management System",
            description: "BookLink was a project I developed as part of my NCIII Java course. My team and I conceptualized and decided to create a library management system with both admin and user-side functionalities. We used Java and MySQL to build the backend, ensuring smooth interaction between the two sides of the application. One of the key challenges we faced was syncing the data between the admin and user interfaces, ensuring both were updated in real-time. Through collaboration and persistence, we successfully overcame this obstacle, ultimately delivering a seamless system. The project was presented to our instructor, demonstrating our ability to work as a team and solve complex technical issues effectively.",
            wireframes: [
                "assets/bookLink/wireFrames/2.png",
                "assets/bookLink/wireFrames/3.png",
                "assets/bookLink/wireFrames/4.png",
                "assets/bookLink/wireFrames/5.png",
                "assets/bookLink/wireFrames/6.png",
                "assets/bookLink/wireFrames/7.png",
                "assets/bookLink/wireFrames/8.png",
                "assets/bookLink/wireFrames/9.png",
                "assets/bookLink/wireFrames/10.png",
                "assets/bookLink/wireFrames/11.png",
                "assets/bookLink/wireFrames/12.png",
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

        const wireframes = [...project.wireframes, ...project.wireframes]; 
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

                if (wireframeSContainer.scrollTop >= wireframeSContainer.scrollHeight - wireframeSContainer.clientHeight) {
                    wireframeSContainer.scrollTop = 0;
                }
            }

            requestAnimationFrame(autoScroll);
        }
        wireframeSContainer.addEventListener("scroll", () => {
            isUserScrolling = true;
            clearTimeout(timeout);
    
            timeout = setTimeout(() => {
                isUserScrolling = false;
            }, 2000);
        });
        requestAnimationFrame(autoScroll);
    }

    function setActiveProjectIcon(activeIcon) {
        projectIcons.forEach((icon) => {
            icon.classList.remove("active"); 
        });
        activeIcon.classList.add("active"); 
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

    if (projectIcons.length > 0) {
        const defaultProject = projectIcons[0].getAttribute("data-project");
        const defaultProjectData = projects[defaultProject];
        if (defaultProjectData) {
            updateWorksRight(defaultProjectData);
            setActiveProjectIcon(projectIcons[0]);
        }
    }
});
