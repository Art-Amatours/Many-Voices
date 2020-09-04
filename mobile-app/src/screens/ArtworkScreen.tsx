import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ArtworkScreen: React.FC = () => (
  <View style={styles.container}>
    <Text>Artwork Cards will ultimately be displayed here!</Text>
  </View>
);

export default ArtworkScreen;
