import { Box, Text, VStack } from "@gluestack-ui/themed";
import MainModal from "./MainModal";
import LoadingIndicator from "../LoadingIndicator";
import UncontrolledSwitch from "../FormInputs/Uncontrolled/UncontrolledSwitch";
import { Colors } from "@/enum/Colors";

type PrayerFilterModalProps = {
    showFilterModal: boolean;
    onCloseModal: () => void;
    includeCompleted: boolean;
    setIncludeCompleted: (value: boolean) => void;
};

function PrayerFilterModal({ showFilterModal, onCloseModal, includeCompleted, setIncludeCompleted }: PrayerFilterModalProps) {
    const loading = false;
    return (
        <MainModal visible={showFilterModal} onClose={onCloseModal} viewMode="bottom-sheet" isFullScreen={false} slideHeight={"35%"} animationType="slide" onBackdropPress={onCloseModal}>
            <Text fontSize="$2xl" paddingLeft="$4" color={Colors.WHITE} mb="$4">Prayer Filters</Text>
            {loading ? (
                <Box flex={1} justifyContent="center" alignItems="center">
                    <LoadingIndicator />
                </Box>
            ) : (
                <VStack space="md" flex={1} marginHorizontal={"$4"}>
                    <Box mb="$4">
                        <UncontrolledSwitch
                            value={includeCompleted}
                            setValue={setIncludeCompleted}
                            label="Show Completed Prayers?"
                        />
                    </Box>
                </VStack>
            )}
        </MainModal>
    );
}

export default PrayerFilterModal;