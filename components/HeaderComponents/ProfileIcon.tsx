import api from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import { userProfileMockData } from "@/enum/Mockdata";
import useGetRequest from "@/hooks/useGetRequest";
import { formatUsersName } from "@/utils/data";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage, Center, HStack } from "@gluestack-ui/themed";
import { Link } from "expo-router";

type ProfileIconProps = {
    size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
    isLink?: boolean;
    isAnonymous?: boolean;
};

function ProfileIcon({ size = "sm", isLink = true, isAnonymous = false }: ProfileIconProps) {
    const auth = useAuth();
    const { sessionInfo } = auth;

    // const { data: userProfile, loading: userProfileLoading } = useGetRequest(api.users.getUserProfile());
    const userProfile = { ...userProfileMockData }

    return (
        isAnonymous ? (
            <Center mr={"$3"}>
                <Avatar size={size} bgColor="$blueGray400">
                    <FontAwesome name="user" size={22} color="white" />
                </Avatar>
            </Center>
        ) :
            isLink ? (
                <Center mr={"$3"}>
                    <Link href={{
                        pathname: "/root/Profile/",
                    }}>
                        <Avatar size={size} bgColor="$indigo600">
                            <AvatarFallbackText>{formatUsersName(userProfile)}</AvatarFallbackText>
                            <AvatarImage source={{ uri: userProfile?.imageUri }} alt="profile-image" />
                        </Avatar>
                    </Link>
                </Center>
            ) : (
                <Center mr={"$3"}>
                    <Avatar size={size} bgColor="$indigo600">
                        <AvatarFallbackText>{formatUsersName(userProfile)}</AvatarFallbackText>
                        <AvatarImage source={{ uri: userProfile?.imageUri }} alt="profile-image" />
                    </Avatar>
                </Center>
            )
    );
}

export default ProfileIcon;