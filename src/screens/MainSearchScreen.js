import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Dimensions,
    Image,
    ScrollView,
    UIManager,
    ActivityIndicator,
    Alert,
    FlatList
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SearchBar, Tabs, Card, CheckBox, ListItem } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { decode as atob, encode as btoa } from 'base-64'
import Autocomplete from 'react-native-autocomplete-input';
import RBSheet from "react-native-raw-bottom-sheet";
import { Global } from "../Global";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const GenerationData = [
    {
        id: "4",
        title: "Gen 4",
    },
    {
        id: "5",
        title: "Gen 5",
    },
    {
        id: "6",
        title: "Gen 6",
    },
    {
        id: "7",
        title: "Gen 7",
    },
    {
        id: "8",
        title: "Gen 8",
    },
    {
        id: "9",
        title: "Gen 9",
    },
];

export function MainSearchScreen({ navigation }) {
    const refRBSheetGeneration = useRef();
    const BottomSheetSearchNavigation = useRef();
    const [GenerationTitle, setGenerationTitle] = React.useState("Gen 5");
    const [state, setState] = React.useState({ checked: [] });
    const [chekedItem, setChekedItem] = React.useState(5)
    const [searchValue, setSearchValue] = React.useState("")
    const [userData, setUserData] = useState();
    const [HorseData, setHorseData] = useState([]);
    const [loader, setLoader] = useState(false)

    const [getSearchTitle, setSearchTitle] = React.useState();

    const [getText, setText] = React.useState({ query: '' });
    const [getData, setData] = React.useState([]);

    function upperCaseIt(text) {
        console.log(text)
        var textUpperCase = text.toUpperCase();
        setSearchValue(textUpperCase)
    }

    const readUser = async (text) => {
        setData([])

        if (text === "")
            return
        else if (text.length < 3)
            return
        else {
            try {
                fetch('https://api.pedigreeall.com/Horse/GetByName', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
                    },
                    body: JSON.stringify({
                        ID: 1,
                        NAME: text,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        var aa = [];
                        json.m_cData.map((i, index) => (
                            aa.push({
                                HORSE_DATA: i,
                                HORSE_ID: i.HORSE_ID
                            })
                        ))
                        setData(aa)
                        console.log(aa)
                        setHorseData(json)
                        setLoader(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    })

            } catch (e) {
            }
        }
    }
    React.useEffect(() => {
        setText({ query: '' })
        setData([])
        readUser([]);

        setState({ checked: [state, 4] })
        if (Global.Language === 1) {
            setSearchTitle("Lütfen bir isim yazıp gönder tuşuna basınız")
        }
        else {
            setSearchTitle("Please type name and press enter..")
        }
    }, [])

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>

            <View>
                <Image
                    style={{ resizeMode: 'stretch', height: 200, }}
                    source={{
                        uri:
                            'https://images.unsplash.com/photo-1450052590821-8bf91254a353?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
                    }}
                />
            </View>

            <RBSheet
                ref={refRBSheetGeneration}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={350}
                animationType='fade'
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
                        refRBSheetGeneration.current.close();
                        setGenerationTitle("Gen " + chekedItem)
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    <ScrollView style={{ marginBottom: 50 }}>
                        {
                            GenerationData.map((item, i) => (

                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={() => {
                                        setState({ checked: [state, item.id] });
                                        setChekedItem(item.id)
                                        setGenerationTitle("Gen " + item.id)
                                        refRBSheetGeneration.current.close();

                                    }}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>

                                </ListItem>


                            ))
                        }
                    </ScrollView>
                </View>
            </RBSheet>
            <RBSheet
                ref={BottomSheetSearchNavigation}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={Dimensions.get('window').height - 50}
                animationType='fade'
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
                        BottomSheetSearchNavigation.current.close();
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
                            setLoader(true);
                            readUser(searchValue);
                        }}
                        showLoading={true}
                    />
                    {searchValue.length < 3 ?
                        null
                        :
                        <>
                            {HorseData.m_cData !== undefined &&
                                <ScrollView style={{ marginBottom: 30 }}>
                                    {HorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                                        (item, i) => (
                                            <ListItem
                                                key={i}
                                                bottomDivider
                                                button
                                                onPress={() => {
                                                    BottomSheetSearchNavigation.current.close();
                                                    navigation.navigate('HorseDetail', {
                                                        HorseData: item,
                                                        Generation: chekedItem
                                                    });
                                                    if (item.HORSE_ID !== undefined) {
                                                        Global.Horse_ID = item.HORSE_ID;
                                                    }


                                                }} >
                                                <Image
                                                    style={{ width: 70, height: 70, justifyContent: 'center', resizeMode: 'contain' }}
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

                    {HorseData.m_cDetail !== undefined &&
                        <>
                            {HorseData.m_cDetail.m_eProcessState < 0 &&
                                <>
                                    {loader === false &&
                                        <View style={styles.ErrorMessageContainer}>
                                            <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                                            {Global.Language === 1 ?
                                                <>
                                                    <Text style={styles.ErrorMessageTitle}>Veriler Bulunamadı !</Text>
                                                    <Text style={styles.ErrorMessageText}>Hiçbir At Verisi Bulunmamaktadır.</Text>
                                                    <Text style={styles.ErrorMessageText}>Tekrar Arama Yapabilirsiniz.</Text>
                                                </>
                                                :
                                                <>
                                                    <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                                    <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                                    <Text style={styles.ErrorMessageText}>You can search again.</Text>
                                                </>
                                            }

                                            <View style={styles.ErrorMessageButtonContainer}>
                                            </View>
                                        </View>
                                    }
                                </>

                            }
                        </>}


                    {loader ?
                        <ActivityIndicator
                            color="black"
                            size="large"
                            style={styles.ActivityIndicatorStyle}
                        />

                        : null}

                </View>
            </RBSheet>
            <View style={{ width: '100%', alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    {HorseData !== undefined &&
                        <View style={{ width: '65%', marginTop: 12, flexDirection: 'row', justifyContent: 'center', borderColor: '#2e3f6e', borderWidth: 0.5, borderRadius: 8, marginRight: 5, zIndex: 9999 }}>

                            <Icon style={{ marginLeft: 5, marginTop: 10 }} name='search' size={15} color="#2e3f6e" />
                            <Autocomplete
                                data={getData}
                                value={getText.query}
                                style={{ width: '80%', height: 30, alignSelf: 'center', borderColor: '#fff', zIndex: 9999, }}
                                inputContainerStyle={{ borderRadius: 8 }}
                                containerStyle={{ zIndex: 9999 }}
                                listContainerStyle={{ zIndex: 9999, maxHeight: 150 }}
                                defaultValue={getText.query}
                                placeholder="Enter horse name"
                                onChangeText={(text) => { setText({ query: text }); readUser(text); setLoader(true) }}
                                flatListProps={{
                                    keyExtractor: (_, idx) => idx.toString(),
                                    renderItem: ({ item }) =>
                                        <TouchableOpacity
                                            style={{ padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', flexDirection: 'row' }}
                                            onPress={() => {
                                                setText({ query: item.HORSE_DATA.HORSE_NAME })

                                                //readUser(item.HORSE_NAME)
                                                if (item.HORSE_DATA.HORSE_ID !== undefined) {
                                                    Global.Horse_ID = item.HORSE_DATA.HORSE_ID;
                                                }
                                                navigation.navigate('HorseDetail', {
                                                    HorseData: item.HORSE_DATA,
                                                    Generation: chekedItem

                                                });
                                                setData([])
                                            }}>
                                            <Image
                                                style={{ width: 40, height: 40, justifyContent: 'center', resizeMode: 'contain' }}
                                                source={{ uri: 'https://www.pedigreeall.com//upload/150/' + item.HORSE_DATA.IMAGE }}
                                            />
                                            <Text style={{ alignSelf: 'center', width: '80%' }}>{item.HORSE_DATA.HORSE_NAME}</Text>
                                        </TouchableOpacity>
                                }}
                            />
                            {loader ?
                                <ActivityIndicator style={{ marginRight: 5, marginTop: 0, marginLeft: 5 }} size="small" color="#0000ff" />
                                :
                                <TouchableOpacity
                                    onPress={() => {
                                        setText({ query: '' });
                                        readUser("");
                                    }}
                                    style={{ marginTop: 10, marginRight: 5 }}>
                                    <Icon name="times-circle" size={16} color="#2e3f6e" />
                                </TouchableOpacity>
                            }

                        </View>

                    }
                    <TouchableOpacity
                        onPress={() => {
                            refRBSheetGeneration.current.open()
                        }}
                        style={styles.GenerationButtonContainer}>
                        <Text>{GenerationTitle}</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>
                </View>



                <TouchableOpacity
                    style={[styles.SearchButtonStyle, { zIndex: 0 }]}
                    onPress={() => {
                        setSearchValue(getText.query)
                        BottomSheetSearchNavigation.current.open();
                        readUser();
                        setLoader(true)
                    }}>
                    {Global.Language === 1 ?
                        <Text style={styles.SearchButtonText}>Arama Yap</Text>
                        :
                        <Text style={styles.SearchButtonText}>Search</Text>
                    }
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
    },
    ScreensContainer: {
        width: '100%',
        height: '100%',
        //backgroundColor:'white'
    },
    SeacrhScreenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
    },
    SearchButtonStyle: {
        width: '90%',
        padding: 15,
        marginVertical: 20,
        borderColor: '#2e3f6e',
        borderRadius: 8,
        elevation: 8,
        shadowColor: 'silver',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        backgroundColor: "#2169ab"

    },
    SearchButtonText: {
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 16,
        color: "#fff",
        fontWeight: '500'
    },
    SireMareButtonContainer: {
        backgroundColor: "#e8edf1",
        padding: 8,
        borderRadius: 8,
        height: 36,
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginRight: 5,
        marginLeft: 5,
        alignSelf: 'center'
    },
    GenerationButtonContainer: {
        backgroundColor: "#e8edf1",
        padding: 9,
        borderRadius: 8,
        height: 36,
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginRight: 7
    },
    buttonContainer: {
        flex: 1,
    },
    TabBarContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    Title: {
        paddingTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    Subtitle: {
        paddingTop: 20,
        fontSize: 18,
        fontWeight: '200',
        textAlign: 'center'
    },
    LatestViewItem: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    LatestCardTitle: {
        marginLeft: 5,
        fontWeight: '500',
        fontSize: 18
    },
    LatestCardItemTitle: {
        fontSize: 14,
        fontWeight: '500'
    },
    swipeContainer: {
        width: "100%",
    },
    SwipeablePanelContainer: {
        padding: 20,
    },
    SwipeablePanelItem: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    SwipeablePanelText: {
        fontSize: 18,
    },
    FlagContainer: {
        flexDirection: 'row',
    },
    SearchButtonContainer: {
        marginTop: 20,
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    SearchButtons: {
        width: '45%',
        padding: 15,
        borderWidth: 0.5,
        borderColor: '#2e3f6e',
        borderRadius: 10,
        elevation: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        shadowColor: 'silver',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        backgroundColor: "#2169ab"
    },
    SearchButtonsText: {
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 16,
        color: "#fff",
        fontWeight: '500'
    },
    SeacrhContainer: {
        width: '100%',
        paddingBottom: 10,
        padding: 10
    },
    SearchButton: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        elevation: 8,
        backgroundColor: '#2169ab',
        alignItems: 'center'
    },
    GenerationContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    GenerationView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    HypotheticalTitlesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    HypotheticalTitles: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    HypotheticalTitlesText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'silver'
    },
    FlatListItemView: {
        paddingTop: 15,
        borderBottomWidth: 0.2
    },
    scrollContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        backgroundColor: "rgba(0,0,0, 0.7)",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5
    },
    infoText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25
    },
    ActivityIndicatorStyle: {
        zIndex: 1,
        width: '100%',
        height: '60%',
        alignContent: 'center'
    },
    ErrorMessageContainer: {
        width: '100%',
        height: '50%',
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
    autocompleteContainer: {
        borderWidth: 1,
        zIndex: 999,
        borderColor: '#87ceeb',
        width: '80%',
        backgroundColor: '#e8edf1'
    },

});