import React from 'react';
import CritiqueComponent from '../components/CritiqueComponent';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';

// Styles.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dummyPaddingBottom: {
    paddingTop: 108,
  },
  img: {
    width: '100%',
    height: 300,
  },
});

// Redux goodness.

const mapState = (state: RootState) => ({
  artwork: state.artwork.currentArtwork,
  currentSound: state.artwork.currentSound,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const DetailsScreen: React.FC<PropsFromRedux> = (props: PropsFromRedux) => (
  <View style={styles.container}>
    <Image source={{ uri: props.artwork.imageURLs[0] }} style={styles.img} />
    <ScrollView>
      {props.artwork.critiques.map((critique, key) => {
        return (
          <CritiqueComponent
            key={key}
            critique={critique}
            currentSound={props.currentSound}
          />
        );
      })}
    </ScrollView>
    <View style={styles.dummyPaddingBottom} />
  </View>
);

export default connector(DetailsScreen);
