import React, { useRef } from "react";
import { Container, Button, Text, Box } from "../components";
import { TextInput as RNTextInput } from "react-native";
import TextInput from "../components/Forms/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "./components/Footer";
import { StackNavigationProps, Routes } from "../components/Navigation";

const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref("password")], "Passwords don't match")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const SignUp = ({ navigation }: StackNavigationProps<Routes, 'SignUp'>) => {
  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  );
  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: SignUpSchema,
      initialValues: {
        email: "",
        password: "",
        passwordConfirmation: "",
        remember: true,
      },
      onSubmit: (values) => console.log(values),
    }
  );
  const password = useRef<RNTextInput>(null);
  const passwordConfirmation = useRef<RNTextInput>(null);
  return (
    <Container pattern={1} {...{ footer }}>
      <Box padding="xl">
        <Text variant="title1" textAlign="center">
          Create an account
        </Text>
        <Text variant="body" textAlign="center" marginBottom="l">
          Let’s us know your email and password
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
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => passwordConfirmation.current?.focus()}
            />
          </Box>
          <Box marginBottom="m">
            <TextInput
              ref={password}
              icon="lock"
              placeholder="Enter your Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              autoCompleteType="password"
              autoCapitalize="none"
              returnKeyType="go"
              returnKeyLabel="go"
              onSubmitEditing={() => passwordConfirmation.current?.focus()}
              secureTextEntry
            />
          </Box>

          <Box marginBottom="m">
            <TextInput
              ref={passwordConfirmation}
              icon="lock"
              placeholder="Confirm your Password"
              onChangeText={handleChange("passwordConfirmation")}
              onBlur={handleBlur("passwordConfirmation")}
              error={errors.passwordConfirmation}
              touched={touched.passwordConfirmation}
              autoCompleteType="password"
              autoCapitalize="none"
              returnKeyType="go"
              returnKeyLabel="go"
              onSubmitEditing={() => handleSubmit()}
              secureTextEntry
            />
          </Box>
          <Box alignItems="center" marginTop="m">
            <Button
              variant="primary"
              onPress={handleSubmit}
              label="Create an account"
            ></Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
