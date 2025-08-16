import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { useTranslation } from "../../lib/useTranslation";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
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

export const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.items.aiStrategy.title"),
      description: t("services.items.aiStrategy.description"),
      icon: "🎯",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: t("services.items.integrations.title"),
      description: t("services.items.integrations.description"),
      icon: "🔗",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: t("services.items.workflow.title"),
      description: t("services.items.workflow.description"),
      icon: "⚡",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: t("services.items.support.title"),
      description: t("services.items.support.description"),
      icon: "📈",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="relative bg-slate-200 rounded-t-[5rem] shadow-2xl border-t border-slate-300 pt-32 pb-24 px-8 transition-all duration-700 hover:shadow-3xl">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-24" variants={itemVariants}>
          <motion.h2
            className="text-5xl lg:text-7xl font-page-title text-slate-900 mb-8 leading-tight font-light"
            variants={itemVariants}
          >
            {t("services.title")}{" "}
            <span className="text-slate-700 font-normal">
              {t("services.titleHighlight")}
            </span>
          </motion.h2>
          <motion.p
            className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-light"
            variants={itemVariants}
          >
            {t("services.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group relative overflow-hidden border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 bg-slate-100 rounded-3xl backdrop-blur-sm h-full">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-3 transition-opacity duration-700`}
                />

                <CardContent className="p-12 space-y-8">
                  <div className="flex items-start space-x-6">
                    <motion.div
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl shadow-xl transition-transform duration-500 group-hover:scale-110`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-page-title text-slate-900 leading-tight font-light mb-4">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-xl font-light pl-26">
                    {service.description}
                  </p>

                  <div className="pt-6 pl-26">
                    <motion.button
                      className="text-slate-700 font-medium hover:text-slate-900 transition-colors duration-300 flex items-center space-x-3 text-lg group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{t("services.learnMore")}</span>
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </motion.svg>
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
