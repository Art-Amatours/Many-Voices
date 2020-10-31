import React from 'react';
import { RootState } from '../store';
import { StyleSheet, TextInput, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { setSearchQuery } from '../store/artwork/actions';

// Styles.

const borderRadius = 18;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  search: {
    borderRadius: borderRadius,
    padding: 18,
    marginHorizontal: 12,
    marginTop: 12,
    backgroundColor: 'lightgrey',
  },
});

// Redux goodness.

const mapState = (state: RootState) => ({
  search: state.artwork.searchQuery,
});
const mapDispatch = {
  setSearchQuery: (query: string) => setSearchQuery(query),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const SearchBar: React.FC<PropsFromRedux> = (props: PropsFromRedux) => (
  <View style={styles.container}>
    <TextInput
      style={styles.search}
      placeholder="Search"
      value={props.search}
      onChangeText={(newQuery) => {
        props.setSearchQuery(newQuery);
      }}
    />
  </View>
);

export default connector(SearchBar);
