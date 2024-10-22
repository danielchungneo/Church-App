import api from "@/constants/api";
import { Colors } from "@/enum/Colors";
import useGetRequest from "@/hooks/useGetRequest";
import { Ionicons } from "@expo/vector-icons";
import { Badge, BadgeText, Button, ButtonText } from "@gluestack-ui/themed";
import { BellIcon, Center, VStack } from "@gluestack-ui/themed";
import { Link, router } from "expo-router";
import { Touchable, TouchableOpacity } from "react-native";

type NotificationIconProps = {
};

function NotificationIcon({ }: NotificationIconProps) {
    // Getting user notifications
    // const { data: userNotifications, loading: userNotificationsLoading } = useGetRequest(api.users.getUserNotifications());
    
    // ! Temporary to simulate notifications
    const userNotifications = {
        notifications: [],
    }
    const userNotificationsLoading = false

    if (userNotificationsLoading || !userNotifications) {
        return NotificationBell(false)
    }
    const { notifications } = userNotifications

    const isNotifications = notifications?.length > 0
    return (
        NotificationBell(isNotifications)
    );
}

const handleNavigateNotifications = () => {
    router.push("/root/Notifications")
}


function NotificationBell(isNotifications: boolean) {
    return (
        <Center ml={"$3"}>
            <TouchableOpacity onPress={handleNavigateNotifications}>
                <VStack justifyContent="center" alignItems="center" mb={isNotifications ? "$1" : 0}>
                    {isNotifications && (
                        <Badge
                            h={16}
                            w={16}
                            bg="#0077e6"
                            borderRadius="$full"
                            mb={-10}
                            mr={-6}
                            zIndex={1}
                            variant="solid"
                            alignSelf="flex-end"
                        >
                            <BadgeText color="$white" size="xs"></BadgeText>
                        </Badge>
                    )}
                    <Ionicons name="notifications" size={24} color={Colors.TEXT} />
                </VStack>
            </TouchableOpacity>
        </Center>
    )
}

export default NotificationIcon;