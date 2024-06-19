import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Link,
  Redirect,
  router,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import { Button, TextInput as PaperInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useGetUserQuery } from "@/redux/api/user.api";
import { activationLinks } from "@/utils/data";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JwtPayload, jwtDecode } from "jwt-decode";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import { CustomPayload } from "@/types/types";
import { useSelector } from "react-redux";
import SearchInput from "@/components/SearchInput";

const Home = () => {
  const pathname = usePathname();
  const [id, setId] = useState("");
  const { data } = useGetUserQuery(id);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { isAuthenticated, loading } = useIsAuthenticated();

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Failed to open the URL.")
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("jwt");

      if (token) {
        const decodedToken = jwtDecode<CustomPayload>(token);
        const userId = decodedToken.userId;
        setId(userId);
        // console.log(userId);
      }
    };
    fetchUser();
  }, []);

  // if (!loading && isAuthenticated) return <Redirect href={"/"} />;

  // console.log(search);
  return (
    <SafeAreaView className="bg-blue-50 h-full mx-1">
      <StatusBar backgroundColor="#202020" style="light" />
      <FlatList
        data={activationLinks.slice(0, 4)}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(`https://${item.link}`)}
            className="m-1 flex-1 flex-col"
          >
            <Button
              mode="contained-tonal"
              className="mb-2 py-2 bg-orange-400 rounded-md"
            >
              <Text className="uppercase text-lg font-pmedium">
                {item.name}
              </Text>
            </Button>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="flex my-6 px-4">
              <View className="flex justify-between items-center flex-row mb-12">
                <View>
                  <Text className="text-2xl font-psemibold ">Showshak</Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/profile")}
                  className="bg-violet-100 cursor-pointer rounded-full p-2"
                >
                  <AntDesign name="user" size={32} />
                </TouchableOpacity>
              </View>
              <SearchInput />
              {/* <View className="max-w-[80%] mx-auto bg-blue-100 h-14 rounded-t mb-14 w-full border-b border-b-zinc-600 focus:border-b-blue-500 ">
                <TextInput
                  value={query}
                  onChangeText={(value) => setQuery(value)}
                  placeholder="Search"
                  style={{
                    flex: 1,
                    fontSize: 18,
                    fontWeight: "400",
                    paddingHorizontal: 10,
                  }}
                />
                <TouchableOpacity
                  className="absolute right-[6%] top-4"
                  onPress={() => {
                    if (
                      !query ||
                      (Array.isArray(query) && query.length === 0)
                    ) {
                      return Alert.alert(
                        "Missing Query",
                        "Please input something to search results across database"
                      );
                    }

                    const queryString = Array.isArray(query)
                      ? query.join(",")
                      : query;

                    if (pathname.startsWith("/search")) {
                      router.setParams({ query: queryString });
                    } else {
                      router.push(`/search/${queryString}`);
                    }
                  }}
                >
                  <AntDesign name="search1" size={28} color={"gray"} />
                </TouchableOpacity>
              </View> */}
            </View>
          </KeyboardAvoidingView>
        )}
      />
      {/* <StatusBar backgroundColor="white" style="light" /> */}
      {/* <Image source={images.wave1} className="w-full h-full mt-10" /> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    position: "relative",
  },
  input: {
    height: 40,
    fontSize: 16,
    color: "blue",
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  },
});
