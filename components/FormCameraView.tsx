import { Box, Button, ButtonText, Center, HStack, ImageBackground, SafeAreaView, Text, VStack } from "@gluestack-ui/themed";
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { Image, Linking, Modal, Touchable, TouchableOpacity, useWindowDimensions } from "react-native";
import MainContainer from "./MainContainer";
import { Colors } from "@/enum/Colors";
import * as ScreenOrientation from 'expo-screen-orientation';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from '@react-native-community/slider';
import { DEVICE_DIMENSIONS } from "@/enum/DeviceDimensions";
import { AutoFocus } from "expo-camera/build/legacy/Camera.types";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { useCameraPermission, Camera, useCameraDevice } from "react-native-vision-camera";
import BackCameraControls from "./BackCameraControls";
import * as FileSystem from 'expo-file-system';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FrontCameraControls from "./FrontCameraControls";
import { StatusBar } from "expo-status-bar";



type FormCameraViewProps = {
    onClose: () => void;
    showCamera: boolean;
    handleSetPhoto: (photo: any) => void;
    isSelfie?: boolean;
};

function FormCameraView({ onClose, showCamera, handleSetPhoto, isSelfie = false }: FormCameraViewProps) {

    const [zoom, setZoom] = useState(0);
    const [cameraRollPreview, setCameraRollPreview] = useState<any>(null)
    const [activePhoto, setActivePhoto] = useState<any>(null)
    const [screenOrientation, setScreenOrientation] = useState<"portrait" | "landscape-left" | "landscape-right">("portrait")

    const insets = useSafeAreaInsets();
    const cameraRef = useRef<Camera>(null)

    // Vision Camera Permissions
    const { hasPermission: hasCameraPermissions, requestPermission: requestCameraPermissions } = useCameraPermission()
    const device = useCameraDevice(isSelfie ? "front" : 'back')


    const { width: screenWidth, height: screenHeight } = DEVICE_DIMENSIONS


    const [imagePickerStatus] = ImagePicker.useMediaLibraryPermissions();


    if (!showCamera) {
        return null
    }

    const compressPhoto = async (photo: any | undefined) => {
        if (!photo) {
            return null
        }
        const compressedPhoto = await manipulateAsync(
            photo.path,
            [],
            { compress: 0, base64: true }
        )
        // if (isSelfie) {
        //     const editedPhoto = await manipulateAsync(
        //         photo.uri,
        //         [{ flip: FlipType.Horizontal }],
        //         { compress: 0, base64: true }
        //     );
        //     return editedPhoto
        // } else {
        //     const editedPhoto = await manipulateAsync(
        //         photo.uri,
        //         [{ rotate: 180 }],
        //         { compress: 0, base64: true }
        //     );
        // }
        return compressedPhoto
    };

    const handleCloseCamera = () => {
        setActivePhoto(null)
        onClose()
    }

    async function handleTakePicture() {
        const photo = await cameraRef.current.takePhoto({})
        const base64 = await FileSystem.readAsStringAsync(photo.path, { encoding: 'base64' });
        const result = {
            ...photo,
            base64,
        }
        setActivePhoto(result)
    }

    const handleRejectPhoto = () => {
        setActivePhoto(null)
    }

    const handleAcceptPhoto = async () => {
        const compressedPhoto = await compressPhoto(activePhoto)
        handleSetPhoto(compressedPhoto)
        handleCloseCamera()
    }

    const handleCloseCameraView = () => {
        handleCloseCamera()
    }

    const getImagePermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return status
    }

    const hasMediaPermissions = imagePickerStatus?.granted

    if (!hasMediaPermissions) {
        getImagePermission()
    }

    const checkMediaLibraryPermissions = async () => {
        const mediaLibraryPermissions =
            await MediaLibrary.requestPermissionsAsync()

        if (mediaLibraryPermissions.granted) {
            const preview = await MediaLibrary.getAssetsAsync({ first: 1 })
            setCameraRollPreview(preview)
        }
    }

    if (!cameraRollPreview) {
        checkMediaLibraryPermissions()
    }

    const openImageLibrary = async () => {
        let imageLibraryResult = await ImagePicker.launchImageLibraryAsync({ base64: true })

        if (!imageLibraryResult.canceled && !!imageLibraryResult?.assets?.length) {
            const photo = imageLibraryResult.assets[0]
            handleSetPhoto(photo)
            handleCloseCamera()
        }
    }

    const handleOrientationChange = async (uiOrientation: any) => {
        if (uiOrientation === 90) {
            setScreenOrientation("landscape-left")
        } else if (uiOrientation === -90) {
            setScreenOrientation("landscape-right")
        } else {
            setScreenOrientation("portrait")
        }
    }

    const handleRequestPermissions = () => {
        Linking.openSettings()
    }

    if (!hasCameraPermissions) {
        requestCameraPermissions();
    }

    return (
        <Modal visible={true} supportedOrientations={["portrait", "landscape"]}>
            <StatusBar hidden />
            <MainContainer isPadding={false}>
                {!hasCameraPermissions ? (
                    <Center flex={1} p={"$4"}>
                        <VStack space="lg">
                            <Text textAlign="center" color={Colors.TEXT} bold size="2xl">
                                In order to take a photo, you need to allow camera permissions
                            </Text>
                            <Button onPress={handleRequestPermissions}>
                                <ButtonText>Grant Camera Permissions</ButtonText>
                            </Button>
                        </VStack>
                    </Center>
                ) :
                    activePhoto ? (
                        <>
                            <Center flex={1}>
                                <ImageBackground source={{ uri: activePhoto.path }} height={isSelfie ? screenHeight : screenWidth} width={isSelfie ? screenWidth : screenHeight} style={{ transform: screenOrientation === "landscape-left" ? "rotate(90deg)" : screenOrientation === "landscape-right" ? "rotate(-90deg)" : undefined }}>
                                    <HStack flex={1} alignItems={isSelfie ? "flex-end" : "center"} p={isSelfie ? "$4" : 0}>
                                        <Box flex={1} pl={isSelfie ? 0 : insets.top}>
                                            <TouchableOpacity onPress={handleRejectPhoto}>
                                                <Ionicons color={Colors.ERROR} name="close-circle-outline" size={100} />
                                            </TouchableOpacity>
                                        </Box>
                                        <Box flex={1} justifyContent="flex-end" alignItems="flex-end" pr={isSelfie ? 0 : insets.top}>
                                            <TouchableOpacity onPress={handleAcceptPhoto}>
                                                <Ionicons color={Colors.SUCCESS} name="checkmark-circle-outline" size={100} />
                                            </TouchableOpacity>
                                        </Box>
                                    </HStack>
                                </ImageBackground>
                            </Center>
                        </>
                    ) :
                        (
                            <>
                                <Camera
                                    ref={cameraRef}
                                    device={device}
                                    isActive={showCamera}
                                    photo={true}
                                    onUIRotationChanged={handleOrientationChange}
                                    enableZoomGesture
                                    outputOrientation="device"
                                    preview={true}
                                    style={{ flex: 1 }}

                                />
                                {isSelfie ? (
                                    <FrontCameraControls screenOrientation={screenOrientation} handleCloseCameraView={handleCloseCameraView} handleTakePicture={handleTakePicture} hasMediaPermissions={hasMediaPermissions} openImageLibrary={openImageLibrary} />
                                ) : (
                                    <BackCameraControls screenOrientation={screenOrientation} handleCloseCameraView={handleCloseCameraView} handleTakePicture={handleTakePicture} hasMediaPermissions={hasMediaPermissions} openImageLibrary={openImageLibrary} />
                                )}
                            </>

                        )}
            </MainContainer>
        </Modal >
    );
}

export default FormCameraView;