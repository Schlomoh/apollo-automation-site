import { motion, Variants } from "framer-motion";
import { useTranslation } from "../../lib/useTranslation";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const techVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const TechnologiesSection = () => {
  const { t } = useTranslation();

  const technologies = [
    { name: t("technologies.platforms.tensorflow"), logo: "🧠" },
    { name: t("technologies.platforms.pytorch"), logo: "🔥" },
    { name: t("technologies.platforms.powerAutomate"), logo: "⚡" },
    { name: t("technologies.platforms.zapier"), logo: "🔗" },
    { name: t("technologies.platforms.awsLambda"), logo: "☁️" },
    { name: t("technologies.platforms.openai"), logo: "🤖" },
  ];

  const specialties = [
    t("technologies.specialties.0"),
    t("technologies.specialties.1"),
    t("technologies.specialties.2"),
    t("technologies.specialties.3"),
    t("technologies.specialties.4"),
    t("technologies.specialties.5"),
    t("technologies.specialties.6"),
  ];

  return (
    <section className="relative bg-slate-800 rounded-t-[5rem] shadow-2xl border-t border-slate-700 pt-32 pb-24 px-8 transition-all duration-700 hover:shadow-3xl">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-5xl lg:text-7xl font-page-title text-white mb-12 leading-tight font-light"
          variants={itemVariants}
        >
          {t("technologies.title")}
        </motion.h2>

        <motion.p
          className="text-2xl text-slate-300 mb-20 max-w-4xl mx-auto leading-relaxed font-light"
          variants={itemVariants}
        >
          {t("technologies.subtitle")}
        </motion.p>

        {/* Technology Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-16"
          variants={containerVariants}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="group flex flex-col items-center space-y-6 p-8 rounded-3xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/10"
              variants={techVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="text-5xl group-hover:scale-125 transition-transform duration-500"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
              >
                {tech.logo}
              </motion.div>
              <span className="text-white font-light text-center text-base leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Specialties */}
        <motion.div className="space-y-12" variants={itemVariants}>
          <motion.h3
            className="text-3xl font-page-title text-white font-light"
            variants={itemVariants}
          >
            {t("technologies.specialtiesTitle")}
          </motion.h3>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={containerVariants}
          >
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
                variants={badgeVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="text-orange-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                >
                  ✓
                </motion.span>
                <span className="text-white text-base font-light">
                  {specialty}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="mt-16" variants={itemVariants}>
          <motion.button
            className="text-slate-300 hover:text-white transition-colors duration-300 underline text-lg font-light"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {t("technologies.seeAll")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
