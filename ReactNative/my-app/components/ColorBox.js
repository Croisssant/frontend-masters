import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ColorBox = ({ colorName, hexCode }) => {
    const textColor = {
        color: parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1 ? 'black' : 'white'
    }

    return (
        <View style={[styles.colorBox, {backgroundColor: hexCode}]}>
            <Text style={[styles.boxText, textColor]}>{colorName}: {hexCode}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    boxText: {
        color: "white",
        fontWeight: "bold"
    },
    colorBox: {
        padding: 10,
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2
    }
  });

export default ColorBox;