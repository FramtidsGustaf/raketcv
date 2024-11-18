import { Group, Stack, Title, Text } from "@mantine/core";
import { personalInfoStore } from "../../store/personalInfo.store";
import { IconAt, IconPhone } from "@tabler/icons-react";
import { useSignals } from "@preact/signals-react/runtime";

export const PersonalInformation = () => {
  useSignals();
  return (
    <Group justify="space-between" align="flex-start">
      <Stack gap={0}>
        <Title order={2}>{personalInfoStore.getFullName()}</Title>
        <Title order={4}>{personalInfoStore.workTitle}</Title>
      </Stack>

      {personalInfoStore.phone ? (
        <Group>
          <Group gap={6}>
            <IconPhone size="16" />
            <Text fz="sm">{personalInfoStore.phone}</Text>
          </Group>
          <Group gap={6}>
            <IconAt size="16" />
            <Text fz="sm">{personalInfoStore.email}</Text>
          </Group>
        </Group>
      ) : null}
    </Group>
  );
};
