import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import ArtworkScreen from '../screens/ArtworkScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef, navigate } from './RootNavigation';
import InfoScreen from '../screens/InfoScreen';

const Stack = createStackNavigator<StackParamList>();

const styles = StyleSheet.create({
  infoButton: {
    paddingRight: 10,
  },
});

const infoButton = (title: string) => (<View style={ styles.infoButton }>
  <Button onPress={()=>{
    navigate('Info', {
      title: title
    });
    }} title="Info"/>
</View>);

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
          headerRight: () => infoButton(route.params.title)
        })}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={({ route }) => ({
          title: route.params.title
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
