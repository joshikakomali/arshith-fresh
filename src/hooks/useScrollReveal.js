import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable React Hook to trigger premium GSAP ScrollTrigger reveals on elements.
 * Wrap your section with the returned ref and add the class "gsap-reveal"
 * (or custom class/tag specified in selector option) to elements inside.
 */
export default function useScrollReveal(options = {}) {
  const containerRef = useRef(null);
  const optionsRef = useRef(options);

  // Keep options updated in ref without triggering re-runs of the main effect
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const opt = optionsRef.current;

    const ctx = gsap.context(() => {
      const selector = opt.selector || ".gsap-reveal";
      const elements = container.querySelectorAll(selector);

      elements.forEach((el) => {
        const delay = parseFloat(el.getAttribute("data-delay")) || 0;
        const customY = el.getAttribute("data-y") !== null 
          ? parseFloat(el.getAttribute("data-y")) 
          : (opt.yOffset !== undefined ? opt.yOffset : 40);
        
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: customY,
          },
          {
            opacity: 1,
            y: 0,
            duration: opt.duration || 1.2,
            delay: delay,
            ease: opt.ease || "power3.out",
            scrollTrigger: {
              trigger: el,
              start: opt.start || "top 88%",
              toggleActions: opt.toggleActions || "play none none none",
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []); // Run exactly once on mount

  return containerRef;
}
