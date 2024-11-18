import type { Education, Experience, Language, Skill } from "../sections";

export class CV {
  experiences: Experience[] = [];
  educations: Education[] = [];
  skills: Skill[] = [];
  languages: Language[] = [];

  addExperience(experience: Experience) {
    this.experiences.push(experience);
  }

  addEducation(education: Education) {
    this.educations.push(education);
  }

  addSkill(skill: Skill) {
    this.skills.push(skill);
  }

  addLanguage(language: Language) {
    this.languages.push(language);
  }

  removeExperience(id: string) {
    this.experiences = this.experiences.filter((e) => e.id !== id);
  }

  removeEducation(id: string) {
    this.educations = this.educations.filter((e) => e.id !== id);
  }

  removeSkill(id: string) {
    this.skills = this.skills.filter((s) => s.id !== id);
  }

  removeLanguage(id: string) {
    this.languages = this.languages.filter((l) => l.id !== id);
  }

  getExperience(id: string) {
    return this.experiences.find((e) => e.id === id);
  }

  editExperience(id: string, experience: Experience) {
    for (let e of this.experiences) {
      if (e.id === id) {
        e = experience;
      }
    }
  }

  editEducation(id: string, education: Education) {
    for (let e of this.educations) {
      if (e.id === id) {
        e = education;
      }
    }
  }

  editSkill(id: string, skill: Skill) {
    for (let s of this.skills) {
      if (s.id === id) {
        s = skill;
      }
    }
  }

  editLanguage(id: string, language: Language) {
    for (let l of this.languages) {
      if (l.id === id) {
        l = language;
      }
    }
  }
}
