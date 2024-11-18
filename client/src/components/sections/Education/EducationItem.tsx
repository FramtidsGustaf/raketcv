import { Group, Space, Text, Title } from "@mantine/core";
import { Education } from "../../../sections/Education";

import { formatDate } from "../../../utils/formatDate";
import { Item } from "../../Item/Item";

export const EducationItem = ({ education }: { education: Education }) => {
  return (
    <Item sectionName="education" id={education.id}>
      <Group justify="space-between">
        <Group>
          <Title order={5}>{education.school}</Title>

          <Text c="dimmed" fz="sm">
            {education.degree}
          </Text>
        </Group>

        <Text fz="sm">
          {formatDate(education.startDate, education.endDate as Date)}
        </Text>
      </Group>

      <Space h="xs" />

      <Text fz="sm">{education.description}</Text>
    </Item>
  );
};
