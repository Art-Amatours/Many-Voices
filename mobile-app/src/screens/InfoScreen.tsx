import React from 'react';
import CritiqueComponent from '../components/CritiqueComponent';
import { Image, ScrollView, StyleSheet, View, Dimensions, Text } from 'react-native';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';

// Styles.
const deviceScreenHeight = Math.round(Dimensions.get('window').height);
const deviceScreenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  info: {
    width: '100%',
    height: deviceScreenHeight
  },
  image: {
    width: deviceScreenWidth,
    height: deviceScreenHeight,
  },
  description: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: deviceScreenWidth/20,
    paddingRight: deviceScreenWidth/20,
    lineHeight: 30,
  }
});

// Redux goodness.

const mapState = (state: RootState) => ({
  artwork: state.artwork.currentArtwork
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const InfoScreen: React.FC<PropsFromRedux> = (props: PropsFromRedux) => (
  <ScrollView
  style ={styles.info}
  showsVerticalScrollIndicator={false}>
    <Image 
        source={{ uri: props.artwork.imageURLs[0] }} 
        style={styles.image} 
        resizeMode={'contain'}
    />
    <Text 
        style = {styles.description}> 
        {props.artwork.artist}
    </Text>
    <Text 
        style = {styles.description}> 
        {props.artwork.description}
    </Text>
        
  </ScrollView>
);

export default connector(InfoScreen);
