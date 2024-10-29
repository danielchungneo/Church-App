import { Colors } from "@/enum/Colors";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Button, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";

type ServiceCardProps = {
    title?: string;
};

function ServiceCard({ title }: ServiceCardProps) {
    const [isAttending, setIsAttending] = useState(false);
    const handleToggleAttendance = () => {
        setIsAttending(!isAttending);
    }
    return (
        <Box backgroundColor="white" borderRadius="$2xl" shadowColor="#171717" shadowRadius={5} shadowOffset={{ width: 0, height: 0 }} shadowOpacity={.4}>
            <Box flex={0} borderRadius="$2xl" overflow="hidden">
                <VStack space="md" justifyContent="flex-start" alignItems="center" overflow="hidden">
                    <VStack flex={0} width="$full" space="sm" paddingVertical="$4" paddingHorizontal="$4">
                        <Text fontSize="$xl" bold color={Colors.BLUE}>
                            {title || "Service Title"}
                        </Text>
                        <Text fontSize="$sm" bold color={Colors.BLUE}>
                            10/18/24
                        </Text>
                        <Text fontSize="$sm" color={Colors.BLUE} numberOfLines={3}>
                            Here is a service description that is really long to see how many lines Here is a service description that is really long to see how many lines Here is a service description that is really long to see how many lines Here is a service description that is really long to see how many lines 
                        </Text>
                        <HStack justifyContent="space-between" alignItems="center" mt="$2">
                            <Box justifyContent="flex-start" flex={3}>
                                <Button borderRadius="$full" action={isAttending ? "positive" : "primary"} size="sm" onPress={handleToggleAttendance}>
                                    <HStack space="sm">
                                        {isAttending && (
                                            <MaterialCommunityIcons name={"check-circle"} size={18} color={Colors.WHITE} />
                                        )}
                                        <Text fontSize="$sm" bold color={Colors.WHITE}>
                                            {isAttending ? "Cancel RSVP" : "RSVP"}
                                        </Text>
                                    </HStack>
                                </Button>
                            </Box>
                            <HStack justifyContent="center" alignItems="center" space="sm" flex={2}>
                                <Text bold color={Colors.BLUE}>
                                    {isAttending ? "28/50" : "27/50"}
                                </Text>
                                <Ionicons name="people-outline" size={25} color={Colors.BLUE} />
                            </HStack>
                            <Box flex={0} justifyContent="flex-end" alignItems="flex-end">
                                <AntDesign name="arrowright" size={18} color={Colors.BLUE} />
                            </Box>
                        </HStack>
                    </VStack>
                </VStack>
            </Box>
        </Box>
    );
}

export default ServiceCard;