import { useForm } from "@tanstack/react-form";
import { Education, EducationFormType } from "../../../../sections";
import { educationStore } from "../../../../store/education.store";
import { modals } from "@mantine/modals";
import { EducationForm } from "../EducationForm";

interface EditEducationModalProps {
  id: string;
}

export const EditEducationModal = ({ id }: EditEducationModalProps) => {
  const { editEducation, getEducation } = educationStore;

  const education = getEducation(id);

  if (!education) return null;

  const form = useForm<EducationFormType>({
    defaultValues: {
      school: education.school,
      location: education.location,
      degree: education.degree,
      startDate: new Date(education.startDate),
      endDate: new Date(education.endDate),
      description: education.description,
    },

    onSubmit: (values) => {
      editEducation(id, new Education(values.value));
      modals.closeAll();
    },
  });

  return <EducationForm form={form} />;
};
