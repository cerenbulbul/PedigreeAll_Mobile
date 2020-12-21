import React from 'react';
import {View, StyleSheet} from 'react-native';

export function AuthContainer({children,style}) {
  return <View style={[styles.container,style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: "white",
  },
});