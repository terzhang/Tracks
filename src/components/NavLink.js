import React from 'react';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

// a component that navigate to the given routeName via react navigation
const NavLink = ({ label, routeName, navigation }) => {
  return (
    <>
      <Button
        title={label}
        type="outline"
        onPress={() => navigation.navigate(routeName)}
      />
    </>
  );
};

export default withNavigation(NavLink);
