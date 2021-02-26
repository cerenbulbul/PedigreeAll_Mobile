import React from 'react';
import { View , Text, StyleSheet} from 'react-native';

export default function Title({text}) {
    return (
        <View style={styles.Container}>
            <Text style={styles.Title}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        justifyContent:'center',
        textAlign:'center',
        marginBottom:20
    },
    Title:{
        paddingTop:40,
        fontSize:24,
        fontWeight:'500',
        textAlign:'center',
        textTransform:'uppercase'
      },
})
