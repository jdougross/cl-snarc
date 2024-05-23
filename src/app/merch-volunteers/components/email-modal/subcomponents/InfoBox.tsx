import { Flex, Text, useTheme } from "@chakra-ui/react";

interface InfoBoxProps {
  rows: string[];
  header: string;
}

export const InfoBox = ({ rows, header }: InfoBoxProps) => {
  const theme = useTheme();

  const boxProps = {
    width: "16rem",
    height: "10rem",
    // backgroundColor: theme.colors.brand.offBackground,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    p: "1rem",
    m: "1rem",
  };

  return (
    <Flex flexDirection={"column"} bg="offBackground" {...boxProps}>
      <Text py="2" fontWeight="bold">
        {header}
      </Text>
      {rows.map((r) => (
        <Text key={r}>{r}</Text>
      ))}
    </Flex>
  );
};
