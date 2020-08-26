import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text} from "../../components";

interface SubSlideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}

const SubSlide = ({ description, subtitle, last, onPress }: SubSlideProps) => {
  return (
    <View style={styles.container}>
      <Text variant="title2" style={styles.subtitle}>{subtitle}</Text>
      <Text variant="body"style={styles.description} >{description}</Text>
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
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 40,
  },
});
