import MainContainer from "@/components/MainContainer";
import { Colors } from "@/enum/Colors";
import { Text } from "@gluestack-ui/themed";

type OrderHomeScreenProps = {
        //
    };

    function OrderHomeScreen({}: OrderHomeScreenProps) {
        return (
            <MainContainer>
                <Text color={Colors.TEXT}>OrderHomeScreen</Text>
            </MainContainer>
        );
}

export default OrderHomeScreen;