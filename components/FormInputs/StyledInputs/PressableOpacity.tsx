import { Pressable, Animated } from "react-native";
    
const animated = new Animated.Value(1);
function PressableOpacity(props: any) {
    const fadeIn = () => {
        Animated.timing(animated, {
            toValue: 0.1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };
    const fadeOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable onPressIn={fadeIn} onPressOut={fadeOut} {...props}>
            <Animated.View style={{ opacity: animated, ...props.style }}>{props.children}</Animated.View>
        </Pressable>
    );
}

export default PressableOpacity;