import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Do some post
      console.log("Posted")
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => { navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',})
                        }
                }
      />
      <Button
        title='Create Post'
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  )
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput 
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button 
        title='Done'
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: "Home",
            params: { post: postText },
            merge: true
          })
        }}
      />
    </>
  )
}

function DetailsScreen({ route, navigation }) {

  const { itemId, otherParam } = route.params;


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title='Go to Details... again'
        onPress={() => navigation.push('Details')}   
      />
      <Button
        title='Go to Home'
        onPress={() => {navigation.navigate('Home')}}
      />
      <Button
        title='Go back'
        onPress={() => {navigation.goBack()}}
      />
      <Button
        title='Go back to first screen in stack'
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Update Title"
        onPress={() => navigation.setOptions({ title: "Updated Title! "})}
      />
    </View>
  );
}

// function LogoTitle() {
//   return (
//     <Image
//       style={{ width: 50, height: 50 }}
//       source={require('@expo/snack-static/react-native-logo.png')}
//     />
//   )
// }

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerStyle: {
              backgroundColor: '#f4511e',
             },
             headerTintColor: "#fff",
             headerTitleStyle: {
              fontWeight: "bold"
             }
        }}>
        <Stack.Screen name="Home" component={HomeScreen} 
            options={{ title: 'Overview',
                       headerRight: () => (<Button onPress={() => alert('This is a button!')} title='Info' color="#fff" />) }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} initialParams={{ itemId: 81 }}
                      options={({ route }) => ({ title: route.params.name,
                                                //  headerStyle: {
                                                //   backgroundColor: '#f4511e',
                                                //  },
                                                //  headerTintColor: "#fff",
                                                //  headerTitleStyle: {
                                                //   fontWeight: "bold"
                                                //  }
                                                })}
          />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
