import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "../../components/ui/button";
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

export const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectBrief: "",
    agreeToPrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim())
      newErrors.name = t("contact.form.validation.nameRequired");
    if (!formData.company.trim())
      newErrors.company = t("contact.form.validation.companyRequired");
    if (!formData.email.trim())
      newErrors.email = t("contact.form.validation.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("contact.form.validation.emailInvalid");
    if (!formData.projectBrief.trim())
      newErrors.projectBrief = t(
        "contact.form.validation.projectBriefRequired"
      );
    if (!formData.agreeToPrivacy)
      newErrors.agreeToPrivacy = t("contact.form.validation.privacyRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(t("contact.form.successMessage"));
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      projectBrief: "",
      agreeToPrivacy: false,
    });
    setIsSubmitting(false);
  };

  return (
    <section className="relative bg-slate-900 rounded-t-[5rem] shadow-2xl border-t border-slate-700 pt-32 pb-24 px-8 transition-all duration-700 hover:shadow-3xl">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.h2
            className="text-5xl lg:text-7xl font-page-title text-white mb-8 leading-tight font-light"
            variants={itemVariants}
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p
            className="text-2xl text-slate-300 leading-relaxed font-light"
            variants={itemVariants}
          >
            {t("contact.subtitle")}
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          variants={containerVariants}
        >
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={itemVariants}
          >
            {/* Name */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="name"
                className="block text-base font-medium text-white mb-3"
              >
                {t("contact.form.name")} {t("contact.form.required")}
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t("contact.form.placeholders.name")}
                className={`w-full px-6 py-4 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 backdrop-blur-sm ${
                  errors.name
                    ? "border-red-500"
                    : "border-slate-600 focus:border-orange-500"
                }`}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              {errors.name && (
                <motion.p
                  className="mt-2 text-sm text-red-400"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="company"
                className="block text-base font-medium text-white mb-3"
              >
                {t("contact.form.company")} {t("contact.form.required")}
              </label>
              <motion.input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder={t("contact.form.placeholders.company")}
                className={`w-full px-6 py-4 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 backdrop-blur-sm ${
                  errors.company
                    ? "border-red-500"
                    : "border-slate-600 focus:border-orange-500"
                }`}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              {errors.company && (
                <motion.p
                  className="mt-2 text-sm text-red-400"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.company}
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={itemVariants}
          >
            {/* Email */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-base font-medium text-white mb-3"
              >
                {t("contact.form.email")} {t("contact.form.required")}
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("contact.form.placeholders.email")}
                className={`w-full px-6 py-4 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 backdrop-blur-sm ${
                  errors.email
                    ? "border-red-500"
                    : "border-slate-600 focus:border-orange-500"
                }`}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              {errors.email && (
                <motion.p
                  className="mt-2 text-sm text-red-400"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="phone"
                className="block text-base font-medium text-white mb-3"
              >
                {t("contact.form.phone")}
              </label>
              <motion.input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t("contact.form.placeholders.phone")}
                className="w-full px-6 py-4 bg-white/10 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 backdrop-blur-sm"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </motion.div>

          {/* Project Brief */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="projectBrief"
              className="block text-base font-medium text-white mb-3"
            >
              {t("contact.form.projectBrief")} {t("contact.form.required")}
            </label>
            <motion.textarea
              id="projectBrief"
              name="projectBrief"
              rows={5}
              value={formData.projectBrief}
              onChange={handleInputChange}
              placeholder={t("contact.form.placeholders.projectBrief")}
              className={`w-full px-6 py-4 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 resize-vertical backdrop-blur-sm ${
                errors.projectBrief
                  ? "border-red-500"
                  : "border-slate-600 focus:border-orange-500"
              }`}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            {errors.projectBrief && (
              <motion.p
                className="mt-2 text-sm text-red-400"
                role="alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {errors.projectBrief}
              </motion.p>
            )}
          </motion.div>

          {/* Privacy Agreement */}
          <motion.div
            className="flex items-start space-x-4"
            variants={itemVariants}
          >
            <motion.input
              type="checkbox"
              id="agreeToPrivacy"
              name="agreeToPrivacy"
              checked={formData.agreeToPrivacy}
              onChange={handleInputChange}
              className="mt-1.5 w-5 h-5 text-orange-500 bg-white/10 border-slate-600 rounded focus:ring-orange-500 focus:ring-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            <div>
              <label
                htmlFor="agreeToPrivacy"
                className="text-base text-slate-300"
              >
                {t("contact.form.privacyAgreement")}{" "}
                <a
                  href="#"
                  className="text-orange-400 hover:text-orange-300 underline transition-colors duration-300"
                >
                  {t("contact.form.privacyPolicy")}
                </a>{" "}
                {t("contact.form.required")}
              </label>
              {errors.agreeToPrivacy && (
                <motion.p
                  className="mt-2 text-sm text-red-400"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.agreeToPrivacy}
                </motion.p>
              )}
            </div>
          </motion.div>

          <motion.p
            className="text-base text-slate-400"
            variants={itemVariants}
          >
            {t("contact.form.dataSecurityNote")}
          </motion.p>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white text-xl font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] disabled:transform-none backdrop-blur-sm"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t("contact.form.submitting")}</span>
                  </div>
                ) : (
                  t("contact.form.submit")
                )}
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};
