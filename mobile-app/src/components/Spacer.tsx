import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

// Styles.

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height * 0.04,
  },
});

// Component.

export const Spacer: React.FC = () => <View style={styles.container}></View>;
