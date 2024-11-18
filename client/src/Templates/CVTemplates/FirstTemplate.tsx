import {
  Center,
  Group,
  Title,
  Text,
  Stack,
  Fieldset,
  SimpleGrid,
} from "@mantine/core";
import { LoadedCVType } from "../../store/store";
import dayjs from "dayjs";
import { TemplateWrapper } from "../TemplateWrapper/TemplateWrapper";

interface FirstTemplateProps {
  cv: LoadedCVType;
}

export const FirstTemplate = ({ cv }: FirstTemplateProps) => {
  return (
    <Center>
      <TemplateWrapper bg="white" py="xl" px="md">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title c="black" order={2}>
              {cv.personalInfo.firstName} {cv.personalInfo.lastName}
            </Title>

            <Title c="dimmed" order={4}>
              {cv.personalInfo.workTitle}
            </Title>
          </Stack>
          <Stack gap={0} align="flex-end">
            <Text c="black" size="sm">
              {cv.personalInfo.email}
            </Text>

            <Text c="black" size="sm">
              {cv.personalInfo.phone}
            </Text>
          </Stack>
        </Group>
        <Stack gap="xs" mt="xs">
          <Fieldset legend="Erfarenhet" c="black" bg="white">
            <Stack gap="xs">
              {cv.experience.map((exp, index) => (
                <Fieldset key={index} bg="white" py="xs" px="xs">
                  <Stack key={index} gap="xs">
                    <Group justify="space-between">
                      <Group gap="xs">
                        <Text c="black" size="md" fw="bold">
                          {exp.company}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {dayjs(exp.startDate).format("YYYY-MMMM")} -{" "}
                          {dayjs(exp.endDate).format("YYYY-MMMM")}
                        </Text>
                      </Group>
                      <Text c="black" size="sm">
                        {exp.position}
                      </Text>
                    </Group>
                    <Text c="black" size="xs">
                      {exp.description}
                    </Text>
                  </Stack>
                </Fieldset>
              ))}
            </Stack>
          </Fieldset>

          <Fieldset legend="Utbildning" c="black" bg="white">
            <Stack gap="xs">
              {cv.education.map((edu, index) => (
                <Fieldset key={index} bg="white" py="xs" px="xs">
                  <Stack key={index} gap="xs">
                    <Group justify="space-between">
                      <Group gap="xs">
                        <Text c="black" size="md" fw="bold">
                          {edu.school}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {dayjs(edu.startDate).format("YYYY-MMMM")} -{" "}
                          {dayjs(edu.endDate).format("YYYY-MMMM")}
                        </Text>
                      </Group>
                      <Text c="black" size="sm">
                        {edu.degree}
                      </Text>
                    </Group>
                    <Text c="black" size="xs">
                      {edu.description}
                    </Text>
                  </Stack>
                </Fieldset>
              ))}
            </Stack>
          </Fieldset>

          <Fieldset legend="Språk" c="black" bg="white">
            <SimpleGrid cols={3}>
              {cv.languages.map((lang, index) => (
                <Fieldset key={index} bg="white" py="xs" px="xs">
                  <Group justify="space-between">
                    <Group gap="xs">
                      <Text c="black" size="md" fw="bold">
                        {lang.language}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {lang.level}
                      </Text>
                    </Group>
                  </Group>
                </Fieldset>
              ))}
            </SimpleGrid>
          </Fieldset>
        </Stack>
      </TemplateWrapper>
    </Center>
  );
};
