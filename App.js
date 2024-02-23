// App.js

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Otp from "./src/index";
import HomeScreen from "./src/HomeScreen";
const Stack = createStackNavigator();
import "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Otp">
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{ title: "OTP Verification" }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
