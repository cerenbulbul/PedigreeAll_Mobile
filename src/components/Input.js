  
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { multiply } from 'react-native-reanimated';



export function Input({style, ...props}) {

  
  function blur() {
    this.ref.blur();
  }

  function focus() {
    this.ref.focus();
  }

  function componentDidMount() {
    this.focus()
  }
    
  return (
        <TextInput {...props} 
        style={[styles.input, style]}
        multiline={true}
          
        />
            
    
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor:'#e8e8e8',
    width:'100%',
    paddingLeft:20,
    //padding:20,
    borderRadius:8,
    fontSize:18,
    margin:0
  },
});