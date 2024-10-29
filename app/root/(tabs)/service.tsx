import ScrollableList from "@/components/Lists/ScrollableList";
import MainContainer from "@/components/MainContainer";
import ServiceCard from "@/components/ServiceCard";
import { AuthorizeComponent } from "@/utils/data";
import { Box, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";

type SettingsScreenProps = {
    //
};

function SettingsScreen({ }: SettingsScreenProps) {
    return (
        <MainContainer isPadding={false}>
            <ScrollView paddingHorizontal="$3" paddingVertical="$4">
                <VStack space="xl" flex={1}>
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                </VStack>
                <Box marginBottom="$24" />

            </ScrollView>
        </MainContainer>
    );
}

export default SettingsScreen;