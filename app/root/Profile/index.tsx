import UncontrolledSwitch from "@/components/FormInputs/Uncontrolled/UncontrolledSwitch";
import MainContainer from "@/components/MainContainer";
import DeleteModal from "@/components/Modals/DeleteModal";
import api from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/enum/Colors";
import useCrudRequest from "@/hooks/useCrudRequest";
import useGetRequest from "@/hooks/useGetRequest";
import { formatUsersName } from "@/utils/data";
import { Text, Center, Heading, Divider, ButtonText, Button, Box, Avatar, AvatarFallbackText, VStack, Badge, Icon, AvatarImage, set } from "@gluestack-ui/themed";
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Linking } from "react-native";
import { useAppState } from '@react-native-community/hooks';
import { userProfileMockData } from "@/enum/Mockdata";


export default function ProfileScreen(props: any) {

  const auth = useAuth();
  const { logout } = auth;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleLogout = () => {
    // logout();
    router.navigate("/");
  }

  const currentAppState = useAppState();

  const localParams = useLocalSearchParams();
  const { username } = localParams;

  function onSuccess(data: any) {
    setShowDeleteModal(false);
    logout();
  }
  function onError(errors: any) {
    Toast.show({
      type: 'error',
      text1: 'Error Saving Entry',
      text2: errors[0].message,
    });
  }

  const userProfile = {...userProfileMockData}


  return (
    <MainContainer >
      {/* <DeleteModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        handleConfirmDelete={handleDeleteAccount}
        titleText="Delete Account"
        descriptionText="Are you sure you want to delete your account? This action cannot be undone."
        deleting={deactivatingAccount}
      /> */}
      <VStack flex={1} space="md">
        <Center>
          <Avatar size="2xl" bgColor="$indigo600">
            <AvatarFallbackText>{formatUsersName(userProfile)}</AvatarFallbackText>
            <AvatarImage source={{ uri: userProfile?.imageUri }} alt="profile-image" />
          </Avatar>
        </Center>
        <VStack space="md" justifyContent="center" alignItems="center">
          <Box>
            <Text color={Colors.TEXT} size="2xl" lineHeight={0}>{formatUsersName(userProfile)}</Text>
          </Box>
            <Button onPress={handleLogout} bgColor={Colors.INFORMATION}>
              <ButtonText color="$white">Logout</ButtonText>
            </Button>
          <Divider marginVertical={30} width="100%" />
        </VStack>
      </VStack>
      <Box marginVertical="$4">
        <Button size="lg" variant="outline" action="negative" onPress={() => setShowDeleteModal(true)}>
          <ButtonText>Delete Account</ButtonText>
        </Button>
      </Box>
    </MainContainer>
  );
}
