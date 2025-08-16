import { motion, Variants } from "framer-motion";
import { useTranslation } from "../../lib/useTranslation";

const containerVariants: Variants = {
  hidden: { opacity: 90 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 90, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const ProcessSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: t("process.steps.scope.number"),
      title: t("process.steps.scope.title"),
      description: t("process.steps.scope.description"),
    },
    {
      number: t("process.steps.design.number"),
      title: t("process.steps.design.title"),
      description: t("process.steps.design.description"),
    },
    {
      number: t("process.steps.develop.number"),
      title: t("process.steps.develop.title"),
      description: t("process.steps.develop.description"),
    },
    {
      number: t("process.steps.review.number"),
      title: t("process.steps.review.title"),
      description: t("process.steps.review.description"),
    },
  ];

  return (
    <section className="relative bg-gray-200 rounded-t-[5rem] shadow-2xl pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2
            className="text-5xl lg:text-7xl font-page-title text-gray-900 mb-6 leading-tight font-light"
            variants={itemVariants}
          >
            {t("process.title")}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t("process.subtitle")}
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <motion.div
            className="hidden lg:block absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <motion.div
            className="grid lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative pb-12"
                variants={stepVariants}
              >
                {/* Step Circle */}
                <motion.div
                  className="relative z-10 mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl mb-6"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-white font-bold text-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  >
                    {step.number}
                  </motion.span>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="text-center space-y-4"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-page-title text-gray-900 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
