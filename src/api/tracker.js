import axios from 'axios';
import { AsyncStorage } from 'react-native';

//// using Ngrok uri (8 hours durations) to connect to localhost where expressAPI is instantiated
// update: backend api is now hosted on heroku
const trackerApi = axios.create({
  baseURL: 'https://trackserver001.herokuapp.com/'
});

/* const token = AsyncStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token; */

// in order to authenticate to server, we need to add the user's jwtoken each time we send a request to the server.
// Rather than manually plugging in the token in each request function,
// use a request interceptor before each request is used. (axios provides interceptor functions)
trackerApi.interceptors.request.use(
  // called every time there's a request to server; before it is sent
  async config => {
    const token = await AsyncStorage.getItem('token'); // get token from storage
    if (token) {
      // make sure token exists
      // add the token in the Authorization field inside the request header
      config.headers.Authorization = `Bearer ${token}`; // Authorization === 'Bearer a1s14fj3jdsad'
      // ! make sure it's headers with an 's'
    }
    return config;
  },
  error => {
    // called every time there's an error with the interceptor
    return Promise.reject(error); // send back a promise that'll reject with an error
  }
);

export default trackerApi;
