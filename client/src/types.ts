import type { Education, Experience, Language, Skill } from "./sections";

export enum LanguageLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Native = "Native",
}

export enum HobbyLevel {
  Beginner,
  Intermediate,
  Advanced,
  Expert,
}

export type Section = Education | Experience | Language | Skill;

export type Sections = Section[];

export enum SectionEnum {
  Education = "Education",
  Experience = "Experience",
  Language = "Language",
  Skill = "Skill",
}

export type SectionNames = "education" | "experience" | "languages" | "skill";
