// Otp.js
import "react-native-gesture-handler";

import React, { useState, useRef } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import HomeScreen from "./HomeScreen";// Adjust the path if necessary

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";

const Otp = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const sendVerification = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const id = await phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then((id) => {
          setVerificationId(id); // Set verificationId state
          console.log("Verification ID:", id); // Log verification ID for debugging
          setShowOtpInput(true); // Show OTP input and button after sending verification
        })
        .catch((error) => console.error("Phone verification error:", error));
      setVerificationId(id);
      console.log("Verification ID:", id);
    } catch (error) {
      console.error("Phone verification error:", error);
      Alert.alert("Error", "Wrong verification code");
    }
    setPhoneNumber("");
  };

  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      //   await fi

      firebase.auth().signInWithCredential(credential);
      setCode("");
      navigation.navigate("Home"); // Navigate to home screen on successful login
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to confirm verification code");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.optText}>Login using OTP</Text>
      <TextInput
        placeholder="Phone Number with Country Code"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        style={styles.textInput}
        textContentType="telephoneNumber"
        autoFocus
      />
      <TouchableOpacity
        style={styles.sendVerification}
        onPress={sendVerification}
      >
        <Text style={styles.buttonText}>Send Verification</Text>
      </TouchableOpacity>
      {/* Conditionally render OTP input and button based on showOtpInput state */}
      {showOtpInput && (
        <>
          <TextInput
            autoFocus
            placeholder="Enter OTP"
            onChangeText={setCode}
            keyboardType="number-pad"
            style={styles.OtpInput}
            placeholderTextColor="#eee"
          />
          <TouchableOpacity style={styles.senCode} onPress={confirmCode}>
            <Text style={styles.buttonText}>Confirm Verification</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "honeydew",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingTop: 15,
    paddingBottom: 2,
    paddingHorizontal: 20,
    fontSize: 17,
    // borderBottomColor: "pink",
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: "center",
    borderColor: "lightblue",
    borderWidth: 2,
    width: "82%",
    color: "blue",
    borderRadius: 25,
  },
  OtpInput: {
    paddingTop: 15,
    paddingBottom: 2,
    paddingHorizontal: 20,
    fontSize: 17,
    // borderBottomColor: "pink",
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: "center",
    borderColor: "lightblue",
    borderWidth: 2,
    width: "82%",
    color: "blue",
    borderRadius: 25,
  },
  sendVerification: {
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    borderColor: "lightblue",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 10,
  },
  senCode: {
    padding: 20,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  optText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "yellow",
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 20,
    marginTop: 10,
  },
});
