import { SimpleGrid } from "@mantine/core";
import { LanguageItem } from "./LanguageItem";
import { languageStore } from "../../../store/language.store";
import { useSignals } from "@preact/signals-react/runtime";
import { SectionWrapper } from "../SectionWrapper";

export const LanguageSection = () => {
  useSignals();
  const { languages } = languageStore;

  return (
    <SectionWrapper legend="Languages">
      <SimpleGrid cols={4}>
        {languages.map((education) => (
          <LanguageItem key={education.id} language={education} />
        ))}
      </SimpleGrid>
    </SectionWrapper>
  );
};
