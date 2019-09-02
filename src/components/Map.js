import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';
/* import { FontAwesome } from '@expo/vector-icons'; */

// display a map that updates according its current location from global state through location context
// a nd polyline all the recorded locations together.
const Map = () => {
  const {
    state: { currentLocation, locations, isRecording } // only needs current location and all locations array
  } = React.useContext(LocationContext); // get location state from location context

  const [map, setMap] = React.useState(null); // map ref
  const [deltas, setDeltas] = React.useState({
    latitudeDelta: 0.018,
    longitudeDelta: 0.03
  });
  const [followUser, setFollowUser] = React.useState(true);
  const [minimalUi, setMinimalUi] = React.useState(false);

  // if location is null, simply show loading endlessly until location is given
  if (!currentLocation) {
    return <ActivityIndicator size="large" />;
  }

  const currentCoords = currentLocation.coords; // get the Region from coords object

  const MoveToUserButton = () => {
    // this is the delta where it's hard to see the circle, so reset the delta
    if (deltas.latitudeDelta > 0.041 && deltas.longitudeDelta > 0.066) {
      setDeltas({
        latitudeDelta: 0.018,
        longitudeDelta: 0.03
      });
    }
    const userRegion = {
      longitude: currentCoords.longitude,
      latitude: currentCoords.latitude,
      ...deltas
    };
    const DURATION = 1000; // in millisecond
    return (
      <Icon
        raised
        name="child"
        type="font-awesome"
        containerStyle={[styles.toUserBtnContainer, { alignSelf: 'flex-end' }]}
        onPress={() => {
          map.animateToRegion(userRegion, DURATION);
        }}
      />
    );
  };

  // render a Marker
  const renderMarker = () => {
    // locations is an array, so if array is empty, it's falsy
    if (!locations.length) {
      return null;
    }
    const startCoords = locations[0].coords;
    const endCoords = locations[locations.length - 1].coords;
    return (
      <>
        <MapView.Marker
          title={'Start'}
          description={'The Track began here'}
          coordinate={startCoords}
        />
        {!isRecording && (
          <MapView.Marker
            title={'End'}
            description={'This is where you stopped'}
            pinColor={'gold'}
            coordinate={endCoords}
          />
        )}
      </>
    );
  };

  const handleRegionChange = () => {
    setFollowUser(false);
    setMinimalUi(true);
  };
  // onRegionChange passes native event emitter which returns a Location.
  const handleRegionChangeComplete = e => {
    setMinimalUi(false);
    // get the deltas from event
    setDeltas({
      latitudeDelta: e.latitudeDelta,
      longitudeDelta: e.longitudeDelta
    });
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={ref => setMap(ref)} // ref for accessing outside of map component
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            ...currentCoords,
            ...deltas
          }}
          loadingEnabled={true}
          showsCompass={!minimalUi}
          // showsMyLocationButton={!minimalUi} // Buggy feature, use own button
          followsUserLocation={followUser} // iOS only feature
          onRegionChange={handleRegionChange}
          onRegionChangeComplete={e => handleRegionChangeComplete(e)}
        >
          {renderMarker()}
          <MapView.Circle
            center={currentCoords}
            radius={30}
            strokeColor="rgba(158,158,225,1.0)" // rgb + opacity
            fillColor="rgba(158,158,255,0.3)"
          />
          <MapView.Polyline
            coordinates={locations.map(location => location.coords)}
            strokeWidth={5}
          />
        </MapView>
        <MoveToUserButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  mapView: { ...StyleSheet.absoluteFillObject },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  toUserBtnContainer: {
    backgroundColor: 'transparent',
    margin: 20
  },
  toUserBtn: {
    width: 100
  }
});

export default Map;
