import React from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";


interface Props {
  data: string[][];
}

export const Tag: React.FC<Props> = (props: Props) => {

  const data_text = props.data.map((item, key)=>(
    <View style={[styles.tag, { backgroundColor: item[1]}]} key={key}>
      <Text style={styles.tagText} key={key} >
          { item[0] }  
      </Text>
    </View>
  ));

  return (
    <ScrollView style={styles.container} horizontal = { true } showsHorizontalScrollIndicator = { false }>
        { data_text }
    </ScrollView>);
}



const styles = StyleSheet.create({
  container: {
    // backgroundColor: "blue", 
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-end',
  },
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