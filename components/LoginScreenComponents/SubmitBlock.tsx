import { Colors } from "@/enum/Colors";
import { VERSION_NUMBER } from "@/enum/Version";
import { Button, ButtonText, Text, VStack } from "@gluestack-ui/themed";
import { Link } from "expo-router";

type SubmitBlockProps = {
    handleLogin: any;
    loading: boolean;
};

function SubmitBlock({ handleLogin, loading }: SubmitBlockProps) {
    return (
        <VStack flex={1} justifyContent="center" alignItems="center" space="md" mt={5}>
            <Button action="primary" h={"$12"} width={"$full"} borderRadius={"$full"} onPress={handleLogin} disabled={loading}>
                <ButtonText color={Colors.TEXT} onPress={handleLogin}>{loading ? "Loading..." : "Login"}</ButtonText>
            </Button>
            <Text color="$white" mt="$2">
                Don't have an account? <Text color={"$white"} underline>
                    <Link href="/signUp">Sign Up</Link>
                </Text>
            </Text>
            <Text underline mt={"$6"} color="$white">Forgot Password?</Text>
            <Text color={Colors.TEXT} italic>{`v [${VERSION_NUMBER}]`}</Text>
        </VStack>
    );
}

export default SubmitBlock;