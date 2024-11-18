import {
  Button,
  Textarea,
  Text,
  Stack,
  Center,
  Loader,
  Space,
  Select,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import { getAllCVNames, getCV } from "../../db/cvQueries";

interface AiModalProps {
  onContent: (content: string) => void;
}

export const AiModal = ({ onContent }: AiModalProps) => {
  const [selectData, setSelectData] = useState<string[]>([]);
  const [jobAd, setJobAd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [cvName, setCvName] = useState("");

  const getData = async () => {
    const data = await getAllCVNames();
    setSelectData(data as string[]);
  };

  const handleGenerate = async () => {
    setError([]);

    if (!cvName) {
      setError((prev) => [...prev, "Välj ett CV."]);
      return;
    }

    if (!jobAd) {
      setError((prev) => [...prev, "Fyll i platsannons."]);
      return;
    }

    setIsLoading(true);

    const cv = await getCV(cvName);

    if (!cv) {
      setError((prev) => [...prev, "Kunde inte hitta CV."]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cv, jobAd }),
      });

      const data = await response.json();

      setIsLoading(false);

      onContent(data.coverLetter);

      modals.closeAll();
    } catch (error) {
      console.error("Error:", error);
      setError((prev) => [...prev, "Något gick fel, försök igen senare."]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {error
        ? error.map((err, i) => (
            <Text key={i} c="red" mb="xs" fz="sm" px="xs">
              {err}
            </Text>
          ))
        : null}
      {isLoading ? (
        <Center>
          <Stack gap="sm">
            <Text fz="sm" px="xs">
              Genererar brev...
            </Text>
            <Center>
              <Loader color="white" />
            </Center>
          </Stack>
          <Space h="xl" />
        </Center>
      ) : (
        <Stack>
          <Text fz="sm" px="xs">
            Genom att klistra in en platsannons här kommer AI att generera ett
            första utkast på ditt personliga brev baserat på
            anställningsannonsen och ditt CV.
          </Text>

          <Textarea
            label="Platsannons"
            placeholder="Kopiera och klistra in platsannonsen här"
            autosize
            minRows={6}
            maxRows={12}
            value={jobAd}
            onChange={(e) => setJobAd(e.currentTarget.value)}
          />

          <Select
            data={selectData}
            label="CV"
            description="Välj vilket CV du vill använda"
            allowDeselect
            value={cvName}
            onChange={(value) => setCvName(value || "")}
          />

          <Button mt="xs" mb="xs" onClick={handleGenerate} bg="white" c="dark">
            Generera
          </Button>
        </Stack>
      )}
    </>
  );
};
