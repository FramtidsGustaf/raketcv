import type { CVDataType } from "../db/types";
import { educationStore } from "./education.store";
import { experienceStore } from "./experience.store";
import { languageStore } from "./language.store";
import { personalInfoStore } from "./personalInfo.store";
import { sectionsStore } from "./sections.store";
import { signal, type Signal } from "@preact/signals-react";

export const populateCV = (cv: CVDataType) => {
  const { personalInfo, experience, education, languages, sections } = cv.cv;

  experienceStore.setExperiences(experience);
  personalInfoStore.setPersonalInfo(personalInfo);
  educationStore.setEducations(education);
  languageStore.setLanguages(languages);
  sectionsStore.setAddedSections(sections);
};

export const LoadedCVName: Signal<string> = signal("");

export const getLoadedCV = () => {
  return {
    personalInfo: personalInfoStore.personalInfoValue,
    experience: experienceStore.experiences,
    education: educationStore.educations,
    languages: languageStore.languages,
    sections: sectionsStore.addedSections,
  };
};

export type LoadedCVType = ReturnType<typeof getLoadedCV>;
