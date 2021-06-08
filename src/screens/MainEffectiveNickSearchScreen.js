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


import { SettingBottomSheet } from '../components/SettingBottomSheet'
import RBSheet from "react-native-raw-bottom-sheet";
import Preview from '../components/FlatList/Preview';
import FlatListSlider from '../components/FlatList/FlatListSlider';
import Indicator from '../components/FlatList/Indicator';
import { Global } from "../Global";
import { FilledButton } from "../components/FilledButton";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { ErrorMessage } from '../components/ErrorMessage'

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

String.prototype.turkishtoEnglish = function () {
    return this.replace('Ğ', 'G')
        .replace('Ü', 'U')
        .replace('Ş', 'S')
        .replace('I', 'I')
        .replace('İ', 'I')
        .replace('Ö', 'O')
        .replace('Ç', 'C')
        .replace('ğ', 'g')
        .replace('ü', 'u')
        .replace('ş', 's')
        .replace('ı', 'i')
        .replace('ö', 'o')
        .replace('ç', 'c');
};





export function MainEffectiveNickSearchScreen({ navigation }) {
    const OpenFullBottomSheet = useRef();
    const OpenSmallBottomSheet = useRef();
    const [loader, setLoader] = useState(false)
    const [loaderRegistration, setLoaderRegistration] = React.useState(false);
    const [state, setState] = React.useState({ checked: [] });
    const [chekedItem, setChekedItem] = React.useState()
    const [getRegisteredStallions, setRegisteredStallions] = React.useState();
    const [getRegisteredStallionsItemData, setRegisteredStallionsItemData] = React.useState();
    const [getRegisteredStallionsName, setRegisteredStallionsName] = React.useState("Stallions NAme");
    const [getSireData, setSireData] = React.useState();
    const [getSearchHorseData, setSearchHorseData] = React.useState([]);
    const [getSireName, setSireName] = React.useState("Sire Name");
    const [getStallionCodeData, setStallionCodeData] = React.useState();
    const [getStallionCode, setStallionCode] = React.useState("-");
    const [getBottomSheetText, setBottomSheetText] = React.useState();
    const [searchValue, setSearchValue] = React.useState()
    const [getSelectedHorseID, setSelectedHorseID] = React.useState();

    const [getText, setText] = React.useState({ query: '' });
    const [getData, setData] = React.useState([]);

    const [getFirstHorseID, setFirstHorseID] = React.useState();
    const [getSecondHorseID, setSecondHorseID] = React.useState();
    const [getRegistrationID, setRegistrationID] = React.useState();

    const readRegisteredStallions = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/StallionPage/GetLastSeasonRegisteredStallions?p_iRaceId=' + 1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },

                })
                    .then((response) => response.json())
                    .then((json) => {
                        setRegisteredStallions(json.m_cData)
                        setLoader(false);
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
    const readHorseData = async (text) => {
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
                        'Authorization': "Basic " + 'Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=',
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
                        setSearchHorseData(json)
                        setLoader(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    })

            } catch (e) {
            }
        }
    }
    const readGetAsNameIdForStallion = async (ID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Registration/GetAsNameIdForStallion?p_iHorseId=' + ID + '&p_iLanguage=' + Global.Language, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setStallionCodeData(json.m_cData)
                        setLoader(false);
                        setLoaderRegistration(true);
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

        setText({ query: '' })
        setData([])

        readRegisteredStallions();
        readHorseData([]);
        if (Global.Language === 1) {
            setRegisteredStallionsName("Aygır Adı")
            setSireName("Kısrak")
        }
        else {
            setRegisteredStallionsName("Stallions")
            setSireName("Sire")
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
                ref={OpenFullBottomSheet}
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
                }}>
                <TouchableOpacity
                    onPress={() => {
                        OpenFullBottomSheet.current.close();
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    {
                        getBottomSheetText === "Sire" &&
                        <>
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
                                    readHorseData();
                                }}
                                showLoading={true}
                            />
                            {getSearchHorseData !== undefined &&
                                <>
                                    {getSearchHorseData.m_cData !== undefined &&

                                        <ScrollView style={{ marginBottom: 30 }}>
                                            {getSearchHorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                                                (item, i) => (
                                                    <ListItem
                                                        key={i}
                                                        bottomDivider
                                                        button
                                                        onPress={() => {
                                                            OpenFullBottomSheet.current.close();
                                                            setSireName(item.HORSE_NAME);
                                                            setSecondHorseID(item.HORSE_ID);
                                                            setSireData(item);


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
                            {getSearchHorseData !== undefined &&
                                <>
                                    {getSearchHorseData.m_cDetail !== undefined &&
                                        <>
                                            {getSearchHorseData.m_cDetail.m_eProcessState < 0 &&
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
                                        </>
                                    }

                                </>}
                        </>
                        ||
                        getBottomSheetText === "RegisteredStallions" &&
                        <>
                            {getRegisteredStallions !== undefined ?
                                <ScrollView style={{ marginBottom: 30 }}>
                                    {getRegisteredStallions.filter((x) => x.HORSE_NAME).map(
                                        (item, i) => (
                                            <ListItem
                                                key={i}
                                                bottomDivider
                                                button
                                                onPress={() => {
                                                    OpenFullBottomSheet.current.close();
                                                    setRegisteredStallionsName(item.HORSE_NAME);
                                                    setRegisteredStallionsItemData(item);
                                                    setFirstHorseID(item.HORSE_ID);
                                                    readGetAsNameIdForStallion(item.HORSE_ID);
                                                }} >
                                                <Image
                                                    style={{ width: 70, height: 70, justifyContent: 'center', resizeMode: 'contain' }}
                                                    source={{ uri: item.IMAGE }}
                                                />
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.HORSE_NAME}</ListItem.Title>
                                                    {item.REGISTRATION_ID === 3 &&
                                                        <ListItem.Subtitle>
                                                            <View style={{ backgroundColor: '#21ba45', width: 25, height: 25, }}>
                                                                <Text style={{ color: '#fff', fontWeight: '700', alignSelf: 'center', margin: 'auto' }}>P</Text>
                                                            </View>
                                                        </ListItem.Subtitle>
                                                    }
                                                    {item.REGISTRATION_ID === 2 &&
                                                        <ListItem.Subtitle>
                                                            <View style={{ backgroundColor: '#fbbd08', width: 25, height: 25, }}>
                                                                <Text style={{ color: '#fff', fontWeight: '700', alignSelf: 'center', margin: 'auto' }}>A</Text>
                                                            </View>
                                                        </ListItem.Subtitle>
                                                    }
                                                    {item.REGISTRATION_ID === 1 &&
                                                        <ListItem.Subtitle>
                                                            <View style={{ backgroundColor: '#db2828', width: 25, height: 25, }}>
                                                                <Text style={{ color: '#fff', fontWeight: '700', alignSelf: 'center', margin: 'auto' }}>S</Text>
                                                            </View>
                                                        </ListItem.Subtitle>
                                                    }

                                                </ListItem.Content>
                                                <ListItem.Chevron />
                                            </ListItem>
                                        ))}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    {Global.Language === 1 ?
                                        <>
                                            <Text style={styles.ErrorMessageTitle}>Internet Bağlantısı Yok!</Text>
                                            <Text style={styles.ErrorMessageText}>Wifi'ye bağlı olduğunuzdan emin olun ve tekrar bağlanın.</Text>
                                        </>
                                        :
                                        <>
                                            <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                            <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                        </>
                                    }

                                    <View style={styles.ErrorMessageButtonContainer}>
                                    </View>
                                </View>
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
            <RBSheet
                ref={OpenSmallBottomSheet}
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
                }}>
                <TouchableOpacity
                    onPress={() => {
                        OpenSmallBottomSheet.current.close();
                        setStallionCode(chekedItem);
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    <ScrollView style={{ marginBottom: 50 }}>
                        {getStallionCodeData !== undefined &&

                            <>
                                {
                                    getStallionCodeData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            onPress={() => {
                                                setState({ checked: [state, item.NAME] });
                                                setChekedItem(item.NAME)
                                                setStallionCode(item.NAME)
                                                setRegistrationID(item.ID)
                                                setStallionCode(item.NAME);
                                                OpenSmallBottomSheet.current.close();

                                            }}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.NAME}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))
                                }
                            </>
                        }

                    </ScrollView>

                </View>
            </RBSheet>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '100%' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("RegisteredStallions");
                            OpenFullBottomSheet.current.open();
                        }}
                        style={styles.SireMareButtonContainer}>
                        <Text>{getRegisteredStallionsName}</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>

                </View>


                {getSearchHorseData !== undefined &&
                    <View
                        style={{
                            width: '89%',
                            marginTop: 12,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            borderColor: '#2e3f6e',
                            borderWidth: 0.5,
                            borderRadius: 8,
                            marginRight: 5,
                            zIndex: 9999
                        }}>

                        <Icon style={{ marginLeft: 5, marginTop: 7 }} name='search' size={15} color="#2e3f6e" />
                        <Autocomplete
                            data={getData}
                            value={getText.query}
                            style={{ width: '80%', height: 30, alignSelf: 'center', borderColor: '#fff', zIndex: 9999, }}
                            inputContainerStyle={{ borderRadius: 8 }}
                            containerStyle={{ zIndex: 9999 }}
                            listContainerStyle={{ zIndex: 9999, maxHeight: 150 }}
                            defaultValue={getText.query}
                            placeholder="Enter a sire name"
                            onChangeText={(text) => { setText({ query: text }); readHorseData(text); setLoader(true) }}
                            flatListProps={{
                                keyExtractor: (_, idx) => idx.toString(),
                                renderItem: ({ item }) =>
                                    <TouchableOpacity
                                        style={{ padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', flexDirection: 'row' }}
                                        onPress={() => {
                                            setText({ query: item.HORSE_DATA.HORSE_NAME })

                                            //readUser(item.HORSE_NAME)
                                            setSireName(item.HORSE_DATA.HORSE_NAME);
                                            setSecondHorseID(item.HORSE_DATA.HORSE_ID);
                                            setSireData(item.HORSE_DATA);
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
                                    readHorseData("");
                                }}
                                style={{ marginTop: 7, marginRight: 5 }}>
                                <Icon name="times-circle" size={16} color="#2e3f6e" />
                            </TouchableOpacity>
                        }

                    </View>

                }


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '90%',
                        alignSelf: 'center',
                        alignItems: 'center',

                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("StallionsCode");
                            OpenSmallBottomSheet.current.open();
                        }}
                        style={styles.GenerationButtonContainer}>
                        <Text>{getStallionCode}</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            if (getFirstHorseID === undefined || getSecondHorseID === undefined || getRegistrationID === undefined) {
                                Alert.alert(
                                    "Searching Error",
                                    "You have to fill spaces",
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            }
                            else {
                                navigation.navigate('EffectivenickSearchReport', {
                                    FirstHorseID: getFirstHorseID,
                                    SecondHorseID: getSecondHorseID,
                                    RegistrationID: getRegistrationID,
                                    BackButtonVisible: false
                                });
                            }

                        }}
                        style={[styles.SearchButtonStyle]}>
                        {Global.Language === 1 ?
                            <Text style={styles.SearchButtonText}>Arama Yap</Text>
                            :
                            <Text style={styles.SearchButtonText}>Search</Text>
                        }
                    </TouchableOpacity>


                </View>

            </View>
        </View>
    )
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
        width: '50%',
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
        width: '90%',
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
        width: '40%',
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