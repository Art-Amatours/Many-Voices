import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';

// Styles.

const deviceScreenHeight = Math.round(Dimensions.get('window').height);
const deviceScreenWidth = Math.round(Dimensions.get('window').width);
const sidePadding = deviceScreenWidth / 16;

const styles = StyleSheet.create({
  info: {
    width: '100%',
    height: deviceScreenHeight,
  },
  image: {
    width: deviceScreenWidth,
    height: deviceScreenHeight,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    marginTop: 16,
  },
  artist: {
    fontSize: 24,
    fontWeight: '600',
    color: '#AEAEB2',
    textTransform: 'uppercase',
    marginBottom: 16,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
  },
  description: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    lineHeight: 30,
    marginBottom: deviceScreenHeight / 4,
  },
});

// Redux goodness.

const mapState = (state: RootState) => ({
  artwork: state.artwork.currentArtwork,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const InfoScreen: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  const [imgHeight, setImageHeight] = useState(0);
  Image.getSize(
    props.artwork.imageURLs[0],
    (width, height) => {
      setImageHeight((deviceScreenWidth * height) / width);
    },
    (error) => console.log(error),
  );

  return (
    <ScrollView style={styles.info} showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: props.artwork.imageURLs[0] }}
        style={[styles.image, { height: imgHeight }]}
        resizeMode={'contain'}
      />
      <Text style={styles.title}>{props.artwork.title}</Text>
      <Text style={styles.artist}>{props.artwork.artist}</Text>
      <Text style={styles.description}>{props.artwork.description}</Text>
    </ScrollView>
  );
};

export default connector(InfoScreen);
