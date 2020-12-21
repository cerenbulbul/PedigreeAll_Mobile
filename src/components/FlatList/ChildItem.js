import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View,Dimensions} from 'react-native';
import Indicator from './Indicator';
import {Card} from 'react-native-elements';

export default function ChildItem({
  data,
  item,
  style,
  onPress,
  index,
  imageKey,
  textKey,
  title,
  local,
  height,

})

{
  return (

    <TouchableOpacity style={styles.container} onPress={() => onPress(item[title])}>
      <Text style={styles.Title}>{item[title]}</Text>
      <Image
        style={[styles.image, style, {height: height}]}
        source={local ? item[imageKey] : {uri: item[imageKey]}}
      />
      <Text style={styles.Text}>{item[textKey]}</Text>
      
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'stretch',
    marginVertical:8,
  },
  indicatorContainerStyle: {
    marginTop: 18,
  },
  Text:{
    marginVertical:16,
    alignItems:'flex-start',
    width:Dimensions.get('screen').width,
    marginRight:5
  },
  Title:{
    fontSize:32,
    fontWeight:'500'
  }
});
