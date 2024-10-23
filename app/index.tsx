import LoginBlock from "@/components/LoginBlock";
import LogoBlock from "@/components/LoginScreenComponents/LogoBlock";
import SubmitBlock from "@/components/LoginScreenComponents/SubmitBlock";
import {
  Box,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from 'expo-updates';

import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from 'expo-router';
import { useAuth } from "@/context/AuthContext";
import LinearGradientBackground from "@/components/LinearGradientBackground";
import useCrudRequest from "@/hooks/useCrudRequest";
import api from "@/constants/api";
import { AppState, Platform, TouchableOpacity } from "react-native";
import { Colors } from "@/enum/Colors";
import UpdateModal from "@/components/Modals/UpdateModal";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useAppState } from "@react-native-community/hooks";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const currentAppState = useAppState();
  getPushNotificationPermissions();

  // Login api call
  // const {
  //   data,
  //   loading,
  //   errors,
  //   submitRequest: submitForm,
  // } = useCrudRequest(api.session.login(), {
  //   onSuccess: onLoginSuccess,
  //   onError: onLoginFailure,
  // });

  // ! Temporary to simulate login screen auth
  const loading = false
  const submitForm = (loginInfo: any) => {
    console.log("Login data", loginInfo);
    router.push({ pathname: "/root/home" });
  }



  const auth = useAuth()
  const { handleLoginSuccess } = auth

  async function onLoginSuccess(data: any) {
    await handleLoginSuccess(data);

    // ! Onboarding flow
    //  if (!data?.firstName) {
    //   // Onboarding flow
    //   router.push("/tabs/Onboarding")
    // } else {
    //   router.push({ pathname: "/tabs/home" });
    // }
    router.push({ pathname: "/root/home" });
  };

  function onLoginFailure(response: any) {
    const message = response?.[0].Message;
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: message,
      position: "bottom",
    })
  };

  const handleLogin = async () => {
    // ! Get Expo push notification token
    const pushNotificationToken = await registerForPushNotificationsAsync();
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Login Credentials are incorrect',
      })
    } else {
      if (isRememberMe) {
        await AsyncStorage.setItem("lastUser", JSON.stringify({ email, password }));
      }
      submitForm({ email, password, pushNotificationToken });
    }
  }

  async function getPushNotificationPermissions() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
      }
    }
  }

  const getRememberMeCredentials = async () => {
    const lastUser = await AsyncStorage.getItem("lastUser");
    if (lastUser != null) {
      const user = JSON.parse(lastUser);
      setEmail(user.email);
      setPassword(user.password);
      setIsRememberMe(true);
    }
  }

  useEffect(() => {
    getRememberMeCredentials();
  }, [])

  const {
    isUpdateAvailable,
    isUpdatePending,

  } = Updates.useUpdates();


  // ! Check for OTA Updates flow
  // const checkForUpdates = async () => {
  //   const update = await Updates.checkForUpdateAsync();
  //   if (update.isAvailable) {
  //     Updates.fetchUpdateAsync()
  //   }
  // }

  // useEffect(() => {
  //   if (isUpdatePending) {
  //     // Update has successfully downloaded; apply it now
  //     Updates.reloadAsync();
  //   }
  // }, [isUpdatePending]);

  // useEffect(() => {
  //   if (currentAppState === 'active') {
  //     checkForUpdates()
  //   }
  // }, [currentAppState])

  // ! Clearing async if the app gets locked up
  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, [])

  // ! Handling Push Notifications Setup
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return null;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        return null;
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        return pushTokenString;
      } catch (e: unknown) {
        console.log("Error getting push token", e);
        return null;
      }
    } else {
      console.log("Must have physical device for Push Notifications");
      return null;
    }
  }

  return (
    <LinearGradientBackground>
      <SafeAreaView flex={1} padding={20} >
        <KeyboardAvoidingView flex={1} behavior="padding">
          <ScrollView scrollEnabled={true} bounces={false}>
            <UpdateModal showModal={isUpdateAvailable} />
            <Box flex={1} paddingHorizontal={"$5"} justifyContent="center" alignItems="center">
              <VStack space="md" flex={1} w={"$full"}>
                <LogoBlock />
                <LoginBlock email={email} setEmail={setEmail} password={password} setPassword={setPassword} isInvalidCredentials={isInvalidCredentials} isRememberMe={isRememberMe} setIsRememberMe={setIsRememberMe} />
                <SubmitBlock handleLogin={handleLogin} loading={loading} />
              </VStack>
            </Box>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradientBackground>
  );
}
