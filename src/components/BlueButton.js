import React from 'react';

import { StyleSheet, 
        Text, 
        View, 
        Platform,
        TouchableOpacity,
        Alert} from 'react-native';
import {Heading} from '../components/Heading';
import {Input} from '../components/Input';

export function BlueButton({title,style,onPress}) {
    return (
            <TouchableOpacity style={[styles.ButtonContainer,style]} onPress={onPress}>
                <Text style={styles.text}>
                    {title.toUpperCase()}
                </Text>
            </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
    container:{
        width: "100%",
        alignItems:'center'
    },
    ButtonContainer:{
        backgroundColor:'#2169ab',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius:8,
        elevation: 8,
    },
    text:{
        color:'white',
        fontWeight: '500',
        fontSize:16,

    }
  });