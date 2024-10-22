import { Box, Button, ButtonText, Divider, Text, VStack } from "@gluestack-ui/themed";
import MainModal from "./MainModal";
import { Colors } from "@/enum/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as Updates from 'expo-updates';
import LoadingIndicator from "../LoadingIndicator";

type UpdateModalProps = {
    showModal: boolean;
};

function UpdateModal({ showModal }: UpdateModalProps) {
    const handleDownloadUpdate = async () => {
        await Updates.fetchUpdateAsync()
    }
    return (
        <MainModal viewMode="dialog" visible={showModal} hideCloseButton horizontalMargin={15}>
            <VStack marginVertical={"$4"} flex={1} space="xl" justifyContent="center" alignItems="center" p="$4">
                <Text color={Colors.TEXT} size="4xl" bold>Applying Update</Text>
                <MaterialIcons name="system-update" size={150} color={Colors.INPUT} />
                <Text color={Colors.INPUT} size="lg">There is a new version of the app available. The update is being downloaded and applied.</Text>
                <Divider />
                <LoadingIndicator loadingText="Update In Progress"/>
            </VStack>
        </MainModal>
    );
}

export default UpdateModal;