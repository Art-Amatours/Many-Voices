import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import { Audio, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';

// Styles.

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
    height: 3,
    backgroundColor: 'white',
  },
  lineRight: {
    height: 3,
    backgroundColor: '#636366',
  },
  circle: {
    position: 'absolute',
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

async function setAudioPosition(
  position: number,
  sound: Audio.Sound
) {
  try {
    await sound.setPositionAsync(position);
  } catch (error) {
    console.log('Set Audio Position Error: ' + error);
  }
  return Promise.resolve();
}

// Redux goodness.

const mapState = (state: RootState) => ({
  critique: state.artwork.currentCritique,
  isPlaying: state.artwork.isPlaying,
  currentSound: state.artwork.currentSound,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const MediaExpanded: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  let content;

  const [position, setPosition] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [durationMillis, setDurationMillis] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  
  props.currentSound.setOnPlaybackStatusUpdate((status) => {
    try {
      if(status.isLoaded) {
        let seconds = Math.floor(status.positionMillis / 1000);
        let minutes = seconds - (seconds % 60);
        seconds %= 60;
        minutes /= 60;
        setPosition(minutes + ":" + ((seconds > 9)? "" : "0") + seconds);

        setPositionMillis(status.positionMillis);
        setDurationMillis(status.durationMillis?? 1);

        seconds = Math.floor((status.durationMillis?? 0) / 1000);
        minutes = seconds - (seconds % 60);
        seconds %= 60;
        minutes /= 60;
        setDuration(minutes + ":" + ((seconds > 9)? "" : "0") + seconds);
      }
    } catch (error) {
      console.log("Error getting sound status")
      throw(error)
    }
  });


  if (props.isPlaying) {
    content = (
      <>
        <View style={[styles.container, styles.col]}>
          <View style={[styles.row, { alignItems: 'center', height: 15
         }]}>
            <Slider
              
              style={{width: '100%', height: 40, position:'absolute'}}
              minimumValue={0}
              maximumValue={durationMillis}
              // minimumTrackTintColor="#FFFFFF"
              // maximumTrackTintColor="#000000"
              
              value = { positionMillis }
              onValueChange = { (value) => { 
                try {
                setAudioPosition(value, props.currentSound);
              } catch (error) {
                console.log("Error Scrubbing Audio");
              }
              }}
            />
          </View>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <Text style={styles.times}>{ position }</Text>
            <Text style={styles.times}>{ duration }</Text>
          </View>
        </View>
        <ScrollView>
          <Text style={styles.transcript}>{props.critique.transcript}</Text>
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

  return <>{content}</>;
};

export default connector(MediaExpanded);
