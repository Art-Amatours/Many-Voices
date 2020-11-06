import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as RootNavigation from '../navigation/RootNavigation';
import { Artwork } from '../store/artwork/types';
import Tag from './Tag';
import { connect, ConnectedProps } from 'react-redux';
import { setCurrentArtwork } from '../store/artwork/actions';

// Styles

const activeOpacity = 0.8;
const borderRadius = 18;
const deviceScreenWidth = Math.round(Dimensions.get('window').width);
const cardWidth = Math.round(0.86 * deviceScreenWidth);
const cardHeight = Math.round(0.71 * cardWidth);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    marginTop: 24,
    shadowColor: 'black',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  bgImg: {
    width: '100%',
    height: '100%',
  },
  labels: {
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 12,
    paddingBottom: 18,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    paddingRight: 24,
  },
  subtitle: {
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#aeaeb2',
  },
  taglist: {},
});

// Redux goodness.

const mapDispatch = {
  setCurrentArtwork: (artwork: Artwork) => setCurrentArtwork(artwork),
};
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

interface Props {
  artwork: Artwork;
}

const Card: React.FC<Props & PropsFromRedux> = (
  props: Props & PropsFromRedux,
) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={activeOpacity}
    onPress={() => {
      props.setCurrentArtwork(props.artwork);
      RootNavigation.navigate('Details', {
        title: props.artwork.title,
      });
    }}>
    <ImageBackground
      source={{ uri: props.artwork.imageURLs[0] }}
      style={styles.bgImg}
      imageStyle={{ borderRadius }}>
      <View style={[styles.labels, styles.row]}>
        <View style={styles.col}>
          <Text style={styles.title}>{props.artwork.title}</Text>
          <Text style={styles.subtitle}>{props.artwork.artist}</Text>
        </View>
        <Tag data={props.artwork.tags} />
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

export default connector(Card);
