import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type FormFieldTypes = {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: string;
  placeholder?: string;
};

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
}: FormFieldTypes) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View className="w-full h-16 px-4 bg-white rounded-2xl border-2 border-blue-200 focus:border-blue-300 ease-in-out duration-150 transition-all flex flex-row items-center mb-4">
        <TextInput
          className="w-full font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={["Password", "ConfirmPassword"].includes(title) && !showPassword}
        />
        {["Password", "ConfirmPassword"].includes(title) && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 right-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default FormField;
