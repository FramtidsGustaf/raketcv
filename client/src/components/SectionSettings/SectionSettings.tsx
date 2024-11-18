import { ActionIcon, Menu, Text } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconDots,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { AddEducationModal } from "../sections/Education/AddEducationModal/AddEducationModal";
import { AddExperienceModal } from "../sections/Experience/AddExperienceModal/AddExperienceModal";
import { AddLanguageModal } from "../sections/Language/AddLanguageModal/AddLanguageModal";
import { sectionsStore } from "../../store/sections.store";
import { SectionNames } from "../../types";

interface SectionSettingsProps {
  sectionName: SectionNames;
}

export const SectionSettings = ({ sectionName }: SectionSettingsProps) => {
  const {
    moveSectionUp,
    moveSectionDown,
    removeAddedSection,
    isSectionFirst,
    isSectionLast,
  } = sectionsStore;

  const addModal = () => {
    switch (sectionName) {
      case "experience":
        return <AddExperienceModal />;
      case "education":
        return <AddEducationModal />;
      case "languages":
        return <AddLanguageModal />;
      default:
        return null;
    }
  };

  const openAddModal = () =>
    modals.open({
      title: `Lägg till ${addString()}`,
      children: addModal(),
      closeOnClickOutside: false,
    });

  const addString = () => {
    switch (sectionName) {
      case "experience":
        return "Arbetslivserfarenhet";
      case "education":
        return "Utbildning";
      case "languages":
        return "Språk";
      default:
        return "item";
    }
  };

  const handleRemoveSection = () =>
    modals.openConfirmModal({
      title: "Remove section",
      children: <Text>Är du säker på att du vill slänga den här?</Text>,
      labels: { confirm: "Släng", cancel: "Avbryt" },
      confirmProps: { color: "red" },
      onConfirm: () => removeAddedSection(sectionName),
    });

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon color="light" variant="subtle" size="xs" mb="xs">
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={openAddModal} leftSection={<IconPlus size={16} />}>
          Lägg till {addString()}
        </Menu.Item>

        <Menu.Divider />

        {isSectionFirst(sectionName) ? null : (
          <Menu.Item
            onClick={() => moveSectionUp(sectionName)}
            leftSection={<IconArrowUp size={16} />}
          >
            Flytta Upp
          </Menu.Item>
        )}

        {isSectionLast(sectionName) ? null : (
          <Menu.Item
            onClick={() => moveSectionDown(sectionName)}
            leftSection={<IconArrowDown size={16} />}
          >
            Flytta Ner
          </Menu.Item>
        )}

        <Menu.Divider />

        <Menu.Item
          color="red"
          onClick={handleRemoveSection}
          leftSection={<IconTrash size={16} />}
        >
          Släng
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
