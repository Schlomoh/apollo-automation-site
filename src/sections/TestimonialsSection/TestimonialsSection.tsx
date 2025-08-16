import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "../../lib/useTranslation";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t("testimonials.items.0.quote"),
      author: t("testimonials.items.0.author"),
      company: t("testimonials.items.0.company"),
    },
    {
      quote: t("testimonials.items.1.quote"),
      author: t("testimonials.items.1.author"),
      company: t("testimonials.items.1.company"),
    },
    {
      quote: t("testimonials.items.2.quote"),
      author: t("testimonials.items.2.author"),
      company: t("testimonials.items.2.company"),
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  return (
    <section
      className="relative overflow-hidden bg-slate-800 rounded-t-[5rem] shadow-2xl border-t border-slate-700 pt-32 pb-24 px-8 transition-all duration-700 hover:shadow-3xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-5xl lg:text-7xl font-page-title text-white mb-20 leading-tight font-light"
          variants={itemVariants}
        >
          {t("testimonials.title")}
        </motion.h2>

        <div className="relative min-h-[200px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="absolute inset-0"
              initial="hidden"
              animate={index === currentIndex ? "visible" : "hidden"}
            >
              <div className="space-y-10">
                <blockquote className="text-2xl lg:text-4xl text-white leading-relaxed font-light italic max-w-4xl mx-auto">
                  "{testimonial.quote}"
                </blockquote>

                <div className="space-y-3">
                  <p className="text-orange-400 font-semibold text-xl">
                    {testimonial.author}
                  </p>
                  <p className="text-slate-400 text-lg">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <motion.div
          className="flex justify-center space-x-4 mt-16"
          variants={itemVariants}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-orange-500 scale-125"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`${t("testimonials.goToTestimonial")} ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
