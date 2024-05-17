const color = {
  blue: {
    light: "#DEF",
    dark: "#26A",
    light_contrast: "#DAA",
    dark_contrast: "##844",
  },
  green: {
    light: "#BDC",
    dark: "#064",
    light_contrast: "#DAA",
    dark_contrast: "##844",
  },
};

const themeColor = color.green;

export const theme = {
  light: {
    colors: {
      background: "#FFF",
      borders: "#222",
      text: "#000",
      positive: themeColor.light,
      negative: "#DAA",
      offBackground: "#EEE",
    },
  },
  dark: {
    colors: {
      background: "#000",
      borders: "#FFF",
      text: "#FFF",
      positive: "#373",
      negative: "#733",
      offBackground: "#333",
    },
  },
};

export const buttonProps = {
  borderWidth: "1px",
  borderColor: "#000",
  borderRadius: "0.5rem",
  backgroundColor: themeColor.dark,
  textColor: "#FFF",
  padding: "1rem",
  margin: "0.5rem",
  minWidth: "12rem",
};

export const darkButtonProps = {
  ...buttonProps,
  backgroundColor: themeColor.dark,
  textColor: theme.dark.colors.text,
};

export const lightButtonProps = {
  ...buttonProps,
  backgroundColor: themeColor.light,
  textColor: theme.light.colors.text,
};
