import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button } from "../../components";

const { width } = Dimensions.get("window");

interface SubSlideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}

const SubSlide = ({ description, subtitle, last, onPress }: SubSlideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
        {...{ onPress }}
      />
    </View>
  );
};

export default SubSlide;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 44,
    flex: 1
  },
  subtitle: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 12,
    color: "#0C0D34",
    textAlign: "center",
  },
  description: {
    fontFamily: "SFProDisplay-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#0C0D34",
    textAlign: "center",
    marginBottom: 40,
  },
});
