import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

// a method that generates a location incremented from a coordinate
const getLocation = increment => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      latitude: 43.7812 + increment * tenMetersWithDegrees,
      longitude: -79.2449 + increment * tenMetersWithDegrees
    }
  };
};

// fake emit location change to expo location every second;
// increments location via a counter matches the escalated time since interval start.
let counter = 0;
const mockLocationMover = setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter += 1;
}, 1000);

mockLocationMover;
/* export default mockLocationMover; */
