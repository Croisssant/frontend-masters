import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import ColorPalette from "./screens/ColorPalette";
import { createStackNavigator } from "@react-navigation/stack";
import ColorPaletteModal from "./screens/ColorPaletteModal";

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen 
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};

export default function App() {
  return (
  <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen 
          name="Main" 
          component={MainStackScreen}
          options={{ headerShown: false }}/>
        <RootStack.Screen 
          name="ColorPaletteModal" 
          component={ColorPaletteModal}/>
      </RootStack.Navigator>
  </NavigationContainer>
  );
}

{/* <View style={styles.container}>
      <Text style={styles.heading}>Here are some boxes of different colors</Text>
    </View>
    <ColorBox colorName="Cyan" hexCode="#2aa198"></ColorBox>
    <ColorBox colorName="Blue" hexCode="#268bd2"></ColorBox>
    <ColorBox colorName="Magenta" hexCode="#d33682"></ColorBox>
    <ColorBox colorName="Orange" hexCode="#cb4b16"></ColorBox> */}