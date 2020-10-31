import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import MediaPlayer from './components/MediaPlayer';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { configureStore } from './store';

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
    <MediaPlayer />
  </Provider>
);

export default App;
