import React from "react";
import { Linking } from "react-native";
import { AuthNavigationProps } from "../components/Navigation";
import Footer from "./components/Footer";
import { Container, Box, Text, Button } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/Forms/TextInput";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = ({ navigation }: AuthNavigationProps<"ForgotPassword">) => {
  const footer = (
    <Footer
      title="Don't work?"
      action="Try another way"
      onPress={() => Linking.openURL("https://www.google.com")}
    />
  );
  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: ForgotPasswordSchema,
      initialValues: { email: "" },
      onSubmit: () => {
        navigation.navigate("PasswordChanged");
      },
    }
  );
  return (
    <Container pattern={2} {...{ footer }}>
      <Text variant="title1" textAlign="center">
        Forgot password?
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Enter the email address associated with your account
      </Text>
      <Box>
        <Box marginBottom="m">
          <TextInput
            icon="mail"
            placeholder="Enter your email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            autoCompleteType="email"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
          />
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={handleSubmit}
            label="Reset password"
          ></Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
