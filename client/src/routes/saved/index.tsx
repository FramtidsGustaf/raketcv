import { createFileRoute } from "@tanstack/react-router";
import { getSavedCVData } from "../../db/cvQueries";

import { getSavedCoverLetterData } from "../../db/coverLetterQueries";
import { SavedPage } from "../../Pages/Saved/Saved.page";

export const Route = createFileRoute("/saved/")({
  component: () => <SavedPage />,
  loader: async () => {
    const cvs = await getSavedCVData();
    const coverLetters = await getSavedCoverLetterData();

    return {
      cvs,
      coverLetters,
    };
  },
});
