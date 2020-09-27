import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 24,
      },
      img: {
        width: '100%',
        height: 400,
      },
      title: {
        fontSize: 34,
        fontWeight: '800',
      },
      subtitle: {
        marginBottom: 16,
        fontSize: 24,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#aeaeb2',
      },
      dummyPaddingBottom: {
        paddingTop: 108,
      },
});

export interface Props {
  title: string;
  artist: string;
  imageURLs: string[];
  subtitle : string,
  content : string
}

const DetailsScreen: React.FC<Props> = (props: Props) => (
    <>
    <ScrollView>
    <Image
      source={{ uri: props.imageURLs[0]}}
      style={styles.img}
    />
    <View style={styles.container}>
      <Text style={styles.title}>{ props.title }</Text>
      <Text style={styles.subtitle}>{ props.subtitle }</Text>
      <Text>{ props.content }</Text>
    </View>
  </ScrollView>
  <View style={styles.dummyPaddingBottom} />
  </>
);

export default DetailsScreen;
