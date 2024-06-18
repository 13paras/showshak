import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, router } from "expo-router";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(0, 83, 219)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(219, 225, 255)",
    onPrimaryContainer: "rgb(0, 23, 75)",
    secondary: "rgb(89, 94, 114)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(221, 225, 249)",
    onSecondaryContainer: "rgb(22, 27, 44)",
    tertiary: "rgb(116, 84, 112)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 214, 248)",
    onTertiaryContainer: "rgb(43, 18, 43)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(254, 251, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(254, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(226, 226, 236)",
    onSurfaceVariant: "rgb(69, 70, 79)",
    outline: "rgb(117, 118, 128)",
    outlineVariant: "rgb(197, 198, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(242, 240, 244)",
    inversePrimary: "rgb(180, 197, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(241, 243, 253)",
      level2: "rgb(234, 238, 252)",
      level3: "rgb(226, 233, 251)",
      level4: "rgb(224, 231, 251)",
      level5: "rgb(218, 228, 250)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(46, 48, 56, 0.4)",
  },
};

const RootLayout = () => {
  // Load fonts
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("@/assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="search/[query]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="referal/[query]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </Provider>
  );
};

export default RootLayout;
