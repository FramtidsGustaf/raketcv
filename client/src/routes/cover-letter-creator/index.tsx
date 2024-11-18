import { createFileRoute } from "@tanstack/react-router";
import { CoverLetterCreatorPage } from "../../Pages/CoverLetterCreator/CoverLetterCreator.page";

export const Route = createFileRoute("/cover-letter-creator/")({
  component: CoverLetterCreatorPage,
});
