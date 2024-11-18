import { useState } from "react";
import { Button, Group, Modal, Stack, TextInput, Text } from "@mantine/core";
import { Editor } from "@tiptap/react";
import { saveAsCoverLetter } from "../../db/coverLetterQueries";

interface SaveCoverLetterModalProps {
  opened: boolean;
  close: () => void;
  editor: Editor;
}

export const SaveCoverLetterModal = ({
  opened,
  close,
  editor,
}: SaveCoverLetterModalProps) => {
  const [name, setName] = useState("");

  const handleSave = async () => {
    if (!name.length) return;

    const json = editor.getJSON().content;
    const html = editor.getHTML();

    saveAsCoverLetter(name, html, JSON.stringify(json));
    close();
  };

  return (
    <Modal opened={opened} onClose={close}>
      <Stack>
        <Text>
          Ditt personliga brev kommer att sparas på din enhet. Ange ett namn för
          att spara.
        </Text>

        <Text c="dimmed" fz="sm">
          Om du inte vill att ditt personliga brev sparas på din enhet tryck på
          "Avbryt" för att stänga detta fönster.
        </Text>

        <TextInput
          label="Namn"
          onChange={(e) => setName(e.target.value)}
          placeholder="Namnet på ditt personliga brev"
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
