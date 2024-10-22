import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    Modal as RNModal,
    ViewStyle,
    Platform,
    Pressable,
    Animated,
    Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Portal } from '@gorhom/portal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { isAndroid } from '@/enum/DeviceType';
import { Box, Button, CloseIcon, HStack, Icon, Text } from '@gluestack-ui/themed';
import { Colors } from '@/enum/Colors';

const ENTRY_ANIMATION_DURATION = 200;
const EXIT_ANIMATION_DURATION = 150;

export interface IModalProps {
    id?: string;
    children?: React.ReactNode;
    visible?: boolean;
    onClose?: () => void;
    style?: ViewStyle;
    headerContent?: React.ReactNode;
    hideCloseButton?: boolean;
    backdropColor?: string;
    backdropBlur?: number;
    viewMode?: 'dialog' | 'bottom-sheet';
    animationType?: 'none' | 'slide' | 'fade';
    contentColor?: string | false;
    onBackdropPress?: (event: any) => void;
    allowBackdropPress?: boolean;
    isFullScreen?: boolean;
    slideHeight?: any;
    horizontalMargin?: number | string;
    maximumHeight?: number | string | undefined;
    title?: string
}

const Modal = ({
    id = 'Modal',
    children,
    style,
    onClose,
    headerContent,
    hideCloseButton = false,
    backdropColor,
    backdropBlur,
    viewMode = 'dialog',
    animationType,
    contentColor,
    visible,
    allowBackdropPress,
    onBackdropPress,
    isFullScreen = false,
    slideHeight = null,
    horizontalMargin = 0,
    maximumHeight,
    title,
    ...props
}: IModalProps) => {
    /**
     * HOOKS
     */
    const insets = useSafeAreaInsets();
    const animatedViewRef = useRef();

    const { width, height } = Dimensions.get('window');

    /**
     * STATE
     */
    const [modalVisible, setModalVisible] = useState(visible);
    const [animatedViewLayout, setAnimatedViewLayout] = useState<{
        height: number;
        width: number;
        x: number;
        y: number;
    }>({ height: 0, width: 0, x: 0, y: 0 });

    /**
     * REFS
     */
    const slideAnimationYValue = useRef(new Animated.Value(0)).current;
    const fadeAnimationValue = useRef(new Animated.Value(0)).current;

    /**
     * COMPUTED
     */
    const modalStyles = StyleSheet.flatten([style, {}]) as ViewStyle;

    // generate component testID or accessibilityLabel based on Platform.OS
    const modalID =
        Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

    const showAsDialog = viewMode === 'dialog';
    const modalAnimationType = animationType || (showAsDialog ? 'fade' : 'slide');
    const useSlideAnimation = modalAnimationType === 'slide';
    const useFadeAnimation = modalAnimationType === 'fade';
    const useNoAnimation = modalAnimationType === 'none';

    const modalBackdropColor =
        backdropColor || showAsDialog
            ? String("#252F40") + (isAndroid ? 'F0' : '70')
            : isAndroid
                ? String("#252F40") + 'D0'
                : 'transparent';
    const modalBackdropBlur =
        backdropBlur !== undefined ? backdropBlur : showAsDialog ? 25 : 15;
    const finalContentColor = contentColor || "#FFFFFF";

    const BlurViewComponent = isAndroid ? View : BlurView;

    /**
     * FUNCTIONS
     */
    const runSlideInAnimation = () => {
        const toSlideValue = showAsDialog
            ? -height / 2 + animatedViewLayout.height / 2 // center vertically on screen
            : 0; // keep on bottom of screen

        // if slide animation, animate to slide value, otherwise jump there immediately
        Animated.timing(slideAnimationYValue, {
            toValue: toSlideValue,
            duration: useSlideAnimation ? ENTRY_ANIMATION_DURATION : 0,
            useNativeDriver: true,
        }).start();
    };

    const runSlideOutAnimation = () => {
        const toSlideValue = animatedViewLayout.height; // put just outside of screen

        Animated.timing(slideAnimationYValue, {
            toValue: toSlideValue,
            duration: useSlideAnimation ? EXIT_ANIMATION_DURATION : 0,
            useNativeDriver: true,
        }).start();
    };

    const runFadeInAnimation = () => {
        // if fade animation, animate to 1, otherwise jump there immediately
        Animated.timing(fadeAnimationValue, {
            toValue: 1,
            duration: useFadeAnimation ? ENTRY_ANIMATION_DURATION : 0,
            useNativeDriver: true,
        }).start();
    };

    const runFadeOutAnimation = () => {
        Animated.timing(fadeAnimationValue, {
            toValue: 0,
            duration: useFadeAnimation ? EXIT_ANIMATION_DURATION : 0,
            useNativeDriver: true,
        }).start();
    };

    const handleOpenModal = useCallback(() => {
        runSlideInAnimation();
        runFadeInAnimation();
    }, [
        slideAnimationYValue,
        fadeAnimationValue,
        animatedViewLayout,
        showAsDialog,
    ]);

    const handleCloseModal = useCallback(() => {
        if (useSlideAnimation) {
            runSlideOutAnimation();
        } else if (useFadeAnimation) {
            runFadeOutAnimation();
        }

        setTimeout(
            () => {
                // run the oppsoite animation to reset the animation values
                if (useSlideAnimation) {
                    runFadeOutAnimation();
                } else if (useFadeAnimation) {
                    runSlideOutAnimation();
                }

                setModalVisible(false);
                onClose?.();
            },
            useNoAnimation ? 0 : EXIT_ANIMATION_DURATION
        );
    }, [slideAnimationYValue, fadeAnimationValue, animatedViewLayout, onClose]);

    const handleAnimatedLayout = useCallback((evt: any) => {
        setAnimatedViewLayout(evt.nativeEvent.layout);
    }, []);

    const handleClickawayPress = useCallback((evt: any) => {
        if (onBackdropPress) {
            onBackdropPress(evt);
            return;
        }

        if (allowBackdropPress && onClose) {
            handleCloseModal();
        }
    }, []);

    const handleInnerContentPress = useCallback((evt: any) => {
        //
    }, []);

    /**
     * EFFECTS
     */
    useEffect(() => {
        if (visible) {
            setModalVisible(true);
        } else {
            handleCloseModal();
        }
    }, [visible]);

    useEffect(() => {
        if (animatedViewLayout.height) {
            handleOpenModal();
        }
    }, [animatedViewLayout]);

    return !!modalVisible ? (
        <Portal>
            {/* {!!props.visible && ( */}
            <BlurViewComponent
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    flex: 1,
                    display: 'flex',
                    justifyContent: showAsDialog ? 'center' : 'flex-end',
                    backgroundColor: modalBackdropColor,
                    // backgroundColor: 'red',
                }}
                intensity={modalBackdropBlur}
            >
                <Pressable style={{ flex: 1, display: "flex" }} onPress={handleClickawayPress}>
                    <Animated.View
                        onLayout={handleAnimatedLayout}
                        style={[
                            {
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                // backgroundColor: '#FFFFFF',
                                // height: 100,
                                height: slideHeight ? slideHeight : isFullScreen ? height - insets.bottom : undefined,
                                maxHeight: maximumHeight ? maximumHeight : null,
                            },
                            {
                                opacity: fadeAnimationValue,
                                transform: [
                                    {
                                        translateY: slideAnimationYValue,
                                    },
                                ],
                            },
                        ]}
                    >
                        <Box
                            flex={1}
                            justifyContent={showAsDialog ? 'center' : 'flex-start'}
                            backgroundColor={Colors.SECONDARY}
                            borderRadius={"$xl"}
                            marginHorizontal={horizontalMargin}
                        >
                            <HStack justifyContent='space-between' alignItems='center'>
                                <Box marginHorizontal="$4" mt="$2">
                                    <Text color={Colors.TEXT} size='3xl'>

                                        {title}
                                    </Text>
                                </Box>
                                {!hideCloseButton && (
                                    <Box flex={0} borderTopLeftRadius={"$2xl"} borderTopRightRadius={"$2xl"} h={"$10"} pr={"$2"} justifyContent='center' alignItems='flex-end'>
                                        <Pressable onPress={handleCloseModal}>
                                            <Ionicons name="close" color={Colors.TEXT} size={25} />
                                        </Pressable>
                                    </Box>
                                )}
                            </HStack>
                            {children}
                        </Box>
                    </Animated.View>
                </Pressable>
            </BlurViewComponent>
            {/* )} */}
        </Portal>
    ) : null;
};

export default React.memo(Modal);
