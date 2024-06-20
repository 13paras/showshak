import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "@/redux/slices/userSlice";
import { router } from "expo-router";
import {
  useGetUserQuery,
  useUpdateUserPasswordMutation,
} from "@/redux/api/user.api";
import { RootState } from "@reduxjs/toolkit/query";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  // const user_id = "";
  const [updatePassword] = useUpdateUserPasswordMutation();
  /* 
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("jwt");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      user_id = userId;
      console.log(user_id);
    };
    fetchUser();
  }, []); */

  /*   const { data, isLoading } = useGetUserQuery(user_id);
  console.log("Data: ", data); */

  const updatePasswordHandler = async () => {
    if (!form.email || !form.currentPassword || !form.newPassword) {
      Alert.alert(
        "Error",
        "Please enter email, current password, and new password"
      );
      return;
    }

    try {
      const { email, currentPassword, newPassword } = form;

      console.log("Before response");
      const response = await updatePassword({
        email: email,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }).unwrap();
      console.log("After response");

      console.log("update pass ", response);
      if (response.error) {
        Alert.alert("Error", response?.message || "Failed to update password");
      } else {
        Alert.alert(
          "Success",
          `${response.message} and your New Password is ${newPassword}` ||
            `Password updated successfully and your New Password is ${newPassword}`
        );
        setForm({
          email: "",
          currentPassword: "",
          newPassword: "",
        });
      }
    } catch (error) {
      console.log(error?.data?.message);
      Alert.alert("Error", error?.data?.message || "Failed to update password");
    }
  };

  const logoutHandler = async () => {
    try {
      // Clear user token from AsyncStorage
      await AsyncStorage.removeItem("jwt");

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
          handleChangeText={(e) => setForm({ ...form, currentPassword: e })}
          value={form.currentPassword}
          placeholder="Current Password"
        />
        <FormField
          title="Password"
          handleChangeText={(e) => setForm({ ...form, newPassword: e })}
          value={form.newPassword}
          placeholder="New Password"
        />

        <CustomButton
          title="Update Password"
          containerStyles="bg-blue-500 mt-6"
          handlePress={updatePasswordHandler}
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
