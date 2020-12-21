import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
//import Icon from 'react-native-ionicons';
import {useTheme} from '@react-navigation/native';
//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

export function IconButton({name, style, onPress}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon name={name} size={32} color={"#2e3f6e"}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});