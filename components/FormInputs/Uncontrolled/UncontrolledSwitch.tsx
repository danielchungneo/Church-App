import { Colors } from '@/enum/Colors';
import { HStack, Spinner, Switch, Text } from '@gluestack-ui/themed';

type UncontrolledSwitchProps = {
    label?: string;
    value: boolean;
    setValue?: (value: boolean) => void;
    size?: 'sm' | 'md' | 'lg';
    onChange?: (value: boolean) => void;
    loading?: boolean;
};

function UncontrolledSwitch({ label, value, setValue, size = "md", onChange, loading = false }: UncontrolledSwitchProps) {
    const handleChange = () => {
        if (onChange) {
            onChange?.(!value);
        } else {
            setValue?.(!value);
        }
    }
    return (
        <HStack alignItems='center' space='md'>
            <Switch size={size} value={value} onToggle={handleChange} disabled={loading} />
            {label && (
                <Text color={Colors.TEXT} size='lg'>{label}</Text>
            )}
        </HStack>
    );
}

export default UncontrolledSwitch;