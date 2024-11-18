interface EducationConstructor {
  school: string;
  location: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export class Education {
  id: string;
  school: string;
  location: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  description: string;

  constructor({
    school,
    location,
    degree,
    startDate,
    endDate,
    description,
  }: EducationConstructor) {
    this.school = school;
    this.location = location;
    this.degree = degree;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.id = crypto.randomUUID();
  }
}

export type EducationFormType = EducationConstructor;
