import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
  Linking,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";

const QRCodeScanner = () => {
  const [url, setUrl] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScannerActive, setIsScannerActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log("Scanned URL:", data); // Log the scanned URL
    setUrl(data); // Update the URL state with the scanned data
    setIsScannerActive(false);
    // Disable the scanner after successful scan
    Linking.openURL(data);
  };

  const toggleScanner = () => {
    setIsScannerActive(!isScannerActive);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={styles.btn}
        title={isScannerActive ? "Close Scanner" : "Scan QR Code"}
        onPress={toggleScanner}
        disabled={!hasPermission}
      />
      {isScannerActive && (
        <Camera onBarCodeScanned={handleBarCodeScanned} style={styles.camera} />
      )}

      {url && (
        <WebView
          source={{ uri: url }} // Render WebView with the scanned URL
          onError={(error) => Alert.alert("Error", error.description)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    height: Dimensions.get("window").width * 0.9, // Adjust the height according to your preference
    width: Dimensions.get("window").width * 0.9, // Use 90% of the screen width
    aspectRatio: 1, // Maintain aspect ratio to prevent distortion
  },
  btn: {
    margin: 20,
    marginBottom: 50,
  },
});

export default QRCodeScanner;
