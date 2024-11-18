import { useForm } from "@tanstack/react-form";
import {
  PersonalInfo,
  personalInfoStore,
} from "../../store/personalInfo.store";
import { Button, Space, Stack, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";

export const PersonalInformationModal = () => {
  const form = useForm<PersonalInfo>({
    defaultValues: {
      firstName: personalInfoStore.firstName || "",
      lastName: personalInfoStore.lastName || "",
      workTitle: personalInfoStore.workTitle || "",
      email: personalInfoStore.email || "",
      phone: personalInfoStore.phone || "",
    },

    onSubmit: (values) => {
      personalInfoStore.setPersonalInfo(values.value);
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
        <Field name="firstName">
          {(field) => (
            <TextInput
              label="Förnamn"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </Field>

        <Field name="lastName">
          {(field) => (
            <TextInput
              label="Efternamn"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </Field>

        <Field name="workTitle">
          {(field) => (
            <TextInput
              label="Arbetstitel"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </Field>

        <Field name="email">
          {(field) => (
            <TextInput
              label="Email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </Field>

        <Field name="phone">
          {(field) => (
            <TextInput
              label="Telefon"
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
            Spara
          </Button>
        )}
      </Subscribe>
    </form>
  );
};
