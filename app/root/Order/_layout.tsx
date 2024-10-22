export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
  } from "expo-router";
  
  export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
  };
  
  import { defaultHeaderOptions } from "@/enum/ScreenOptions";
  import { Stack, usePathname } from "expo-router";
  
  export default function AppLayout() {
    const pathname = usePathname();
  
  
    return (
      <Stack
        screenOptions={{headerShown: false}}>
      </Stack>
    );
  }
  