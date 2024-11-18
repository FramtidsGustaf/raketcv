import { useForm } from "@tanstack/react-form";
import { EducationFormType } from "../../../sections";
import {
  Stack,
  TextInput,
  Group,
  Textarea,
  Space,
  Button,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

interface EducationFormProps {
  form: ReturnType<typeof useForm<EducationFormType>>;
}

export const EducationForm = ({ form }: EducationFormProps) => {
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
        <Field name="school">
          {(field) => (
            <TextInput
              variant="filled"
              label="Skola"
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

        <Field name="degree">
          {(field) => (
            <TextInput
              label="Examen"
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
                value={field.state.value}
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
            Lägg till
          </Button>
        )}
      </Subscribe>
    </form>
  );
};
