import React from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../helper/navigationRef';

// have the two context: TrackContext and LocationContext communicate with each other
// using Track hook to save/push a track to database
export default () => {
  const { pushTrack } = React.useContext(TrackContext); // get Action from Track Context
  const {
    state: { locations, sessionName, errorMsg },
    resetSession,
    setErrorMsg,
    clearErrorMsg
  } = React.useContext(LocationContext); // get state from Location Context

  // calls the context action from track context
  // using the state from Location Context as argument
  const saveTrack = async () => {
    try {
      await pushTrack(sessionName, locations); // push track to server
      resetSession(); // reset the session
      // clear error msg if there is any.
      if (errorMsg) {
        clearErrorMsg();
      }
      navigate('TrackListScreen');
    } catch (error) {
      setErrorMsg('Please enter a valid session name!');
    }
  };

  return [saveTrack]; // return the callback in an array b/c of convention.
};
