import { Colors } from "@/enum/Colors";
import { Box, SafeAreaView, set, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

type ImageViewerOverlayProps = {
    uri: string;
    renderHeader?: () => JSX.Element
    children?: JSX.Element
    style?: any
    isVisibleControl?: boolean | null
    setIsVisibleControl?: (value: boolean) => void
};
function ImageViewerOverlay({ uri, renderHeader, children, style, isVisibleControl=null, setIsVisibleControl }: ImageViewerOverlayProps) {
    const [isVisible, setIsVisible] = useState(false);
    const onClose = () => {
        isVisibleControl !== null && setIsVisibleControl ? setIsVisibleControl(false) : setIsVisible(false);
    }
    const handleOpenImageViewer = () => {
        isVisibleControl !== null && setIsVisibleControl ? setIsVisibleControl(true) : setIsVisible(true);
    }


    return (
        <>
            <TouchableOpacity onPress={handleOpenImageViewer} style={style}>
                {children}
            </TouchableOpacity>
            <Modal visible={isVisibleControl !== null ? isVisibleControl : isVisible} transparent={true}>
                <ImageViewer
                    imageUrls={[{ url: uri }]}
                    enableSwipeDown
                    onSwipeDown={onClose}
                    renderHeader={renderHeader}
                    swipeDownThreshold={150}
                    renderIndicator={() => <></>}
                    footerContainerStyle={{ borderWidth: 3, borderColor: 'blue', bottom: 0, position: "absolute", zIndex: 9999 }}
                />
            </Modal>
        </>
    );
}

export default ImageViewerOverlay;