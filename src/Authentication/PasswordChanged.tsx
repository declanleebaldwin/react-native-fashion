import React from "react";

import { StackNavigationProps, AuthenticationRoutes } from "../components/Navigation";
import { Container, Box, Text, Button, RoundedIcon } from "../components";
import RoundedIconButton from "../components/RoundedIconButton";
const SIZE = 80;
const PasswordChanged = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "PasswordChanged">) => {
  return (
    <Container
    pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center" marginBottom="m">
          <RoundedIconButton backgroundColor="white" color="secondary" name="x" size={60} onPress={() => navigation.pop()}/>
        </Box>
      }
    >
      <Box flex={1} padding="xl" justifyContent="center" alignItems="center">
        <RoundedIcon name="check" size={SIZE} backgroundColor="primaryLight" color="primary"/>
        <Text variant="title1" textAlign="center" marginVertical="l">
          Your password was succesfully changed
        </Text>
        <Text variant="body" textAlign="center" marginBottom="l">
          Close this window and login again
        </Text>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={() => navigation.navigate("Login")}
            label="Login again"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordChanged;
