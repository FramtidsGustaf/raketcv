import { createFileRoute } from "@tanstack/react-router";
import { FirstStep } from "../../Pages/FirstStep/FirstStep.page";

export const Route = createFileRoute("/first-step/")({
  component: FirstStep,
});
