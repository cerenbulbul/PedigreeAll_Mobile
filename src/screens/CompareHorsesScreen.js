import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, ActivityIndicator, Image, Modal } from 'react-native'
import Title from '../components/Title';
import Icon from "react-native-vector-icons/FontAwesome5";
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-community/async-storage'
import { SearchBar, ListItem } from "react-native-elements";
import { DataTable } from 'react-native-paper';

export function CompareHorsesScreen() {

    const BottomSheetLong = React.useRef();

    const [getHorseData, setHorseData] = useState()
    const [getHorseCompareListData, setHorseCompareListData] = useState()
    const [searchValue, setSearchValue] = useState();
    const [loader, setLoader] = useState(false);
    const [LoadingForCompareHorses, setLoadingForCompareHorses] = useState(false)
    const [FullScreenVisible, setFullScreenVisible] = useState(false);
    const [getImageURL, setImageURL] = useState();

    const [checkBoxHorseSelection, setcheckBoxHorseSelection] = React.useState({ checked: [] });
    const [checkBoxHorseSelectionString, setcheckBoxHorseSelectionString] = React.useState({ checkedString: [] });

    const readHorseGetByNameData = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Horse/GetByName', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        ID: 1,
                        NAME: searchValue,
                      })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseData(json.m_cData)
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

    const readHorseInfoGetCompareList = async (HorseID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/HorseInfo/GetCompareList?p_sIdList=' + HorseID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseCompareListData(json.m_cData)
                        setLoadingForCompareHorses(false)
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
        readHorseGetByNameData();
    }, [])

    const pressHorse = item => {   // The onPress method
        const { checked } = checkBoxHorseSelection;
        const { checkedString } = checkBoxHorseSelectionString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.HORSE_ID)) {
            setcheckBoxHorseSelection({ checked: [...checked, item.HORSE_ID] });
            setcheckBoxHorseSelectionString({ checkedString: [...checkedString, item.HORSE_NAME] })
        } else {
            setcheckBoxHorseSelection({ checked: checked.filter(a => a !== item.HORSE_ID) });
            setcheckBoxHorseSelectionString({ checkedString: checkedString.filter(a => a !== item.HORSE_NAME) });
        }
    }


    return (
        <View style={styles.Container}>
            <Title text="Compare Horse" />

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

                        if (checkBoxHorseSelection.checked.length > 0) {
                            setLoadingForCompareHorses(true)
                            readHorseInfoGetCompareList(checkBoxHorseSelection.checked)
                        }

                        BottomSheetLong.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

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
                            readHorseGetByNameData();
                            setLoader(true);
                        }}
                        showLoading={true}
                    />
                    {getHorseData !== undefined &&
                        <>
                            {getHorseData.length === 0 ?
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon name="exclamation-circle" size={150} color="#e54f4f" />
                                    <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                    <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                    <Text style={styles.ErrorMessageText}>You can search again.</Text>
                                </View>
                                :
                                <ScrollView style={{ marginBottom: 30 }}>
                                    {getHorseData.filter((x) => x.HORSE_NAME).map(
                                        (item, i) => (
                                            <ListItem
                                                key={i}
                                                bottomDivider
                                                button
                                                onPress={() => {
                                                    pressHorse(item)
                                                }} >
                                                <ListItem.CheckBox
                                                    checked={checkBoxHorseSelection.checked.includes(item.HORSE_ID)}
                                                    checkedIcon='circle'
                                                    uncheckedIcon='circle'
                                                    center={true}
                                                    checkedColor='#2169ab'
                                                    uncheckedColor='rgb(232, 237, 241)'
                                                    onPress={() => {
                                                        pressHorse(item)
                                                    }} />
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
                                </ScrollView>
                            }
                        </>
                    }

                    {loader ?
                        <ActivityIndicator
                            color="black"
                            size="large"
                            style={styles.ActivityIndicatorStyle}
                        />

                        : null}


                </View>
            </RBSheet>

            <Modal
                animationType="fade"
                transparent={true}
                visible={FullScreenVisible}>
                <View style={styles.centeredView}>
                    <View style={[styles.FullScreenContainer]}>
                        <View style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => {
                                    setFullScreenVisible(false);
                                }}>
                                <Icon name="times" size={26} color="silver" />
                            </TouchableOpacity>
                        </View>

                            <Image 
                                style={{height:'90%', width:'95%', resizeMode:'contain', justifyContent:'center'}} 
                                source={{uri:'https://www.pedigreeall.com//upload/150/' + getImageURL}}
                            />
                    </View>
                </View>
            </Modal>

            <View
                style={styles.AddingHorseButtonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        BottomSheetLong.current.open();
                    }}
                    style={styles.AddingHorseButton}>
                    <Icon name="plus" size={16} color="#fff" style={{ alignSelf: 'center', marginRight: 10 }} />
                    <Text style={styles.AddingHorseButtonText}>Add Horse</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <ScrollView horizontal={true}>
                    <DataTable>
                        <DataTable.Header removeClippedSubviews={true}>
                            <DataTable.Title >Image</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 90 }}>Name</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 90 }}>Class</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Point</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Earning</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Fam</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Color</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Sire</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 70 }}>Dam</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Birth D.</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Start</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>1st</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>1st %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>2nd</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>2nd %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>3rd</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 60 }}>3rd %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>4th</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 50 }}>4th %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Price</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Dr. RM</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>ANZ</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>PedigreeAll</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Owner</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 50 }}>Breeder</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 80 }}>Coach</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 50 }}>Dead</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 10 }}>Update D.</DataTable.Title>
                        </DataTable.Header>

                        <>

                            {LoadingForCompareHorses ?

                                <ActivityIndicator size="large" color="#000" />
                                :
                                <>
                                    {getHorseCompareListData !== undefined &&

                                        <>
                                            {getHorseCompareListData.map((item, index) => (

                                                <DataTable.Row centered={true} key={index}>
                                                    <DataTable.Cell onPress={() => { 
                                                        setImageURL(item.IMAGE)
                                                        setFullScreenVisible(true) 
                                                    }} style={{ width:120, justifyContent:'center' }}>
                                                        <Image style={{ width: 100, height: 100, alignSelf:'center' }} source={{ uri: 'https://www.pedigreeall.com//upload/150/' + item.IMAGE }} />
                                                    </DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto' }}>{item.HORSE_NAME}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 15, width: 80, justifyContent: 'center' }}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.POINT}</DataTable.Cell>
                                                    <DataTable.Cell style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 70, justifyContent: 'center' }} >{item.FAMILY_TEXT}</DataTable.Cell>
                                                    <DataTable.Cell style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.COLOR_TEXT}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.FATHER_NAME}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.MOTHER_NAME}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 15, width: 80, justifyContent: 'center' }}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.START_COUNT}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.FIRST}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.SECOND}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.THIRD}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.FOURTH}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.RM}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.ANZ}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.PA}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.OWNER}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.BREEDER}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.COACH}</DataTable.Cell>
                                                    {item.IS_DEAD ?
                                                        <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>DEAD</DataTable.Cell>
                                                        : <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>ALIVE</DataTable.Cell>}
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                                                </DataTable.Row>

                                            ))}
                                        </>
                                    }
                                </>
                            }

                        </>

                    </DataTable>
                </ScrollView>

            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    AddingHorseButtonContainer: {
        width: '100%',
        padding: 10,
        paddingLeft: 15,
        alignItems: 'flex-start'
    },
    AddingHorseButton: {
        flexDirection: 'row',
        backgroundColor: '#2169ab',
        padding: 10,
        borderRadius: 6,
        elevation: 10,
        width: '35%'
    },
    AddingHorseButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },
    ErrorMessageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    ErrorMessageTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222'
    },
    ErrorMessageText: {
        fontSize: 16,
        color: '#c7c1c1',
        textAlign: 'center',
        marginTop: 5
    },
    ErrorMessageButtonContainer: {
        width: '80%',
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ErrorMessageButton: {
        backgroundColor: 'rgb(232, 237, 241)',
        width: '40%',
        padding: 10,
        borderRadius: 8
    },
    ErrorMessageButtonText: {
        textAlign: 'center',
        color: '#2169ab',
        fontSize: 14,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#6c6c6ca8'
      },
      FullScreenContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: "#000",
      },
})