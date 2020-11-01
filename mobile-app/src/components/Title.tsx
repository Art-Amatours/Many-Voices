import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Styles.

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    marginBottom: 8,
    marginLeft: 28,
    marginRight: 28,
    fontSize: 34,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

// Component.

interface Props {
  text: string;
}

const Title: React.FC<Props> = (props: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.text}</Text>
  </View>
);

export default Title;
