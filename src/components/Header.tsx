import React from "react";
import { RoundedIconButton, Box, Text } from ".";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
  };
  right: {
    icon: string;
    onPress: () => void;
  };
  title: string;
  dark: boolean;
}

const Header = ({ title, left, right, dark }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const color = dark ? "white" : "secondary";
  const backgroundColor = dark ? "secondary" : "lightGrey";
  return (
    <Box
      flexDirection="row"
      style={{ marginTop: insets.top }}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m"
    >
      <RoundedIconButton
        size={24}
        name={left.icon}
        {...{ color, backgroundColor }}
        onPress={left.onPress}
      />
      <Text {...{ color }}>{title.toUpperCase()}</Text>
      <RoundedIconButton
        size={24}
        name={right.icon}
        {...{ color, backgroundColor }}
        onPress={right.onPress}
      />
    </Box>
  );
};

export default Header;
