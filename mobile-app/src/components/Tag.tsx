import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Styles.

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
  tag: {
    marginLeft: 4,
    marginTop: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 100,
  },
  tagText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});

// Component.

interface Props {
  data: string[][];
}

const Tag: React.FC<Props> = (props: Props) => {
  const content = props.data.map(([tagName, backgroundColor], key) => (
    <View key={key} style={[styles.tag, { backgroundColor: backgroundColor }]}>
      <Text key={key} style={styles.tagText}>
        {tagName}
      </Text>
    </View>
  ));

  return <View style={styles.root}>{content}</View>;
};

export default Tag;
