import React from "react";
import SocialLogin from "./SocialLogin";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Box, Text } from "../../components/Theme";

interface FooterProps {
  onPress: () => void;
  title: string;
  action: string;
}

const Footer = ({ onPress, title, action }: FooterProps) => {
  return (
    <>
      <SocialLogin />
      <Box alignItems="center" marginVertical="m">
        <TouchableWithoutFeedback {...{onPress}}>
          <Text variant="button" color="white">
            <Text>{`${title} `}</Text>
            <Text variant="button" color="primary" marginLeft="s">
              {action}
            </Text>
          </Text>
        </TouchableWithoutFeedback>
      </Box>
    </>
  );
};

export default Footer;
