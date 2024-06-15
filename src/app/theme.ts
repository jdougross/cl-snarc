"use client";

import { extendTheme } from "@chakra-ui/react";

const blue = {
  text: {
    primary: "#000",
    secondary: "#FFF",
    tertiary: "#BBB",
  },
  positive: {
    primary: "#1b89FF",
    secondary: "#d1d9de",
  },
  negative: {
    primary: "#103247",
    secondary: "#424954",
    error: "#922",
  },
  icon: {
    primary: "#1b89FF",
  },
  background: {
    primary: "#FFF",
    secondary: "#DDD",
  },
  borders: {
    primary: "#000",
    secondary: "#FFF",
  },
};

const green = {
  text: {
    primary: "#000",
    secondary: "#FFF",
    tertiary: "#BBB",
  },
  positive: {
    primary: "#1BAC68",
    secondary: "#D1DED9",
  },
  negative: {
    primary: "#104732",
    secondary: "#597D6F",
    error: "#922",
  },
  icon: {
    primary: "#1BAC68",
  },
  background: {
    primary: "#FFF",
    secondary: "#DDD",
  },
  borders: {
    primary: "#000",
    secondary: "#FFF",
  },
};

// TODO: fonts, sizes, breakpoints

export const theme = extendTheme({
  colors: {
    brand: blue,
  },
  fontSizes: {
    xs: "6pxpx",
    sm: "8px",
    md: "10px",
    lg: "12px",
    xl: "14px",
  },
});
