/*========================================================

SKYWARD AIRLINES
slider.js

Premium Hero & Destination Slider
Version: 1.0

=========================================================*/

class PremiumSlider {

    constructor(selector, options = {}) {

        this.slider = document.querySelector(selector);

        if (!this.slider) return;

        this.track = this.slider.querySelector(".slider-track");
        this.slides = this.slider.querySelectorAll(".slide");
        this.prev = this.slider.querySelector(".slider-prev");
        this.next = this.slider.querySelector(".slider-next");
        this.dotsContainer = this.slider.querySelector(".slider-dots");

        this.current = 0;
        this.total = this.slides.length;

        this.interval = options.interval || 5000;
        this.autoPlay = options.autoPlay !== false;

        this.timer = null;

        this.initialize();

    }

    initialize() {

        if (this.total === 0) return;

        this.createDots();

        this.update();

        this.attachEvents();

        if (this.autoPlay) {

            this.start();

        }

    }

    createDots() {

        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = "";

        this.slides.forEach((slide, index) => {

            const dot = document.createElement("button");

            dot.className = "slider-dot";

            if (index === 0) {

                dot.classList.add("active");

            }

            dot.addEventListener("click", () => {

                this.goTo(index);

            });

            this.dotsContainer.appendChild(dot);

        });

    }

    update() {

        if (!this.track) return;

        const offset = this.current * -100;

        this.track.style.transform = `translateX(${offset}%)`;

        const dots = this.slider.querySelectorAll(".slider-dot");

        dots.forEach(dot => {

            dot.classList.remove("active");

        });

        if (dots[this.current]) {

            dots[this.current].classList.add("active");

        }

    }

    nextSlide() {

        this.current++;

        if (this.current >= this.total) {

            this.current = 0;

        }

        this.update();

    }

    previousSlide() {

        this.current--;

        if (this.current < 0) {

            this.current = this.total - 1;

        }

        this.update();

    }

    goTo(index) {

        this.current = index;

        this.update();

    }

    start() {

        this.stop();

        this.timer = setInterval(() => {

            this.nextSlide();

        }, this.interval);

    }

    stop() {

        if (this.timer) {

            clearInterval(this.timer);

        }

    }

    attachEvents() {

        if (this.next) {

            this.next.addEventListener("click", () => {

                this.nextSlide();

                this.start();

            });

        }

        if (this.prev) {

            this.prev.addEventListener("click", () => {

                this.previousSlide();

                this.start();

            });

        }

        this.slider.addEventListener("mouseenter", () => {

            this.stop();

        });

        this.slider.addEventListener("mouseleave", () => {

            if (this.autoPlay) {

                this.start();

            }

        });

    }

}

/*========================================================

Fade In Animation

=========================================================*/

function revealSections() {

    const elements = document.querySelectorAll(

        ".animate"

    );

    const windowHeight = window.innerHeight;

    elements.forEach(item => {

        const position =

            item.getBoundingClientRect().top;

        if (position < windowHeight - 100) {

            item.classList.add("visible");

        }

    });

}

window.addEventListener(

    "scroll",

    revealSections

);

window.addEventListener(

    "load",

    revealSections

);

/*========================================================

Destination Carousel

=========================================================*/

class DestinationCarousel {

    constructor(selector) {

        this.container = document.querySelector(selector);

        if (!this.container) return;

        this.cards = this.container.querySelectorAll(

            ".destination-card"

        );

        this.current = 0;

        this.initialize();

    }

    initialize() {

        this.show();

        setInterval(() => {

            this.current++;

            if (this.current >= this.cards.length) {

                this.current = 0;

            }

            this.show();

        }, 4000);

    }

    show() {

        this.cards.forEach((card, index) => {

            card.style.display =

                index === this.current

                    ? "block"

                    : "none";

        });

    }

}

/*========================================================

Testimonial Slider

=========================================================*/

class TestimonialSlider {

    constructor(selector) {

        this.wrapper = document.querySelector(selector);

        if (!this.wrapper) return;

        this.items = this.wrapper.querySelectorAll(

            ".testimonial"

        );

        this.index = 0;

        this.start();

    }

    start() {

        this.items.forEach(item => {

            item.style.display = "none";

        });

        this.items[0].style.display = "block";

        setInterval(() => {

            this.items[this.index].style.display = "none";

            this.index++;

            if (this.index >= this.items.length) {

                this.index = 0;

            }

            this.items[this.index].style.display = "block";

        }, 5000);

    }

}

/*========================================================

Initialize Everything

=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        new PremiumSlider(

            ".hero-slider",

            {

                interval: 6000,

                autoPlay: true

            }

        );

        new DestinationCarousel(

            ".destination-slider"

        );

        new TestimonialSlider(

            ".testimonial-slider"

        );

    }

);

/*========================================================

Keyboard Navigation

=========================================================*/

document.addEventListener(

    "keydown",

    event => {

        const slider = document.querySelector(

            ".hero-slider"

        );

        if (!slider) return;

        const instance = slider.sliderInstance;

        if (!instance) return;

        if (event.key === "ArrowRight") {

            instance.nextSlide();

        }

        if (event.key === "ArrowLeft") {

            instance.previousSlide();

        }

    }

);

/*========================================================

END OF FILE

=========================================================*/