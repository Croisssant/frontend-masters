import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { AppProvider } from './screens/App.provider';
import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer>
            <BottomTabsNavigator />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView> 
  );
}
