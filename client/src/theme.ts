import {
  createTheme,
  Button,
  ActionIcon,
  CloseButton,
  Stepper,
  Menu,
  SegmentedControl,
} from "@mantine/core";

export const theme = createTheme({
  colors: {
    primary: [
      "#e4eded",
      "#c9dcdb",
      "#aecaca",
      "#93b9b8",
      "#79a8a7",
      "#6b9f9e",
      "#5e9695",
      "#508d8c",
      "#438583",
      "#367c7b",
    ],
    secondary: [
      "#e9e3e1",
      "#d3c8c4",
      "#bdada7",
      "#a7928a",
      "#91776d",
      "#86695e",
      "#7b5b4f",
      "#704e41",
      "#654032",
      "#5a3324",
    ],
    dark: [
      "#dedfe0",
      "#bdbfc1",
      "#9d9fa3",
      "#7c7f84",
      "#5c5f66",
      "#4b4f56",
      "#3b3f47",
      "#2b2e38",
      "#1a1f28",
      "#0a0f19",
    ],
    gray: [
      "#ececee",
      "#d9dadd",
      "#c7c8cc",
      "#b4b6bb",
      "#a2a4ab",
      "#989aa2",
      "#8f919a",
      "#868891",
      "#7c7f89",
      "#737681",
    ],
  },
  white: "#fcfeff",
  black: "#2e3133",
  primaryColor: "primary",
  primaryShade: 4,
  luminanceThreshold: 0.3,
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "outline",
        radius: "md",
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "outline",
        radius: "md",
      },
    }),
    CloseButton: CloseButton.extend({
      defaultProps: {
        variant: "outline",
        radius: "md",
      },
    }),
    Stepper: Stepper.extend({
      defaultProps: {
        color: "secondary",
        radius: "sm",
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        position: "bottom-end",
      },
    }),
    SegmentedControl: SegmentedControl.extend({
      defaultProps: {
        color: "secondary",
      },
    }),
  },
});
