import { educationStore } from "../store/education.store";
import { experienceStore } from "../store/experience.store";
import { languageStore } from "../store/language.store";
import { personalInfoStore } from "../store/personalInfo.store";
import { sectionsStore } from "../store/sections.store";

export const CVData = () => {
  const data = {
    personalInfo: personalInfoStore.personalInfoValue,
    education: educationStore.educationsValue,
    experience: experienceStore.experiencesValue,
    languages: languageStore.languagesValue,
  };

  return data;
};

export const CVDataToDB = () => {
  const data = {
    ...CVData(),
    sections: sectionsStore.addedSectionsValue,
  };

  return data;
};
