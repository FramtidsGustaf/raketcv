import { createFileRoute } from "@tanstack/react-router";
import { CVTemplatesPage } from "../../Pages/CVTemplates/CVTemplates.page";

export const Route = createFileRoute("/cv-templates/")({
  component: CVTemplatesPage,
});
