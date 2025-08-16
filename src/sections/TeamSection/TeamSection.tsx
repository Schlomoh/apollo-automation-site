import React from "react";
import { Badge } from "../../components/ui/badge";
import { useTranslation } from "../../lib/useTranslation";

export const TeamSection = () => {
  const { t } = useTranslation();

  // Create a data array for toolkit features to enable mapping
  const toolkitFeatures = [
    t("technologies.specialties.0"),
    t("technologies.specialties.1"),
    t("technologies.specialties.2"),
    t("technologies.specialties.3"),
    t("technologies.specialties.4"),
    t("technologies.specialties.5"),
    t("technologies.specialties.6"),
  ];

  return (
    <section className="relative w-full rounded-b-[5rem] shadow-[0px_16px_16px_#00000040] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(0deg,rgba(49,133,252,1)_0%,rgba(49,133,252,1)_100%)] p-16 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-8 px-16 py-0 w-full">
        <h2 className="font-page-title font-[number:var(--page-title-font-weight)] text-white text-[length:var(--page-title-font-size)] tracking-[var(--page-title-letter-spacing)] leading-[var(--page-title-line-height)] [font-style:var(--page-title-font-style)]">
          {t("team.toolkitTitle")}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          {toolkitFeatures.map((feature, index) => (
            <Badge
              key={index}
              variant="outline"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-transparent border-none"
            >
              <span className="italic text-base leading-[22.4px] [font-family:'Inter',Helvetica] font-normal text-white">
                ✓
              </span>
              <span className="[font-family:'Inter',Helvetica] font-normal italic text-white text-base leading-[22.4px]">
                {feature}
              </span>
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};
