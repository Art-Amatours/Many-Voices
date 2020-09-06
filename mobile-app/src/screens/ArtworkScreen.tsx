import React from 'react';
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Card from '../components/Card';
import Title from '../components/Title';

export default function ArtworkScreen(props) {
  // Get exhibitList prop passed in from a Screen component in AppNavigator.
  const exhibitList = props.route.params.exhibitList;

  const tagList = [
    ['#tag1', '#tag2'],
    ['#tag1', '#tag2'],
    ['#tag1'],
    ['#tag1', '#tag2'],
  ];
  const colorsList = [
    [2, 1],
    [3, 2],
    [4],
    [1, 0],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.dummyPaddingTop} />
        <Title text="Artwork" />
        {
          exhibitList.map((exhibit, index) => (
            <Card
              key={index}
              navigation={props.navigation}
              title={exhibit.title}
              subtitle={exhibit.author}
              bgImgURI={exhibit.images[0]}
              tags={tagList[index]}
              colors={colorsList[index]}
            />
          ))
        }
      </ScrollView>
      <View style={styles.dummyPaddingBottom} />
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dummyPaddingTop: {
    paddingTop: 24,
  },
  dummyPaddingBottom: {
    paddingTop: 42,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
  }
});