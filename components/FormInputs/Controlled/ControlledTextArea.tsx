import { Colors } from "@/enum/Colors";
import { Box, Input, InputField, Text, Textarea, TextareaInput } from "@gluestack-ui/themed";
import { Controller, useFormContext } from "react-hook-form";

type ControlledTextAreaProps = {
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name: string;
    label: string;
    height?: number | string;
};

function ControlledTextArea({ name, label, isRequired, height=125 }: ControlledTextAreaProps) {
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
                        <Textarea height={height} isInvalid={fieldState.invalid} size="md" isRequired={isRequired}>
                            <TextareaInput placeholder={label} type="text" color={Colors.INPUT} onChangeText={onChange} value={field.value} />
                        </Textarea>
                    </Box>
                )
            }}
        />
    );
}

export default ControlledTextArea;