import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArtworkScreen from '../screens/ArtworkScreen';
import { StackParamList } from './types';
import { navigationRef } from './RootNavigation';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator<StackParamList>();

const AppNavigator: React.FC = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName="Artwork">
      <Stack.Screen
        name="Artwork"
        component={ArtworkScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
