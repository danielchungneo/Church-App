import { Colors } from "@/enum/Colors";
import { HStack, Spinner, Text } from "@gluestack-ui/themed";

type LoadingIndicatorProps = {
    loadingText?: string;
};

function LoadingIndicator({ loadingText="Loading" }: LoadingIndicatorProps) {
    return (
        <HStack space="sm" justifyContent="center" alignItems="center">
            <Spinner size={"large"} color={Colors.TEXT} />
            <Text size="xl" bold color={Colors.TEXT}>{loadingText}</Text>
        </HStack>
    );
}

export default LoadingIndicator;