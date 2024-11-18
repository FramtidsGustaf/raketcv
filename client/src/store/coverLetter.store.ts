import { CoverLetterDataType } from "../db/types";
import { deepSignal, DeepSignal } from "deepsignal";

interface CoverLetterStore {
  coverLetter: CoverLetterDataType;
  setCoverLetter: (coverLetter: CoverLetterDataType) => void;
}

export const coverLetterStore: DeepSignal<CoverLetterStore> =
  deepSignal<CoverLetterStore>({
    coverLetter: {
      name: "",
      html: "",
      json: "",
      createdAt: "",
    },

    setCoverLetter(coverLetter: CoverLetterDataType) {
      coverLetterStore.coverLetter = coverLetter;
    },
  });
