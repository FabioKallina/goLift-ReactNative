import { Stack } from "expo-router";
import { ColorThemeProvider } from "@/context/ColorThemeContext"

export default function RootLayout() {
  return (
    
    <ColorThemeProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="workoutPopUp"
          options={{ headerShown: false }}
        />
      </Stack>
    </ColorThemeProvider>

  );
}
