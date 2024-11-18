import { LanguageLevel } from "../types";

interface LanguageConstructor {
  language: string;
  level: LanguageLevel;
}

export class Language {
  id: string;
  language: string;
  level: LanguageLevel;

  constructor({ language, level }: LanguageConstructor) {
    this.language = language;
    this.level = level;
    this.id = crypto.randomUUID();
  }
}

export type LanguageFormType = LanguageConstructor;
