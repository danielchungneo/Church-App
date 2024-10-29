import HomeEventCard from "@/components/HomeEventCard";
import MainContainer from "@/components/MainContainer";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";

type EventScreenProps = {
    //
};

function EventScreen({ }: EventScreenProps) {
    return (
        <MainContainer isPadding={false}>
            <ScrollView paddingHorizontal="$3" paddingVertical="$4">
                <VStack flex={1} space="xl">
                    <HomeEventCard />
                    <HomeEventCard title="Bonfire & Jam" uri="https://registrations-production.s3.amazonaws.com/uploads/event/logo/2537421/medium_image-1727707265726.png" />
                    <HomeEventCard title="Trunk or Treat" uri="https://static.wixstatic.com/media/8cbf38_d014597947e64521af268c71626dd49b~mv2.jpg/v1/fill/w_454,h_256,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Trunk%20or%20Treat.jpg" />
                </VStack>
                <Box marginBottom="$24" />
            </ScrollView>
        </MainContainer >
    );
}

export default EventScreen;