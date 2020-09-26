import React from "react";
import { Text, View, StyleSheet } from "react-native";



interface Props {
  data: string[];
}

export const Tag: React.FC<Props> = (props: Props) => {

  const data_text = props.data.map((item, key)=>(
    <Text style={styles.TextStyle} key={key} >
        { item }  
    </Text>
  ));

  return (
    <View style={styles.container}>
      { data_text }
    </View>);
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue", 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle:{
    fontSize : 25,
     textAlign: 'center'
  }
});