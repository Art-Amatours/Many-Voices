import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArtworkActionTypes, Critique } from '../store/artwork/types';
import { Audio } from 'expo-av';
import { connect, ConnectedProps } from 'react-redux';
import {
  setCurrentCritique,
  setCurrentSound,
  setIsPaused,
} from '../store/artwork/actions';

// Helpers.

async function playAudio(
  url: string,
  currentSound: Audio.Sound,
  setCurrentSound: (Sound: Audio.Sound) => ArtworkActionTypes,
) {
  try {
    currentSound.unloadAsync();
    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      {
        shouldPlay: true,
        isLooping: false,
      },
    );
    setCurrentSound(sound);
  } catch (error) {
    console.log('Oh noooooooooooo');
  }
}

// Styles.

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
    color: '#aeaeb2',
  },
  duration: {
    fontWeight: '600',
    color: '#aeaeb2',
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

// Redux goodness.

const mapDispatch = {
  setCurrentCritique: (critique: Critique) => setCurrentCritique(critique),
  setCurrentSound: (sound: Audio.Sound) => setCurrentSound(sound),
  setIsPaused: (isPaused: boolean) => setIsPaused(isPaused),
};
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

interface Props {
  critique: Critique;
  currentSound: Audio.Sound;
}

const CritiqueComponent: React.FC<Props & PropsFromRedux> = (
  props: Props & PropsFromRedux,
) => (
  <TouchableOpacity
    style={[styles.container, styles.row]}
    onPress={() => {
      props.setIsPaused(false);
      props.setCurrentCritique(props.critique);
      playAudio(
        props.critique.AudioURL,
        props.currentSound,
        props.setCurrentSound,
      );
    }}>
    <View style={[styles.col, { alignItems: 'stretch' }]}>
      <Text style={styles.title}>{props.critique.title}</Text>
      <Text style={styles.subtitle}>{props.critique.critic}</Text>
    </View>
    <View style={styles.col}>
      <Text style={[styles.duration, styles.rightAligned]}>{'1:23'}</Text>
      <View style={styles.row}>
        {props.critique.tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: tag[1] }]}>
            <Text style={styles.tagText}>{tag[0]}</Text>
          </View>
        ))}
      </View>
    </View>
  </TouchableOpacity>
);

export default connector(CritiqueComponent);
