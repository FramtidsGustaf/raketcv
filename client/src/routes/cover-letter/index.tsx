import { createFileRoute } from "@tanstack/react-router";
import { CoverLetterPage } from "../../Pages/CoverLetter/CoverLetter.page";

export const Route = createFileRoute("/cover-letter/")({
  component: CoverLetterPage,
});
