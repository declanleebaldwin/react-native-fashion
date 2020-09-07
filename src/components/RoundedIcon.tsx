import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Theme, Box, Text } from "./Theme";

interface RoundedIconProps {
  name: string;
  size: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"];
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
}: RoundedIconProps) => {
  const iconSize = size * 0.7;
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
          name={name}
          color="white"
          size={iconSize}
          style={{ textAlign: "center" }}
        />
      </Text>
    </Box>
  );
};

export default RoundedIcon;

