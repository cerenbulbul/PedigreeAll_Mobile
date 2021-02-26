import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Dimensions,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from "react-native-vector-icons/FontAwesome5";
import { SearchBar, ListItem } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage'
import RBSheet from "react-native-raw-bottom-sheet";


const Tab = createMaterialTopTabNavigator();

export function ManagementReportScreen() {


    return (
        <View style={styles.Container}>
            <Tab.Navigator
                initialRouteName="ThoroughbredAnalysis"
                removeClippedSubviews={true}
                sceneContainerStyle={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                }}
                tabBarOptions={{
                    activeTintColor: '#000',
                    inactiveTintColor: '#b5b5b5',
                    showIcon: true,
                    indicatorStyle: {
                        backgroundColor: '#2169ab'
                    },
                    labelStyle: {
                        fontSize: 14,
                    },
                    style: {
                        backgroundColor: 'white', //e8edf1
                        //height: (Platform.OS === 'ios') ? 48 : 50,
                        //overflow: "hidden"
                    },
                    tabStyle: {
                        marginTop: (Platform.OS === 'ios') ? 0 : 0,
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    },
                }}
            >

                <Tab.Screen
                    name="ThoroughbredAnalysis"
                    component={ThoroughbredAnalysisScreen}
                    options={{
                        tabBarLabel: 'Thoroughbred Analysis'
                    }}
                />
                <Tab.Screen
                    name="MareAnalysis"
                    component={MareAnalysisScreen}
                    options={{
                        tabBarLabel: 'Mare Analysis',
                    }}
                />
            </Tab.Navigator>
        </View>
    )
}

function ThoroughbredAnalysisScreen({ navigation }) {

    const OpenFullBottomSheet = React.useRef();
    const OpenSmallBottomSheet = React.useRef();
    const [loader, setLoader] = useState(false)
    const [loaderRegistration, setLoaderRegistration] = React.useState(false);
    const [state, setState] = React.useState({ checked: [] });
    const [chekedItem, setChekedItem] = React.useState()
    const [getRegisteredStallions, setRegisteredStallions] = React.useState();
    const [getRegisteredStallionsItemData, setRegisteredStallionsItemData] = React.useState();
    const [getRegisteredStallionsName, setRegisteredStallionsName] = React.useState("Stallions");
    const [getSireData, setSireData] = React.useState();
    const [getSearchHorseData, setSearchHorseData] = React.useState();
    const [getSireName, setSireName] = React.useState("Mare Name");
    const [getStallionCodeData, setStallionCodeData] = React.useState();
    const [getStallionCode, setStallionCode] = React.useState("-");
    const [getBottomSheetText, setBottomSheetText] = React.useState();
    const [searchValue, setSearchValue] = React.useState()
    const [getSelectedHorseID, setSelectedHorseID] = React.useState();

    const [getFirstHorseID, setFirstHorseID] = React.useState();
    const [getSecondHorseID, setSecondHorseID] = React.useState();
    const [getRegistrationID, setRegistrationID] = React.useState();

    const readRegisteredStallions = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/StallionPage/GetLastSeasonRegisteredStallions', {
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
    const readHorseData = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
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
                        setSearchHorseData(json)
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

    const readGetRegistration = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Registration/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json)
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
        readRegisteredStallions();
        readHorseData();
        readGetRegistration()
    }, [])
    return (
        <View>
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
                                    readHorseData();
                                    setLoader(true);
                                }}
                                showLoading={true}
                            />
                            {getSearchHorseData !== undefined ?
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
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                    <View style={styles.ErrorMessageButtonContainer}>
                                    </View>
                                </View>
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
                                                            <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                                            <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                                            <Text style={styles.ErrorMessageText}>You can search again.</Text>
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
                                                }} >
                                                <Image
                                                    style={{ width: 70, height: 70, borderRadius: 50 }}
                                                    source={{ uri: 'https://www.pedigreeall.com//upload/150/' + item.IMAGE }}
                                                />
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.HORSE_NAME}</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron />
                                            </ListItem>
                                        ))}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
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
                                                setState({ checked: [state, item.REGISTRATION_EN] });
                                                setChekedItem(item.REGISTRATION_EN)
                                                setStallionCode(item.REGISTRATION_EN)
                                                setRegistrationID(item.REGISTRATION_ID)
                                                OpenSmallBottomSheet.current.close()
                                            }}
                                        >

                                            <ListItem.Content>
                                                <ListItem.Title>{item.REGISTRATION_EN}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))
                                }
                            </>
                        }

                    </ScrollView>

                </View>
            </RBSheet>

            <View style={{ width: '100%', height: '100%', alignItems: 'center', marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("RegisteredStallions");
                            OpenFullBottomSheet.current.open();
                        }}
                        style={styles.SireMareButtonContainer}>
                        <Text>{getRegisteredStallionsName.substring(0, 10)} ...</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("Sire");
                            OpenFullBottomSheet.current.open();
                        }}
                        style={styles.SireMareButtonContainer}>
                        <Text>{getSireName.substring(0, 10)} ...</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("StallionsCode");
                            OpenSmallBottomSheet.current.open();
                        }}
                        style={styles.GenerationButtonContainer}>
                        <Text>{getStallionCode}</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (getFirstHorseID === undefined || getSecondHorseID === undefined || getRegistrationID === undefined) {
                            alert("Choose!!")
                        }
                        else {
                            navigation.navigate('EffectivenickSearchReport', {
                                FirstHorseID: getFirstHorseID,
                                SecondHorseID: getSecondHorseID,
                                RegistrationID: getRegistrationID,
                                BackButtonVisible: true
                            });
                        }

                    }}
                    style={[styles.SearchButtonStyle, { marginVertical: 34 }]}>
                    <Text style={styles.SearchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function MareAnalysisScreen({ navigation }) {

    const OpenFullBottomSheet = React.useRef();
    const OpenSmallBottomSheet = React.useRef();
    const [loader, setLoader] = useState(false)
    const [loaderRegistration, setLoaderRegistration] = React.useState(false);
    const [state, setState] = React.useState({ checked: [] });
    const [chekedItem, setChekedItem] = React.useState()
    const [getRegisteredStallions, setRegisteredStallions] = React.useState();
    const [getRegisteredStallionsItemData, setRegisteredStallionsItemData] = React.useState();
    const [getRegisteredStallionsName, setRegisteredStallionsName] = React.useState("Stallions");
    const [getSireData, setSireData] = React.useState();
    const [getSearchHorseData, setSearchHorseData] = React.useState();
    const [getSireName, setSireName] = React.useState("Mare Name");
    const [getThoroughbred, setThoroughbred] = React.useState("Thoroughbred");
    const [getStallionCodeData, setStallionCodeData] = React.useState();
    const [getStallionCode, setStallionCode] = React.useState("-");
    const [getBottomSheetText, setBottomSheetText] = React.useState();
    const [searchValue, setSearchValue] = React.useState()
    const [searchThoroughbredValue, setSearchThoroughbredValue] = React.useState()
    const [getSelectedHorseID, setSelectedHorseID] = React.useState();

    const [getFirstHorseID, setFirstHorseID] = React.useState();
    const [getSecondHorseID, setSecondHorseID] = React.useState();
    const [getRegistrationID, setRegistrationID] = React.useState();

    const [checkStateMultiThoroughbred, setcheckStateMultiThoroughbred] = React.useState({ checked: [] });
    const [checkStateMultiThoroughbredString, setcheckStateMultiThoroughbredString] = React.useState({ checkedString: [] });

    const pressThoroughbred = item => {   // The onPress method
        const { checked } = checkStateMultiThoroughbred;
        const { checkedString } = checkStateMultiThoroughbredString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.HORSE_ID)) {
            setcheckStateMultiThoroughbred({ checked: [...checked, item.HORSE_ID] });
            setcheckStateMultiThoroughbredString({ checkedString: [...checkedString, item.HORSE_NAME] })
        } else {
            setcheckStateMultiThoroughbred({ checked: checked.filter(a => a !== item.HORSE_ID) });
            setcheckStateMultiThoroughbredString({ checkedString: checkedString.filter(a => a !== item.HORSE_NAME) });
        }
    }

    const readRegisteredStallions = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/StallionPage/GetLastSeasonRegisteredStallions', {
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
    const readHorseData = async (searchValue) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
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
                        setSearchHorseData(json)
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
    const readGetRegistration = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Registration/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json)
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
        readRegisteredStallions();
        readHorseData();
        readGetRegistration();
    }, [])
    return (
        <View>
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

                        if (checkStateMultiThoroughbred.checked.length !== 0) {
                            let ThoroughbredID
                            for (let i = 0; i < checkStateMultiThoroughbred.checked.length; i++) {
                                if (i === 0) {
                                    ThoroughbredID = checkStateMultiThoroughbred.checked[0]
                                }
                                else {
                                    ThoroughbredID += "," + checkStateMultiThoroughbred.checked[i]
                                }
                            }
                            setSecondHorseID(ThoroughbredID);
                        }

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
                                    readHorseData(searchValue);
                                    setLoader(true);
                                }}
                                showLoading={true}
                            />
                            {getSearchHorseData !== undefined ?
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
                                                    setFirstHorseID(item.HORSE_ID);
                                                    setSireData(item);

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
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                    <View style={styles.ErrorMessageButtonContainer}>
                                    </View>
                                </View>
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
                                                            <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                                            <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                                            <Text style={styles.ErrorMessageText}>You can search again.</Text>
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
                        getBottomSheetText === "Thoroughbred" &&
                        <>
                            <SearchBar
                                placeholder={searchThoroughbredValue}
                                lightTheme
                                platform="ios"
                                cancelButtonTitle=""
                                inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                containerStyle={{ backgroundColor: 'transparent', }}
                                inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                                rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                value={searchThoroughbredValue}
                                onChangeText={setSearchThoroughbredValue}
                                onSubmitEditing={() => {
                                    readHorseData(searchThoroughbredValue);
                                    setLoader(true);
                                }}
                                showLoading={true}
                            />
                            {getSearchHorseData !== undefined ?
                                <ScrollView style={{ marginBottom: 30 }}>
                                    {getSearchHorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                                        (item, i) => (
                                            <ListItem
                                                key={i}
                                                bottomDivider
                                                button
                                                onPress={() => {
                                                    pressThoroughbred(item)

                                                }} >
                                                <ListItem.CheckBox
                                                    checked={checkStateMultiThoroughbred.checked.includes(item.HORSE_ID)}
                                                    checkedIcon='circle'
                                                    uncheckedIcon='circle'
                                                    center={true}
                                                    checkedColor='#2169ab'
                                                    uncheckedColor='rgb(232, 237, 241)'
                                                    onPress={() => {
                                                        pressThoroughbred(item)
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
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                    <View style={styles.ErrorMessageButtonContainer}>
                                    </View>
                                </View>
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
                                                            <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                                            <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                                            <Text style={styles.ErrorMessageText}>You can search again.</Text>
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
                                                setChekedItem(item.REGISTRATION_EN)
                                                setStallionCode(item.REGISTRATION_EN)
                                                setRegistrationID(item.REGISTRATION_ID)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={state.checked.includes(item.REGISTRATION_EN)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    setState({ checked: [state, item.REGISTRATION_EN] });
                                                    setChekedItem(item.REGISTRATION_EN)
                                                    setStallionCode(item.REGISTRATION_EN)
                                                    setRegistrationID(item.REGISTRATION_ID)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.REGISTRATION_EN}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))
                                }
                            </>
                        }

                    </ScrollView>

                </View>
            </RBSheet>

            <View style={{ width: '100%', height: '100%', alignItems: 'center', marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("Sire");
                            OpenFullBottomSheet.current.open();
                        }}
                        style={styles.SireMareButtonContainer}>
                        <Text>{getSireName.substring(0, 10)} ...</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("Thoroughbred");
                            OpenFullBottomSheet.current.open();
                        }}
                        style={styles.SireMareButtonContainer}>
                        <Text>{getThoroughbred.substring(0, 10)} ...</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("StallionsCode");
                            OpenSmallBottomSheet.current.open();
                        }}
                        style={styles.GenerationButtonContainer}>
                        <Text>{getStallionCode}</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (getFirstHorseID === undefined || getSecondHorseID === undefined || getRegistrationID === undefined) {
                            alert("Choose!!")
                        }
                        else {
                            navigation.navigate('MareAnalysisReport', {
                                FirstHorseID: getFirstHorseID,
                                SecondHorseID: getSecondHorseID,
                                RegistrationID: getRegistrationID
                            });
                        }

                    }}
                    style={[styles.SearchButtonStyle, { marginVertical: 34 }]}>
                    <Text style={styles.SearchButtonText}>Search</Text>
                </TouchableOpacity>
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
    SireMareButtonContainer: {
        backgroundColor: "#e8edf1",
        padding: 9,
        borderRadius: 8,
        height: 36,
        width: '33%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginRight: 7
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25
    },
    GenerationButtonContainer: {
        backgroundColor: "#e8edf1",
        padding: 9,
        borderRadius: 8,
        height: 36,
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginRight: 7
    },
    SearchButtonStyle: {
        width: '92%',
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
})