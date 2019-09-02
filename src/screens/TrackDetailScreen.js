import React from 'react';
import { View, Text } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = React.useContext(TrackContext); // get track context state

  const trackId = navigation.getParam('id'); // get id that's passed from nav param

  // find the right trick by matching id through each track in state.
  const track = state.find(thisTrackInState => thisTrackInState._id == trackId);
  const firstCoordinateInTrack = track.locations[0].coords;

  return (
    <View>
      <Text>{track.name}</Text>
      <MapView
        initialRegion={{
          // MapView needs to know where to focus on start
          ...firstCoordinateInTrack,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        style={{ height: 300 }} // height is a required props
      >
        <MapView.Polyline
          // feed an array of coords to coordinates by mapping over each location in track
          coordinates={track.locations.map(locationObj => locationObj.coords)}
        />
      </MapView>
    </View>
  );
};

TrackDetailScreen.navigationOptions = {
  title: 'Details'
};

export default TrackDetailScreen;

/* Track structure
"_id": String,
"locations": Array [
  Object {
    "id": String,
    "timestamp": Number,
    "coords": Object {
      accuracy: Number,
      altitude: Number,
      heading: Number,
      latitude: Number,
      longitude: Number,
      speed: Number,
    }
  }
]
*/
