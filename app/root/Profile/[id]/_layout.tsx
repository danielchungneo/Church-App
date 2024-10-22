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
  import { Feather } from "@expo/vector-icons";
  import { Stack, router, usePathname } from "expo-router";
  import { TouchableOpacity } from "react-native";
  
  export default function AppLayout() {
    
    return (
      <Stack screenOptions={{...defaultHeaderOptions, headerShown: false}}>
        <Stack.Screen name="index" options={{ headerShown: true, title: "User Profile"}} />
      </Stack>
    );
  }
  