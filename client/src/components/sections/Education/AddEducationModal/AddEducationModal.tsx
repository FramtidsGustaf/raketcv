import { useForm } from "@tanstack/react-form";
import { Education, type EducationFormType } from "../../../../sections";
import { modals } from "@mantine/modals";
import { educationStore } from "../../../../store/education.store";
import { EducationForm } from "../EducationForm";

export const AddEducationModal = () => {
  const { addEducation } = educationStore;

  const form = useForm<EducationFormType>({
    defaultValues: {
      school: "",
      degree: "",
      location: "",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
    },
    onSubmit: (values) => {
      addEducation(new Education(values.value));
      modals.closeAll();
    },
  });

  return <EducationForm form={form} />;
};
