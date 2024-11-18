import { Container, Fieldset, SimpleGrid } from "@mantine/core";
import { useLoaderData } from "@tanstack/react-router";
import { SavedItemCard } from "./SavedItemCard";

export const SavedPage = () => {
  const { cvs, coverLetters } = useLoaderData({ from: "/saved/" });

  return (
    <Container fluid>
      <Fieldset legend="Sparade CV:n" bg="transparent">
        <SimpleGrid cols={5}>
          {cvs.map((cv) => (
            <SavedItemCard key={cv.name} item={cv} type="cv" />
          ))}
        </SimpleGrid>
      </Fieldset>

      <Fieldset mt="lg" legend="Sparade personliga brev" bg="transparent">
        <SimpleGrid cols={5}>
          {coverLetters.map((coverLetter) => (
            <SavedItemCard
              key={coverLetter.name}
              item={coverLetter}
              type="coverLetter"
            />
          ))}
        </SimpleGrid>
      </Fieldset>
    </Container>
  );
};
