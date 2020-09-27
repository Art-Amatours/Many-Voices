import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// Styles

const borderRadius = 18;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  },
});

// Component

interface Props {
  text: string;
}

export const SearchBar: React.FC<Props> = (props: Props) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder={props.text}
        value={query}
        onChangeText={(newQuery) => setQuery(newQuery)}
      />
    </View>
  );
};
