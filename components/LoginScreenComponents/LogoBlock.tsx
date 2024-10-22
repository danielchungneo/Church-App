import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Center, Heading, Text, VStack } from "@gluestack-ui/themed";

type LogoBlockProps = {
    //
};

function LogoBlock({ }: LogoBlockProps) {
    return (
        <VStack flex={1} justifyContent="center" alignItems="center" mt={"$10"}>
            <Center h={"$56"} w={"$56"} bg="$white" borderRadius={"$3xl"} backgroundColor={'rgba(255, 255, 255, 0.4)'} >
                <AntDesign name="API" size={150} color="black" />
            </Center>
            <Heading color="white" size="3xl" >QN-AI</Heading>
            <Text color="white" italic>I mean, who even needs QA's!</Text>
        </VStack>
    );
}

export default LogoBlock;