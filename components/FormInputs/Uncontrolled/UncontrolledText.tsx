import { Colors } from "@/enum/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Box, Input, InputField, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

type UncontrolledTextProps = {
    label?: string;
    placeHolderText?: string;
    textColor?: string;
    isNumber?: boolean;
    value: string;
    onTextChange: (text: string) => void;
    maxLength?: number;
    rounded?: "$md" | "$xs" | "$sm" | "$lg" | "$xl" | "$none" | "$2xl" | "$3xl" | "$full" | undefined;
    renderIcon?: () => React.ReactNode;
    handleOnBlur?: () => void;
    handleOnFocus?: () => void;
    returnKeyType?: "done" | "go" | "next" | "search" | "send" | undefined;
    isClearable?: boolean;
    handleOnClear?: () => void;

};

function UncontrolledText({ label, placeHolderText, textColor = Colors.INPUT, isNumber = false, value, onTextChange, maxLength, rounded = "$md", renderIcon, handleOnBlur, returnKeyType, isClearable, handleOnFocus, handleOnClear }: UncontrolledTextProps) {
    const clearText = () => {
        onTextChange("")
        handleOnClear?.()
    }
    return (
        <Box>
            {label && (
                <Text mb={"$4"} size="lg" color={textColor} lineHeight="$xs">
                    {label}
                </Text>
            )}
            <Input height={"$12"} rounded={rounded} $focus-borderBlockColor={Colors.INPUT}>
                {renderIcon && renderIcon()}
                <InputField
                    placeholder={placeHolderText}
                    placeholderTextColor={textColor}
                    type="text"
                    size="md"
                    color={textColor}
                    onChangeText={onTextChange}
                    value={isNumber ? value?.toString() : value}
                    keyboardType={isNumber ? "number-pad" : "default"}
                    maxLength={maxLength || undefined}
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}
                    returnKeyType={returnKeyType}
                />
                {isClearable && value.length > 0 && (
                    <Box justifyContent="center" mr="$4">
                        <TouchableOpacity>
                            <AntDesign name="closecircle" size={20} color={Colors.INPUT} onPress={clearText} />
                        </TouchableOpacity>
                    </Box>
                )}
            </Input>
        </Box>
    );
}

export default UncontrolledText;