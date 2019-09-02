import createDataContext from '../helper/createDataContext';

// Create a location context that use its provider to provide location data and callbacks to its children

// 0. Data structure = ?
// 1. initialState
// 2. Reducer
// 3. Actions
// 4. Create data context w/ 1,2,3 then export it

// 0) locationData === {currentLocation: obj, sessionName: string, locations: array, recording: bool, errorMsg: String}

// 1) Initial state
const initialState = {
  currentLocation: null,
  sessionName: '',
  locations: [],
  isRecording: false,
  errorMsg: ''
};

// 2) Location Reducer
const locationReducer = (state, action) => {
  switch (action.type) {
  case 'setErrorMsg':
    return { ...state, errorMsg: action.payload };
  case 'clearErrorMsg':
    return { ...state, errorMsg: '' };
  case 'startRecording':
    return { ...state, isRecording: true };
  case 'stopRecording':
    return { ...state, isRecording: false };
  case 'updateCurrentLocation':
    return {
      ...state,
      currentLocation: action.payload
    };
  case 'storeLocation':
    return {
      ...state,
      locations: [...state.locations, action.payload]
    };
  case 'changeSessionName':
    return {
      ...state,
      sessionName: action.payload
    };
  case 'resetSession':
    return {
      ...state,
      sessionName: '',
      locations: []
    };
  default:
    return state;
  }
};

// 3) Location Actions

const setErrorMsg = dispatch => errorMsg => {
  dispatch({
    type: 'setErrorMsg',
    payload: errorMsg
  });
};

const clearErrorMsg = dispatch => () => {
  dispatch({
    type: 'clearErrorMsg'
  });
};

const startRecording = dispatch => () => {
  dispatch({
    type: 'startRecording'
  });
};

const stopRecording = dispatch => () => {
  dispatch({
    type: 'stopRecording'
  });
};

const updateCurrentLocation = dispatch => (location, isRecording) => {
  // update the current location
  dispatch({
    type: 'updateCurrentLocation',
    payload: location
  });
  // add to location array if it's recording
  if (isRecording) {
    dispatch({
      type: 'storeLocation',
      payload: location
    });
  }
};

const changeSessionName = dispatch => name => {
  dispatch({
    type: 'changeSessionName',
    payload: name
  });
};

const resetSession = dispatch => () => {
  dispatch({
    type: 'resetSession'
  });
};

const locationActions = {
  setErrorMsg,
  clearErrorMsg,
  startRecording,
  stopRecording,
  updateCurrentLocation,
  changeSessionName,
  resetSession
};

// 4)
const LocationContext = () =>
  createDataContext(locationReducer, locationActions, initialState);

export const { Context, Provider } = LocationContext();
