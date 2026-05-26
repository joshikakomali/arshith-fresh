import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Businesses from "./pages/Businesses";
import Industries from "./pages/Industries"; // NEW Industries Page
import Careers from "./pages/Careers";
import Internship from "./pages/Internship";
import InternshipDetails from "./pages/InternshipDetails";
import Blog from "./pages/Blog"; // NEW Blog Page
import BlogDetail from "./pages/BlogDetail"; // NEW Blog Detail Page
import Contact from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();
  const overlayRef = useRef(null);
  const overlayGoldRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== currentLocation.pathname) {
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentLocation(location);
          // Small delay before revealing to let DOM update
          setTimeout(() => {
            gsap.timeline()
              .to(overlayGoldRef.current, { scaleY: 0, duration: 0.4, ease: "power2.inOut" })
              .to(overlayRef.current, { scaleY: 0, duration: 0.6, ease: "power4.inOut" }, "-=0.3");
          }, 50);
        }
      });

      tl.to(overlayRef.current, { scaleY: 1, duration: 0.6, ease: "power4.inOut" })
        .to(overlayGoldRef.current, { scaleY: 1, duration: 0.4, ease: "power2.inOut" }, "-=0.4");
    }
  }, [location, currentLocation]);

  return (
    <>
      <div className="page-transition-overlay" ref={overlayRef} />
      <div className="page-transition-overlay-gold" ref={overlayGoldRef} style={{ zIndex: 10000 }} />
      
      <Routes location={currentLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Businesses />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/internship-details" element={<InternshipDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <AnimatedRoutes />
      </main>
      <Footer />
    </Router>
  );
}
