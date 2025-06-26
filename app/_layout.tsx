import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const myTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "white",
    },
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#000", // dark background for white icons
        // paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
      }}
    >
      <StatusBar style="light" />
      <ThemeProvider value={myTheme}>
        <PaperProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* Screens go here */}
          </Stack>
        </PaperProvider>
      </ThemeProvider>
    </View>
  );
}
