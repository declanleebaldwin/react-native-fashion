import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Theme, Box, Text } from "./Theme";

export interface RoundedIconProps {
  name: string;
  size: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"];
  iconRatio: number;
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio
}: RoundedIconProps) => {
  const iconSize = iconRatio * size;
  return (
    <Box
      height={size}
      width={size}
      justifyContent="center"
      alignItems="center"
      backgroundColor={backgroundColor}
      style={{ borderRadius: size / 2 }}
    >
      <Text style={{ width: iconSize, height: iconSize }} {...{ color }}>
        <Icon
          {...{ name }}
          size={iconSize}
        />
      </Text>
    </Box>
  );
};

RoundedIcon.defaultProps = {
  iconRatio: 0.7
}
export default RoundedIcon;
