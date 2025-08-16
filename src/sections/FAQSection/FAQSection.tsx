import { useState } from "react";
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

const faqVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faq.items.needAi.question"),
      answer: t("faq.items.needAi.answer"),
    },
    {
      question: t("faq.items.timeline.question"),
      answer: t("faq.items.timeline.answer"),
    },
    {
      question: t("faq.items.security.question"),
      answer: t("faq.items.security.answer"),
    },
    {
      question: t("faq.items.roi.question"),
      answer: t("faq.items.roi.answer"),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white rounded-t-[5rem] shadow-2xl border-t border-gray-100 pt-32 pb-24 px-8 transition-all duration-700 hover:shadow-3xl">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-24" variants={itemVariants}>
          <motion.h2
            className="text-5xl lg:text-7xl font-page-title text-slate-900 mb-8 leading-tight font-light"
            variants={itemVariants}
          >
            {t("faq.title")}
          </motion.h2>
          <motion.p
            className="text-2xl text-slate-500 leading-relaxed font-light"
            variants={itemVariants}
          >
            {t("faq.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div className="space-y-6" variants={containerVariants}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-white backdrop-blur-sm"
              variants={faqVariants}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full px-10 py-8 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-300 focus:outline-none focus:bg-slate-50"
                aria-expanded={openIndex === index}
                whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }}
              >
                <h3 className="text-xl font-page-title text-slate-900 pr-6 font-light">
                  {faq.question}
                </h3>
                <motion.div
                  className="flex-shrink-0 w-8 h-8"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <svg
                    className="w-full h-full text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-10 pb-8">
                  <p className="text-slate-600 leading-relaxed text-lg font-light">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
