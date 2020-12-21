import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, 
        Text, 
        View, 
        Platform,
        TouchableOpacity,
        Alert} from 'react-native';
import {Heading} from './Heading';
import {Input} from './Input';

export function TextButton({title,style,onPress}) {
  return (
    <TouchableOpacity style={[style]} onPress={onPress}>
        <Text style={styles.text}>
        </Text>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
    },
    text:{
        color:'#2e3f6e',
        fontWeight: '500',
        fontSize:14,

    }
  });