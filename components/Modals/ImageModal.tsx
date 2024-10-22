import { Box, Center, Image, SafeAreaView, Text } from "@gluestack-ui/themed";
import MainModal from "./MainModal";
import { Colors } from "@/enum/Colors";
import ImageView from "react-native-image-viewing";
import { useState } from "react";
import { Modal, Touchable, TouchableOpacity } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageViewerOverlay from "../ImageViewerOverlay";

type ImageModalProps = {
    showModal: boolean;
    onClose: () => void;
    headerText?: string;
    uri: string;
};

function ImageModal({ onClose, showModal, headerText, uri, }: ImageModalProps) {

    return (
        <MainModal visible={showModal} onClose={onClose} slideHeight={"55%"} horizontalMargin={15} onBackdropPress={onClose}>
            <Box mb="$2">
                <Text textAlign="center" size="3xl" fontWeight="bold" color={Colors.TEXT}>{headerText}</Text>
            </Box>
            <ImageViewerOverlay uri={uri} style={{flex: 1}}>
                <Center flex={1} p="$2">
                    <Image source={{ uri }} alt="gym map" resizeMode="contain" height="100%" width="100%" />
                </Center>
            </ImageViewerOverlay>
        </MainModal>
    );
}

export default ImageModal;