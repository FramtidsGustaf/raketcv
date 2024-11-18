import {
  Card,
  Group,
  Menu,
  ActionIcon,
  Space,
  Button,
  Text,
} from "@mantine/core";
import { IconDots, IconFileExport, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import type { SavedCoverLetterData, SavedCVData } from "../../db/types";
import { deleteCV, getCV } from "../../db/cvQueries";
import { populateCV } from "../../store/store";
import { useNavigate } from "@tanstack/react-router";
import { deleteCoverLetter, getCoverLetter } from "../../db/coverLetterQueries";
import { coverLetterStore } from "../../store/coverLetter.store";
import { modals } from "@mantine/modals";

interface SavedItemCardProps {
  item: SavedCVData | SavedCoverLetterData;
  type: "cv" | "coverLetter";
}

export const SavedItemCard = ({ item, type }: SavedItemCardProps) => {
  const navigate = useNavigate();

  const handleOpen = async () => {
    switch (type) {
      case "cv":
        const wholeCV = await getCV(item.name);
        if (!wholeCV) return;

        populateCV(wholeCV);

        navigate({
          to: "/cv-creator",
        });
        break;

      case "coverLetter":
        const wholeCoverLetter = await getCoverLetter(item.name);

        if (!wholeCoverLetter) return;

        coverLetterStore.setCoverLetter({
          ...wholeCoverLetter,
          name: wholeCoverLetter.name,
        });

        navigate({
          to: "/cover-letter-creator",
        });
    }
  };

  const handleExport = async () => {
    switch (type) {
      case "cv":
        const wholeCV = await getCV(item.name);

        if (!wholeCV) return;

        populateCV(wholeCV);

        navigate({
          to: "/cv-templates",
        });

        break;

      case "coverLetter":
        break;
    }
  };

  const handleDelete = () => {
    const handleConfirm = () => {
      switch (type) {
        case "cv":
          deleteCV(item.name);
          break;

        case "coverLetter":
          deleteCoverLetter(item.name);
          break;
      }
    };

    modals.openConfirmModal({
      title: "Är du säker?",
      children: (
        <Text>
          Är du säker på att du vill radera detta{" "}
          {type === "cv" ? "CV" : "Personligt Brev"}?
        </Text>
      ),
      onConfirm: handleConfirm,
      labels: {
        cancel: "Avbryt",
        confirm: "Radera",
      },
    });

    navigate({
      to: "/saved",
    });
  };

  return (
    <Card key={item.name}>
      <Group justify="space-between">
        <Text fz="xl">{item.name}</Text>
        <Menu shadow="md" position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" size="sm">
              <IconDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={handleExport}
              leftSection={<IconFileExport size={16} />}
            >
              Exportera
            </Menu.Item>

            <Menu.Item
              onClick={handleDelete}
              leftSection={<IconTrash size={16} />}
              color="red"
            >
              Radera
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Space h="sm" />

      <Group>
        <Text fz="sm">Skapad</Text>
        <Text fz="sm" c="dimmed">
          {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
        </Text>
      </Group>

      <Space h="sm" />

      <Button onClick={handleOpen} fullWidth>
        Öppna
      </Button>
    </Card>
  );
};
