import createDataContext from '../helper/createDataContext';
import trackerApi from '../api/tracker';

// 0. TrackData === ?
// 1. Initial Track State
// 2. Track Reducer
// 3. Track Actions

// 0) Track Data === [track : object]; track === {}
// 1)
const initialTrackState = [];

// 2) Reducer
const trackReducer = (state, action) => {
  switch (action.type) {
  case 'fetchTracks':
    return action.payload; // database is our source of truth for Track Context state.
  default:
    return state;
  }
};

// 3) Actions
const fetchTracks = dispatch => async () => {
  try {
    const response = await trackerApi.get('/tracks'); // get tracks data from api
    // trust that our database will provide us with the all data from current user.
    const tracks = response.data; // ! it's response.data NOT response.body.data
    dispatch({ type: 'fetchTracks', payload: tracks }); // save track data to state.
  } catch (error) {
    // onError,
    console.log(error);
  }
};

const pushTrack = () => async (sessionName, locations) => {
  // Track schema is {userId: done for us, name: string, locations: array}
  // make a post request to server to store tracks in '/tracks' endpoint
  await trackerApi.post('/tracks', {
    name: sessionName,
    locations: locations
  });
  // should store error if there is error --> let useTrack handle the error, when pushTrack throws it.
  console.log(sessionName, locations.length);
};

const trackActions = { pushTrack, fetchTracks };

const TrackContext = createDataContext(
  trackReducer,
  trackActions,
  initialTrackState
);
export const { Context, Provider } = TrackContext;
