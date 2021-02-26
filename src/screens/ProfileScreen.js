import React, {useState, useRef} from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import RBSheet from "react-native-raw-bottom-sheet";
import {SettingBottomSheet} from '../components/SettingBottomSheet'
import Icon from "react-native-vector-icons/FontAwesome5";

export function ProfileScreen({navigation}) {
const [user, setUser] = useState();
const [userData, setUserData] =useState();
const refRBSheet = useRef();
const readData = async () => {
    try {
        const userKey = await AsyncStorage.getItem('USER')
        if (userKey !== null) {
        console.log('User Var')
        setUser(userKey)
        const userData = JSON.parse(userKey)[0].PAGE_LIST
        setUserData(userData);
        }
        else{
        setUser(null)
        console.log('User Yok')
        }
    } catch (e) {
        console.log('Failed')
    }
    }
    
    React.useEffect(() => {
    readData();
    }, [])

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
            {user !== undefined ? <Text>User Var</Text> : <Text>User Yok</Text>}
             
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }
})