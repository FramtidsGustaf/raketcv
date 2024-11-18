import { useForm } from "@tanstack/react-form";
import { Language, type LanguageFormType } from "../../../../sections";
import { languageStore } from "../../../../store/language.store";
import { LanguageForm } from "../LanguageForm";
import { modals } from "@mantine/modals";

interface AddLanguageModalProps {
  id: string;
}

export const EditLanguageModal = ({ id }: AddLanguageModalProps) => {
  const { editLanguage, getLanguage } = languageStore;

  const language = getLanguage(id);

  if (!language) return null;

  const form = useForm<LanguageFormType>({
    defaultValues: {
      language: language.language,
      level: language.level,
    },
    onSubmit: (values) => {
      editLanguage(id, new Language(values.value));
      modals.closeAll();
    },
  });

  return <LanguageForm form={form} />;
};
