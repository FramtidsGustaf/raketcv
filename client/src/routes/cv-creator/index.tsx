import { createFileRoute } from "@tanstack/react-router";
import { CVCreatorPage } from "../../Pages/CVCreateor/CVCreator.page";

export const Route = createFileRoute("/cv-creator/")({
  component: CVCreatorPage,
});
