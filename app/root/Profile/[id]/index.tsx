import PressableOpacity from "@/components/FormInputs/StyledInputs/PressableOpacity";
import MainContainer from "@/components/MainContainer";
import api from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/enum/Colors";
import useCrudRequest from "@/hooks/useCrudRequest";
import useGetRequest from "@/hooks/useGetRequest";
import { formatUsersName } from "@/utils/data";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Center, Heading, Divider, ButtonText, Button, Box, Avatar, AvatarFallbackText, VStack, Badge, Icon, AvatarImage, HStack, ScrollView } from "@gluestack-ui/themed";
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { CameraIcon } from "lucide-react-native";
import Toast from "react-native-toast-message";

export default function ProfileScreen(props: any) {

    const { sessionInfo } = useAuth();
    const activeUserId = sessionInfo.id;

    const localParams = useLocalSearchParams();
    const { id: userId } = localParams;

    // const { data: userProfile, loading: userProfileLoading, mutate: revalidateUserProfile } = useGetRequest(api.users.getUserProfile({
    //     query: {
    //         id: userId,
    //     }
    // }));

    function onSuccess(data: any) {
        // revalidateUserProfile();
    }
    function onError(errors: any) {
        Toast.show({
            type: 'error',
            text1: 'Error Saving Entry',
            text2: errors[0].message,
        });
    }



    const isActiveUserId = activeUserId === userId;




    return (
        <MainContainer>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <VStack space="lg">
                    <Center>
                        <Text>Hi Profile Person</Text>
                    </Center>
                </VStack>
            </ScrollView>
        </MainContainer >
    );
}
