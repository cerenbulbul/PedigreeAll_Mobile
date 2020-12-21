
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

 export default function Toolbar({style,onPress}) {
     return (
         <View>

            <TouchableOpacity style={[styles.IconBar,style]} onPress={onPress}>
                <Icon name="bars" size={32} color={"#2e3f6e"} />
            </TouchableOpacity>

         </View>
        
     )
 }

 const styles = StyleSheet.create({
    Container:{
        backgroundColor: 'white'
    },
    IconBar:{
        padding:10,
    }
})
 