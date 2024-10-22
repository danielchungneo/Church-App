import { Colors } from "@/enum/Colors";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Box, Center, HStack, Text, VStack } from "@gluestack-ui/themed";
import { Alert, Linking, TouchableOpacity } from "react-native";

type BackCameraControlsProps = {
    hasMediaPermissions: boolean | undefined;
    handleCloseCameraView: () => void;
    handleTakePicture: () => void;
    openImageLibrary: () => void;
    screenOrientation: "portrait" | "landscape-right" | "landscape-left";
};

function BackCameraControls({ hasMediaPermissions, handleCloseCameraView, handleTakePicture, openImageLibrary, screenOrientation }: BackCameraControlsProps) {

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

    const isScreenOrientationLeft = screenOrientation === "landscape-left";
    const isScreenPortrait = screenOrientation === "portrait";
    return (
        <HStack flex={1} position="absolute" height={isScreenPortrait ? "100%" : undefined} width="100%" bottom={0}>
            {isScreenPortrait ? (
                <VStack>
                    <Center flex={1} >
                        <MaterialCommunityIcons name="phone-rotate-landscape" size={100} color="white" />
                        <Text color={Colors.TEXT} mt="$2" size="2xl">Rotate your device to take a picture</Text>
                    </Center>
                    <HStack padding={"$5"} width="100%" justifyContent="space-between">
                        <Box justifyContent="center" >
                            <TouchableOpacity onPress={handleCloseCameraView}>
                                <Ionicons name='close' color='white' size={75} />
                            </TouchableOpacity>
                        </Box>
                        <Box justifyContent="center">
                            <TouchableOpacity onPress={hasMediaPermissions ? openImageLibrary : hanleGetPermissions}>
                                <MaterialIcons name='photo-library' color='white' size={75} />
                            </TouchableOpacity>
                        </Box>
                    </HStack>
                </VStack>
            ) : (
                <VStack flex={1} paddingHorizontal={"$5"} pb="$8">
                    <HStack width="100%" justifyContent="space-between" alignItems="center">
                        <Box>
                            <TouchableOpacity onPress={handleCloseCameraView}>
                                <Ionicons name='close' color='white' size={75} />
                            </TouchableOpacity>
                        </Box>
                        <Box>
                            <TouchableOpacity onPress={handleTakePicture}>
                                <Ionicons name='radio-button-on' color='white' size={100} />
                            </TouchableOpacity>
                        </Box>
                        <Box>
                            {hasMediaPermissions && (
                                <TouchableOpacity onPress={openImageLibrary}>
                                    <MaterialIcons name='photo-library' color='white' size={75} style={{ transform: isScreenOrientationLeft ? "rotate(90deg)" : "rotate(-90deg)" }} />
                                </TouchableOpacity>
                            )}
                        </Box>
                    </HStack>
                </VStack>
            )}
        </HStack>
    );
}

export default BackCameraControls;