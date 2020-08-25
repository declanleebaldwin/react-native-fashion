import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Text, Theme } from "./Theme";
import useTheme from "@shopify/restyle/dist/hooks/useTheme";
interface ButtonProps {
  label: string;
  variant: "default" | "primary";
  onPress: () => void;
}

const Button = ({ label, variant, onPress }: ButtonProps) => {
  const theme = useTheme<Theme>();
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.body;

  const color = variant === "primary" ? theme.colors.white : theme.colors.title;

  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </RectButton>
  );
};
Button.defaultProps = { variant: "default" };

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 15,
    textAlign: "center",
  },
});
