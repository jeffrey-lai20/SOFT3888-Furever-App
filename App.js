import * as React from "react";
import LandingPage from "./app/views/landingPage";
import Login from "./app/views/login";
import SignUp from "./app/views/signup";
import Home from "./app/views/home";
import HeaderLogo from "./app/views/HeaderLogo";
import PasswordRecoveryPage from "./app/views/passwordRecoveryPage";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Pet Search"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#447ECB",
            },
            headerTitle: <HeaderLogo />,
            headerTitleStyle: {
              alignSelf: "center",
              flex: 1,
              paddingBottom: Platform.OS === "web" ? 0 : 5,
            },
            headerTitleContainerStyle: { left: 0, right: 0 },
          }}
        />
        <Stack.Screen
          name="Forgot Password"
          component={PasswordRecoveryPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
