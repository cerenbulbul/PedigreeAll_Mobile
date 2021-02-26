import React from 'react'
import { 
  View,
  StyleSheet,
  Text, 
  TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";

export function ErrorMessage({errorMessageTitle,errorMessageText,onPress}) {
    return (
        <View style={styles.Container}>
            <View style={styles.ErrorMessageContainer}>
            <Icon style={{marginBottom:40}} name="exclamation-circle" size={150} color="#e54f4f" />
            <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
            <Text style={styles.ErrorMessageText}>The Category has not data. You can choose another category or see the Blog Screen.</Text>
            <View style={styles.ErrorMessageButtonContainer}>
                <TouchableOpacity 
                    style={styles.ErrorMessageButton}
                    onPress={()=>{BottomSheetCategory.current.open();}}
                >
                    <Text style={styles.ErrorMessageButtonText}>Go Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.ErrorMessageButton,{backgroundColor:'#2169ab'}]}
                    onPress={()=>{setSelectedCategory(false); setBlogIsAvaible(true)}}
                >
                    <Text style={[styles.ErrorMessageButtonText,{color:'rgb(232, 237, 241)'}]}>Go Blog</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
    },
      ErrorMessageContainer:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
      },
      ErrorMessageTitle:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'#222'
      },
      ErrorMessageText:{
        fontSize:16,
        color:'#c7c1c1',
        textAlign:'center',
        marginTop:5
      },
      ErrorMessageButtonContainer:{
        width:'80%',
        marginTop:40,
        flexDirection:'row',
        justifyContent:'space-between'
      },
      ErrorMessageButton:{
        backgroundColor:'rgb(232, 237, 241)',
        width:'40%',
        padding:10,
        borderRadius:8
      },
      ErrorMessageButtonText:{
        textAlign:'center',
        color:'#2169ab',
        fontSize:14,
      },
})