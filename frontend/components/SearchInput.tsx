import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { router, usePathname } from "expo-router";
import { icons } from "@/constants";
import { AntDesign } from "@expo/vector-icons";

const SearchInput = () => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  return (
    <View className="w-full h-16 px-4 bg-white rounded-2xl border-2 border-blue-200 focus:border-blue-300 ease-in-out duration-150 transition-all flex flex-row items-center mb-4">
      <TextInput
        className="text-base mt-0.5 text-black flex-1 font-pregular"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <AntDesign name="search1" size={28} color={'gray'} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
