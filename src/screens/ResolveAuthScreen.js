import { useContext, useEffect } from 'react';
/* import { View, Text  } from 'react-native'; */
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = ({ render }) => {
  const { tryTokenLogIn } = useContext(AuthContext);

  // attempt to log in using stored token on first mount.
  useEffect(() => {
    tryTokenLogIn();
  }, []);

  return render;
};

// don't render anything by default
ResolveAuthScreen.defaultProps = {
  render: null
};

export default ResolveAuthScreen;
