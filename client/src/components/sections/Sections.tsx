import { EducationSection } from "./Education/EducationSection";
import { ExperienceSection } from "./Experience/ExperienceSection";
import { LanguageSection } from "./Language/LanguageSection";
import { sectionsStore } from "../../store/sections.store";
import { useSignals } from "@preact/signals-react/runtime";
import { Stack } from "@mantine/core";

export const Sections = () => {
  useSignals();
  const { addedSections } = sectionsStore;

  const renderRightSection = (section: string) => {
    switch (section) {
      case "experience":
        return <ExperienceSection />;
      case "education":
        return <EducationSection />;
      case "languages":
        return <LanguageSection />;
      default:
        return null;
    }
  };

  return (
    <Stack>
      {addedSections.map((section: string) => (
        <div key={section}>{renderRightSection(section)}</div>
      ))}
    </Stack>
  );
};
