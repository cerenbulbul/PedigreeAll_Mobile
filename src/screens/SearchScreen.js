import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View,FlatList,TouchableOpacity,Text,Image, ScrollView } from "react-native";
import { ListItem, Input, SearchBar } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage'
import { Global } from "../Global";


export function SearchScreen({navigation}) {

    const [searchText, setSearchText] = React.useState("");
    const [HorseList, setHorseList] = useState([]);
    const [isHorse, setHorse] = useState([]);
    const [isLoading, SetisLoading] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState("SEFIR")

    const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.FlatListItemView}>
        <Text style={styles.title}>{item.COUNTRY_EN}</Text>
    </TouchableOpacity>
    );
    const readHorseGetByName = async () => {
        try {
          const token = await AsyncStorage.getItem('TOKEN')
          console.log(token)
          if (token !== null) {
            //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
            fetch('https://api.pedigreeall.com/Horse/GetByName?p_sName=' + searchValue, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + token,
              },
            })
              .then((response) => response.json())
              .then((json) => {
                setHorseList(json.m_cData)
                console.log(json)
                SetisLoading(false);
              })
              .catch((error) => {
                console.error(error);
              })
          }
          else {
            console.log("Basarisiz")
          }
        } catch (e) {
        }
      }

      React.useEffect(() => {
        console.log("token")
        readHorseGetByName();
        console.log("token")
      }, [])

    return (
        <View style={styles.Container}>
             <SearchBar
            placeholder={searchValue}
            lightTheme
            platform="ios"
            cancelButtonTitle=""
            inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
            containerStyle={{ backgroundColor: 'transparent', }}
            inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
            rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
            leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
            value={searchValue}
            onChangeText={setSearchValue}
            onSubmitEditing={() => {
              SetisLoading(true);
              readHorseGetByName();
            }}
            showLoading={true}
          />

            {isLoading && (
                    <View style={{ width: "100%", justifyContent: "center", position:'absolute', zIndex: 1 }}>
                    <ActivityIndicator
                        style={{ height: 100, top: 150 }}
                        color="#3F51B5"
                        size="large"
                    />
                    </View>
                )}

        <ScrollView style={styles.ScrollViewContainer}>
                    {HorseList.map((item, i) => (
                        <ListItem
                        key={i}
                        bottomDivider
                        button
                        onPress={()=>{
                            navigation.navigate('HorseDetail', {
                                HorseData: item,
                                Generation: Global.Generation
                              });
                              if (item.HORSE_ID !== undefined) {
                                Global.Horse_ID = item.HORSE_ID;
                              }
                        }}
                        >
                        <Image
                            source={{
                                uri:
                                'https://www.pedigreeall.com//upload/1000/' + item.IMAGE,
                            }}
                            style={{width:100,height:100}} 
                            resizeMode='contain'
                            transition={false}/>
                        <ListItem.Content>
                            <ListItem.Title>{item.HORSE_NAME}</ListItem.Title>
                            <ListItem.Subtitle>{item.FATHER_NAME}</ListItem.Subtitle>
                            <ListItem.Subtitle>{item.MOTHER_NAME}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                        </ListItem>
                    )
                    )}
                </ScrollView>
                
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#fff',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    ScrollViewContainer:{
        width:'100%',
        top: 0, 
        margin: 0, 
        backgroundColor: "#fff"
    },
    FlatListItemView:{
        width:'100%',
        paddingTop:20,
        borderBottomWidth:0.2
      },
})

/*

<ScrollView style={styles.ScrollViewContainer}>
                    {HorseList.map((item, i) => (
                        <ListItem
                        key={i}
                        bottomDivider
                        button
                        >
                        <Image
                            source={{
                                uri:
                                'https://images.unsplash.com/photo-1566251037378-5e04e3bec343?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                            }}
                            style={{width:100,height:100}} 
                            resizeMode='contain'
                            transition={false}/>
                        <ListItem.Content>
                            <ListItem.Title>{item.HORSE_NAME}</ListItem.Title>
                            <ListItem.Subtitle>{item.HORSE_NAME}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                        </ListItem>
                    )
                    )}
                </ScrollView>

*/