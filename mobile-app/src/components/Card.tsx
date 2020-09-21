import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Styles

const activeOpacity = 0.8;
const borderRadius = 18;
const deviceScreenWidth = Math.round(Dimensions.get('window').width);
const cardWidth = Math.round(0.86 * deviceScreenWidth);
const cardHeight = Math.round(0.82 * cardWidth);

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
    marginBottom: 24,

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
  },
  subtitle: {
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#aeaeb2',
  },
});

// Component

interface Props {
  artwork: {
    title: string;
    artist: string;
    imageURLs: string[];
  };
}

const Card: React.FC<Props> = (props: Props) => (
  <TouchableOpacity style={styles.card} activeOpacity={activeOpacity}>
    <ImageBackground
      source={{ uri: props.artwork.imageURLs[0] }}
      style={styles.bgImg}
      imageStyle={{ borderRadius }}>
      <View style={[styles.labels, styles.row]}>
        <View style={styles.col}>
          <Text style={styles.title}>{props.artwork.title}</Text>
          <Text style={styles.subtitle}>{props.artwork.artist}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

export default Card;