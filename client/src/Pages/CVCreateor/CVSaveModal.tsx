import { TextInput, Text, Button, Group, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { saveAsCV } from "../../db/cvQueries";
import { CVDataToDB } from "../../utils/data";

interface CVSaveModalProps {
  opened: boolean;
  close: () => void;
}

//Since modals manager does not support dynamic content, we need to create a separate component for the modal content
export const CVSaveModal = ({ opened, close }: CVSaveModalProps) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    const cv = CVDataToDB();
    saveAsCV(name, cv);
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="Spara CV">
      <Stack>
        <Text>
          Ditt cv kommer att sparas på din enhet. Ange ett namn för att spara.
        </Text>

        <Text c="dimmed" fz="sm">
          Om du inte vill att ditt cv sparas på din enhet tryck på "Avbryt" för
          att stänga detta fönster.
        </Text>

        <TextInput
          label="Namn"
          onChange={(e) => setName(e.target.value)}
          placeholder="Namnet på ditt CV"
        />

        <Group justify="flex-end">
          <Button onClick={close} color="gray">
            Avbryt
          </Button>

          <Button onClick={handleSave} disabled={!name.length}>
            Spara
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
