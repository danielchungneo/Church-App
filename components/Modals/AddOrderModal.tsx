import { useState } from "react";
import MainModal from "./MainModal";
import { Box, Button, ButtonText, VStack } from "@gluestack-ui/themed";
import UncontrolledSelectBox from "../FormInputs/Uncontrolled/UncontrolledSelectBox";

type AddOrderModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    handleCreateOrder: (selectedOrderType: any) =>  void;
};

function AddOrderModal({ showModal, setShowModal, handleCreateOrder }: AddOrderModalProps) {
    const reportOptions = [{
        name: "Residential Full",
        id: 1,
    }, {
        name: "Residential Exterior Only",
        id: 2,
    }]
    const options = [
        { label: "This Set", value: "set" },
        { label: "All Time", value: "allTime" }
    ]
    const [selectedOrderType, setSelectedOrderType] = useState(null);
    return (
        <MainModal visible={showModal} onClose={() => setShowModal(false)} title="Create Order" horizontalMargin={"$4"}>
            <VStack space="xl" marginVertical={"$4"} p="$4">
                <Box>
                    <UncontrolledSelectBox options={reportOptions} value={selectedOrderType} setValue={setSelectedOrderType} valueField="id" nameField="name" />
                </Box>
                <Box>
                    <Button disabled={!selectedOrderType} onPress={() => handleCreateOrder(reportOptions.find((report: any) => report.id === selectedOrderType))}>
                        <ButtonText>
                            Create Order
                        </ButtonText>
                    </Button>
                </Box>
            </VStack>
        </MainModal>
    );
}

export default AddOrderModal;