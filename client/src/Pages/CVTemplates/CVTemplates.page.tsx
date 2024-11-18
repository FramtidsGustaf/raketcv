import { getLoadedCV, LoadedCVType } from "../../store/store";
import { FirstTemplate } from "../../Templates/CVTemplates/FirstTemplate";
import { SimpleGrid } from "@mantine/core";
import { SecondTemplate } from "../../Templates/SecondTemplate/SecondTemplate";

export const CVTemplatesPage = () => {
  const loadedCV: LoadedCVType = getLoadedCV();
  return (
    <SimpleGrid cols={2}>
      <FirstTemplate cv={loadedCV} />
      <SecondTemplate cv={loadedCV} />
    </SimpleGrid>
  );
};
