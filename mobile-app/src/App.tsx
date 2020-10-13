import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import MediaPlayer from './components/MediaPlayer';
import { configureStore } from './store';
import { Provider } from 'react-redux';

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
    <MediaPlayer mediaTitle="Song Title" />
  </Provider>
);

export default App;
