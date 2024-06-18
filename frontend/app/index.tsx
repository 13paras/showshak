import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { Link, Redirect, router } from "expo-router";
import { images } from "@/constants";
import { Checkbox, Divider, Text as PText } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

const index = () => {
  const [checked, setChecked] = useState(false);
  const { isAuthenticated, loading } = useIsAuthenticated();

  if (!loading && isAuthenticated) return <Redirect href={"/home"} />;

  return (
    <>
      <SafeAreaView className="bg-blue-100 h-full">
        <StatusBar backgroundColor="#202020" style="light" />
        <ScrollView>
          <View className=" w-full justify-center min-h-[85vh] px-4 py-6">
            <View className=" space-y-4 ">
              <Text className="text-3xl mb-4 text-center text-black font-psemibold">
                Signup
              </Text>

              <CustomButton
                title="With Email"
                handlePress={() => router.push("/sign-up")}
                containerStyles="bg-blue-600"
              />
            </View>

            <Text className={`mx-2 text-zinc-600 text-center my-6`}>OR</Text>

            <View className="mx-4">
              <TouchableOpacity className="bg-white shadow-sm w-[91%] mx-auto flex-row rounded-full flex items-center justify-center min-h-[60px]">
                <Image source={images.googleIcon} className="h-8 w-8" />
                <Text className="text-balck font-psemibold  ml-2">
                  Sign in with google
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex mt-4 items-center justify-center flex-row">
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                color="#2763eb"
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text>Accept terms and conditions</Text>
            </View>

            <Divider className="my-7" />

            {/* <View className=" my-7 border-0.5 border-zinc-600"></View> */}

            <View className=" flex items-center gap-2">
              <PText className=" text-black font-pregular mb-4">
                Already have an account ?
              </PText>
              <CustomButton
                title="Log in"
                handlePress={() => router.push("/sign-in")}
                containerStyles="bg-blue-600"
              />
            </View>

            {/* //! Will be removed later only for development */}
            <View className="space-y-4 mt-6 ">
              <Link
                href={"/referal/[query]"}
                className="text-lg font-psemibold text-violet-600"
              >
                Referal
              </Link>
              <Link
                href={"/home"}
                className="text-lg font-psemibold text-violet-600"
              >
                Home
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default index;
