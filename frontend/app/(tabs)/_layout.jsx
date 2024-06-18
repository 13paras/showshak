import React, { useEffect } from "react";
import { Tabs, router } from "expo-router";
import TabBar from "@/components/TabBar";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

const TabsLayout = () => {
  /* const { isAuthenticated } = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, []); */
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          /* 
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ), */
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          /* tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ), */
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          headerShown: false,
          /* tabBarIcon: ({ color }) => (
            <AntDesign name="meho" size={24} color={color} />
          ), */
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
