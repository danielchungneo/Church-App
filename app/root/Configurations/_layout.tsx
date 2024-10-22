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
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Button, ButtonText, HStack } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams, usePathname } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function AppLayout() {

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.SECONDARY,
        },
        headerLeft: () => <BackButton />,
        headerShown: false,
      }}>
      <Stack.Screen name="routeLocations/index" options={{ headerShown: true, title: "Route Locations" }} />
      <Stack.Screen name="routeTags/index" options={{ headerShown: true, title: "Route Tags" }} />
      <Stack.Screen name="grades/index" options={{ headerShown: true, title: "Grades" }} />
      <Stack.Screen name="routeTypes/index" options={{ headerShown: true, title: "Route Types" }} />
      <Stack.Screen name="routeColors/index" options={{ headerShown: true, title: "Route Colors" }} />
      <Stack.Screen name="gyms/index" options={{ headerShown: true, title: "Gyms", headerRight: () => null }} />
      <Stack.Screen name="usersManagement/index" options={{ headerShown: true, title: "User Management", headerRight: () => null }} />
    </Stack>
  );
}

