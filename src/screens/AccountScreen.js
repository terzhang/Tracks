import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Avatar } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import statusBarHeight from '../helper/statusBarHeight';
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {
  const {
    state: { email },
    logOut
  } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>
        Account
      </Text>
      <Avatar
        rounded
        icon={{ name: 'user', type: 'font-awesome' }}
        size="large"
        showEditButton
        onPress={() => console.log('That is your avatar!')}
        activeOpacity={0.7}
        containerStyle={styles.avatarContainer}
      />
      <Text h4>{email}</Text>
      <Button title={'Change Password'} />
      <Button title={'Log out'} type="outline" onPress={logOut} />
    </View>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusBarHeight(),
    justifyContent: 'space-between'
  },
  title: {
    alignSelf: 'center'
  },
  avatarContainer: {
    alignSelf: 'center'
  }
});

export default AccountScreen;
