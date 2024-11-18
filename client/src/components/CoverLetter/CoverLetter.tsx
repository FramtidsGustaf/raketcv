import { useState } from "react";
import { Button, Flex } from "@mantine/core";
import { TextEditor } from "../TextEditor/TextEditor";
import { modals } from "@mantine/modals";
import { AiModal } from "./AiModal";
import { useSignals } from "@preact/signals-react/runtime";

export const CoverLetter = () => {
  const [content, setContent] = useState("");

  useSignals();
  const handleOpenAiModal = () =>
    modals.open({
      title: "AI-Genererat Personligt Brev",
      children: <AiModal onContent={setContent} />,
      closeOnClickOutside: false,
    });

  return (
    <>
      {!content.length ? (
        <Flex justify="center" align="center" h="84svh">
          <Button onClick={handleOpenAiModal} size="xl">
            Generera med AI
          </Button>
        </Flex>
      ) : (
        <TextEditor content={content} />
      )}
    </>
  );
};
