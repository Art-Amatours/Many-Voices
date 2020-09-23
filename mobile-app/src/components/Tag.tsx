import React from "react";
import { Text, View, StyleSheet } from "react-native";



interface Props {
  data: string[];
}

export const Tag: React.FC<Props> = (props: Props) => (
  
    <View style={styles.container}>
    
      { props.data.map((item)=>(
         <Text 
            style={styles.TextStyle} > { item + "  " } 
         </Text>)
      )}

    </View>
 
);



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