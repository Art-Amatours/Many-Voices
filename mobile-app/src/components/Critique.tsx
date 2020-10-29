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
export interface Props {
    title: string;
    subtitle: string;
    duration: string;
    tags: string[];
}

const activeOpacity = 0.8;
const borderRadius = 18;
const deviceScreenWidth = Math.round(Dimensions.get('window').width);
const cardWidth = Math.round(0.86 * deviceScreenWidth);
const cardHeight = Math.round(0.71 * cardWidth);
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      width: screenWidth,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 24,
      paddingRight: 24,
      borderBottomWidth: 1,
      borderBottomColor: '#aeaeb2',
    },
    row: {
      flexDirection: 'row',
    },
    col: {
      flexDirection: 'column',
    },
    rightAligned: {
      textAlign: 'right',
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
    },
    subtitle: {
      fontWeight: '600',
      textTransform: 'uppercase',
      color: '#aeaeb2'
    },
    duration: {
      fontWeight: '600',
      color: '#aeaeb2'
    },
    tag: {
      marginLeft: 4,
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 100,
    },
    tagText: {
      fontSize: 12,
      fontWeight: '600',
      color: 'white',
    },
  });

// Component

export const Critique: React.FC<Props> = (props: Props) => (
    <>
    <TouchableOpacity
      style={[styles.container, styles.row]}
      onPress={() => {}}
    >
      <View style={[styles.col, { alignItems: 'stretch' }]}>
        <Text style={styles.title}>{ props.title }</Text>
        <Text style={styles.subtitle}>{ props.subtitle }</Text>
      </View>
      <View style={styles.col}>
        <Text style={[styles.duration, styles.rightAligned]}>{ props.duration }</Text>
        <View style={styles.row}>
          {
            props.tags.map((tag, index) => (
              <View
                key={index}
                style={[styles.tag, { backgroundColor: '#af52de' }]}
              >
                <Text style={styles.tagText}>{ tag }</Text>
              </View>
            ))
          }
        </View>
      </View>
    </TouchableOpacity>
  </>
);

export default Critique;

