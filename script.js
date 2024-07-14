document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main > section");
    const navLinks = document.querySelectorAll("nav ul li a");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").substring(1) === entry.target.id) {
                        link.classList.add("active");
                    }
                });
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, {
        threshold: 0.5,
    });

    sections.forEach((section) => {
        observer.observe(section);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({
                behavior: "smooth",
            });
        });
    });
});
