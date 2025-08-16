import { Navigation } from "./components/Navigation";
import { HeroBannerSection } from "./sections/HeroBannerSection";
import { AboutUsSection } from "./sections/AboutUsSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TechnologiesSection } from "./sections/TechnologiesSection";
import { ProcessSection } from "./sections/ProcessSection";
import { CaseStudiesSection } from "./sections/CaseStudiesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { FAQSection } from "./sections/FAQSection";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./lib/LanguageContext";

export default () => {
  return (
    <LanguageProvider>
      <div className="relative bg-gray-50">
        <Navigation />

        <main className="relative overflow-hidden">
          {/* Hero Section */}
          <div id="home" className="relative z-[10]">
            <HeroBannerSection />
          </div>

          {/* Stacking sections with effect */}
          <div className="relative">
            <div id="about" className="-mt-20 relative z-[20]">
              <AboutUsSection />
            </div>

            <div id="solutions" className="-mt-16 relative z-[30]">
              <ServicesSection />
            </div>

            <div id="technologies" className="-mt-16 relative z-[40]">
              <TechnologiesSection />
            </div>

            <div id="process" className="-mt-16 relative z-[50]">
              <ProcessSection />
            </div>

            <div id="case-studies" className="-mt-16 relative z-[60]">
              <CaseStudiesSection />
            </div>

            <div id="testimonials" className="-mt-16 relative z-[70]">
              <TestimonialsSection />
            </div>

            <div id="faq" className="-mt-16 relative z-[80]">
              <FAQSection />
            </div>

            <div id="contact" className="-mt-16 relative z-[90]">
              <ContactSection />
            </div>
          </div>
        </main>

        <div className="relative -mt-16 z-[100]">
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};
