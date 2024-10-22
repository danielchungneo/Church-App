import { Colors } from "@/enum/Colors";
import { TIMER_NUMBER_OPTION, TIMER_NUMBER_OPTION_5 } from "@/enum/Timer";
import { Box, ScrollView, Text } from "@gluestack-ui/themed";

type NumberScrollerProps = {
    height?: number;
    setState?: (value: number) => void;
    isZeroToFive?: boolean;
    value?: number;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "2xs" | "5xl" | "6xl" | undefined
};

function NumberScroller({ height=75, setState, isZeroToFive=false, value=0, size="4xl"}: NumberScrollerProps) {
    const handleScrollEnd = (e: any) => {
        if (setState) {
            const yOffset = e.nativeEvent.contentOffset.y;
            const index = Math.round(yOffset / height);
            setState(index);
        }
    }

    const initalOffset = value * height;

    const TIME_OPTION = isZeroToFive ? TIMER_NUMBER_OPTION_5 : TIMER_NUMBER_OPTION;
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} snapToInterval={75} decelerationRate={0} snapToAlignment="end" onMomentumScrollEnd={handleScrollEnd} contentOffset={{x: 0, y: initalOffset}}>
            {TIME_OPTION.map((timerValue: number) => {
                return (
                    <Box key={timerValue} h={height} justifyContent="center" alignItems="center">
                        <Text bold size={size} color={Colors.TEXT}>
                            {timerValue}
                        </Text>
                    </Box>
                )
            })}
        </ScrollView>
    );
}

export default NumberScroller;