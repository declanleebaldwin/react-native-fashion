import React, { useRef } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Animated, {
  multiply,
  divide,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { interpolateColor, useScrollHandler } from "react-native-redash";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import SubSlide from "./SubSlide";
import Dot from "./Dot";
import { AuthNavigationProps } from "../../components/Navigation";
import { useTheme, makeStyles, Theme } from "../../components/Theme";

const { width } = Dimensions.get("window");

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  picture: {
    width: number;
    height: number;
    src: number;
  };
}

export const slides: Slide[] = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don’t worry! Find the best outfit here!",
    color: "#BFEAF5",
    picture: {
      src: require("../assets/1.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
    color: "#BEECC4",
    picture: {
      src: require("../assets/2.png"),
      width: 2791,
      height: 3744,
    },
  },
  {
    title: "Excentric",
    subtitle: "Your Style, Your Way",
    description:
      " Create your individual & unique style and look amazing everyday",
    color: "#FFE4D9",
    picture: {
      src: require("../assets/3.png"),
      width: 2738,
      height: 3244,
    },
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
    picture: {
      src: require("../assets/4.png"),
      width: 1757,
      height: 2551,
    },
  },
];

export const assets = slides.map((slide) => slide.picture.src);

const Onboarding = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
  const styles = useStyles();
  const theme = useTheme();
  const scroll = useRef<Animated.ScrollView>(null);
  const { scrollHandler, x } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_slide, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        {slides.map(({ picture }, index) => {
          const opacity = interpolate(x, {
            inputRange: [
              (index - 0.5) * width,
              index * width,
              (index + 0.5) * width,
            ],
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View style={[styles.underlay, { opacity }]} key={index}>
              <Image
                source={picture.src}
                style={{
                  width: width - theme.borderRadii.xl,
                  height:
                    ((width - theme.borderRadii.xl) * picture.height) /
                    picture.width,
                }}
              />
            </Animated.View>
          );
        })}

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
            <Slide key={i} title={slide.title} right={!!(i % 2)} />
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
              width: width * slides.length,
            }}
          >
            {slides.map((slide, index) => {
              const last = index === slides.length - 1;
              return (
                <SubSlide
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.navigate("Welcome");
                    } else {
                      scroll.current
                        ?.getNode()
                        .scrollTo({ x: width * (index + 1), animated: true });
                    }
                  }}
                  last={last}
                  subtitle={slide.subtitle}
                  description={slide.description}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: "hidden",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));
