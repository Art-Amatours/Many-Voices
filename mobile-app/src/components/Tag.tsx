import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Styles.

const styles = StyleSheet.create({
  tag: {
    marginLeft: 8,
    marginTop: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    height: 30,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});

// Component.

interface Props {
  data: string[][];
}

const Tag: React.FC<Props> = (props: Props) => {
  const dataText = props.data.map((item, key) => (
    <View style={[styles.tag, { backgroundColor: item[1] }]} key={key}>
      <Text style={styles.tagText} key={key}>
        {item[0]}
      </Text>
    </View>
  ));

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {dataText}
    </ScrollView>
  );
};

export default Tag;
