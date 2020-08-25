import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import Animated, { multiply, divide } from "react-native-reanimated";
import {
  interpolateColor,
  useScrollHandler,
} from "react-native-redash";
import Slide, { SLIDE_HEIGHT, BORDER_RADIUS } from "./Slide";
import SubSlide from "./SubSlide";
import Dot from "./Dot";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Relaxed",
    color: "#BFEAF5",
    picture: require("../assets/1.png"),
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don’t worry! Find the best outfit here!",
  },
  {
    title: "Playful",
    color: "#BEECC4",
    picture: require("../assets/2.png"),
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
  },
  {
    title: "Excentric",
    color: "#FFE4D9",
    picture: require("../assets/3.png"),
    subtitle: "Your Style, Your Way",
    description:
      " Create your individual & unique style and look amazing everyday",
  },
  {
    title: "Funky",
    color: "#FFDDDD",
    picture: require("../assets/4.png"),
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
  },
];

const Onboarding = () => {
  const scroll = useRef<Animated.ScrollView>(null);
  const { scrollHandler, x } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_slide, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map((slide, i) => (
            <Slide key={i} title={slide.title} right={!!(i % 2)} picture={slide.picture} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />
        <Animated.View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_slide, index) => (
              <Dot key={index} currentIndex={divide(x, width)} {...{ index }} />
            ))}
          </View>
          <Animated.View
            style={{
              flex: 1,
              transform: [{ translateX: multiply(x, -1) }],
              flexDirection: "row",
              width: width * slides.length 
            }}
          >
            {slides.map((slide, i) => (
              <SubSlide
                key={i}
                onPress={() => {
                  if (scroll.current) {
                    scroll.current
                      .getNode()
                      .scrollTo({ x: width * (i + 1), animated: true });
                  }
                }}
                last={i === slides.length - 1}
                subtitle={slide.subtitle}
                description={slide.description}
              />
            ))}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
