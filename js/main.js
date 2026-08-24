gsap.registerPlugin(ScrollTrigger);

// Lenis owns scroll interpolation; ScrollTrigger only observes the resulting scroll position.
const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const mm = gsap.matchMedia();
mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
  // Hero depth: each visual layer moves at a deliberately different scroll rate.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
    .to(".grain", { yPercent: 10, ease: "none" }, 0)
    .to(".hero-title", { yPercent: -38, ease: "none" }, 0)
    .to(".hero-model", { yPercent: -78, scale: 1.08, ease: "none" }, 0)
    .to(".hero-caption", { yPercent: -30, ease: "none" }, 0);

  // Collection enters once, leaving the commerce grid intentionally unscripted afterwards.
  gsap.from(".product-card", {
    y: 36,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".collection-grid",
      start: "top 78%",
      toggleActions: "play none none reverse",
    },
  });

  // The cover remains fixed while the typographic field streams behind it.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".marquee-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true,
      },
    })
    .to(".marquee-track", { xPercent: -46, ease: "none" });

  // Signal Motion: split words create a physical aperture for the image, then a diagonal detail reveal.
  const split = new SplitType(".signal-words", { types: "words" });
  const words = split.words;
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".signal-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true,
      },
    })
    .to(words[0], { xPercent: -105, ease: "none" }, 0.12)
    .to(words[1], { xPercent: 105, ease: "none" }, 0.12)
    .to(".signal-image", { width: "47vw", ease: "none" }, 0.12)
    .to(
      ".signal-secondary",
      { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", ease: "none" },
      0.62,
    );
});

window.addEventListener("resize", () => ScrollTrigger.refresh());
