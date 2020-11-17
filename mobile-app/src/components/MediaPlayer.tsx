import React, { useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MediaExpanded from './MediaExpanded';
import { Audio } from 'expo-av';
import { RootState } from '../store';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'; // {... , PanGestureHandler }
import { connect, ConnectedProps } from 'react-redux';
import { setIsPaused, setCurrentSound } from '../store/artwork/actions';

// Helpers.

async function play(currentSound: Audio.Sound) {
  currentSound.playAsync();
}

async function pause(currentSound: Audio.Sound) {
  currentSound.pauseAsync();
}

async function changeAudioPosition(
  change: number,
  sound: Audio.Sound
) {
  try {
    const status = await sound.getStatusAsync();
    while(status.isLoaded == false);
    let new_time = status.positionMillis + change;
    if (new_time < 0) {
      new_time = 0;
    } else if(new_time > (status.durationMillis?? 0)) {
      new_time = status.durationMillis?? 0;
    }
    await sound.setPositionAsync(status.positionMillis + change);
  } catch (error) {
    console.log('Oh noooooooooooo');
  }
}

// Styles.

const borderRadius = 24;
const handlebarWidth = Dimensions.get('window').width / 5;
const snapBottom = Dimensions.get('window').height * 0.85;
const snapTop = Dimensions.get('window').height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 26,
    paddingRight: 26,
    alignItems: 'center',

    backgroundColor: '#c7c7cc',
    borderRadius,
    shadowColor: 'black',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
  },
  handlebarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: handlebarWidth * 2,
    paddingTop: 6,
    paddingBottom: 16,
  },
  handlebar: {
    width: handlebarWidth,
    height: 4,
    backgroundColor: '#aeaeb2',
    borderRadius: 100,
  },
  mainInfoWrapper: {
    width: '100%',
  },
  expanded: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#636366',
  },
  play: {
    width: 0,
    height: 0,
    margin: 8,
    borderLeftWidth: 28,
    borderTopWidth: 14,
    borderBottomWidth: 14,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'black',
  },
  pause: {
    width: 28,
    height: 28,
    margin: 8,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'black',
    borderRightColor: 'black',
  },
  skip: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    backgroundColor: 'black',
  },
});

// Redux goodness.

const mapState = (state: RootState) => ({
  critique: state.artwork.currentCritique,
  currentSound: state.artwork.currentSound,
  isPaused: state.artwork.isPaused,
  isPlaying: state.artwork.isPlaying,
});
const mapDispatch = {
  setCurrentSound: (currentSound: Audio.Sound) => setCurrentSound(currentSound),
  setIsPaused: (isPaused: boolean) => setIsPaused(isPaused),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const MediaPlayer: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  const [up, setUp] = useState(false);
  const pos = useRef(new Animated.Value(snapBottom)).current;

  let title: string = props.critique.title;

  if (title.length > 24) {
    if (title[20] == ' ') {
      title = title.substring(0, 20) + '...';
    } else {
      title = title.substring(0, 21) + '...';
    }
    
  }
  
  // props.currentSound.setOnPlaybackStatusUpdate(async (status) => {
  //   try {
  //     if(status.isLoaded) {
  //       setPositionMillis(status.positionMillis);
  //     }
  //   } catch (error) {
  //     console.log("Error getting sound status")
  //   }
  // });

  const handlebarTapHandler = () => {
    if (up) {
      Animated.timing(pos, {
        toValue: snapBottom,
        easing: Easing.out(Easing.exp),
        duration: 600,
        useNativeDriver: false,
      }).start();
      setUp(!up);
    } else {
      Animated.timing(pos, {
        toValue: snapTop,
        easing: Easing.out(Easing.exp),
        duration: 600,
        useNativeDriver: false,
      }).start();
      setUp(!up);
    }
  };

  let playpause;
  if (props.isPaused) {
    playpause = (
      <TouchableOpacity
        style={styles.play}
        onPress={() => {
          props.setIsPaused(false);
          play(props.currentSound);
        }}
      />
    );
  } else {
    playpause = (
      <TouchableOpacity
        style={styles.pause}
        onPress={() => {
          props.setIsPaused(true);
          pause(props.currentSound);
        }}
      />
    );
  }
  if (props.isPlaying) {
    return (
      <Animated.View style={[{ top: pos }, styles.container]}>
        <TouchableWithoutFeedback
          onPress={() => handlebarTapHandler()}
          style={styles.handlebarWrapper}>
          <View style={styles.handlebar} />
        </TouchableWithoutFeedback>
        <SafeAreaView style={[styles.col, styles.mainInfoWrapper]}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}> {props.critique.critic}</Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.skip} onPress = {() => changeAudioPosition(-15000, props.currentSound)}/>
              {playpause}
              <TouchableOpacity style={styles.skip} onPress = {() => changeAudioPosition(15000, props.currentSound)} />
            </View>
          </View>
          <View style={[{ opacity: up ? 1 : 0 }, styles.expanded]}>
            <MediaExpanded />
          </View>
        </SafeAreaView>
      </Animated.View>
    );
  } else {
    return null;
  }
};

export default connector(MediaPlayer);
