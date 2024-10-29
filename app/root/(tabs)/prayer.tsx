import UncontrolledSwitch from "@/components/FormInputs/Uncontrolled/UncontrolledSwitch";
import ScrollableList from "@/components/Lists/ScrollableList";
import MainContainer from "@/components/MainContainer";
import PrayerFilterModal from "@/components/Modals/PrayerFilterModal";
import PrayerCard from "@/components/PrayerCard";
import { Colors } from "@/enum/Colors";
import { AuthorizeComponent } from "@/utils/data";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Box, Fab, FabIcon, HStack, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { useState } from "react";

type PrayerScreenProps = {
    //
};

function PrayerScreen({ }: PrayerScreenProps) {
    const [isShowCompletedPrayers, setIsShowCompletedPrayers] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false)


    const handleAddPrayerRequest = () => {
        console.log("Add Prayer Request");
    }

    const handleOpenFilterModal = () => {
        setShowFilterModal(true)
    }

    return (
        <MainContainer isPadding={false}>
            <PrayerFilterModal includeCompleted={isShowCompletedPrayers} showFilterModal={showFilterModal} onCloseModal={() => setShowFilterModal(false)} setIncludeCompleted={setIsShowCompletedPrayers}/>
            <Fab
                size="md"
                placement="bottom right"
                onPress={handleAddPrayerRequest}
                // backgroundColor={Colors.SUCCESS}
            >
                <FabIcon as={Feather} name="plus" size={25} />
            </Fab>
            <Fab
                size="md"
                placement="bottom left"
                onPress={handleOpenFilterModal}
            >
                <FabIcon as={MaterialIcons} name="filter-list-alt" size={25} />
            </Fab>
            <ScrollView paddingHorizontal="$3" paddingVertical="$4" >
                <VStack space="lg" flex={1}>
                    <PrayerCard />
                    <PrayerCard isAnonymous />
                    <PrayerCard />
                    <PrayerCard isAnonymous />
                </VStack>
                <Box marginBottom="$24" />
            </ScrollView>
        </MainContainer>
    );
}

export default PrayerScreen;