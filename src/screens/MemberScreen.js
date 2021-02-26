import React ,{useRef}from 'react'
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native'
import {SettingBottomSheet} from '../components/SettingBottomSheet'
import Icon from "react-native-vector-icons/FontAwesome5";

export default function MemberScreen({navigation}) {
const refRBSheet = useRef();

React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
        <TouchableOpacity
            style={{marginRight:20}}
            onPress={()=>{
            refRBSheet.current.open()
            }}>
            <Icon  name="cogs" size={24} color="#fff" />
        </TouchableOpacity>
        ),
    });
    }, [navigation]);
    return (
        <View style={styles.Container}>
            <SettingBottomSheet refRBSheet={refRBSheet}></SettingBottomSheet>
            <Text>Members Page</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
    }
})