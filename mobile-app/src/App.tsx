import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { MediaPlayer } from './components/MediaPlayer'

// A BIT OF HARDCODING TESTING HERE TOO......
let playDummy = () => {};

const App: React.FC = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
    <MediaPlayer paused={false} mediaTitle="Song Title" playpause={playDummy}/>
  </>
);

export default App;
