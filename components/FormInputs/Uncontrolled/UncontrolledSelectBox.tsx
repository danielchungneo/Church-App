import { Colors } from "@/enum/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ChevronDownIcon, Icon, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@gluestack-ui/themed";

type UncontrolledSelectBoxProps = {
    options: any;
    value: any;
    setValue: (value: any) => void;
    valueField?: string;
    nameField?: string;
};

function UncontrolledSelectBox({ options, value, setValue, valueField = "value", nameField = "label" }: UncontrolledSelectBoxProps) {
    const selectedOption = options?.find((option: any) => option?.[valueField] === value);
    const handleChange = (e: any) => {
        setValue(e);
    }
    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger variant="rounded" size="md">
                <SelectInput placeholder="Select option" color={Colors.TEXT} value={selectedOption?.[nameField]} onChange={handleChange} />
                <Ionicons name="chevron-down" size={15} color={Colors.TEXT} style={{marginRight: 12}} />
            </SelectTrigger>
            <SelectPortal>
                <SelectBackdrop />
                <SelectContent py={"$4"}>
                    <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {options.map((option: any) => {
                        return (
                            <SelectItem
                                key={option?.[valueField]}
                                label={option?.[nameField]}
                                value={option?.[valueField]}
                            />
                        )
                    })}
                </SelectContent>
            </SelectPortal>
        </Select>
    );
}

export default UncontrolledSelectBox;