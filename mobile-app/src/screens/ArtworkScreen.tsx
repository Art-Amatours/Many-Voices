import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Title } from '../components/Title';
import { Card, artwork } from '../components/Card';
import { SearchBar } from '../components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingBottom: Dimensions.get('window').height * 0.09,
  },
  gallery: {
    alignItems: 'center',
    paddingBottom: 72,
  },
});

const imageURLList: string[] = [
  'https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_960_720.jpg',
];
const testArtwork: artwork = {
  title: 'Test',
  artist: 'Artist',
  imageURLs: imageURLList,
};

const imageURLList2: string[] = [
  'https://get.pxhere.com/photo/modern-art-art-graphic-design-child-art-watercolor-paint-painting-visual-arts-illustration-Colorfulness-graphics-paint-acrylic-paint-drawing-artwork-1568485.jpg',
];
const testArtwork2: artwork = {
  title: 'Test2',
  artist: 'Artist2',
  imageURLs: imageURLList2,
};

const imageURLList3: string[] = [
  'https://i1.pickpik.com/photos/561/876/856/various-art-brush-paint-preview.jpg',
];
const testArtwork3: artwork = {
  title: 'Test3',
  artist: 'Artist3',
  imageURLs: imageURLList3,
};

const ArtworkScreen: React.FC = () => (
  <View style={styles.container}>
    <Title text="Artwork Screen" />
    <SearchBar text="Search" />
    <ScrollView
      contentContainerStyle={styles.gallery}
      showsVerticalScrollIndicator={false}>
      <Card artwork={testArtwork}></Card>
      <Card artwork={testArtwork2}></Card>
      <Card artwork={testArtwork3}></Card>
      {/* <Spacer text=""></Spacer> */}
    </ScrollView>
    {/* <Text>Artwork Cards will ultimately be displayed here!</Text> */}
  </View>
);

export default ArtworkScreen;
