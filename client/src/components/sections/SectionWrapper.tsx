import { type HTMLAttributes } from "react";
import { Fieldset, Flex } from "@mantine/core";
import { SectionSettings } from "../SectionSettings/SectionSettings";
import type { SectionNames } from "../../types";

interface SectionWrapperProps extends HTMLAttributes<HTMLDivElement> {
  legend: string;
}

export const SectionWrapper = ({ children, legend }: SectionWrapperProps) => {
  const translatedLegend = () => {
    switch (legend.toLowerCase()) {
      case "experience":
        return "Arbetslivserfarenhet";
      case "education":
        return "Utbildning";
      case "languages":
        return "Språk";
      default:
        return "Section";
    }
  };

  return (
    <Fieldset pt={0} p="xs" legend={translatedLegend()}>
      <Flex justify="flex-end">
        <SectionSettings sectionName={legend.toLowerCase() as SectionNames} />
      </Flex>
      {children}
    </Fieldset>
  );
};
