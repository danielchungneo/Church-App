import EditScreenInfo from "@/components/EditScreenInfo";
import FriendRequests from "@/components/FriendRequests";
import MainContainer from "@/components/MainContainer";
import NotificationMessages from "@/components/NotificationMessages";
import api from "@/constants/api";
import useCrudRequest from "@/hooks/useCrudRequest";
import useGetRequest from "@/hooks/useGetRequest";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Center, Heading, Divider, ButtonText, Button, Box, HStack, VStack, ScrollView } from "@gluestack-ui/themed";
import { router, useFocusEffect, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import * as Notifications from 'expo-notifications';
import { Colors } from "@/enum/Colors";

export default function NotificationsScreen(props: any) {

  // const { data: userNotifications, loading: userNotificationsLoading, mutate: revalidateUserNotifications } = useGetRequest(api.users.getUserNotifications());


  const notifications = []

  const isNotifications = notifications?.length > 0

  const resetBadgeCount = async () => {
    await Notifications.setBadgeCountAsync(0);
  }


  // if (userNotificationsLoading) {
  //   return <MainContainer loading />
  // }



  return (
    <MainContainer>
      <ScrollView bounces={false}>
        <VStack justifyContent="center" alignItems="center" space="2xl">
          <MaterialCommunityIcons name="bell-off" size={100} color={Colors.TEXT} />
          <Text color={Colors.TEXT} size="2xl">You're all caught up on notifications!</Text>
        </VStack>
      </ScrollView>
    </MainContainer>
  );
}
