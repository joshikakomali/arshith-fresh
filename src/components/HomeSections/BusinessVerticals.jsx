import React, { useState } from "react";
import styles from "./BusinessVerticals.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const VERTICALS = [
  {
    id: "ecommerce",
    title: "E-Commerce",
    subtitle: "Arshith Fresh",
    link: "https://arshithfresh.com/",
    bg: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
    logo: "/assests/arshith fresh.png",
    desc: "From farm to your doorstep, providing organic crops, vegetables, and everyday grocery items with guaranteed freshness.",
  },
  {
    id: "multiseller",
    title: "Multi Seller",
    subtitle: "Seller Platform",
    link: "https://seller.arshithfresh.com/",
    bg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    logo: "/assests/Arshithlogo.webp",
    desc: "A massive open marketplace enabling hundreds of local retailers and farmers to set up storefronts and scale business digitally.",
  },
  {
    id: "consulting",
    title: "Business Consulting",
    subtitle: "Suntech Solutions",
    link: "https://suntechorganization.com/",
    bg: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=800&auto=format&fit=crop",
    logo: "/assests/suntech.png",
    desc: "Strategic administrative and technical guidance driving growth, productivity, and scalability for small-to-mid enterprises.",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    subtitle: "Suntech Digital",
    link: "https://suntechorganization.com/",
    bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    logo: "/assests/suntech.png",
    desc: "Search engine optimization (SEO), data-driven social campaigns, and digital branding assets that increase enterprise visibility.",
  },
];

export default function BusinessVerticals() {
  const containerRef = useScrollReveal();
  const [activeTab, setActiveTab] = useState("verticals");

  return (
    <section ref={containerRef} className={styles.section} id="business">
      <div className={styles.container}>
        
        {/* Section Header with Tabs */}
        <div className={`${styles.header} gsap-reveal`}>
          <div>
            <span className={styles.eyebrow}>Our Businesses</span>
            <h2 className={styles.title}>Diversified Verticals</h2>
          </div>
          <div className={styles.tabWrapper}>
            <button
              className={`${styles.tabBtn} ${activeTab === "verticals" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("verticals")}
            >
              Verticals
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "listed" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("listed")}
            >
              Listed Companies
            </button>
          </div>
        </div>

        {activeTab === "verticals" ? (
          /* Verticals 3-Column Layout: Left (2 cards), Center (Big Featured), Right (2 cards) */
          <div className={styles.verticalsLayout}>
            
            {/* LEFT GRID */}
            <div className={styles.sideGrid}>
              {VERTICALS.slice(0, 2).map((item, index) => (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.id}
                  className={`${styles.card} gsap-reveal`}
                  data-delay={index * 0.1}
                >
                  <div
                    className={styles.cardBg}
                    style={{ backgroundImage: `url('${item.bg}')` }}
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardContent}>
                    <span className={styles.cardCategory}>{item.title}</span>
                    <h3 className={styles.cardTitle}>{item.subtitle}</h3>
                    <p className={styles.cardDesc}>{item.desc}</p>
                    {item.logo && (
                      <img src={item.logo} alt={item.subtitle} className={styles.cardLogo} />
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* CENTER BIG FEATURED - IT SERVICES */}
            <a
              href="/services"
              className={`${styles.featuredCard} gsap-reveal`}
              data-delay="0.15"
            >
              <div
                className={styles.featuredBg}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop')`,
                }}
              />
              <div className={styles.featuredOverlay} />
              <div className={styles.featuredContent}>
                <span className={styles.featuredCategory}>IT Consulting & Services</span>
                <h3 className={styles.featuredTitle}>Arshith Infotech</h3>
                <p className={styles.featuredDesc}>
                  We deliver custom software architecture, digital cloud migrations, private hosting solutions, and administrative IT consultancies designed to scale modern enterprises.
                </p>
                <img
                  src="/assests/arshith.png"
                  alt="Arshith Infotech"
                  className={styles.featuredLogo}
                />
                <span className={styles.featuredLink}>
                  Explore Services <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </a>

            {/* RIGHT GRID */}
            <div className={styles.sideGrid}>
              {VERTICALS.slice(2, 4).map((item, index) => (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.id}
                  className={`${styles.card} gsap-reveal`}
                  data-delay={(index + 2) * 0.1}
                >
                  <div
                    className={styles.cardBg}
                    style={{ backgroundImage: `url('${item.bg}')` }}
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardContent}>
                    <span className={styles.cardCategory}>{item.title}</span>
                    <h3 className={styles.cardTitle}>{item.subtitle}</h3>
                    <p className={styles.cardDesc}>{item.desc}</p>
                    {item.logo && (
                      <img src={item.logo} alt={item.subtitle} className={styles.cardLogo} />
                    )}
                  </div>
                </a>
              ))}
            </div>

          </div>
        ) : (
          /* Listed Companies Empty State */
          <div className={`${styles.emptyState} gsap-reveal`}>
            <div className={styles.emptyIcon}>
              <i className="fa-solid fa-circle-nodes"></i>
            </div>
            <h3>Listed Corporate Entities</h3>
            <p>
              Arshith Group listed entities are currently undergoing initial public filing and administrative regulatory registrations. Updated profiles will appear here once finalized.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
