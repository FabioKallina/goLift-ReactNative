
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export default function SwipeToDelete({ children, onDelete }) {
    const translateX = useSharedValue(0);

    const panGesture = Gesture.Pan().onUpdate((e) => {
        if (e.translationX < 0) {
            translateX.value = e.translationX;
        }
    }).onEnd(() => {
        if (translateX.value < -100) {
            runOnJS(onDelete)();
        } else {
            translateX.value = withTiming(0);
        }
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.swipeable, animatedStyle]}>
                {children}
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    swipeable: {
        overflow: "hidden",
    },
})