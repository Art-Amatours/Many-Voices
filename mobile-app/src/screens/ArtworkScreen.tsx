import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Title } from '../components/Title';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 45,
  },
});

const ArtworkScreen: React.FC = () => (
  
  <View style={styles.container}>
    <Title text="Artwork Screen"/>
    <Text>Artwork Cards will ultimately be displayed here!</Text>
  </View>
);

export default ArtworkScreen;
