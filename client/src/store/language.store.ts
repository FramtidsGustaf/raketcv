import { type DeepSignal, deepSignal } from "deepsignal";
import type { Language } from "../sections";
import { getValues } from "../utils/getValues";

interface LanguageStore {
  languages: Language[];
  addLanguage: (language: Language) => void;
  getLanguage: (id: string) => Language | undefined;
  removeLanguage: (id: string) => void;
  editLanguage: (id: string, language: Language) => void;
  reset: () => void;
  languagesValue: Language[];
  setLanguages: (languages: Language[]) => void;
}

export const languageStore: DeepSignal<LanguageStore> =
  deepSignal<LanguageStore>({
    languages: [],

    addLanguage(language) {
      languageStore.languages.push(language);
    },

    setLanguages(languages: Language[]) {
      languageStore.languages = languages;
    },

    get languagesValue() {
      return getValues(languageStore.languages);
    },

    getLanguage(id) {
      return languageStore.languages.find((language) => language.id === id);
    },

    removeLanguage(id) {
      languageStore.languages = languageStore.languages.filter(
        (language) => language.id !== id
      );
    },

    editLanguage(id, language) {
      const index = languageStore.languages.findIndex((l) => l.id === id);
      languageStore.languages[index] = language;
    },

    reset() {
      languageStore.languages = [];
    },
  });
