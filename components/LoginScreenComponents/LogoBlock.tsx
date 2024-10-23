import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Box, Center, Heading, Image, Text, VStack } from "@gluestack-ui/themed";

type LogoBlockProps = {
    //
};

function LogoBlock({ }: LogoBlockProps) {
    return (
        <VStack flex={1} justifyContent="center" alignItems="center" mt={"$10"}>
            <Center h={"$56"} w={"$56"} bg="$white" borderRadius={"$3xl"}  
            // shadowRadius={10} shadowOpacity={1} 
            backgroundColor='rgba(255, 255, 255, 0.2)'
            >
                <Box borderRadius="$3xl" flex={1} width="$full" height="$full" overflow="hidden">

                    <Box flex={1} justifyContent="center" height alignItems="center" width="$full" >

                        <Image alt="logo" width="85%" height="85%" source={require('../../assets/images/good-naz-logo.png')} />
                    </Box>
                </Box>
            </Center>
            <Heading color="white" size="3xl" >GoodNaz</Heading>
            <Text color="white" italic>Learning to Love God and One Another</Text>
            <Text color="white" italic>Goodlettsville, TN</Text>
        </VStack>
    );
}

export default LogoBlock;