import { HobbyLevel } from "../types";

interface SkillConstructor {
  name: string;
  level: HobbyLevel;
}

export class Skill {
  id: string;
  name: string;
  level: HobbyLevel;
  constructor({ name, level }: SkillConstructor) {
    this.name = name;
    this.level = level;
    this.id = crypto.randomUUID();
  }

  clone() {
    return structuredClone(this);
  }
}

export type SkillFormType = SkillConstructor;
