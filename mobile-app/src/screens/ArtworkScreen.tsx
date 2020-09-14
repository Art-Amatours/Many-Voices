import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Title } from '../components/Title';
import { Card, artwork} from '../components/Card';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 45,
  },
});

const imageURLList: string[] = ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.coursera.org%2Flearn%2Fmodern-art-ideas&psig=AOvVaw2PfNsPqg4Kqp-e20F1omOl&ust=1600195096999000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKD_9LSl6esCFQAAAAAdAAAAABAD"]
const testArtwork : artwork = {title: "Test", artist: "Artist", imageURLs:imageURLList}

const ArtworkScreen: React.FC = () => (
  <View style={styles.container}>
    <Title text="Artwork Screen" />
    <Card artwork = {testArtwork}></Card>

    <Text>Artwork Cards will ultimately be displayed here!</Text>
  </View>
);

export default ArtworkScreen;
