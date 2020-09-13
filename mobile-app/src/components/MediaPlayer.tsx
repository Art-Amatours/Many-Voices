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

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators as actions } from '../actions/media';

import { MediaExpanded } from './MediaExpanded';

const snapTop = 192;
const snapBottom = Dimensions.get('window').height - 108;
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

  interface Props {
      mediaTitle: string,
      // playpause(arg1: boolean) : any; 
  }

  const MediaPlayer: React.FC<Props> = (props: Props) => {
    const [up, setUp] = useState(false);
    const pos = useRef(new Animated.Value(snapBottom)).current;
    // const playpause = (arg1: boolean) => {arg1 = !arg1};
    const [paused, setPaused] = useState(false);

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
    if (paused) {
        playpause = (
        <TouchableOpacity
            style={styles.play}
            // A BIT OF HARDCODING TESTING HERE....
            onPress= {() => setPaused(false)}
        />
        );
    } else {
        playpause = (
        <TouchableOpacity
            style={styles.pause}
            // A BIT OF HARDCODING TESTING HERE....
            onPress={() => setPaused(true)}
        />
        );
    }

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
                <Text style={styles.title}>{ props.mediaTitle }</Text>
                <Text style={styles.subtitle}>name - occupation</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.skip} />
                { playpause }
                <TouchableOpacity style={styles.skip} />
            </View>
            </View>
            <View style={[{ opacity: up ? 1 : 0 }, styles.expanded]}>
            <MediaExpanded playing={true} 
                transcript="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et augue quis neque iaculis auctor. Nulla tincidunt magna tincidunt odio facilisis, nec aliquet nunc laoreet. Cras tincidunt egestas urna, ut dignissim turpis porttitor sit amet. Morbi vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a dui et dolor feugiat dapibus. Phasellus nec ullamcorper ex. Quisque mi magna, viverra et semper id, dictum a sapien. Nulla iaculis sollicitudin velit, a ultricies metus lacinia nec. Phasellus vitae elit cursus, dictum nibh in, convallis orci. Sed id faucibus felis. Ut eu mi ut ante ullamcorper faucibus vel vel enim."
            />
            </View>
        </SafeAreaView>
        </Animated.View>
    );
}

export default MediaPlayer;
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
