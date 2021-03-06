import "react-native-gesture-handler";
import * as React from "react";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./src/components/Theme";
import { AuthenticationNavigator } from "./src/Authentication";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadAssets } from "./src/components";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavigator, assets as homeAssets } from "./src/Home";
import { AppRoutes } from "./src/components/Navigation";
const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts }}>
        <SafeAreaProvider>
          <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Home" component={HomeNavigator} />
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}
