import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { resetUser } from "@/redux/slices/userSlice";
import { router } from "expo-router";

const Profile = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  const logoutHandler = async () => {
    try {
      // Clear user token from AsyncStorage
      await AsyncStorage.removeItem("jwt");
      await AsyncStorage.removeItem("userId");

      // Update Redux state to reset user data
      dispatch(resetUser());

      Alert.alert("Success", "User Logged Out Successfully");
      // Optionally navigate to login screen
      // navigation.navigate('Login'); // Uncomment and adjust this line if using react-navigation
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", "Failed to log out");
    }
  };
  return (
    <SafeAreaView className="h-full bg-blue-100 w-full">
      <View className="bg-blue-500 space-y-6 px-4 h-[30%] items-center justify-center">
        <View className="">
          <Text className="text-3xl font-psemibold text-white">ShowShak</Text>
        </View>

        <View className="bg-blue-200  rounded-full w-fit p-5">
          <Text className="text-3xl font-pbold">PK</Text>
        </View>
      </View>

      <View className="mt-14 mx-10">
        <FormField
          title="Email"
          handleChangeText={(e) => setForm({ ...form, email: e })}
          value={form.email}
          placeholder="Email"
        />
        <FormField
          title="Password"
          handleChangeText={(e) => setForm({ ...form, password: e })}
          value={form.password}
          placeholder="Password"
        />
        <FormField
          title="New Password"
          handleChangeText={(e) => setForm({ ...form, newPassword: e })}
          value={form.newPassword}
          placeholder="New Password"
        />

        <CustomButton
          title="Update Password"
          containerStyles="bg-blue-500 mt-6"
          handlePress={() => ""}
        />
        <CustomButton
          title="Logout"
          containerStyles="bg-red-500 mt-6"
          handlePress={logoutHandler}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
