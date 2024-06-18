import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Button } from "react-native-paper";
import * as Linking from "expo-linking";
import { activationLinks } from "@/utils/data"; // Adjust this import according to your project structure

interface ActivationLink {
  name: string;
  link: string;
}

const Search: React.FC = () => {
  const { query } = useLocalSearchParams<{ query: string }>();
  const [data, setData] = useState<ActivationLink[]>([]);

  useEffect(() => {
    if (query) {
      const filteredData = activationLinks.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData([]);
    }
  }, [query]);

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <SafeAreaView style={{ padding: 16 }} className="bg-blue-100 h-full">
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          marginBottom: 16,
          color: "#000",
        }}
      >
        Results for "{query}"
      </Text>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(`https://${item.link}`)}
            className="m-1 flex-1 flex-col"
          >
            <Button
              mode="contained"
              style={{
                marginBottom: 8,
                paddingVertical: 8,
                backgroundColor: "#FFA500",
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                {item.name}
              </Text>
            </Button>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={{ marginVertical: 24, paddingHorizontal: 16 }}>
              <Text className="text-2xl font-psemibold text-black-100">
                Searched Results for '{query}''
              </Text>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={{ marginVertical: 40 }}>
            <Text style={{ fontWeight: "500", color: "#A9A9A9", fontSize: 14 }}>
              No results found
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                marginTop: 4,
                color: "#FFF",
              }}
            >
              {query}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
