import { Education, Experience, Language } from "../sections";
import { PersonalInfo } from "../store/personalInfo.store";
import { SectionNames } from "../types";

export interface SavedCVData {
  name: string;
  createdAt: string;
}

export interface CVDataType {
  name: string;
  cv: {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    languages: Language[];
    sections: SectionNames[];
  };
  createdAt: string;
}

export interface SavedCoverLetterData {
  name: string;
  createdAt: string;
}

export interface CoverLetterDataType {
  name: string;
  html: string;
  json: string;
  createdAt: string;
}
