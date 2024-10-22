import { Box, LinearGradient } from "@gluestack-ui/themed";
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';


type LinearGradientBackgroundProps = {
    children: React.ReactNode;
    colors?: string[];
};

function LinearGradientBackground({ children, colors=['#00483f', '#2e2e48', '#0f1324'] }: LinearGradientBackgroundProps) {
    return (
        <Box flex={1}>
            <LinearGradient
                flex={1}
                colors={colors}
                as={ExpoLinearGradient}>
                {children}

            </LinearGradient>
        </Box>
    );
}

export default LinearGradientBackground;