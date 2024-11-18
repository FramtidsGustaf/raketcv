import { RichTextEditor } from "@mantine/tiptap";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { saveCoverLetter } from "../../db/coverLetterQueries";

import { coverLetterStore } from "../../store/coverLetter.store";
import { useDisclosure } from "@mantine/hooks";
import { SaveCoverLetterModal } from "./SaveCoverLetterModal";
import { useSignals } from "@preact/signals-react/runtime";

interface TextEditorProps {
  content: string;
}

export const TextEditor = ({ content }: TextEditorProps) => {
  useSignals();
  const [opened, { close, open }] = useDisclosure();

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: "Skriv ditt personliga brev här eller generera med AI",
      }),
    ],
    content: content,
  });

  if (!editor) return null;

  //TODO Create a modal with an input field for the user to name the cover letter
  const handleSave = async () => {
    if (!coverLetterStore.coverLetter.name) {
      open();
      return;
    }

    if (!editor) return;

    const json = editor.getJSON().content;
    const html = editor.getHTML();

    await saveCoverLetter(
      coverLetterStore.coverLetter.name,
      html,
      JSON.stringify(json)
    );
  };

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.Control
            onClick={handleSave}
            aria-label="Spara Personligt Brev"
          >
            <IconDeviceFloppy size="1rem" />
          </RichTextEditor.Control>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content mih="500px" />
      </RichTextEditor>
      <SaveCoverLetterModal opened={opened} close={close} editor={editor} />
    </>
  );
};
