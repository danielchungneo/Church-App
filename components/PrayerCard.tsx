import { Colors } from "@/enum/Colors";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Button, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import ProfileIcon from "./HeaderComponents/ProfileIcon";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type PrayerCardProps = {
    isAnonymous?: boolean;
};

function PrayerCard({ isAnonymous=false }: PrayerCardProps) {

    const [isPrayedFor, setIsPrayedFor] = useState(false);

    const handleTogglePrayerRequest = () => {
        setIsPrayedFor(!isPrayedFor);
    }
    return (
        <Box backgroundColor="white" borderRadius="$2xl" shadowColor="#171717" shadowRadius={5} shadowOffset={{ width: 0, height: 0 }} shadowOpacity={.4}>
            <TouchableOpacity onPress={handleTogglePrayerRequest}>
                <VStack flex={0} space="lg" paddingVertical="$3" paddingHorizontal="$4" borderRadius="$2xl" overflow="hidden">
                    <HStack space="md">
                        <VStack flex={1} space="sm" alignItems="flex-start">
                            <Box>
                                <ProfileIcon size="lg" isAnonymous={isAnonymous}/>
                            </Box>
                            <Box>
                                <Text fontSize="$sm"  color={Colors.BLUE} numberOfLines={2}>
                                    {isAnonymous ? "Anonymous" : "Daniel Chung"}
                                </Text>
                                <Text fontSize="$xs" bold color={Colors.BLUE}>
                                    10/23/24
                                </Text>
                            </Box>
                        </VStack>
                        <VStack flex={2} space="md" justifyContent="flex-start" alignItems="center" overflow="hidden">
                            <VStack flex={0} space="sm">
                                <Text fontSize="$lg" bold color={Colors.BLUE} numberOfLines={2}>
                                    Prayer Request Title
                                </Text>
                                <Text fontSize="$sm"  color={Colors.BLUE} numberOfLines={5}>
                                    Here is a description of the event and there will also be an arrow so you can view more details Here is a description of the event and there will also be an arrow so you can view more details
                                </Text>
                            </VStack>
                        </VStack>
                    </HStack>
                    <HStack alignItems="center" justifyContent="space-between">
                        <Box alignItems="flex-end">
                            <Button borderRadius="$full" action={isPrayedFor ? "positive" : "primary"} size="sm" onPress={handleTogglePrayerRequest}>
                                <HStack space="sm">
                                    <MaterialCommunityIcons name={isPrayedFor ? "check-circle" : "hands-pray"} size={18} color={Colors.WHITE} />
                                    <Text fontSize="$sm" bold color={Colors.WHITE}>
                                        {isPrayedFor ? "Prayer Sent" : "Send a Prayer"}
                                    </Text>
                                </HStack>
                            </Button>
                        </Box>
                        <HStack alignItems="center" space="sm">
                            <Ionicons name="people-outline" size={25} color={Colors.BLUE} />
                            <Text bold color={Colors.BLUE}>
                                {isPrayedFor ? 26 : 25}
                            </Text>
                        </HStack>
                        <HStack alignItems="center" space="xs">
                            <AntDesign name="arrowright" size={18} color={Colors.BLUE} />
                        </HStack>
                    </HStack>
                </VStack>
            </TouchableOpacity>
        </Box>
    );
}

export default PrayerCard;