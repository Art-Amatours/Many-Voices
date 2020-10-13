import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Tag } from './Tag';

// Styles

const activeOpacity = 0.8;
const borderRadius = 18;
const deviceScreenWidth = Math.round(Dimensions.get('window').width);
const cardWidth = Math.round(0.86 * deviceScreenWidth);
const cardHeight = Math.round(0.71 * cardWidth);

//Generic art tags to use until we start pulling in database information
const tagGeneric = [
  ['Art', '#34c759'],
  ['Aart', '#5ac8fa'],
  ['Aaart', '#ff3b30'],
];

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
    // marginBottom: 12,

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

// Component

interface Props {
  title: string;
  artist: string;
  backgroundImg: string;
  tagdata: string[][];
}

export const Card: React.FC<Props> = (props: Props) => (
  <TouchableOpacity style={styles.card} activeOpacity={activeOpacity}>
    <ImageBackground
      source={{ uri: props.backgroundImg }}
      style={styles.bgImg}
      imageStyle={{ borderRadius }}>
      <View style={[styles.labels, styles.row]}>
        <View style={styles.col}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.artist}</Text>
        </View>
        <Tag data={props.tagdata} />
      </View>

      {/* <View style={[styles.labels, styles.row]}> */}
      {/* </View> */}
    </ImageBackground>
  </TouchableOpacity>
);

export default Card;
