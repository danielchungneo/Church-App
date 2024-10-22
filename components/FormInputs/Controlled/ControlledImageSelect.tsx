import FormCameraView from "@/components/FormCameraView";
import { Colors } from "@/enum/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Box, Button, ButtonText, Center, Image, Input, InputField, Text } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import ImageViewerOverlay from "@/components/ImageViewerOverlay";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

type ControlledImageSelectProps = {
    uriName: string;
    imageDetailName: string;
    label?: string;
    rounded?: boolean;
    isSelfie?: boolean;
    isImageUpload?: boolean;
};

function ControlledImageSelect({ uriName, label, imageDetailName, rounded = false, isSelfie, isImageUpload = false }: ControlledImageSelectProps) {
    const { control, getValues } = useFormContext();
    const [showCamera, setShowCamera] = useState(false);
    const [showImagePreview, setShowImagePreview] = useState(false);

    const [imagePickerStatus] = ImagePicker.useMediaLibraryPermissions();

    const getImagePermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return status
    }

    const hasMediaPermissions = imagePickerStatus?.granted

    if (!hasMediaPermissions && showCamera) {
        getImagePermission()
    }

    async function lockScreenPortrait() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    const handleCloseCamera = () => {
        setShowCamera(false)
    }

    const handleOpenCamera = async () => {
        // await unlockScreen()
        setShowCamera(true)
    }

    const stringUriValue = getValues(uriName)

    const { top } = useSafeAreaInsets()


    useEffect(() => {
        if (!showCamera) {
            lockScreenPortrait()
        }
    }, [showCamera])
    return (
        <Controller
            name={imageDetailName}
            control={control}
            render={({ field, fieldState }) => {
                const handleSetPhotoImage = (image: any) => {
                    field.onChange(image)
                }
                const isInvalid = fieldState.invalid;
                const isImageDetailValue = Boolean(field.value)

                const openImageLibrary = async () => {
                    let imageLibraryResult = await ImagePicker.launchImageLibraryAsync({ base64: true })

                    if (!imageLibraryResult.canceled && !!imageLibraryResult?.assets?.length) {
                        const photo = imageLibraryResult.assets[0]
                        handleSetPhotoImage(photo)
                    }
                }
                const handleReplaceImage = async () => {
                    if (isImageUpload) {
                        await openImageLibrary()
                    } else {
                        handleOpenCamera()
                    }
                    setShowImagePreview(false)
                }
                const renderHeader = () => {
                    return (
                        <Box p="$4" zIndex={100} position="absolute" top={top} w={"$full"} justifyContent="flex-end" alignItems="flex-end">
                            <Box zIndex={1000}>
                                <TouchableOpacity onPress={handleReplaceImage}>
                                    <Text color={Colors.BLUE} size="xl">Replace Image</Text>
                                </TouchableOpacity>
                            </Box>
                        </Box>
                    )
                }

                return (
                    <>
                        {label && (
                            <Text size="lg" color={isInvalid ? Colors.ERROR : Colors.INPUT} lineHeight="$xs">
                                {label}
                            </Text>
                        )}
                        <FormCameraView onClose={handleCloseCamera} showCamera={showCamera} handleSetPhoto={handleSetPhotoImage} isSelfie={isSelfie} />
                        {field?.value || stringUriValue ? (
                            <ImageViewerOverlay isVisibleControl={showImagePreview} setIsVisibleControl={setShowImagePreview} uri={isImageDetailValue ? field.value.uri : stringUriValue} renderHeader={renderHeader} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Center rounded={rounded ? "$full" : "$xl"} w={rounded ? 225 : "100%"} h={225} bg={Colors.SECONDARY} overflow="hidden" style={{ borderWidth: isInvalid ? 3 : 0, borderColor: Colors.ERROR }}>
                                    {isImageDetailValue ? (
                                        <Image source={{ uri: field.value.uri }} alt="Route Picture" height="100%" width="100%" />
                                    ) : (
                                        <Image source={{ uri: stringUriValue }} alt="Route Picture" height="100%" width="100%" />
                                    )}
                                </Center>
                            </ImageViewerOverlay>
                        ) : isImageUpload ? (
                            <TouchableOpacity onPress={openImageLibrary} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Center rounded={rounded ? "$full" : "$xl"} w={rounded ? 225 : "100%"} h={225} bg={Colors.SECONDARY} style={{ borderWidth: isInvalid ? 3 : 0, borderColor: Colors.ERROR }}>
                                    <MaterialIcons name="add-photo-alternate" size={100} color={Colors.INPUT} />
                                </Center>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleOpenCamera} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Center rounded={rounded ? "$full" : "$xl"} w={rounded ? 225 : "100%"} h={225} bg={Colors.SECONDARY} style={{ borderWidth: isInvalid ? 3 : 0, borderColor: Colors.ERROR }}>
                                    <MaterialCommunityIcons name="camera-plus" size={100} color={Colors.INPUT} />
                                </Center>
                            </TouchableOpacity>
                        )}
                    </>
                )
            }}
        />
    );
}

export default ControlledImageSelect;