import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Shell } from "./components/Shell/Shell";
import { ScrollArea } from "@mantine/core";
import { useEffect } from "react";
import { initDB } from "./db/initDB";

function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Shell>
      <ScrollArea h="95svh">
        <Outlet />
        <TanStackRouterDevtools />
      </ScrollArea>
    </Shell>
  );
}

export default App;
