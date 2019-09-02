import React, { useState } from 'react';
/* import { View } from 'react-native'; */
import { Text, Input, Button } from 'react-native-elements';

const AuthForm = ({ onSubmit, submit, errorMsg }) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  return (
    <>
      <Text h1 style={{ alignSelf: 'center' }}>
        {submit}
      </Text>
      <Input
        label="Email"
        autoCapitalization="none"
        autoCorrect={false}
        value={inputs.email}
        onChangeText={text => setInputs({ ...inputs, email: text })}
        errorMessage={errorMsg}
      />
      <Input
        label="Password"
        secureTextEntry={true}
        autoCapitalization="none"
        autoCorrect={false}
        value={inputs.password}
        onChangeText={text => setInputs({ ...inputs, password: text })}
      />
      <Button
        title={submit}
        type="solid"
        onPress={() =>
          onSubmit({ email: inputs.email, password: inputs.password })
        }
      />
    </>
  );
};

export default AuthForm;
