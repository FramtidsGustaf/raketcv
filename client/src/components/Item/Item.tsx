import { HTMLAttributes } from "react";
import { Box, Flex } from "@mantine/core";

import { ItemSettings } from "../ItemSettings/ItemSettings";

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  sectionName: string;
  id: string;
}

export const Item = ({ children, sectionName, id }: ItemProps) => {
  return (
    <Box px="md" pb="lg" pt="sm">
      <Flex justify="flex-end">
        <ItemSettings sectionName={sectionName} id={id} />
      </Flex>
      {children}
    </Box>
  );
};
