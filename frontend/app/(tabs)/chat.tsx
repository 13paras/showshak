import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import { Redirect } from "expo-router";

const Chat = () => {
  const { loading, isAuthenticated } = useIsAuthenticated();

  if (!loading && isAuthenticated) return <Redirect href={"/sign-in"} />;
  return (
    <SafeAreaView>
      <Text>Chat</Text>
      <SearchInput />
    </SafeAreaView>
  );
};

export default Chat;
