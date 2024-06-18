import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Icon, IconProps } from "@expo/vector-icons/build/createIconSet";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={` w-[91%] mx-auto rounded-full min-h-[50px] items-center justify-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
      disabled={isLoading}
    >
      <Text
        className={`text-white font-psemibold text-base ${textStyles} `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
