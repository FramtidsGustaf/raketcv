import { Paper, PaperProps } from "@mantine/core";
import { useState } from "react";

const A4_ASPECT_RATIO = 1.414;

interface TemplateWrapperProps extends PaperProps {
  children?: React.ReactNode;
}

export const TemplateWrapper = ({
  children,
  ...rest
}: TemplateWrapperProps) => {
  const [width, setWidth] = useState(650);

  return (
    <Paper w={width} h={width * A4_ASPECT_RATIO} bg="white" {...rest}>
      {children}
    </Paper>
  );
};
