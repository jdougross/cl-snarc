import { Flex, Text, useTheme } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InfoBoxProps {
  rows?: string[];
  header: string;
  children?: ReactNode;
}

export const InfoBox = ({ rows, header, children }: InfoBoxProps) => {
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
      {rows?.map((r) => <Text key={r}>{r}</Text>)}
      {children}
    </Flex>
  );
};
