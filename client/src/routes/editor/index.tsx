import { createFileRoute } from "@tanstack/react-router";
import { EditorPage } from "../../Pages/Editor/Editor.page";

export const Route = createFileRoute("/editor/")({
  component: EditorPage,
});
