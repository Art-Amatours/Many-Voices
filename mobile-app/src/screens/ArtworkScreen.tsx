import React, { useEffect } from 'react';
import Card from '../components/Card';
import Constants from 'expo-constants';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import { RootState } from '../store';
import { ScrollView } from 'react-native-gesture-handler';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { fetchAllArtworkFromCloud } from '../store/artwork/actions';

// Change the host that we hit to make API calls depending on if we're running in dev or prod.
let host: string;
// This env var will exist on an expo react native app, so it's safe to suppress this warning.
// eslint-disable-next-line no-undef
if (__DEV__) {
  const { manifest } = Constants;
  host =
    'http://' + manifest.debuggerHost?.split(':').shift()?.concat(':6969') ??
    ''; // Fallback will break, but we shouldn't ever have to rely on it.
} else {
  host = 'public-address-for-some-remote-box';
}

// Helpers.

function tagContains(tags: string[][], searchQuery: string): boolean {
  let contains = false;
  tags.forEach((element) => {
    contains = element[0].includes(searchQuery) || contains;
  });
  return contains;
}

// Styles.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingBottom: Dimensions.get('window').height * 0.09,
  },
  gallery: {
    alignItems: 'center',
    paddingBottom: 72,
  },
});

// Redux goodness.

const mapState = (state: RootState) => ({
  artworkList: state.artwork.list,
  isLoadingArtwork: state.artwork.isLoading,
  didErrorOccurLoadingArtwork: state.artwork.isError,
  search: state.artwork.searchQuery,
});
const mapDispatch = {
  fetchAllArtworkFromCloud: () => fetchAllArtworkFromCloud(host),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const ArtworkScreen: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  // When the app first launches, reach out to the network to fetch all of the
  // content this app will need to display, and throw it in the redux global
  // store.
  useEffect(() => props.fetchAllArtworkFromCloud(), []);

  return (
    <View style={styles.container}>
      <Title text="Gallery" />
      <SearchBar />
      <ScrollView
        contentContainerStyle={styles.gallery}
        showsVerticalScrollIndicator={false}>
        {props.isLoadingArtwork && <Text>Loading...</Text>}
        {props.didErrorOccurLoadingArtwork && (
          <Text>Something went wrong fetching artwork from the cloud.</Text>
        )}
        {!props.isLoadingArtwork &&
          !props.didErrorOccurLoadingArtwork &&
          props.artworkList.map((artwork, key) => {
            if (
              props.search == null ||
              artwork.title.includes(props.search) ||
              tagContains(artwork.tags, props.search)
            ) {
              return <Card key={key} artwork={artwork} />;
            } else {
              return null;
            }
          })}
      </ScrollView>
    </View>
  );
};

export default connector(ArtworkScreen);
