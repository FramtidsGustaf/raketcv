import { useForm } from "@tanstack/react-form";
import { Language, type LanguageFormType } from "../../../../sections";
import { LanguageLevel } from "../../../../types";
import { languageStore } from "../../../../store/language.store";
import { LanguageForm } from "../LanguageForm";
import { modals } from "@mantine/modals";

export const AddLanguageModal = () => {
  const { addLanguage } = languageStore;

  const form = useForm<LanguageFormType>({
    defaultValues: {
      language: "",
      level: LanguageLevel.Beginner,
    },
    onSubmit: (values) => {
      addLanguage(new Language(values.value));
      modals.closeAll();
    },
  });

  return <LanguageForm form={form} />;
};
