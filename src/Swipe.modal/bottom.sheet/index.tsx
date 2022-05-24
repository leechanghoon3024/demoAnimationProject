import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { Box } from 'native-base';
import { HEIGHT, WIDTH } from '../const/style.const';

interface Props {
    children: React.ReactElement;
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
}

const translateArray = () => {
    const refry = HEIGHT / 20;
    const refry2 = 1 / 20;
    const diff = new Array(21).fill('-').map((_, i) => refry * i);
    const diff2 = new Array(21).fill('-').map((_, i) => refry2 * i);
    return [diff.reverse(), diff2];
};

export const BottomView = ({ children, onClose, isOpen }: Props) => {
    const progressValue = useSharedValue(0);

    const refryArray = translateArray();

    const showModal = () => {
        progressValue.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
        onClose(true);
    };

    const closeModal = () => {
        progressValue.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
        onClose(false);
    };

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (e.translationY > 0) {
                progressValue.value = interpolate(e.translationY, refryArray[0], refryArray[1], {
                    extrapolateRight: Extrapolation.EXTEND,
                });
            }
        })
        .onEnd((e) => {
            if (progressValue.value > 0.9) {
                progressValue.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
            } else {
                runOnJS(closeModal)();
            }
        });

    useEffect(() => {
        isOpen ? showModal() : closeModal();
    }, [isOpen]);

    const containerStyle = useAnimatedStyle(() => {
        const progressY = interpolate(progressValue.value, [0, 1], [HEIGHT, 40]);
        const opacity = interpolate(progressValue.value, [0, 1], [0, 1]);
        return {
            transform: [{ translateY: progressY }],
            height: HEIGHT,
            opacity: 1,
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'rgba(255,255,255,0)',
            width: WIDTH,
            borderRadius: 18,
            overflow: 'hidden',
        };
    }, []);

    return (
        <Animated.View style={[containerStyle, [StyleSheet.absoluteFillObject, { zIndex: 100 }]]}>
            <GestureDetector gesture={panGesture}>
                <Box w={'100%'} borderRadius={'18px'}>
                    <Box w={'100%'} bg={'transfer.100'} style={{ height: '100%', borderRadius: 40 }}>
                        <Box
                            w={'52px'}
                            h={'6px'}
                            bg={'white.100'}
                            borderRadius={10}
                            position={'absolute'}
                            top={'8px'}
                            alignSelf={'center'}
                        />
                        {children}
                    </Box>
                </Box>
            </GestureDetector>
        </Animated.View>
    );
};
