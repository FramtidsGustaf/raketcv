import { DeepSignal, deepSignal } from "deepsignal";
import { getValues } from "../utils/getValues";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  workTitle: string;
  email: string;
  phone: string;
}

interface PersonalInfoStore extends PersonalInfo {
  setPersonalInfo: (personalInfo: PersonalInfo) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setWorkTitle: (workTitle: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  getFullName(): string;
  reset(): void;
  personalInfoValue: PersonalInfo;
}

export const personalInfoStore: DeepSignal<PersonalInfoStore> =
  deepSignal<PersonalInfoStore>({
    firstName: "",
    lastName: "",
    workTitle: "",
    email: "",
    phone: "",

    setPersonalInfo(personalInfo: PersonalInfo) {
      personalInfoStore.firstName = personalInfo.firstName;
      personalInfoStore.lastName = personalInfo.lastName;
      personalInfoStore.workTitle = personalInfo.workTitle;
      personalInfoStore.email = personalInfo.email;
      personalInfoStore.phone = personalInfo.phone;
    },

    get personalInfoValue() {
      return {
        firstName: getValues(personalInfoStore.firstName),
        lastName: getValues(personalInfoStore.lastName),
        workTitle: getValues(personalInfoStore.workTitle),
        email: getValues(personalInfoStore.email),
        phone: getValues(personalInfoStore.phone),
      };
    },

    setFirstName(firstName) {
      personalInfoStore.firstName = firstName;
    },

    setLastName(lastName) {
      personalInfoStore.lastName = lastName;
    },

    setWorkTitle(workTitle) {
      personalInfoStore.workTitle = workTitle;
    },

    setEmail(email) {
      personalInfoStore.email = email;
    },

    setPhone(phone) {
      personalInfoStore.phone = phone;
    },

    getFullName() {
      return `${personalInfoStore.firstName} ${personalInfoStore.lastName}`;
    },

    reset() {
      personalInfoStore.firstName = "";
      personalInfoStore.lastName = "";
      personalInfoStore.workTitle = "";
      personalInfoStore.email = "";
      personalInfoStore.phone = "";
    },
  });
