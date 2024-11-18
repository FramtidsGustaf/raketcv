import { DeepSignal, deepSignal } from "deepsignal";
import { SectionNames } from "../types";
import { notifications } from "@mantine/notifications";
import { getValues } from "../utils/getValues";

interface SectionsStore {
  addedSections: SectionNames[];
  addSection: (section: SectionNames) => void;
  removeAddedSection: (sections: SectionNames) => void;
  moveSectionUp: (section: SectionNames) => void;
  moveSectionDown: (section: SectionNames) => void;
  reset: () => void;
  addedSectionsValue: SectionNames[];
  setAddedSections: (sections: SectionNames[]) => void;
  isSectionFirst: (section: SectionNames) => boolean;
  isSectionLast: (section: SectionNames) => boolean;
}

export const sectionsStore: DeepSignal<SectionsStore> =
  deepSignal<SectionsStore>({
    addedSections: [],

    setAddedSections(sections: SectionNames[]) {
      sectionsStore.addedSections = sections;
    },

    get addedSectionsValue() {
      return getValues(sectionsStore.addedSections);
    },

    isSectionFirst(section: SectionNames) {
      return sectionsStore.addedSections[0] === section;
    },

    isSectionLast(section: SectionNames) {
      return (
        sectionsStore.addedSections[sectionsStore.addedSections.length - 1] ===
        section
      );
    },

    addSection(section) {
      if (sectionsStore.addedSections.includes(section)) {
        notifications.show({
          title: "Fält redan tillagt",
          message: "Du har redan lagt till detta fält",
          color: "red",
          position: "bottom-center",
        });
        return;
      }
      sectionsStore.addedSections.push(section);
    },

    removeAddedSection(section) {
      sectionsStore.addedSections = sectionsStore.addedSections.filter(
        (addedSection) => addedSection !== section
      );
    },

    moveSectionUp(section) {
      const index = sectionsStore.addedSections.indexOf(section);
      if (index === 0) return;
      const [removed] = sectionsStore.addedSections.splice(index, 1);
      sectionsStore.addedSections.splice(index - 1, 0, removed);
    },

    moveSectionDown(section) {
      const index = sectionsStore.addedSections.indexOf(section);
      if (index === sectionsStore.addedSections.length - 1) return;
      const [removed] = sectionsStore.addedSections.splice(index, 1);
      sectionsStore.addedSections.splice(index + 1, 0, removed);
    },

    reset() {
      sectionsStore.addedSections = [];
    },
  });
