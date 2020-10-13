import React, { useEffect } from 'react';
import jsonData from '../../assets/artwork_format.json';
import { Artwork } from '../store/artwork/types';
import { Card, artwork } from '../components/Card';
import { RootState } from '../store';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from '../components/SearchBar';
import { Title } from '../components/Title';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { fetchAllArtworkFromCloud } from '../store/artwork/actions';

// import * as jsonData from '.../assets/artwork_format.json'

// Change the host that we hit to make API calls depending on if we're running in dev or prod.
let host: string;
// This env var will exist on an expo react native app, so it's safe to suppress this warning.
// eslint-disable-next-line no-undef
if (__DEV__) {
  host = 'http://10.0.0.3:6969';
} else {
  host = 'public-address-for-some-remote-box';
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
});
const mapDispatch = {
  fetchAllArtworkFromCloud: () => fetchAllArtworkFromCloud(host),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const ArtworkScreen: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  // const artworkData : string = JSON.parse(jsonData);

  useEffect(() => props.fetchAllArtworkFromCloud(), []);

  return (
    <View style={styles.container}>
      <Title text="Artwork Screen" />
      <SearchBar text="Search" />
      <ScrollView
        contentContainerStyle={styles.gallery}
        showsVerticalScrollIndicator={false}>
        {props.isLoadingArtwork && <Text>Loading...</Text>}
        {props.didErrorOccurLoadingArtwork && (
          <Text>Something went wrong fetching artwork from the cloud.</Text>
        )}
        {!props.isLoadingArtwork &&
          !props.didErrorOccurLoadingArtwork &&
          props.artworkList.map((item, key) => {
            // return <Card key={key} artwork={item} tagdata={jsonData[0].tags} />;
            return <Text key={key}>{item.title}</Text>;
          })}
      </ScrollView>
    </View>
  );
};

export default connector(ArtworkScreen);
