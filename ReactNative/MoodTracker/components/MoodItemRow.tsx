import React from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation, ScrollView } from 'react-native';
import format from 'date-fns/format';
import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';
import { useAppContext } from '../screens/App.provider';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Reanimated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

const maxSwipe = 80;

type MoodItemRowProps = {
    item: MoodOptionWithTimestamp,
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
    const appContext = useAppContext();
    const translateX = useSharedValue(0);
    
    const handleDelete = React.useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        appContext.handleDeleteMood(item);
    }, [appContext, item]);

    const deleteWithDelay = React.useCallback(() => {
        setTimeout(() => {
            handleDelete();
        }, 500);
    }, [handleDelete]);

    const onGestureEvent = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: event => {
            if (Math.abs(event.translationX) > maxSwipe) {
                translateX.value = withTiming(1000 * Math.sign(event.translationX));
                runOnJS(deleteWithDelay)();
            } else {
                translateX.value = withTiming(0);
            }
            
        }
    }, []);

    const cardStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value }
        ]
    }), []);

    return (
        <PanGestureHandler minDeltaX={1} minDeltaY={100} onGestureEvent={onGestureEvent}>
            <Reanimated.View style={[styles.moodItem, cardStyle]}>
                <View style={styles.iconAndDescription}>
                    <Text style={styles.moodValue}>{item.mood.emoji}</Text>
                    <Text style={styles.moodDescription}>{item.mood.description}</Text>
                </View>
                <Text style={styles.moodDate}>
                    {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
                </Text>
                <Pressable onPress={handleDelete}>
                    <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
            </Reanimated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    moodValue: {
        textAlign: 'center',
        fontSize: 40,
        marginRight: 10,
    },
    moodDate: {
        textAlign: 'center',
        color: theme.colorLavender,
    },
    moodItem: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    moodDescription: {
        fontSize: 18,
        color: theme.colorPurple,
        fontWeight: 'bold',
    },
    iconAndDescription: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteText: {
        color: theme.colorBlue
    },
});