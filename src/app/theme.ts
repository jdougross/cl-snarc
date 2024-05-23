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
    secondary: "#596f7d",
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
    brand: green,
  },
  // fonts: {
  //   body: "monospace, system-ui, sans-serif",
  //   heading: "monospace, Georgia, serif",
  //   mono: "monospace, Menlo, monospace",
  // },
});

export const buttonProps = {
  borderWidth: "1px",
  // borderColor: "#000",
  borderRadius: "0.5rem",
  // backgroundColor: themeColor.dark,
  // textColor: "#FFF",
  padding: "1rem",
  margin: "0.5rem",
  minWidth: "15rem",
  height: "2.5rem",
};
