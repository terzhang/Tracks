import React, { /* useState, */ useContext } from 'react';
import { View } from 'react-native';
/* import { Text, Input, Button } from 'react-native-elements'; */
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation'; // A component listener for navigation events

const SignUpScreen = () => {
  const { state, signUp, clearErrorMsg } = useContext(AuthContext); // use global state within AuthContext
  return (
    <View style={{ flex: 1, justifyContent: 'center', marginBottom: 10 }}>
      <NavigationEvents
        // onWillFocus={() => {}} // called when about to navigate here
        // onDidFocus={() => {}} // called after navigating here
        onWillBlur={clearErrorMsg} // called when about to navigate away from here
        // onDidBlur={() => {}} // called after navigating away from here
      />
      <AuthForm
        submit={'Register'}
        onSubmit={({ email, password }) =>
          signUp({ email: email, password: password })
        }
        errorMsg={state.errorMsg}
      />
      <NavLink
        label={'Already have an account? Let\'s Login!'}
        routeName={'LoginScreen'}
      />
    </View>
  );
};

SignUpScreen.navigationOptions = () => {
  return {
    header: null,
    headerTitle: 'Sign up for Track',
    headerTitleStyle: {
      justifyContent: 'center'
    }
  };
};

export default SignUpScreen;
