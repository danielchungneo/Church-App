import { Avatar, AvatarFallbackText, AvatarImage } from "@gluestack-ui/themed";

type UserAvatarProps = {
    fullName: string;
    size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
    imageUri?: string;
};

function UserAvatar({ fullName, size, imageUri }: UserAvatarProps) {
    return (
        <Avatar size={size} bgColor="$indigo600">
            <AvatarFallbackText>{fullName}</AvatarFallbackText>
            <AvatarImage source={{ uri: imageUri }} alt="profile-image" />
        </Avatar>
    );
}

export default UserAvatar;