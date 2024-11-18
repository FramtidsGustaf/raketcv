import { useForm } from "@tanstack/react-form";
import { LanguageFormType } from "../../../sections";
import { Stack, TextInput, Select, Space, Button } from "@mantine/core";
import { LanguageLevel } from "../../../types";

interface LanguageFormProps {
  form: ReturnType<typeof useForm<LanguageFormType>>;
}

export const LanguageForm = ({ form }: LanguageFormProps) => {
  const { Field, Subscribe } = form;

  const levelSelectData = [
    {
      value: LanguageLevel.Beginner,
      label: "Nybörjare",
    },
    {
      value: LanguageLevel.Intermediate,
      label: "Medel",
    },
    {
      value: LanguageLevel.Advanced,
      label: "Avancerad",
    },
    {
      value: LanguageLevel.Native,
      label: "Modersmål",
    },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Stack gap="xs">
        <Field name="language">
          {(field) => (
            <TextInput
              label="Språk"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </Field>

        <Field name="level">
          {(field) => (
            <Select
              data={levelSelectData}
              label="Nivå"
              value={field.state.value}
              onChange={(value) => field.handleChange(value as LanguageLevel)}
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
