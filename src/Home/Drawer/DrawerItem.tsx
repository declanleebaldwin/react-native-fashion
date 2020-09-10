import React from "react";
import { Theme, Box, Text, useTheme } from "../../components/Theme";
import { RectButton } from "react-native-gesture-handler";
import { RoundedIcon } from "../../components";

export interface DrawerItemProps {
  icon: string;
  color: keyof Theme["colors"];
  screen: string;
  label: string;
}

const DrawerItem = ({ icon, color, screen, label }: DrawerItemProps) => {
  const theme = useTheme();
  return (
    <RectButton style={{ borderRadius: theme.borderRadii.m }}>
      <Box flexDirection="row" alignItems="center" padding="s">
        <RoundedIcon
          iconRatio={0.5}
          name={icon}
          size={36}
          backgroundColor={color}
          color="white"
        />
        <Text variant="button" color="secondary" marginLeft="m">
          {label}
        </Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
