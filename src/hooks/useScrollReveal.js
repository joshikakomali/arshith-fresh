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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const selector = options.selector || ".gsap-reveal";
      const elements = container.querySelectorAll(selector);

      elements.forEach((el) => {
        const delay = parseFloat(el.getAttribute("data-delay")) || 0;
        const customY = el.getAttribute("data-y") !== null 
          ? parseFloat(el.getAttribute("data-y")) 
          : (options.yOffset !== undefined ? options.yOffset : 40);
        
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: customY,
          },
          {
            opacity: 1,
            y: 0,
            duration: options.duration || 1.2,
            delay: delay,
            ease: options.ease || "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options.start || "top 88%",
              toggleActions: options.toggleActions || "play none none none",
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run exactly once on mount

  return containerRef;
}
