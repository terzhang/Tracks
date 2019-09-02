import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import {
  LoginScreen,
  AccountScreen,
  SignUpScreen,
  TrackCreateScreen,
  TrackDetailScreen,
  TrackListScreen
} from './src/screens/index';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

// authProvider is a HOC to share authData to its children
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/helper/navigationRef';

import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { Foundation } from '@expo/vector-icons';

// bi-directional path between Login and Sign Up screen
const authStackNav = createStackNavigator(
  {
    ResolveAuthScreen,
    LoginScreen,
    SignUpScreen
  },
  {
    initialRouteName: 'ResolveAuthScreen',
    navigationOptions: {
      title: 'My Tracks',
      header: null
    }
  }
);

// bi-directional path between Track List and its detail.
const trackStackNav = createStackNavigator({
  TrackListScreen,
  TrackDetailScreen
});
// nav options for track stack
trackStackNav.navigationOptions = {
  title: 'My Track',
  tabBarIcon: <Foundation name="list" size={20} />
};

// tab navigation between Tracks List, Track Create, and Track Account screen.
const trackTabNav = createBottomTabNavigator(
  {
    trackStackNav,
    TrackCreateScreen,
    AccountScreen
  },
  {
    initialRouteName: 'trackStackNav',
    navigationOptions: {
      title: 'My Tracks',
      header: null
    }
  }
);

// switching between authentication screens and tabbed screens.
const flowSwitchNav = createSwitchNavigator(
  {
    authStackNav,
    trackTabNav
  },
  {
    initialRouteName: 'authStackNav',
    navigationOptions: {
      title: 'My Tracks'
    }
  }
);

const AppContainer = createAppContainer(flowSwitchNav);

const App = () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <AppContainer ref={flowSwitchNav => setNavigator(flowSwitchNav)} />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};

export default App;
