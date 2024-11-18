import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";

import { DatesProvider } from "@mantine/dates";
import dayjs from "dayjs";
import "dayjs/locale/sv";

dayjs.locale("sv");

import { routeTree } from "./routeTree.gen.ts";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme.ts";

import "./index.css";

const router = createRouter({
  routeTree,
  Wrap: ({ children }) => (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <DatesProvider settings={{ locale: "sv" }}>
        <ModalsProvider>{children}</ModalsProvider>
        <Notifications />
      </DatesProvider>
    </MantineProvider>
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
