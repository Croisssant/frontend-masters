import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MoodOptionType } from '../types';
import { theme } from '../theme';
import Reanimated, { useAnimatedStyle, withTiming } from "react-native-reanimated"

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
    handleSelectMood: (moodOption: MoodOptionType) => void;
}

const imageSrc = require('../assets/butterflies.png');

export const MoodPicker: React.FC<MoodPickerProps> = ({ handleSelectMood }) => {
    const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
    const [hasSelected, setHasSelected] = React.useState(false);

    const buttonStyle = useAnimatedStyle(
        () => ({
          opacity: selectedMood ? withTiming(1) : withTiming(0.5),
          transform: [{ scale: selectedMood ? withTiming(1) : 0.8}]
        }),
        [selectedMood]
      );

    const handleSelect = React.useCallback(() => {
        if(selectedMood) {
            handleSelectMood(selectedMood);
            setSelectedMood(undefined);
            setHasSelected(true);
        }
    }, [handleSelectMood, selectedMood]); 

    if (hasSelected) {
        return (
            <View style={styles.container}>
                <Image 
                    source={imageSrc}
                    style={styles.image} />
                <Pressable 
                    style={styles.button}
                    onPress={() => setHasSelected(false)}>
                    <Text style={styles.buttonText}>Choose another!</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>
        <Text style={styles.heading}>How are you right now?</Text>
        <View style={styles.moodList}>
            {moodOptions.map(option => (
            <View key={option.emoji}>
                <Pressable
                onPress={() => setSelectedMood(option)}
                style={[
                    styles.moodItem,
                    option.emoji === selectedMood?.emoji
                    ? styles.selectedMoodItem
                    : undefined,
                ]}>
                <Text style={styles.moodText}>{option.emoji}</Text>
                </Pressable>
                <Text style={styles.descriptionText}>
                {selectedMood?.emoji === option.emoji ? option.description : ' '}
                </Text>
            </View>
            ))}
        </View>
        <ReanimatedPressable
            style={[styles.button, buttonStyle]}
            onPress={handleSelect}>
            <Text style={styles.buttonText}>Choose</Text>
        </ReanimatedPressable>
        </View>
    );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  container: {
    height:250,
    borderWidth: 2,
    borderColor: theme.colorPurple,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: "space-between"
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    color: theme.colorWhite
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
  }
});