import React from 'react';
import { Button } from 'react-native';
import ArtworkScreen from '../screens/ArtworkScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';

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
        options={({ route }) => ({
          title: route.params.title,
          headerRight: () => <Button title="Info" />,
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
