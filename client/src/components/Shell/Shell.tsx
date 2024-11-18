import { AppShell, Group, Title, Button, ButtonGroup } from "@mantine/core";

import { Link, useLocation } from "@tanstack/react-router";
import { HTMLAttributes } from "react";

import classes from "./Shell.module.css";

export const Shell = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const { pathname } = useLocation();

  const determineVariant = (path: string) => {
    return pathname === path ? "filled" : "outline";
  };

  return (
    <AppShell header={{ height: "5svh" }} withBorder={false}>
      <AppShell.Header pl="xs">
        <Group align="center" justify="space-between" pr="xs" h="100%">
          <ButtonGroup>
            <Button
              component={Link}
              variant={determineVariant("/first-step")}
              to="/first-step"
            >
              Skapa CV
            </Button>
            <Button
              component={Link}
              variant={determineVariant("/cover-letter")}
              to="/cover-letter"
            >
              Personligt Brev
            </Button>
            <Button
              component={Link}
              variant={determineVariant("/saved")}
              to="/saved"
            >
              Sparat
            </Button>
          </ButtonGroup>
          <Button unstyled component={Link} to="/" className={classes.link}>
            <Group align="flex-end" gap="xs">
              <Title fw="normal" fz="h3" order={1} className={classes.title}>
                RaketCV
              </Title>
            </Group>
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
