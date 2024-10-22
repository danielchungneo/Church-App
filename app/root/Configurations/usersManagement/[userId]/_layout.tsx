export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
  } from "expo-router";
  
  export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
  };
  
import BackButton from "@/components/HeaderComponents/BackButton";
  import { Colors } from "@/enum/Colors";
  import { Stack, router, useLocalSearchParams, usePathname } from "expo-router";
  
  export default function AppLayout() {
    const {userId} = useLocalSearchParams()  
  
    return (
      <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.SECONDARY,
        },
        headerLeft: () => <BackButton />,
        headerShown: false,
      }}>
        <Stack.Screen name="index" options={{ headerShown: true, title: userId === "create" ? "Add User" : "Edit User"}} />
      </Stack>
    );
  }
  