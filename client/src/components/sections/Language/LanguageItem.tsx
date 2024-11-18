import { Group, Text } from "@mantine/core";

import { Language } from "../../../sections/Language";
import { Item } from "../../Item/Item";

export const LanguageItem = ({ language }: { language: Language }) => {
  const translateLevel = () => {
    switch (language.level) {
      case "Beginner":
        return "Nybörjare";
      case "Intermediate":
        return "Medel";
      case "Advanced":
        return "Avancerad";
      case "Native":
        return "Modersmål";
      default:
        return language.level;
    }
  };

  return (
    <Item sectionName="language" id={language.id}>
      <Group gap="xs" align="flex-end" justify="space-between">
        <Text fz="md" fw="bold">
          {language.language}
        </Text>

        <Text fz="sm">{translateLevel()}</Text>
      </Group>
    </Item>
  );
};
