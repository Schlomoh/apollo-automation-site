import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
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

export const CaseStudiesSection = () => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      industry: t("caseStudies.studies.investment.industry"),
      headline: t("caseStudies.studies.investment.headline"),
      summary: t("caseStudies.studies.investment.summary"),
      metrics: [
        t("caseStudies.studies.investment.metrics.0"),
        t("caseStudies.studies.investment.metrics.1"),
        t("caseStudies.studies.investment.metrics.2"),
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      industry: t("caseStudies.studies.manufacturing.industry"),
      headline: t("caseStudies.studies.manufacturing.headline"),
      summary: t("caseStudies.studies.manufacturing.summary"),
      metrics: [
        t("caseStudies.studies.manufacturing.metrics.0"),
        t("caseStudies.studies.manufacturing.metrics.1"),
        t("caseStudies.studies.manufacturing.metrics.2"),
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      industry: t("caseStudies.studies.healthcare.industry"),
      headline: t("caseStudies.studies.healthcare.headline"),
      summary: t("caseStudies.studies.healthcare.summary"),
      metrics: [
        t("caseStudies.studies.healthcare.metrics.0"),
        t("caseStudies.studies.healthcare.metrics.1"),
        t("caseStudies.studies.healthcare.metrics.2"),
      ],
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="relative bg-white rounded-t-[5rem] shadow-2xl border-t border-gray-100 pt-32 pb-24 px-8 transition-all duration-700 hover:shadow-3xl">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-24" variants={itemVariants}>
          <motion.h2
            className="text-5xl lg:text-7xl font-page-title text-slate-900 mb-8 leading-tight font-light"
            variants={itemVariants}
          >
            {t("caseStudies.title")}
          </motion.h2>
          <motion.p
            className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-light"
            variants={itemVariants}
          >
            {t("caseStudies.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-12"
          variants={containerVariants}
        >
          {caseStudies.map((study, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group relative overflow-hidden border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 bg-white rounded-3xl backdrop-blur-sm h-full">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-0 group-hover:opacity-3 transition-opacity duration-700`}
                />

                <CardContent className="p-10 space-y-8">
                  <div className="space-y-4">
                    <motion.span
                      className="inline-block px-4 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {study.industry}
                    </motion.span>
                    <h3 className="text-2xl font-page-title text-slate-900 leading-tight font-light">
                      {study.headline}
                    </h3>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-lg font-light">
                    {study.summary}
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">
                      {t("caseStudies.keyMetrics")}
                    </h4>
                    <ul className="space-y-3">
                      {study.metrics.map((metric, metricIndex) => (
                        <motion.li
                          key={metricIndex}
                          className="flex items-center space-x-3 text-base text-slate-600"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.1 * metricIndex,
                            duration: 0.5,
                          }}
                        >
                          <span className="text-green-500 text-lg">✓</span>
                          <span>{metric}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <motion.button
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 flex items-center space-x-3 group text-lg"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{t("caseStudies.readFullStory")}</span>
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
