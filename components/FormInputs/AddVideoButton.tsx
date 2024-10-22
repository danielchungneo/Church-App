import { Button, ButtonText, HStack, Spinner, get } from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker';
import { Video, getVideoMetaData } from 'react-native-compressor';
import LoadingIndicator from '../LoadingIndicator';
import { Colors } from '@/enum/Colors';


type AddVideoButtonProps = {
    showButton: boolean;
    uploadCall: any;
    setShowLoading?: (value: boolean) => void;
    buttonText?: string;
    loadingButtonText?: string;
    loading?: boolean;
};

function AddVideoButton({ showButton, uploadCall, setShowLoading, buttonText = "Add Video", loading = false, loadingButtonText }: AddVideoButtonProps) {

    if (!showButton) return null

    const openImageLibrary = async () => {
        setShowLoading?.(true)
        let imageLibraryResult = await ImagePicker.launchImageLibraryAsync({ base64: true, mediaTypes: ImagePicker.MediaTypeOptions.Videos })
        if (!imageLibraryResult.canceled && !!imageLibraryResult?.assets?.length) {
            const video = imageLibraryResult.assets[0]

            const compressedVideo = await Video.compress(video.uri, { compressionMethod: "auto" })
            const compressedMetaData = await getVideoMetaData(compressedVideo)
            const videoResult = {
                fileName: video.fileName,
                uri: compressedVideo,
                type: video.type,
            }
            await uploadCall(videoResult)

        } else {
            setShowLoading?.(false)
        }
    }
    const [imagePickerStatus] = ImagePicker.useMediaLibraryPermissions();

    const getImagePermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return status
    }

    const hasMediaPermissions = imagePickerStatus?.granted

    if (!hasMediaPermissions) {
        getImagePermission()
    }
    return (
        <Button onPress={openImageLibrary}>
            {loading ? (
                <HStack justifyContent='center' alignItems='center' space='md'>
                    <Spinner size="small" color={Colors.TEXT} />
                    <ButtonText>
                        {loadingButtonText}
                    </ButtonText>
                </HStack>
            ) : (
                <ButtonText>
                    {buttonText}
                </ButtonText>
            )}
        </Button>
    );
}

export default AddVideoButton;