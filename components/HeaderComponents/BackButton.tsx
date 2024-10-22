import { Colors } from "@/enum/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ChevronLeftIcon, HStack, Icon, Text } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

type BackButtonProps = {
    //
};

function BackButton({}: BackButtonProps) {

    if (!router.canGoBack()){
        return null
    }
    const handleGoBack = () => {
        router.back();
    }

    return (
        <TouchableOpacity onPress={handleGoBack}>
            <HStack>
                <Ionicons name="chevron-back" color={Colors.TEXT} size={25} />
            </HStack>
        </TouchableOpacity>
    );
}

export default BackButton;