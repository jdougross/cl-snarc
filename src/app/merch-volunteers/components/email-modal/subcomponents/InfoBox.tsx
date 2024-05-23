import { theme } from "@/app/merch-volunteers/theme";
import { Flex, Text } from "@chakra-ui/react";

interface InfoBoxProps {
  rows: string[];
  header: string;
}

const boxProps = {
  width: "16rem",
  height: "10rem",
  backgroundColor: theme.light.colors.offBackground,
  alignItems: "flex-start",
  justifyContent: "flex-start",
  p: "1rem",
  m: "1rem",
};

export const InfoBox = ({ rows, header }: InfoBoxProps) => {
  return (
    <Flex flexDirection={"column"} {...boxProps}>
      <Text py="2" fontWeight="bold">
        {header}
      </Text>
      {rows.map((r) => (
        <Text key={r}>{r}</Text>
      ))}
    </Flex>
  );
};
