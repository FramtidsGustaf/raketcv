import { useForm } from "@tanstack/react-form";
import { Experience, type ExperienceFormType } from "../../../../sections";
import { modals } from "@mantine/modals";
import {
  Button,
  Group,
  Space,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { experienceStore } from "../../../../store/experience.store";

interface EditExperienceModalProps {
  id: string;
}

export const EditExperienceModal = ({ id }: EditExperienceModalProps) => {
  const { editExperience, getExperience } = experienceStore;

  const experience = getExperience(id);

  if (!experience) return null;

  const form = useForm<ExperienceFormType>({
    defaultValues: {
      company: experience.company,
      location: experience.location,
      position: experience.position,
      startDate: new Date(experience.startDate),
      endDate: new Date(experience.endDate),
      description: experience.description,
    },

    onSubmit: (values) => {
      editExperience(id, new Experience(values.value));
      modals.closeAll();
    },
  });

  const { Field, Subscribe } = form;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Stack gap="xs">
        <Field name="company">
          {(field) => (
            <TextInput
              label="Företag"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </Field>

        <Field name="location">
          {(field) => (
            <TextInput
              label="Plats"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </Field>

        <Field name="position">
          {(field) => (
            <TextInput
              label="Titel"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </Field>

        <Group grow>
          <Field name="startDate">
            {(field) => (
              <MonthPickerInput
                label="Startdatum"
                value={field.state.value}
                onChange={(value) => field.handleChange(value as Date)}
              />
            )}
          </Field>

          <Field name="endDate">
            {(field) => (
              <MonthPickerInput
                label="Slutdatum"
                value={field.state.value as Date}
                onChange={(value) => field.handleChange(value as Date)}
              />
            )}
          </Field>
        </Group>

        <Field name="description">
          {(field) => (
            <Textarea
              label="Beskrivning"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </Field>
      </Stack>

      <Space h="md" />

      <Subscribe selector={(state) => [state.canSubmit, state.isDirty]}>
        {([canSubmit, isDirty]) => (
          <Button type="submit" disabled={!canSubmit || !isDirty}>
            Spara Ändringar
          </Button>
        )}
      </Subscribe>
    </form>
  );
};
