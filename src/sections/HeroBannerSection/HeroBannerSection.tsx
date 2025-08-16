import { motion, Variants } from "framer-motion";
import { Button } from "../../components/ui/button";
import statue from "../../assets/statue.webp";
import { useTranslation } from "../../lib/useTranslation";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      staggerChildren: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const HeroBannerSection = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black">
      {/* Matte Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <motion.div
          className="grid lg:grid-cols-[2fr_1fr] gap-20 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left Column - Content */}
          <div className="space-y-12">
            <motion.div className="space-y-8" variants={itemVariants}>
              <motion.h1
                className="text-5xl font-page-title lg:text-7xl font-light text-white leading-[0.9] tracking-tight drop-shadow-2xl min-h-[240px] lg:min-h-[280px]"
                variants={itemVariants}
              >
                {t("hero.title")}{" "}
                <motion.span
                  className="text-orange-400 font-normal"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {t("hero.titleHighlight")}{" "}
                </motion.span>
                {t("hero.titleEnd")}
              </motion.h1>

              <motion.p
                className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl font-light"
                variants={itemVariants}
              >
                {t("hero.subtitle")}
              </motion.p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  onClick={scrollToContact}
                  className="px-12 py-6 bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 transform backdrop-blur-sm border border-orange-500/20"
                >
                  {t("hero.cta")}
                </Button>
              </motion.div>

              <motion.p
                className="text-lg text-white/60 max-w-md font-light"
                variants={itemVariants}
              >
                {t("hero.kickOffText")}
              </motion.p>
            </motion.div>
          </div>

          {/* Right Column - Decorative Elements */}
          <motion.div className="relative" variants={itemVariants}>
            {/* Floating Decorative Elements */}
            <img
              src={statue}
              alt={t("hero.decorativeAlt")}
              className="absolute top-[-50vh] object-contain max-w-[200%] width-full height-[75vh] left-1/2 transform -translate-x-1/2 h-auto"
              loading="eager"
              decoding="async"
              {...({ fetchPriority: "high" } as any)}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="z-[50] absolute bottom-28 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-slate-400/30 rounded-full flex justify-center backdrop-blur-sm"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-4 bg-slate-400/40 rounded-full mt-3"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
