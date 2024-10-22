export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
  } from "expo-router";
  
  export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "index",
  };
  
import { Colors } from "@/enum/Colors";
import { defaultHeaderOptions } from "@/enum/ScreenOptions";
  import { Stack } from "expo-router";
  
  export default function AppLayout() {
    return (
      <Stack screenOptions={defaultHeaderOptions}>
        <Stack.Screen name="index" options={{ title: "Notifications", headerTitleStyle: {color: Colors.TEXT} }} />
      </Stack>
    );
  }
  