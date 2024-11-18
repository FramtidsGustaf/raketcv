import { Stack } from "@mantine/core";
import { EducationItem } from "./EducationItem";
import { useSignals } from "@preact/signals-react/runtime";

import { educationStore } from "../../../store/education.store";
import { SectionWrapper } from "../SectionWrapper";

export const EducationSection = () => {
  useSignals();
  const { educations } = educationStore;

  return (
    <SectionWrapper legend="Education">
      <Stack gap="xs">
        {educations.map((education) => (
          <EducationItem key={education.school} education={education} />
        ))}
      </Stack>
    </SectionWrapper>
  );
};
