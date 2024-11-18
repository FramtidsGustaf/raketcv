import { ActionIcon, Menu, Text } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconDots,
  IconSection,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { CVSaveModal } from "./CVSaveModal";
import { modals } from "@mantine/modals";
import { PersonalInformationModal } from "./PersonalInformationModal";
import { deleteCV, saveCV } from "../../db/cvQueries";
import { LoadedCVName } from "../../store/store";
import { notifications } from "@mantine/notifications";
import { CVDataToDB } from "../../utils/data";
import { sectionsStore } from "../../store/sections.store";
import { SectionNames } from "../../types";

interface Sec {
  sectionName: SectionNames;
  title: string;
}

const sections: Sec[] = [
  {
    sectionName: "experience",
    title: "Arbetslivserfarenhet",
  },
  {
    sectionName: "education",
    title: "Utbildningar",
  },
  {
    sectionName: "skill",
    title: "Kompetenser",
  },
  {
    sectionName: "languages",
    title: "Språk",
  },
];

export const CVCreatorMenu = () => {
  const [opened, { close, open }] = useDisclosure();
  const { addSection } = sectionsStore;

  const handleDelete = () => {
    modals.openConfirmModal({
      title: "Radera CV",
      children: "Är du säker på att du vill radera detta CV?",

      onConfirm: () => {
        if (!LoadedCVName.value.length) {
          notifications.show({
            color: "red",
            title: "Fel",
            message: "Inget CV att radera",
            position: "bottom-center",
          });
          return;
        }

        deleteCV(LoadedCVName.value);
      },

      labels: {
        cancel: "Avbryt",
        confirm: "Radera",
      },

      confirmProps: {
        color: "red",
      },
    });
  };

  const handleSave = () => {
    if (!LoadedCVName.value) {
      open();
      return;
    }
    modals.openConfirmModal({
      title: "Spara CV",
      children: (
        <>
          <Text>Är du säker på att du vill spara?</Text>
          <Text c="dimmed" fz="sm">
            Om du inte vill att ditt cv sparas på din enhet tryck på "Avbryt"
            för att stänga detta fönster.
          </Text>
        </>
      ),
      labels: {
        cancel: "Avbryt",
        confirm: "Spara",
      },

      onConfirm: () => {
        const cv = CVDataToDB();
        saveCV(LoadedCVName.value, cv);
      },
    });
  };

  const handleOpenPersonalInformation = () =>
    modals.open({
      title: "Redigera Personuppgifter",
      children: <PersonalInformationModal />,
    });

  return (
    <>
      <Menu closeOnItemClick={false}>
        <Menu.Target>
          <ActionIcon variant="subtle" color="light">
            <IconDots />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu position="left-start" closeOnItemClick={false}>
            <Menu.Target>
              <Menu.Item leftSection={<IconSection size={16} />}>
                Lägg till fält
              </Menu.Item>
            </Menu.Target>
            <Menu.Dropdown>
              {sections.map((section) => (
                <Menu.Item
                  key={section.sectionName}
                  onClick={() => {
                    addSection(section.sectionName);
                  }}
                >
                  {section.title}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>

          <Menu.Item
            onClick={handleOpenPersonalInformation}
            leftSection={<IconUser size={16} />}
          >
            Redigera Personuppgifter
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            onClick={open}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            Spara som
          </Menu.Item>

          <Menu.Item
            onClick={handleSave}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            Spara
          </Menu.Item>

          <Menu.Item
            onClick={handleDelete}
            color="red"
            leftSection={<IconTrash size={16} />}
          >
            Radera CV
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <CVSaveModal opened={opened} close={close} />
    </>
  );
};
