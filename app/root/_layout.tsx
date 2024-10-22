export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/enum/Colors";
import { defaultHeaderOptions } from "@/enum/ScreenOptions";
import { Stack, router, usePathname } from "expo-router";
import { useEffect } from "react";
import { useAppState } from '@react-native-community/hooks';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AppLayout() {
  const pathname = usePathname();
  const currentAppState = useAppState();

  const { logout } = useAuth();

  async function handleAppStateChange(nextAppState: any) {
    if (nextAppState === 'background') {
      await AsyncStorage.setItem('lastClosedTime', new Date().toISOString());
    }
    else if (nextAppState === 'active') {
      const lastClosedTime = await AsyncStorage.getItem('lastClosedTime');
      if (lastClosedTime === null) return;
      const currentTime = new Date().toISOString();

      // If the last closed time is more than 2 hours ago, logout
      const lastClosedTimeDate = new Date(lastClosedTime);
      const currentTimeDate = new Date(currentTime);

      const diff = currentTimeDate.getTime() - lastClosedTimeDate.getTime();
      const diffInMinutes = diff / 1000 / 60;

      if (diffInMinutes > 120) {
        router.dismissAll();
      }

    }

  }

  useEffect(() => {
    handleAppStateChange(currentAppState)
  }, [currentAppState])


  

  return (
    <Stack
      screenOptions={{headerShown: false}}
      >
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  );
}
