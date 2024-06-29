import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PhotoGalleryScreen from "./screens/PhotoGallery.screen";
import TimeScreen from './screens/Time.screen';
import PhotoListScreen from './screens/PhotoList.screen';

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name='Gallery' component={PhotoGalleryScreen} />
        <BottomTab.Screen name='Time' component={TimeScreen} />
        <BottomTab.Screen name='Photo List' component={PhotoListScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
