import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuth } from "@/context/AuthContext";
import ProfileIcon from "@/components/HeaderComponents/ProfileIcon";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "@/enum/Colors";
import NotificationIcon from "@/components/HeaderComponents/NotificationIcon";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthorizeComponent, hasUserRoles } from "@/utils/data";
import { USER_ROLES } from "@/enum/Roles";
import useGetRequest from "@/hooks/useGetRequest";
import api from "@/constants/api";
import { PortalProvider } from "@gorhom/portal";




function TabBarIcon({ iconLibrary = "FontAwesome", ...props }: {
  iconLibrary?: "FontAwesome" | "FontAwesome5";
  name: React.ComponentProps<typeof FontAwesome | typeof FontAwesome5>["name"];
  color: string;
}) {
  if (iconLibrary === "FontAwesome5") {
    return <FontAwesome5 size={18} style={{ marginBottom: -3 }} {...props} />;
  } else {
    return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
  }
}

type TabLayoutProps = {
};

function RouteHeaderRight() {
  return (
    <HStack>
      <ProfileIcon />
    </HStack>
  )

}

export default function TabLayout({ }: TabLayoutProps) {

  // Here there will be an api call to get the user information


  return (
    <>
      <Tabs
        screenOptions={{
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          headerLeft: () => {
            return (
              <HStack alignItems="center" space="lg">
                <NotificationIcon />
              </HStack>
            )
          },
          headerRight: () => {
            return (
              <HStack>
                <ProfileIcon />
              </HStack>
            )
          },
          tabBarStyle: {
            backgroundColor: Colors.SECONDARY,
          },
          headerStyle: {
            backgroundColor: Colors.SECONDARY,
          },

        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerTitleStyle: {
              color: Colors.TEXT,
            },
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerTitleStyle: {
              color: Colors.TEXT,
            },
            tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
            href: {
              pathname: "/root/settings",
            }
          }}
        />
      </Tabs>
    </>
  );
}
