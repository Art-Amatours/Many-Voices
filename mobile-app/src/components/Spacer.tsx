import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';

// Styles

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height * 0.04
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

// Component

interface Props {
    text: string;
}

export const Spacer: React.FC<Props> = (props: Props) => (
    <View style={styles.container}>
    </View>
);
