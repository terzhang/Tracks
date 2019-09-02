import React, { useContext } from 'react';
import { View } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext'; // ! Remember AuthContext outputs {Context, Provider}
import { NavigationEvents } from 'react-navigation'; // A component listener for navigation events

const LoginScreen = () => {
  // get state and login callback from AuthContext to dispatch and modify global state
  const { state, logIn, clearErrorMsg } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginBottom: 50 }}>
      <NavigationEvents
        // onWillFocus={() => {}} // called when about to navigate here
        // onDidFocus={() => {}} // called after navigating here
        onWillBlur={clearErrorMsg} // called when about to navigate away from here
        // onDidBlur={() => {}} // called after navigating away from here
      />
      <AuthForm
        submit={'Log in'}
        onSubmit={({ email, password }) =>
          logIn({ email: email, password: password })
        }
        errorMsg={state.errorMsg}
      />
      <NavLink
        label={'No account? Register today!'}
        routeName={'SignUpScreen'}
      />
    </View>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: null,
    headerTitle: 'Account Login',
    headerTitleStyle: {
      justifyContent: 'center'
    }
  };
};

export default LoginScreen;
