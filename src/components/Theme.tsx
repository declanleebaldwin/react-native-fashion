import { createTheme, createText, BaseTheme } from "@shopify/restyle";

const theme: BaseTheme = createTheme({
  colors: {
    primary: "#2CB9B0",
    title: "#0C0D34",
    text: "rgba(12, 13, 52, 0.7)",
    body: "rgba(12, 13, 52, 0.05)",
    white: "white",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: "SFProDisplay-Semibold",
      color: "white",
      textAlign: "center",
    },
    title1: {
      fontSize: 28,
      fontFamily: "SFProDisplay-Semibold",
      color: "title",
    },
    title2: {
      fontSize: 24,
      fontFamily: "SFProDisplay-Semibold",
      color: "title",
      lineHeight: 30,
    },
    body: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
      lineHeight: 24,
    },
  },
  breakpoints: {},
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export default theme;
