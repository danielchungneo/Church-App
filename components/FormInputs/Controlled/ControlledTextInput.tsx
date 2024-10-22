import { Colors } from "@/enum/Colors";
import { Box, Input, InputField, Text } from "@gluestack-ui/themed";
import { Controller, useFormContext } from "react-hook-form";

type ControlledTextInputProps = {
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name: string;
    label: string;
    isNumber?: boolean;
    maxLength?: number;
    autoCapitalize?: boolean;
};

function ControlledTextInput({ name, label, isNumber = false, isRequired=false, maxLength, autoCapitalize=false }: ControlledTextInputProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const onChange = (e: any) => {
                    field.onChange(e)
                };
                const isInvalid = fieldState.invalid;
                return (
                    <Box>
                        {label && (
                            <Text mb={"$4"} size="lg" color={isInvalid ? Colors.ERROR : Colors.INPUT} lineHeight="$xs">
                                {label}
                            </Text>
                        )}
                        <Input isInvalid={fieldState.invalid} isRequired={isRequired} height={"$12"}>
                            <InputField 
                                placeholder={label}
                                placeholderTextColor={Colors.INPUT}
                                type="text"
                                size="xl"
                                color={Colors.INPUT}
                                onChangeText={onChange}
                                value={isNumber ? field.value?.toString() : field.value}
                                keyboardType={isNumber ? "number-pad" : "default"}
                                maxLength={maxLength || undefined}
                                autoCapitalize={autoCapitalize ? "characters" : "none"}
                            />
                        </Input>
                    </Box>
                )
            }}
        />
    );
}

export default ControlledTextInput;