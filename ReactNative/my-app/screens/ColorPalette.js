import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ColorBox from "../components/ColorBox";

export default function ColorPalette({ route }) {

    const { colors, paletteName } = route.params;

    return (
    <FlatList
    style={styles.container}
    data={colors}
    keyExtractor={item => item.colorName}
    renderItem={({ item }) => <ColorBox colorName={item.colorName} hexCode={item.hexCode}></ColorBox>}
    ListHeaderComponent={<Text style={styles.heading}>{ paletteName }</Text>}
    />
    );
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingTop: 10,
      backgroundColor: "white"
    },
    heading: {
      fontSize: 18,
      fontWeight: "bold"
    },
  });