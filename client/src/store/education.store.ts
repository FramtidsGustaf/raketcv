import { type DeepSignal, deepSignal } from "deepsignal";
import { type Education } from "../sections";
import { getValues } from "../utils/getValues";

interface EducationStore {
  educations: Education[];
  addEducation(education: Education): void;
  getEducation(id: string): Education | undefined;
  removeEducation(id: string): void;
  editEducation(id: string, education: Education): void;
  moveUp(id: string): void;
  moveDown(id: string): void;
  reset(): void;
  educationsValue: Education[];
  setEducations(educations: Education[]): void;
}

export const educationStore: DeepSignal<EducationStore> =
  deepSignal<EducationStore>({
    educations: [],

    addEducation(education) {
      educationStore.educations.push(education);
    },

    setEducations(educations: Education[]) {
      educationStore.educations = educations;
    },

    getEducation(id: string) {
      return educationStore.educations.find((education) => education.id === id);
    },

    get educationsValue() {
      return getValues(educationStore.educations);
    },

    removeEducation(id: string) {
      educationStore.educations = educationStore.educations.filter(
        (education) => education.id !== id
      );
    },

    editEducation(id: string, education: Education) {
      const index = educationStore.educations.findIndex((e) => e.id === id);
      educationStore.educations[index] = education;
    },

    moveUp(id: string) {
      const index = educationStore.educations.findIndex((e) => e.id === id);
      if (index === 0) return;
      const [removed] = educationStore.educations.splice(index, 1);
      educationStore.educations.splice(index - 1, 0, removed);
    },

    moveDown(id: string) {
      const index = educationStore.educations.findIndex((e) => e.id === id);
      if (index === educationStore.educations.length - 1) return;
      const [removed] = educationStore.educations.splice(index, 1);
      educationStore.educations.splice(index + 1, 0, removed);
    },

    reset() {
      educationStore.educations = [];
    },
  });
