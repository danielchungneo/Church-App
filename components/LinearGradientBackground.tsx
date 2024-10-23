import { Box, LinearGradient } from "@gluestack-ui/themed";
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';


type LinearGradientBackgroundProps = {
    children: React.ReactNode;
    colors?: string[];
};

function LinearGradientBackground({ children, colors=["#256396",'#4682b4',  '#cccccc' ] }: LinearGradientBackgroundProps) {
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