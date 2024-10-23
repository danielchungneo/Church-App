import ScrollableList from "@/components/Lists/ScrollableList";
import MainContainer from "@/components/MainContainer";
import { AuthorizeComponent } from "@/utils/data";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";

type SettingsScreenProps = {
    //
};

function SettingsScreen({ }: SettingsScreenProps) {
    const configurationOptions = [
    ]

    const settingOptions = [
        { name: "User Management", pathname: "usersManagement" },
    ]

    const handlePressConfigurationItem = (item: any) => {
        console.log("This does nothing!")
        // router.push({ pathname: `/tabs/Configurations/${item.pathname}` })
    }
    return (
        <MainContainer>
            <VStack space="md" flex={1}>
                <Box flex={1}>
                    <ScrollableList options={settingOptions} idName="name" listName="Settings" handlePress={handlePressConfigurationItem} />
                </Box>
            </VStack>
        </MainContainer>
    );
}

export default SettingsScreen;