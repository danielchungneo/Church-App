import { Colors } from "@/enum/Colors";
import { DEVICE_DIMENSIONS } from "@/enum/DeviceDimensions";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Box, Center, HStack, Text, VStack, View } from "@gluestack-ui/themed";
import { Dimensions, TouchableOpacity, StyleSheet, Alert, Linking } from "react-native";
import Svg, { Circle, Rect } from 'react-native-svg';
import UncontrolledSwitch from "./FormInputs/Uncontrolled/UncontrolledSwitch";
import { useState } from "react";

type FrontCameraControlsProps = {
    hasMediaPermissions: boolean | undefined;
    handleCloseCameraView: () => void;
    handleTakePicture: () => void;
    openImageLibrary: () => void;
    screenOrientation: "portrait" | "landscape-right" | "landscape-left";
};

function FrontCameraControls({ hasMediaPermissions, handleCloseCameraView, handleTakePicture, openImageLibrary, screenOrientation }: FrontCameraControlsProps) {

    const [showFaceFrame, setShowFaceFrame] = useState(false);
    const { width, height } = DEVICE_DIMENSIONS;

    const isScreenPortrait = screenOrientation === "portrait";

    const hanleGetPermissions = async () => {
        Alert.alert("Library Permission Required", "We need access to your photos so you can upload images from your photo library.", [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'OK', onPress: () => Linking.openSettings() },
        ]
        )
    }

    return (
        <Box flex={1} position="absolute" height={isScreenPortrait ? "100%" : undefined} width="100%" bottom={0}>
            {showFaceFrame && (
                <Center flex={1}>
                    <Box bg="rgba(0,0,0,0)" width={width - 10} height={width - 10} rounded="$full" borderWidth={3} borderColor={Colors.INPUT} />
                </Center>
            )}
            <HStack position="absolute" top={15} padding={"$5"} width="100%" justifyContent="flex-end">
                <HStack justifyContent="center" space="md">
                    <UncontrolledSwitch value={showFaceFrame} setValue={setShowFaceFrame} size="lg" />
                    <MaterialIcons name={showFaceFrame ? 'face' : "face-retouching-off"} color='white' size={50} />
                </HStack>
            </HStack>
            <HStack position="absolute" bottom={0} padding={"$5"} width="100%" justifyContent="space-between">
                <Box justifyContent="center" >
                    <TouchableOpacity onPress={handleCloseCameraView}>
                        <Ionicons name='close' color='white' size={75} />
                    </TouchableOpacity>
                </Box>
                <Box>
                    <TouchableOpacity onPress={handleTakePicture}>
                        <Ionicons name='radio-button-on' color='white' size={100} />
                    </TouchableOpacity>
                </Box>
                <Box justifyContent="center">
                    <TouchableOpacity onPress={hasMediaPermissions ? openImageLibrary : hanleGetPermissions}>
                        <MaterialIcons name='photo-library' color='white' size={75} />
                    </TouchableOpacity>
                </Box>
            </HStack>
        </Box>
    );
}


export default FrontCameraControls;