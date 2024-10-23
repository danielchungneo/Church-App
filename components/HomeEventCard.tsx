import { Colors } from "@/enum/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Box, HStack, Image, Text, VStack } from "@gluestack-ui/themed";

type HomeEventCardProps = {
    uri?: string;
    title?: string;
};

function HomeEventCard({ uri, title }: HomeEventCardProps) {
    return (
        <Box backgroundColor="white" borderRadius="$2xl" shadowColor="#171717" shadowRadius={5} shadowOffset={{ width: 0, height: 0 }} shadowOpacity={.4}>
            <Box flex={0} borderRadius="$2xl" overflow="hidden">
                <VStack space="md" justifyContent="flex-start" alignItems="center" overflow="hidden">
                    <Box height="$40" width="102%" justifyContent="center" alignItems="center">
                        <Image alt="event image" width="100%" height="100%" resizeMode="cover" source={uri ? {uri} : require("../assets/images/event.png")} />
                    </Box>
                    <VStack flex={0} space="sm" paddingBottom="$4" paddingHorizontal="$4">
                        <Text fontSize="$xl" bold color={Colors.BLUE}>
                            {title || "Worship Night"}
                        </Text>
                        <Text fontSize="$sm" bold color={Colors.BLUE} numberOfLines={3}>
                            Here is a description of the event and there will also be an arrow so you can view more details Here is a description of the event and there will also be an arrow so you can view more details 
                        </Text>
                        <Box alignItems="flex-end" >
                            <AntDesign name="arrowright" size={18} color={Colors.BLUE} />
                        </Box>
                    </VStack>
                </VStack>
            </Box>
        </Box>
    );
}

export default HomeEventCard;