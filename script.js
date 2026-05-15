gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".container");
const sections = gsap.utils.toArray("section");

let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".container",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + container.offsetWidth
    }
});

const cursor = document.querySelector("#cursor");
document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

document.querySelectorAll("a, button, .card").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(3)";
    });
    el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
    });
});

ScrollTrigger.create({
    trigger: ".container",
    start: "top top",
    end: () => "+=" + container.offsetWidth,
    onUpdate: (self) => {
        document.getElementById("progressBar").style.width = (self.progress * 100) + "%";
    }
});

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
    });
    requestAnimationFrame(animateStars);
}
animateStars();

sections.forEach(section => {
    gsap.from(section.querySelectorAll("h1, h2, .card, .social-link"), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none reverse"
        }
    });
});
