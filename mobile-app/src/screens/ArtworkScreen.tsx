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

const imageURLList: string[] = ["https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_960_720.jpg"]
const testArtwork : artwork = {title: "Test", artist: "Artist", imageURLs:imageURLList}

const ArtworkScreen: React.FC = () => (
  <View style={styles.container}>
    <Title text="Artwork Screen" />
    <Card artwork = {testArtwork}></Card>

    <Text>Artwork Cards will ultimately be displayed here!</Text>
  </View>
);

export default ArtworkScreen;
