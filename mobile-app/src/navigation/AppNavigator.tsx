import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArtworkScreen from '../screens/ArtworkScreen';
import { StackParamList } from './types';

const Stack = createStackNavigator<StackParamList>();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Artwork"
        component={ArtworkScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
