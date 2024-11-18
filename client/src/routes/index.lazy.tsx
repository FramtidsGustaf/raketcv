import { createLazyFileRoute } from "@tanstack/react-router";
import { HomePage } from "../Pages/Home/Home.page";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
