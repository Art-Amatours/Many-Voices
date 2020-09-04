import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StyleProp,
} from 'react-native';
import { useLinkProps } from '@react-navigation/native';

// import { connect } from 'react-redux';

const circleDim = Dimensions.get('window').width / 24;
const styles = StyleSheet.create({
    container: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    col: {
      flexDirection: 'column',
    },
    dummyPadding: {
      paddingTop: 192,
    },
    lineLeft: {
      width: '10%',
      height: 3,
      backgroundColor: 'white',
    },
    lineRight: {
      width: '90%',
      height: 3,
      backgroundColor: '#636366',
    },
    circle: {
      position: 'absolute',
      left: 24,
      width: circleDim,
      height: circleDim,
      backgroundColor: 'white',
      borderRadius: 100,
    },
    times: {
      fontWeight: '600',
      color: '#636366',
    },
    transcript: {
      marginTop: 16,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: 30,
    },
  });

  interface Props {
      playing: boolean,
      transcript: string,
  }

  export function MediaExpanded(props: Props) {
    let content;
    if (props.playing) {
        content = (
          <>
            <View style={[styles.container, styles.col]}>
              <View style={[styles.row, { alignItems: 'center' }]}>
                <View style={styles.lineLeft} />
                <View style={styles.lineRight} />
                <View style={styles.circle} />
              </View>
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <Text style={styles.times}>0:04</Text>
                <Text style={styles.times}>0:46</Text>
              </View>
            </View>
            <ScrollView>
              <Text style={styles.transcript}>{ props.transcript }</Text>
              <View style={styles.dummyPadding} />
            </ScrollView>
          </>
        );
      } else {
        content = (
          <View style={[styles.container, styles.col]}>
            <Text style={{ textAlign: 'center' }}>Nothing playing</Text>
          </View>
        );
      }

      return (
        <>
          { content }
        </>
      );
    };