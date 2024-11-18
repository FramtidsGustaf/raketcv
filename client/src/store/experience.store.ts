import { DeepSignal, deepSignal } from "deepsignal";
import { Experience } from "../sections";
import { getValues } from "../utils/getValues";

interface ExperienceStore {
  experiences: Experience[];
  addExperience(experience: Experience): void;
  getExperience(id: string): Experience | undefined;
  removeExperience(id: string): void;
  editExperience(id: string, experience: Experience): void;
  moveUp(id: string): void;
  moveDown(id: string): void;
  reset(): void;
  experiencesValue: Experience[];
  setExperiences(experiences: Experience[]): void;
}

export const experienceStore: DeepSignal<ExperienceStore> =
  deepSignal<ExperienceStore>({
    experiences: [],

    setExperiences(experiences: Experience[]) {
      experienceStore.experiences = experiences;
    },

    addExperience(experience) {
      experienceStore.experiences.push(experience);
    },

    getExperience(id: string) {
      return experienceStore.experiences.find(
        (experience) => experience.id === id
      );
    },

    get experiencesValue() {
      return getValues(experienceStore.experiences);
    },

    removeExperience(id: string) {
      experienceStore.experiences = experienceStore.experiences.filter(
        (experience) => experience.id !== id
      );
    },

    editExperience(id: string, experience: Experience) {
      const index = experienceStore.experiences.findIndex((e) => e.id === id);
      experienceStore.experiences[index] = experience;
    },

    moveUp(id: string) {
      const index = experienceStore.experiences.findIndex((e) => e.id === id);
      if (index === 0) return;
      const [removed] = experienceStore.experiences.splice(index, 1);
      experienceStore.experiences.splice(index - 1, 0, removed);
    },

    moveDown(id: string) {
      const index = experienceStore.experiences.findIndex((e) => e.id === id);
      if (index === experienceStore.experiences.length - 1) return;
      const [removed] = experienceStore.experiences.splice(index, 1);
      experienceStore.experiences.splice(index + 1, 0, removed);
    },

    reset() {
      experienceStore.experiences = [];
    },
  });
