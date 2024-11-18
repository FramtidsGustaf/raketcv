import { Stack } from "@mantine/core";
import { ExperienceItem } from "./ExperienceItem";
import { experienceStore } from "../../../store/experience.store";
import { useSignals } from "@preact/signals-react/runtime";
import { SectionWrapper } from "../SectionWrapper";

export const ExperienceSection = () => {
  useSignals();
  const { experiences } = experienceStore;

  return (
    <SectionWrapper legend="Experience">
      <Stack gap="xs">
        {experiences.map((experience, i) => (
          <ExperienceItem key={i} experience={experience} />
        ))}
      </Stack>
    </SectionWrapper>
  );
};
