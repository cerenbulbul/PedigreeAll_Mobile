import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, 
        Text, 
        View, 
        Platform,
        TouchableOpacity,
        Alert} from 'react-native';
import {Heading} from '../components/Heading';
import {Input} from '../components/Input';

export function Error({error}) {
  return (
      <View >
        <Text style = {styles.text}>{error}</Text>
      </View>
    
    
  );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical:8,
    },
    text:{
        color:'red',
        fontWeight: 'bold',

    },
  });