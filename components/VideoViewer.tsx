import { Colors } from "@/enum/Colors";
import { DEVICE_DIMENSIONS } from "@/enum/DeviceDimensions";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Center, ImageBackground, Text } from "@gluestack-ui/themed";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useVideoPlayer, VideoView } from 'expo-video';
import * as VideoThumbnails from 'expo-video-thumbnails';

type VideoViewerProps = {
    videoUri: string;
};

function VideoViewer({ videoUri }: VideoViewerProps) {
    const ref = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const player = useVideoPlayer(videoUri, player => {
        player.loop = false;
        // player.play();
    });

    const handleStartVideo = () => {
        setShowVideo(true);
        player.play();
    }

    const generateThumbnail = async () => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                videoUri,
                {
                    time: 15000,
                }
            );
            setThumbnail(uri);
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        const subscription = player.addListener('playingChange', isPlaying => {
            setIsPlaying(isPlaying);
        });

        return () => {
            subscription.remove();
        };
    }, [player]);

    useEffect(() => {
        if (videoUri) {
            generateThumbnail();
        }
    }, [videoUri]);
    return (
        showVideo ? (
            <Center rounded="$2xl" height={DEVICE_DIMENSIONS.height / 4} borderColor={Colors.BLACK} bg={Colors.PRIMARY} borderWidth={2} overflow="hidden">
                <VideoView
                    ref={ref}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                    style={{ width: "100%", height: "100%" }}
                />
            </Center>
        ) : (

            <Center rounded="$2xl" height={DEVICE_DIMENSIONS.height / 4} borderColor={Colors.BLACK} bg={Colors.PRIMARY} borderWidth={2} overflow="hidden">
                {thumbnail && (
                    <ImageBackground source={{ uri: thumbnail }} style={{ width: "100%", height: "100%" }}>
                        <Box flex={1} justifyContent="center" alignItems="center">
                            <TouchableOpacity onPress={handleStartVideo}>
                                <MaterialIcons name="play-arrow" size={100} color={Colors.TEXT} />
                            </TouchableOpacity>
                        </Box>
                    </ImageBackground>
                )}
            </Center >
        )
    );
}

export default VideoViewer;