import { Box, Button, ButtonText, Center, HStack, Text } from "@gluestack-ui/themed";
import MainModal from "./MainModal";
import { Colors } from "@/enum/Colors";

type DeleteModalProps = {
    showModal: boolean;
    onClose: () => void;
    handleConfirmDelete: () => void;
    titleText?: string
    deleting?: boolean;
    deleteButtonText?: string;
    deleteLoadingText?: string;
    descriptionText?: string;
};

function DeleteModal({ showModal, onClose, handleConfirmDelete, titleText, deleting=false, deleteButtonText="Delete", deleteLoadingText="Deleting...", descriptionText="Are you sure you want to delete this item?" }: DeleteModalProps) {
    return (
        <MainModal onClose={onClose} viewMode="dialog" visible={showModal} hideCloseButton horizontalMargin={15}>
            <Box padding="$4">
                <Box mb={"$4"}>
                    {titleText && (
                        <Text color={Colors.TEXT} size="2xl" bold mb={"$2"}>
                            {titleText}
                        </Text>
                    
                    )}
                    <Text color={Colors.TEXT} size="lg">{descriptionText}</Text>
                </Box>
                <HStack justifyContent="space-between">
                    <Button action="secondary" onPress={onClose}>
                        <ButtonText>
                            Cancel
                        </ButtonText>
                    </Button>
                    <Button
                        variant={deleting ? "outline" : "solid"}
                        action="negative"
                        onPress={handleConfirmDelete}
                        disabled={deleting}
                    >
                        <ButtonText>{deleting ? deleteLoadingText : deleteButtonText}</ButtonText>
                    </Button>
                </HStack>
            </Box>
        </MainModal>
    );
}

export default DeleteModal;