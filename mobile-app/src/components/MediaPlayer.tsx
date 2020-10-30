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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'; // {... , PanGestureHandler }
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';
import { setIsPaused, setCurrentSound } from '../store/artwork/actions';
// import { ArtworkActionTypes } from '../store/artwork/types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators as actions } from '../actions/media';

import MediaExpanded from './MediaExpanded';

/*
*  TRACK PLAYING SET UP
*/
import { Audio } from 'expo-av'
// import { RECORDING_OPTION_IOS_OUTPUT_FORMAT_APPLELOSSLESS } from 'expo-av/build/Audio';



async function play(currentSound: Audio.Sound) {
  currentSound.playAsync();
}

async function pause(currentSound: Audio.Sound) {
  currentSound.pauseAsync();
}




const snapTop = Dimensions.get('window').height * 0.25;

const snapBottom = Dimensions.get('window').height  * 0.85;
const borderRadius = 24;
const handlebarWidth = Dimensions.get('window').width / 5;

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

  // interface Props {
  //     mediaTitle: string,
  //     // playpause(arg1: boolean) : any; 
  // }

  // Redux goodness.

  const mapState = (state: RootState) => ({
    critique: state.artwork.currentCritique,
    isPlaying: state.artwork.isPlaying,
    isPaused: state.artwork.isPaused,
    currentSound: state.artwork.currentSound,
  });
  const mapDispatch = {
    setIsPaused: (isPaused: boolean) => setIsPaused(isPaused),
    setCurrentSound: (currentSound: Audio.Sound) => setCurrentSound(currentSound),
    // setCurrentCritique: (critique: Critique) => setCurrentCritique(critique),
  };
  const connector = connect(mapState, mapDispatch);
  type PropsFromRedux = ConnectedProps<typeof connector>;

  const MediaPlayer: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
    const [up, setUp] = useState(false);
    const pos = useRef(new Animated.Value(snapBottom)).current;
    // const playpause = (arg1: boolean) => {arg1 = !arg1};
    // const [paused, setPaused] = useState(false);

    const handlebarTapHandler = () => {
        if (up) {
        Animated.timing(pos, { 
            toValue: snapBottom, 
            easing: Easing.out(Easing.exp),
            duration: 600,
            useNativeDriver: false
         }).start();
        setUp(!up);
        } else {
            Animated.timing(pos, { 
                toValue: snapTop, 
                easing: Easing.out(Easing.exp),
                duration: 600,
                useNativeDriver: false
            }).start();
        setUp(!up);
        }
    };

    let playpause;
    if (props.isPaused) {
        playpause = (
        <TouchableOpacity
            style={styles.play}
            // A BIT OF HARDCODING TESTING HERE....
            onPress= {() => 
              {
                props.setIsPaused(false)
                play(props.currentSound)

              }
            }
        />
        );
    } else {
        playpause = (
        <TouchableOpacity
            style={styles.pause}
            // A BIT OF HARDCODING TESTING HERE....
            onPress={() => 
              {
                props.setIsPaused(true);
                pause(props.currentSound);
              }
            }
            
            
        />
        );
    }
    if (props.isPlaying) {
    return (
        <Animated.View style={[{ top: pos }, styles.container]}>
        <TouchableWithoutFeedback
            onPress={() => handlebarTapHandler()}
            style={styles.handlebarWrapper}
        >
            <View style={styles.handlebar} />
        </TouchableWithoutFeedback>
        <SafeAreaView style={[styles.col, styles.mainInfoWrapper]}>
            <View style={styles.row}>
            <View style={styles.col}>
                <Text style={styles.title}>{ props.critique.title }</Text>
                <Text style={styles.subtitle}> { props.critique.critic }</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.skip} />
                { playpause }
                <TouchableOpacity style={styles.skip} />
            </View>
            </View>
            <View style={[{ opacity: up ? 1 : 0 }, styles.expanded]}>
            <MediaExpanded/>
            </View>
        </SafeAreaView>
        </Animated.View>
    );
    }
    else {
      return <></>
    }
}

export default connector(MediaPlayer);
// const mapStateToProps = (state) => {
//   const { mediaTitle, paused } = state.media;
//   return { mediaTitle, paused };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     playpause: bindActionCreators(actions.playpause, dispatch),
//   };
// }
  
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   )(MediaPlayer);
