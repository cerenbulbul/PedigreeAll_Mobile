import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import Title from '../components/Title';
import { SearchBar, ListItem } from "react-native-elements";
import { BlueButton } from '../components/BlueButton'
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-community/async-storage'
import Icon from "react-native-vector-icons/FontAwesome5";
import { Global } from '../Global';

export function DeleteAHorseScreen({ navigation }) {

    const BottomSheetLong = useRef();
    const [searchText, setSearchText] = React.useState("");

    const [getHorseGetByName, setHorseGetByName] = React.useState();
    const [getSelectedDeleteHorse, setSelectedDeleteHorse] =React.useState();
    const [loader, setLoader] = React.useState(false)


    const readHorseGetByName = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/GetByName', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        ID: 1,
                        NAME: searchText,
                      })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseGetByName(json.m_cData)
                        setLoader(false)
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

    const readDeleteAHorse = async (HORSE_ID) => {
        try {
          const token = await AsyncStorage.getItem('TOKEN')
          if (token !== null) {
            fetch('https://api.pedigreeall.com/Horse/Delete' , {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + token,
              },
              body: JSON.stringify({
                "HORSE_ID": HORSE_ID,
                
              })
            })
              .then((response) => response.json())
              .then((json) => {
                //setHorseAddRequestData(json.m_cData)
                //setTime(false)
                console.log(json.m_cData)
              })
              .catch((error) => {
                console.error(error);
              })
          }
          else {
            console.log("Basarisiz")
          }
        } catch (e) {
          console.log(e)
        }
      }
    
      const [getSearchPlaceholder, setSearchPlaceholder] = React.useState("")
      const [getDeleteButtonPlaceholder,setDeleteButtonPlaceholder ] = React.useState("")

    React.useEffect(() => {
        readHorseGetByName();

        if (Global.Language===1) {
            setSearchPlaceholder("Lütfen isim giriniz ve ara butonuna basınız ..")
            setDeleteButtonPlaceholder("Sil")
        }
        else{
            setSearchPlaceholder("Please type here and press enter .. ")
            setDeleteButtonPlaceholder("Delete")
        }
    }, [])

    const deleteMessage = (HorseID) =>
    Alert.alert(
      "Delete Horse",
      "Are you sure you want to delete this Horse?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
            text: "Delete", 
            onPress: () => deletedCompletlyMessage(HorseID) }
      ],
      { cancelable: true }
    );

    const deletedCompletlyMessage = (HorseID) =>
    Alert.alert(
      "Delete Horse",
      "Deleted Successfully",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
              readDeleteAHorse(HorseID)
              BottomSheetLong.current.close();

        }
        },
      ],
      { cancelable: true }
    );

    

    return (
        <View style={styles.Container}>

            <RBSheet
                ref={BottomSheetLong}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={Dimensions.get('window').height - 50}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        BottomSheetLong.current.close();
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

                    <SearchBar
                        placeholder={searchText}
                        lightTheme
                        platform="ios"
                        cancelButtonTitle=""
                        inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                        containerStyle={{ backgroundColor: 'transparent', width: '100%' }}
                        inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                        rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                        leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                        value={searchText}
                        onChangeText={(e) => {
                            setSearchText(e);
                            readHorseGetByName();
                        }}
                    />

                    {loader ?
                    <ActivityIndicator size='large' color="#000" />
                    :
                        <>
                            {getHorseGetByName !== undefined &&

                                <>
                                    {getHorseGetByName.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setSelectedDeleteHorse(item);
                                                deleteMessage(item.HORSE_ID);
                                                //BottomSheetLong.current.close();
                                            }} >
                                            <Image
                                                style={{ width: 70, height: 70, borderRadius: 50 }}
                                                source={{ uri: 'https://www.pedigreeall.com//upload/150/' + item.IMAGE }}
                                            />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.HORSE_NAME}</ListItem.Title>
                                                <ListItem.Subtitle>{item.FATHER_NAME}</ListItem.Subtitle>
                                                <ListItem.Subtitle>{item.MOTHER_NAME}</ListItem.Subtitle>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    ))}
                                </>

                            }
                        </>
                    }

                </View>
            </RBSheet>
            {Global.Language===1?
            <Title text="At Sil" />
            :
            <Title text="Delete A Horse" />
            }
            
            <SearchBar
                placeholder={getSearchPlaceholder}
                lightTheme
                platform="ios"
                cancelButtonTitle=""
                inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                containerStyle={{ backgroundColor: 'transparent', width: '100%' }}
                inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                value={searchText}
                onChangeText={(e) => {
                    setSearchText(e);
                }}
            />
            <View style={styles.ButtonContainer}>
                <BlueButton
                    onPress={() => {
                        setLoader(true)
                        readHorseGetByName();
                        BottomSheetLong.current.open()
                    }}
                    title={getDeleteButtonPlaceholder}
                    style={{ width: '95%' }} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    ButtonContainer: {
        alignItems: 'center'
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },
})
