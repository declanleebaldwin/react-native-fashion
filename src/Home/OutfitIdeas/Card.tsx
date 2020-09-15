import React from "react";
import {
  StyleSheet,
  Dimensions,
  ImageRequireSource,
} from "react-native";
import { Box } from "../../components";
import Animated, {
  add,
  interpolate,
} from "react-native-reanimated";
import { mixColor, mix, usePanGestureHandler } from "react-native-redash";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useSpring } from "./Animations";

const { width: wWdith } = Dimensions.get("window");
const width = wWdith * 0.75;
const height = width * (425 / 294);
const borderRadius = 24;
interface CardProps {
  position: Animated.Node<number>;
  onSwipe: () => void;
  source: ImageRequireSource;
}

const Card = ({ position, onSwipe, source }: CardProps) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const backgroundColor = mixColor(position, "#C9E9E7", "#74BCB8");
  const translateYOffset = mix(position, 0, -50);
  const scale = mix(position, 1, 0.9);
  const imageScale = interpolate(position, {
    inputRange: [0, 0.25, 1],
    outputRange: [1.2, 1, 1],
  });
  const translateX = useSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [-wWdith, 0, wWdith],
    onSnap: ([x]) => x !== 0 && onSwipe(),
  });
  const translateY = add(
    translateYOffset,
    useSpring({
      value: translation.y,
      velocity: velocity.y,
      state,
      snapPoints: [0],
    })
  );
  return (
    <Box
      style={StyleSheet.absoluteFillObject}
      justifyContent="center"
      alignItems="center"
    >
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            backgroundColor,
            width,
            height,
            borderRadius,
            transform: [{ translateY }, { translateX }, { scale }],
            overflow: "hidden",
          }}
        >
          <Animated.Image
            {...{ source }}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
              transform: [{ scale: imageScale }],
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
};

export default Card;
