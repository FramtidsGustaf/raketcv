import { Group, Title, Text, Space } from "@mantine/core";
import { Experience } from "../../../sections/Experience";

import { formatDate } from "../../../utils/formatDate";
import { Item } from "../../Item/Item";

export const ExperienceItem = ({ experience }: { experience: Experience }) => {
  return (
    <Item sectionName="experience" id={experience.id}>
      <Group justify="space-between">
        <Group>
          <Title order={5}>{experience.company}</Title>

          <Text c="dimmed" fz="sm">
            {experience.location}
          </Text>
        </Group>

        <Text fz="sm">
          {formatDate(experience.startDate, experience.endDate as Date)}
        </Text>
      </Group>

      <Text c="dimmed" fz="sm">
        {experience.position}
      </Text>

      <Space h="xs" />

      <Text fz="sm">{experience.description}</Text>
    </Item>
  );
};
