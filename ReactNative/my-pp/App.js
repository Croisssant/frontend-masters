import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import { useCounter } from './useCounter';
import { MyCounter } from './useCounter';
import { WindGraph } from './components/WindGraph';
import { Carousel } from 'react-native-snap-carousel';
import { GraphCarousel } from './components/GraphCarousel';




export default function App() {
  return (
    <SafeAreaView style={styles.container}>
  
      <GraphCarousel />
      <Text>{ MyCounter() }</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
