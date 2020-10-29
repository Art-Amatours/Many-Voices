import React, { useLayoutEffect } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Critique from '../components/Critique';

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

export interface Props {
  title: string;
  artist: string;
  imageURLs: string[];
  subtitle : string,
  content : string
}

const DetailsScreen: React.FC<Props> = (props: Props) => {
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
      <Image
        source={{ uri: props.imageURLs[0]}}
        style={styles.img}
      />
      <ScrollView>
        <Critique
          title="Critique One"
          subtitle="name - occupation"
          duration="1:10"
          tags={['#tag1', '#tag2']}
        />
        <Critique
          title="Critique Two"
          subtitle="name - occupation"
          duration="1:10"
          tags={['#tag1']}
        />
        <Critique
          title="Critique Three"
          subtitle="name - occupation"
          duration="1:10"
          tags={[]}
        />
        <Critique
          title="Critique Four"
          subtitle="name - occupation"
          duration="1:10"
          tags={['#tag1']}
        />
        <Critique
          title="Critique Five"
          subtitle="name - occupation"
          duration="1:10"
          tags={['#tag1']}
        />
        <Critique
          title="Critique Six"
          subtitle="name - occupation"
          duration="1:10"
          tags={['#tag1', '#tag2', '#tag3']}
        />
        <Critique
          title="Critique Seven"
          subtitle="name - occupation"
          duration="1:10"
          tags={[]}
        />
        <Critique
          title="Critique Eight"
          subtitle="name - occupation"
          duration="1:10"
          tags={['#tag1']}
        />
      </ScrollView>
      <View style={styles.dummyPaddingBottom} />
    </View>
  );
}

export default DetailsScreen;
