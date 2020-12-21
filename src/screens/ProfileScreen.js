import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

export function ProfileScreen() {
    return (
        <View style={styles.Container}>
            <Text>Profile Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})