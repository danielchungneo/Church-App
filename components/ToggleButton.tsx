import { Colors } from "@/enum/Colors";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

type ToggleButtonProps = {
    options: any[];
    handlePress: (option: any) => void;
    activeValue: string;
};

function ToggleButton({ options, handlePress, activeValue }: ToggleButtonProps) {
    return (
        <HStack justifyContent="center">
            {options.map((option: any) => {
                const isFirst = options[0].value === option.value;
                const isLast = options[options.length - 1].value === option.value;
                const isActive = activeValue === option.value;
                return (
                    <TouchableOpacity key={option.value} onPress={() => handlePress(option)} style={{ flex: 1 }}>
                        <Box
                            flex={0}
                            p={"$2"}
                            borderWidth={2}
                            borderColor={Colors.SECONDARY}
                            borderTopLeftRadius={isFirst ? "$full" : 0}
                            borderBottomLeftRadius={isFirst ? "$full" : 0}
                            borderTopRightRadius={isLast ? "$full" : 0}
                            borderBottomRightRadius={isLast ? "$full" : 0}
                            backgroundColor={isActive ? Colors.SECONDARY : "transparent"}
                        >
                            <Text textAlign="center" color={Colors.TEXT}>
                                {option.label}
                            </Text>
                        </Box>
                    </TouchableOpacity>
                )
            })}
        </HStack>
    );
}

export default ToggleButton;