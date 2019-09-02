import '../_mockLocations'; // generate a series of mock location every second.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Map from '../components/Map';
import statusBarHeight from '../helper/statusBarHeight';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation'; // custom hook for location usage
import { withNavigationFocus } from 'react-navigation'; // HOC to see if screen in focus
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';

// screen to allow user to record their current location on the map (asks for permission first)
// and connect it to past and future recorded location as a connected polyline.
// To save battery, only track location when on this screen. (stop when navigating away)
const TrackCreateScreen = ({ isFocused }) => {
  // get callback action functions from location context
  const {
    state: { isRecording, errorMsg },
    updateCurrentLocation
  } = React.useContext(LocationContext);

  // useCallback makes sure the reference to its callback function updates
  // in respond to any changes to its dependency array. (2nd arg)
  // Updates the reference to updateCurrentLocation arrow function when isRecording changes.
  const callbackWhileRecording = React.useCallback(
    location => updateCurrentLocation(location, isRecording),
    [isRecording] // dependency array
  );

  // location hook calls the its callback function depending on the second argument
  // calls callbackWhileRecording if its screen is in focus or is still recording,
  // then receive any error back from the callback.
  const [error] = useLocation(callbackWhileRecording, isFocused || isRecording);

  return (
    <View style={styles.container}>
      <Map />
      {error ? (
        <Text
          style={{ color: 'red', alignSelf: 'center', backgroundColor: 'gray' }}
        >
          Please enable location services
        </Text>
      ) : null}
      <TrackForm errorMsg={errorMsg} />
    </View>
  );
};

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <FontAwesome name="plus" size={20} />
};

const styles = StyleSheet.create({
  container: { marginTop: statusBarHeight(), flex: 1 }
});

export default withNavigationFocus(TrackCreateScreen); // this HOC pass a props, isFocused, to TrackCreateScreen.
