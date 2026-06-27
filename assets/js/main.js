/*====================================================

SKYWARD AIRLINES
Main JavaScript

=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Mobile Navigation Toggle
    ========================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector("header nav");
    const navOverlay = document.querySelector(".nav-overlay");

    function closeMobileNav() {

        if (menuToggle) menuToggle.classList.remove("active");
        if (mainNav) mainNav.classList.remove("active");
        if (navOverlay) navOverlay.classList.remove("active");
        document.body.style.overflow = "";

    }

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            if (navOverlay) navOverlay.classList.toggle("active", isOpen);

            document.body.style.overflow = isOpen ? "hidden" : "";

        });

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMobileNav);

        });

        if (navOverlay) {

            navOverlay.addEventListener("click", closeMobileNav);

        }

        document.addEventListener("keydown", e => {

            if (e.key === "Escape") closeMobileNav();

        });

        window.addEventListener("resize", () => {

            if (window.innerWidth > 992) closeMobileNav();

        });

    }

    /* ==========================
       Sticky Header
    ========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });

    /* ==========================
       Scroll To Top
    ========================== */

    const scrollButton = document.querySelector(".scroll-top");

    if (scrollButton) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                scrollButton.classList.add("active");

            } else {

                scrollButton.classList.remove("active");

            }

        });

        scrollButton.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ==========================
       Smooth Navigation
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

    /* ==========================
       Hero Fade Animation
    ========================== */

    const hero = document.querySelector(".hero-left");

    if (hero) {

        hero.style.opacity = "0";

        hero.style.transform = "translateY(50px)";

        setTimeout(() => {

            hero.style.transition = "1s";

            hero.style.opacity = "1";

            hero.style.transform = "translateY(0)";

        }, 300);

    }

    /* ==========================
       Reveal On Scroll
    ========================== */

    const reveals = document.querySelectorAll(

        ".card,.destination,.booking-box,.status-box"

    );

    function revealElements() {

        reveals.forEach(item => {

            const top = item.getBoundingClientRect().top;

            const windowHeight = window.innerHeight;

            if (top < windowHeight - 100) {

                item.classList.add("show");

            }

        });

    }

    window.addEventListener("scroll", revealElements);

    revealElements();

    /* ==========================
       Flight Search Validation
    ========================== */

    const bookingForm = document.querySelector(".booking-box form");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const fields = this.querySelectorAll("input,select");

            let valid = true;

            fields.forEach(field => {

                if (field.value.trim() === "") {

                    field.style.border = "2px solid red";

                    valid = false;

                } else {

                    field.style.border = "none";

                }

            });

            if (!valid) {

                alert("Please complete all fields.");

                return;

            }

            alert("Flight search submitted successfully.");

        });

    }

    /* ==========================
       Newsletter Validation
    ========================== */

    const newsletter = document.querySelector(".newsletter form");

    if (newsletter) {

        newsletter.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = this.querySelector("input");

            const pattern =

                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!pattern.test(email.value)) {

                alert("Enter a valid email address.");

                return;

            }

            alert("Thank you for subscribing!");

            email.value = "";

        });

    }

    /* ==========================
       Animated Counter
    ========================== */

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const updateCounter = () => {

            const target = +counter.dataset.target;

            const current = +counter.innerText;

            const increment = target / 120;

            if (current < target) {

                counter.innerText =

                    Math.ceil(current + increment);

                setTimeout(updateCounter, 20);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

    });

    /* ==========================
       Destination Hover Effect
    ========================== */

    document.querySelectorAll(".destination").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =

                "translateY(-10px) scale(1.02)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =

                "translateY(0) scale(1)";

        });

    });

    /* ==========================
       Loading Screen
    ========================== */

    const loader = document.querySelector(".loader");

    if (loader) {

        window.addEventListener("load", () => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 700);

        });

    }

    /* ==========================
       Active Navigation
    ========================== */

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =

                section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (

                link.getAttribute("href") === "#" + current

            ) {

                link.classList.add("active");

            }

        });

    });

    /* ==========================
       Simple Hero Slider
    ========================== */

    const heroImages = [

        "assets/images/hero1.jpg",

        "assets/images/hero2.jpg",

        "assets/images/hero3.jpg"

    ];

    const heroSection = document.querySelector(".hero");

    let currentImage = 0;

    if (heroSection) {

        setInterval(() => {

            currentImage++;

            if (currentImage >= heroImages.length) {

                currentImage = 0;

            }

            heroSection.style.backgroundImage =

                `url(${heroImages[currentImage]})`;

        }, 7000);

    }

});

/*====================================================

END

=====================================================*/