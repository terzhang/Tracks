import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
  // track state is an array of objects where each object is a track
  const { state, fetchTracks } = React.useContext(TrackContext);
  return (
    <View>
      <NavigationEvents
        onWillFocus={fetchTracks} // tracks are now updated/retrieved into track context state
      />
      {/* <Text>TrackListScreen</Text> */}
      <FlatList
        data={state}
        keyExtractor={item => item._id} // remember each object is given an _id
        renderItem={({ item }) => {
          // ! remember to deconstruct item from data (i.e ({item}) => ...)
          return (
            // ! remember to return
            <TouchableOpacity
              onPress={() =>
                // pass id to detail screen so that it can find the track via id matching
                navigation.navigate('TrackDetailScreen', { id: item._id })
              }
            >
              <ListItem title={item.name} chevron />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

TrackListScreen.navigationOptions = {
  title: 'Your Tracks'
};

export default TrackListScreen;
