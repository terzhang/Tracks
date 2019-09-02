import React from 'react';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from 'expo-location'; // location permission request

// create and export a location hook to track the locations depending on its 2nd arg
// call given callback function depending on shouldTrack
// then export any error while tracking
export default (callback, shouldTrack) => {
  const [error, setError] = React.useState(null); // local state via hooks

  // NOTE: The React Team recommends to define helper function inside useEffect
  // if the function references state/context/props.
  // and the referenced state/context/props should be added to the dependency array (2nd arg)

  // Apply side effect events to React
  React.useEffect(() => {
    let subscriber; // define an event subscriber
    // asynchronously track location
    const startTrackingLocation = async () => {
      try {
        // ask for tracking permission async before starting
        await requestPermissionsAsync();
        // assign a position subscriber to start watching for positional changes
        subscriber = await watchPositionAsync(
          {
            // first arg: settings
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          location => {
            // second arg: callback to call on location change
            callback(location);
          }
        );
      } catch (error) {
        // onError, store error in local state.
        setError(error);
      }
    };

    // start tracking if we should track
    if (shouldTrack) {
      startTrackingLocation();
    } else {
      // otherwise remove subscriber to stop tracking if there is one. (code defensively)
      if (subscriber) {
        subscriber.remove();
      }
      // nullify subscriber to unreference watchPositionAsync
      subscriber = null;
    }
    // when unmounting...
    return () => {
      // avoid starting a second position sub
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]); // nonempty second arg means side effect called whenever second arg changes

  // hook should return error if there is any
  return [error];
};
