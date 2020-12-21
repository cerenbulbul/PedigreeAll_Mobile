import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { LoginScreen } from "../screens/LoginScreen";
import { RegistrationScreen } from "../screens/RegistrationScreen";
import { ForgotPassword } from "../screens/ForgotPassword";
import { Country } from "../screens/Country";
import { DetailsComponent } from "../screens/DetailsComponent";
import { MainScreen } from "../screens/MainScreen";

const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const ForgotPasswordStack = createStackNavigator();
const MainStack = createStackNavigator();
const CountryStack = createStackNavigator();
const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });
};

//const SideMenuDrawer = createDrawerNavigator();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}
    >
      
      <AuthStack.Screen name={"Login"}>
        {() => (
          <LoginStack.Navigator
            mode={"card"}
            screenOptions={{
              headerShown: false,
            }}
          >
            <LoginStack.Screen name={"Login"} component={LoginScreen} />
          </LoginStack.Navigator>
        )}
      </AuthStack.Screen>

      <AuthStack.Screen name={"ForgotPassword"}>
        {() => (
          <ForgotPasswordStack.Navigator
            mode={"card"}
            screenOptions={{
              gestureEnabled: false,
            }}
          >
            <ForgotPasswordStack.Screen
              name={"Reset your password"}
              component={ForgotPassword}
            />
          </ForgotPasswordStack.Navigator>
        )}
      </AuthStack.Screen>

      <AuthStack.Screen name={"Countries"}>
        {() => (
          <CountryStack.Navigator
            mode={"card"}
            screenOptions={{
              gestureEnabled: false,
            }}
          >
            <CountryStack.Screen name={"Countries"} component={Country} />
          </CountryStack.Navigator>
        )}
      </AuthStack.Screen>

      <AuthStack.Screen
        name={"DetailsComponent"}
        component={DetailsComponent}
      />

      <RegisterStack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{
          headerTitle: "Register",
          headerShown: true,
        }}
      />

      

    </AuthStack.Navigator>
  );
}
