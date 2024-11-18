import {
  Button,
  Container,
  Flex,
  Group,
  Stack,
  Stepper,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";

import classes from "./FirstStep.module.css";
import { personalInfoStore } from "../../store/personalInfo.store";
import { useNavigate } from "@tanstack/react-router";
import { useSignals } from "@preact/signals-react/runtime";

export const FirstStep = () => {
  useSignals();
  const navigate = useNavigate({ from: "/first-step" });
  const [active, setActive] = useState<number>(0);

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container className={classes.container} mt="xl" px="xl" py="xl">
      <Flex align="center" justify="center">
        <Stack justify="space-between" w="100%">
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step
              label="Personuppgifter"
              description="Lägg till dina personuppgifter"
            >
              <Container mt="xs">
                <Title order={3}>Personuppgifter</Title>
                <Flex align="center" justify="center" h="30svh">
                  <Stack gap="md" w="400px">
                    <TextInput
                      label="Förnamn"
                      value={personalInfoStore.firstName}
                      onChange={(e) =>
                        personalInfoStore.setFirstName(e.target.value)
                      }
                    />

                    <TextInput
                      label="Efternamn"
                      value={personalInfoStore.lastName}
                      onChange={(e) =>
                        personalInfoStore.setLastName(e.target.value)
                      }
                    />

                    <TextInput
                      label="Arbetstitel"
                      value={personalInfoStore.workTitle}
                      onChange={(e) =>
                        personalInfoStore.setWorkTitle(e.target.value)
                      }
                    />
                  </Stack>
                </Flex>
              </Container>
            </Stepper.Step>

            <Stepper.Step
              label="Kontaktuppgifter"
              description="Lägg till dina kontaktuppgifter"
            >
              <Container mt="xs">
                <Title order={3}>Kontaktuppgifter</Title>
                <Flex align="center" justify="center" h="30svh">
                  <Stack gap="md" w="400px">
                    <TextInput
                      label="Email"
                      value={personalInfoStore.email}
                      onChange={(e) =>
                        personalInfoStore.setEmail(e.target.value)
                      }
                    />

                    <TextInput
                      label="Telefon"
                      value={personalInfoStore.phone}
                      onChange={(e) =>
                        personalInfoStore.setPhone(e.target.value)
                      }
                    />
                  </Stack>
                </Flex>
              </Container>
            </Stepper.Step>

            <Stepper.Step label="Generera Mall" description="Generera Mall">
              <Container mt="xs">
                <Title order={3}>Generera Mall</Title>
                <Flex align="center" justify="center" h="30svh">
                  <Button
                    size="xl"
                    onClick={() => {
                      navigate({ to: "/cv-creator" });
                    }}
                  >
                    Generera
                  </Button>
                </Flex>
              </Container>
            </Stepper.Step>
          </Stepper>

          {active > 0 ? (
            <Group justify="space-between">
              <Button onClick={prevStep}>Tillbaka</Button>

              {active < 2 ? <Button onClick={nextStep}>Nästa</Button> : null}
            </Group>
          ) : (
            <Flex justify="flex-end">
              <Button onClick={nextStep}>Nästa</Button>
            </Flex>
          )}
        </Stack>
      </Flex>
    </Container>
  );
};
