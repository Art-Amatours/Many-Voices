import React, { useLayoutEffect } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';
import { setCurrentCritique, setCurrentSound, setIsPaused } from '../store/artwork/actions'

import CritiqueComponent from '../components/CritiqueComponent';
import { Critique } from '../store/artwork/types'
import { Audio } from 'expo-av'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dummyPaddingBottom: {
    paddingTop: 108,
  },
  img: {
    width: '100%',
    height: 300,
  },
});

// export interface Props {
//   title: string;
//   artist: string;
//   imageURLs: string[];
//   subtitle : string,
//   content : string
// }

// Redux goodness.

const mapState = (state: RootState) => ({
  artwork: state.artwork.currentArtwork,
  currentSound: state.artwork.currentSound,
  
});
const mapDispatch = {
  setCurrentCritique: (critique: Critique) => setCurrentCritique(critique),
  setCurrentSound: (currentSound: Audio.Sound) => setCurrentSound(currentSound),
  setIsPaused: (isPaused: boolean) => setIsPaused(isPaused),

};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DetailsScreen: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
//   useLayoutEffect(() => {
//     props.navigation.setOptions({
//       headerRight: () => (
//         <Button
//           onPress={() => props.navigation.navigate('Info', {
//             title: props.route.params.title,
//             subtitle: props.route.params.subtitle,
//             content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique nec tellus at vulputate. Ut sit amet mauris vitae ipsum sodales euismod. Donec dapibus hendrerit sapien. Mauris nec nibh et nisi aliquam vulputate. Sed in tempus erat. Aenean sed ornare arcu. Proin dapibus sagittis massa. Quisque quis est eleifend, sagittis ante at, maximus mi.
            
// uscipit nisl nisl, vitae malesuada massa imperdiet ac. Nulla laoreet, est at pellentesque iaculis, massa nisi rhoncus odio, at lobortis arcu sapien vitae diam. Integer sed lectus id tellus scelerisque ullamcorper. Mauris interdum iaculis nisl, et venenatis magna porttitor id. Quisque pharetra non eros placerat vestibulum. Pellentesque ultrices mauris eget lobortis tempor. Nam tincidunt, est nec aliquam scelerisque, enim metus pellentesque urna, at aliquam nunc arcu vel velit.`,
//             bgImgURI: props.route.params.bgImgURI,
//           })}
//           title="Info"
//         />
//       ),
//     });
//   }, [props.navigation]);

  return (
    <View style={styles.container}>
      { <Image
        source={{ uri: props.artwork.imageURLs[0]}}
        style={styles.img}
      /> }
      <ScrollView>
        {
          props.artwork.critiques.map((critique, key) => {
            return (
              <CritiqueComponent
                critique = { critique }
                setCritique = { props.setCurrentCritique }
                setCurrentSound = { props.setCurrentSound }
                currentSound = { props.currentSound }
                setIsPaused = { props.setIsPaused }
                key = { key }
              />
            )
          })
        /* <CritiqueComponent
          title="Critique One"
          subtitle="name - occupation"
          duration="1:10"
          tags={['#tag1', '#tag2']}
        />*/
        }
      </ScrollView>
      <View style={styles.dummyPaddingBottom} />
    </View>
  );
}

export default connector(DetailsScreen);
