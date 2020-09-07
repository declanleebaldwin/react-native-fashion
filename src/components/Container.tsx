import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { Box, useTheme } from "./Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
  pattern: 0 | 1 | 2;
}

export const assets = [
  require("../components/assets/patterns/1.png"),
  require("../components/assets/patterns/2.png"),
  require("../components/assets/patterns/3.png"),
] as const;

const { width, height: wHeight } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

const Container = ({ children, footer, pattern }: ContainerProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const asset = assets[pattern];
  return (
    <KeyboardAwareScrollView scrollEnabled={false}>
      <Box
        height={
          wHeight + (Platform.OS === "android" ? Constants.statusBarHeight : 0)
        }
        backgroundColor="secondary"
      >
        <StatusBar barStyle="light-content" />
        <Box backgroundColor="white">
          <Box
            borderBottomLeftRadius="xl"
            overflow="hidden"
            height={height * 0.61}
          >
            <Image
              source={asset}
              style={{
                width,
                height,
                borderBottomLeftRadius: theme.borderRadii.xl,
              }}
            />
          </Box>
        </Box>
        <Box flex={1} overflow="hidden">
          <Image
            source={asset}
            style={{
              ...StyleSheet.absoluteFillObject,
              width,
              height,
              top: -height * 0.61,
            }}
          />
          <Box
            borderRadius="xl"
            borderTopLeftRadius={0}
            backgroundColor="white"
            flex={1}
          >
            {children}
          </Box>
          <Box backgroundColor="secondary" paddingTop="m">
            {footer}
            <Box height={insets.bottom} />
          </Box>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default Container;
