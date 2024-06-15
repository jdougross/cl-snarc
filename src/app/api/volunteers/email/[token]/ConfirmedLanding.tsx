"use client";

import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

export const ConfirmedLanding = ({ date }: { date: string }) => {
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  const displayHorizontal = width > 1000;
  const bgGradient = "linear(to-b, #BBB, #999, #888)";

  const imgSrc =
    "https://images.squarespace-cdn.com/content/v1/5695705cd8af10829fd876a8/1630559922169-48M8D4RUQ5GKNPZEF3UX/Carbon-Leaf-2020-Graffiti-Warehouse-Baltimore-MD-Photography-by-Brittany-Diliberto-47+copy.jpg?format=2500w";

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(date),
  );

  const heading = `Thanks for confirming!`;
  const line1 = `You're all set! You're in our system to help with merch sales on ${formattedDate}.`;
  const line2 = `Looking forward to seeing you at the show!`;
  const line3 = `- Carbon Leaf`;

  const alt = `Background image - members of Carbon Leaf standing on a staircase`;

  return (
    <ChakraProvider>
      {displayHorizontal ? (
        <Flex
          bgGradient={bgGradient}
          height={height}
          position={"relative"}
          zIndex={0}
        >
          <Image
            src={imgSrc}
            alt={alt}
            zIndex={1}
            position={"absolute"}
            objectFit="cover"
            boxSize={"fit-content"}
          />
          <Flex
            flexDirection="column"
            zIndex={2}
            bg="white"
            position={"absolute"}
            my={"3%"}
            p={"3%"}
            w={"40%"}
          >
            <Heading mb={4}>{heading}</Heading>
            <Flex flexDirection="column" ml={8}>
              <Text my={4}>{line1}</Text>
              <Text my={4}>{line2}</Text>
              <Text my={4}>{line3}</Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          flexDirection={"column"}
          bgGradient={bgGradient}
          height={height}
          zIndex={0}
        >
          <Flex
            flexDirection="column"
            zIndex={2}
            bg="white"
            mt={"5%"}
            p={"3%"}
            w={"100%"}
          >
            <Heading mb={4} fontSize={"medium"}>
              {heading}
            </Heading>
            <Flex flexDirection="column" ml={2}>
              <Text my={1}>{line1}</Text>
              <Text my={1}>{line2}</Text>
              <Text my={1}>{line3}</Text>
            </Flex>
          </Flex>
          <Image
            src={imgSrc}
            alt={alt}
            zIndex={1}
            position={"relative"}
            boxSize={"fit-content"}
          />
        </Flex>
      )}
    </ChakraProvider>
  );
};
