import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { TextInput } from "react-native-paper";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const Referal = () => {
  return (
    <SafeAreaView className="bg-blue-100 h-full">
      <StatusBar backgroundColor="#202020" style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex"
      >
        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="relative left-[40%] top-10 flex-row items-center gap-2"
        >
          <Text className="text-xl font-pregular">Skip</Text>
          <AntDesign name="arrowright" size={28} />
        </TouchableOpacity>
        <View className="w-full justify-center min-h-[85vh] px-4 py-6">
          <Text className="text-3xl font-psemibold text-center mb-10">
            Referral
          </Text>
          <View className="space-y-4">
            {/* <TextInput
        style={styles.bgColor}
        mode="outlined"
        label={"Referral"}
        // placeholder="Please Enter Referral code"
        /> */}
            <TextInput
              placeholder="Please Enter Referral Code"
              className="w-[91%] mx-auto bg-white h-16 focus:border-blue-300  rounded-2xl pl-4 border focus:border-2 border-blue-300 ease-in-out duration-150 transition-all mb-10"
            />
          </View>
          <CustomButton
            title="Submit"
            handlePress={() => ""}
            containerStyles="bg-blue-600"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Referal;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: "white",
    color: "black",
    marginBottom: 40,
  },
});
