import { ActionIcon, Menu, Text } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconDots,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { EditExperienceModal } from "../sections/Experience/EditExperienceModal/EditExperienceModal";
import { modals } from "@mantine/modals";
import { experienceStore } from "../../store/experience.store";
import { educationStore } from "../../store/education.store";
import { languageStore } from "../../store/language.store";
import { EditEducationModal } from "../sections/Education/EditEducationModal/EditEducationModal";
import { EditLanguageModal } from "../sections/Language/EditLanguageModal/EditLanguageModal";

interface ItemSettingsProps {
  sectionName: string;
  id: string;
}

export const ItemSettings = ({ sectionName, id }: ItemSettingsProps) => {
  const {
    removeExperience,
    moveUp: moveExperienceUp,
    moveDown: moveExperienceDown,
  } = experienceStore;
  const {
    removeEducation,
    moveUp: moveEducationUp,
    moveDown: moveEducationDown,
  } = educationStore;
  const { removeLanguage } = languageStore;

  const editModal = () => {
    switch (sectionName) {
      case "experience":
        return <EditExperienceModal id={id} />;
      case "education":
        return <EditEducationModal id={id} />;
      case "language":
        return <EditLanguageModal id={id} />;
      default:
        return null;
    }
  };

  const openEditModal = () =>
    modals.open({
      title: `Edit ${sectionName}`,
      children: editModal(),
      closeOnClickOutside: false,
    });

  const handleMoveDown = () => {
    switch (sectionName) {
      case "experience":
        moveExperienceDown(id);
        break;
      case "education":
        moveEducationDown(id);
        break;
    }
  };

  const handleMoveUp = () => {
    switch (sectionName) {
      case "experience":
        moveExperienceUp(id);
        break;
      case "education":
        moveEducationUp(id);
        break;
    }
  };

  const handleRemove = () =>
    modals.openConfirmModal({
      title: "Remove item",
      children: <Text>"Are you sure that you want to remove this item?"</Text>,
      labels: { confirm: "Remove", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        switch (sectionName) {
          case "experience":
            removeExperience(id);
            break;
          case "education":
            removeEducation(id);
            break;
          case "language":
            removeLanguage(id);
            break;
          default:
            break;
        }
      },
    });

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon size="xs" variant="subtle" color="dark">
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={openEditModal}
          leftSection={<IconPencil size={16} />}
        >
          Redigera
        </Menu.Item>


        {sectionName === "language" ? null : (
          <>
          <Menu.Divider />
            <Menu.Item
              onClick={handleMoveUp}
              leftSection={<IconArrowUp size={16} />}
            >
              Flytta upp
            </Menu.Item>
            <Menu.Item
              onClick={handleMoveDown}
              leftSection={<IconArrowDown size={16} />}
            >
              Flytta ner
            </Menu.Item>
          </>
        )}

        <Menu.Divider />

        <Menu.Item
          onClick={handleRemove}
          color="red"
          leftSection={<IconTrash size={16} />}
        >
          Radera
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
