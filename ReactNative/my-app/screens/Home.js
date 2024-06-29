import React, { useState, useCallback, useEffect } from "react";
import { FlatList, StyleSheet, RefreshControl, Text } from "react-native";
import PalettePreview from "../components/PalettePreview";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({ navigation, route }) {
    const newColorPalette = route.params ? route.params.newColorPalette: undefined;
    const [colorPalettes, setColorPalettes] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchColorPalettes = useCallback(async () => {
        const result = await fetch('https://color-palette-api.kadikraman.vercel.app/palettes');

        if (result.ok) {
            const palettes = await result.json();
            setColorPalettes(palettes);
        }
    }, []);

    useEffect(() => {
        fetchColorPalettes();
    }, []);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchColorPalettes();
        setIsRefreshing(false);

    }, []);

    useEffect(() => {
        if(newColorPalette) {
            setColorPalettes(palettes => [newColorPalette, ...palettes])
        }
    }, [newColorPalette]);

    return (
    <FlatList 
        style={styles.list}
        data={colorPalettes}
        keyExtractor={item => item.paletteName}
        renderItem={({ item }) => (
            <PalettePreview 
                handlePress={() => {
                    navigation.navigate('ColorPalette', item)
                }}
                colorPalette={ item }/>
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
        <TouchableOpacity onPress={() => {navigation.navigate('ColorPaletteModal')}}>
            <Text style={styles.buttonText}>Add a color scheme</Text>
        </TouchableOpacity>}
    />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
        backgroundColor: 'white'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'teal',
        marginBottom: 10
    }
});