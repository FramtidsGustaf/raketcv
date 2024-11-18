import { Box, Center, Group, Stack, Text, Title } from "@mantine/core";
import { LoadedCVType } from "../../store/store";
import { TemplateWrapper } from "../TemplateWrapper/TemplateWrapper";

import classes from "./SecondTemplate.module.css";
import dayjs from "dayjs";

interface SecondTemplateProps {
  cv: LoadedCVType;
}

export const SecondTemplate = ({ cv }: SecondTemplateProps) => {
  return (
    <Center>
      <TemplateWrapper bg="#e8e6e9" px="xl" py="xl">
        <Box className={classes.box} bg="#c4cdd2" pl="lg" h="100" mt={60}>
          <Group gap={0} align="flex-end">
            <Text className={classes.title} fz="80" c="#e8e6e9">
              {cv.personalInfo.firstName[0]}
            </Text>

            <Text className={classes.title} fz="80" c="#e8e6e9">
              {cv.personalInfo.lastName[0]}
            </Text>
          </Group>

          <Stack gap={0} className={classes.name}>
            <Text fz="h2" c="black">
              {cv.personalInfo.firstName}
            </Text>
            <Text fz="h1" c="black">
              {cv.personalInfo.lastName}
            </Text>
          </Stack>
        </Box>

        <Group mt={100}>
          <Stack justify="flex-start" w="30%">
            <Title order={4} className={classes.text} c="black">
              Kontakt
            </Title>
            <Stack gap={0}>
              <Text c="dimmed" size="sm">
                {cv.personalInfo.email}
              </Text>
              <Text c="dimmed" size="sm">
                {cv.personalInfo.phone}
              </Text>
            </Stack>
          </Stack>

          <Stack className={classes.text} h="100%" w="67%" gap="">
            <Box>
              <Title mb="xs" order={4} className={classes.text} c="black">
                Erfarenhet
              </Title>
              {cv.experience.map((exp, index) => (
                <Stack mb="md" fw="bold" key={index} gap={0}>
                  <Text c="black" size="md" fw="bod">
                    {exp.position}
                  </Text>
                  <Group>
                    <Text c="black" size="sm">
                      {exp.company}
                    </Text>
                    <Text c="dimmed" size="xs">
                      {dayjs(exp.startDate).format("YYYY MMMM")} -{" "}
                      {dayjs(exp.endDate).format("YYYY MMMM")}
                    </Text>
                  </Group>
                  <Text c="dimmed" size="xs">
                    {exp.description}
                  </Text>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Group>
      </TemplateWrapper>
    </Center>
  );
};
