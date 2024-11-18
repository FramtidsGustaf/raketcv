interface ExperienceConstructor {
  company: string;
  location: string;
  position: string;
  startDate: Date;
  endDate: Date | "ongoing";
  description: string;
}

export class Experience {
  id: string;
  company: string;
  location: string;
  position: string;
  startDate: Date;
  endDate: Date | "ongoing";
  description: string;

  constructor({
    company,
    location,
    position,
    startDate,
    endDate,
    description,
  }: ExperienceConstructor) {
    this.company = company;
    this.location = location;
    this.position = position;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.id = crypto.randomUUID();
  }
}

export type ExperienceFormType = ExperienceConstructor;
