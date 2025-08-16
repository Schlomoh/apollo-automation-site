import { motion, type Variants } from "framer-motion";
import { useTranslation } from "../../lib/useTranslation";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

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

const imageVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
    },
  },
};

export const AboutUsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white rounded-t-[5rem] shadow-2xl border-t border-gray-100 pt-32 pb-24 px-8 transition-all duration-700 hover:shadow-3xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-24 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
        >
          {/* Left Column - Team Image */}
          <motion.div className="relative" variants={imageVariants}>
            <motion.div
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={t("about.teamImageAlt")}
                className="w-full h-[600px] object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </motion.div>

            {/* Decorative Circuit Pattern */}
            <motion.div
              className="absolute -top-12 -right-12 w-40 h-40 opacity-10"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-slate-400"
              >
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <circle cx="80" cy="20" r="2" fill="currentColor" />
                <circle cx="20" cy="80" r="2" fill="currentColor" />
                <circle cx="80" cy="80" r="2" fill="currentColor" />
                <path
                  d="M20 20 L80 20 L80 80 L20 80 Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
                <path d="M50 20 L50 80" stroke="currentColor" strokeWidth="1" />
                <path d="M20 50 L80 50" stroke="currentColor" strokeWidth="1" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div className="space-y-12" variants={containerVariants}>
            <motion.h2
              className="text-5xl lg:text-7xl text-slate-900 leading-tight font-page-title font-light"
              variants={itemVariants}
            >
              {t("about.title")}
            </motion.h2>

            <motion.div className="space-y-8" variants={containerVariants}>
              <motion.p
                className="text-xl text-slate-600 leading-relaxed font-light"
                variants={itemVariants}
              >
                {t("about.paragraph1")}
              </motion.p>

              <motion.p
                className="text-xl text-slate-600 leading-relaxed font-light"
                variants={itemVariants}
              >
                {t("about.paragraph2")}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
