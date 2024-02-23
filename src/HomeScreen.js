// HomeScreen.js
import QRCodeScanner from "./QRScanner";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Scanner from "./Scanner";
import { Camera } from "expo-camera";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <QRCodeScanner />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
