import { Colors } from "@/enum/Colors";
import { Box, Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, Input, InputField, Text } from "@gluestack-ui/themed";
import { CheckIcon } from "lucide-react-native";
import { Controller, useFormContext } from "react-hook-form";

type ControlledCheckboxProps = {
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name: string;
    label: string;
    size?: "sm" | "md" | "lg";
};

function ControlledCheckbox({ name, label, isRequired = false, size="md" }: ControlledCheckboxProps) {
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
                    <Checkbox aria-label={label} size={size} isInvalid={false} isDisabled={false} isChecked={field.value} onChange={onChange} value="rememberMeCheckbox">
                        <CheckboxIndicator mr="$2">
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel color={Colors.INPUT}>{label}</CheckboxLabel>
                    </Checkbox>
                )
            }}
        />
    );
}

export default ControlledCheckbox;