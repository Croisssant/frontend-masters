import React, { useEffect, useReducer, useCallback } from "react";
import { ActivityIndicator, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { getList } from "../api/picsum";
import { actionCreators, initialState, reducer } from "../reducers/photos";
import PhotoGrid from "../components/PhotoGrid";
import { TimeSelection } from "../components/TimeSelection";
// import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoGalleryScreen() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { photos, nextPage, loading, error } = state

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading())

    try {
      const nextPhotos = await getList(nextPage)
      dispatch(actionCreators.success(nextPhotos, nextPage))
    } catch (e) {
      dispatch(actionCreators.failure())
    }
  }, [nextPage])

  useEffect(() => {
    fetchPhotos()
  }, [])

  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
        <View style={{flex: 1, marginTop: 25}}>
            <TimeSelection />
        </View>
        <View style={{flex: 12}}>
            <PhotoGrid numColumns={3} photos={photos} onEndReached={fetchPhotos}/>
        </View>
    </SafeAreaView>
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
