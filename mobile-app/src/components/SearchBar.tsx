import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Styles

const borderRadius = 18;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    marginBottom: 8,
    marginLeft: 28,
    fontSize: 34,
    fontWeight: 'bold',
    color: 'black',
  },
  search: {
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    paddingTop: 12,
    paddingBottom: 18,
    paddingLeft: 18,
    paddingRight: 18,
    marginHorizontal: 12,
    marginTop: 12,
    backgroundColor: 'lightgrey',
  }
});

// Component

interface Props {
    text: string;
}

let searchQuery : string;

function onChangeText(text : string) {
  searchQuery = text;
}

export const SearchBar: React.FC<Props> = (props: Props) => (
    <View style={styles.container}>
      <TextInput
      style={styles.search}
      onChangeText={text => {onChangeText(text)}}
      placeholder={props.text}
    />
    </View>
);
