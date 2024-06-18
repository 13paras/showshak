import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { images } from "@/constants";

const Custombg = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="bg-transparent w-full h-full bg-none border-none"
      style={{
        backgroundColor: 'white', // Match your app's background color
        width: '100%',
        height: '100%',
      }}
    >
      <Image
        source={images.wave1}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
};

export default Custombg;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 86,
  },
});

/* style={{
        width: "100%",
        height: 86,
        backgroundColor: "#161622",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
      }} */
