import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Title } from '../components/Title';
import { Card, artwork } from '../components/Card';
import { SearchBar } from '../components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import jsonData from '../../assets/artwork_format.json';

// import * as jsonData from '.../assets/artwork_format.json'




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


const ArtworkScreen: React.FC = () => {

  // const artworkData : string = JSON.parse(jsonData);

  const cards = jsonData.map((item, key)=>{
    const testArtwork : artwork = {title: item.title, artist: item.artist, imageURLs: item.imageURLs};
    return (
      <Card key = {key} artwork = {testArtwork} tagdata = { item.tags }></Card>
  );
  });

  return (
  <View style={styles.container}>
    <Title text="Artwork Screen" />
    <SearchBar text = "Search"/>
    <ScrollView contentContainerStyle={styles.gallery} showsVerticalScrollIndicator={false}>
      { cards }

    </ScrollView>
  </View>
  )
};

export default ArtworkScreen;
