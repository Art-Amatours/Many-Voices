import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import MediaPlayer from './components/MediaPlayer';

// A BIT OF HARDCODING TESTING HERE TOO......

const App: React.FC = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
    <MediaPlayer mediaTitle="Song Title"/>
  </>
);

export default App;
