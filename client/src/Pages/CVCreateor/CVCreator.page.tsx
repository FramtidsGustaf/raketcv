import { Box, Container, Flex, Space } from "@mantine/core";

import { Sections } from "../../components/sections/Sections";
import { PersonalInformation } from "../../components/PersonalInformation/PersonalInformation";
import { CVCreatorMenu } from "./CVCreator.menu";

export const CVCreatorPage = () => {
  return (
    <Container mt="sm">
      <Flex justify="flex-end">
        <CVCreatorMenu />
      </Flex>
      <Box>
        <PersonalInformation />

        <Space h="lg" />

        <Sections />

        <Space h="lg" />
      </Box>
    </Container>
  );
};
