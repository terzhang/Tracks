import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext'; // ! Don't forget to import Context as *Context
import useTrack from '../hooks/useTrack';

// a component that callback to location context actions to start/stop recording and change its session name.
const TrackForm = ({ errorMsg }) => {
  const [namePrompt, setNamePrompt] = React.useState(false);
  const {
    state: {
      // deconstruct states out from location context
      sessionName,
      isRecording,
      locations
    }, // deconstruct actions out from global state from Location Context
    startRecording,
    stopRecording,
    changeSessionName
  } = React.useContext(LocationContext);

  const [saveTrack] = useTrack();

  const handleSave = () => {
    saveTrack;
    setNamePrompt(true);
  };

  const renderSaveBtn = () => {
    if (!isRecording && locations.length && !errorMsg) {
      return (
        <Button
          title={'Save Session'}
          titleStyle={{ color: 'mediumaquamarine', fontWeight: 'bold' }}
          containerStyle={[styles.buttonContainer, styles.bubble]}
          type={'clear'}
          onPress={handleSave}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Overlay
        isVisible={namePrompt}
        onBackdropPress={() => setNamePrompt(false)}
        height="auto"
      >
        <Input
          label="Session Name"
          autoCorrect={false}
          value={sessionName}
          onChangeText={text => changeSessionName(text)}
          errorMessage={errorMsg}
        />
      </Overlay>
      <View style={styles.buttonRow} pointerEvents="box-none">
        <Button
          title={isRecording ? 'Stop Tracking' : 'Start Tracking'}
          titleStyle={{ color: 'mediumaquamarine', fontWeight: 'bold' }}
          containerStyle={[styles.buttonContainer, styles.bubble]}
          type={'clear'}
          onPress={() => (isRecording ? stopRecording() : startRecording())}
        />
        {renderSaveBtn()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    margin: 20,
    width: 100
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 20
  }
});

export default TrackForm;
