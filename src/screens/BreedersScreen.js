import React from 'react'
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
    Alert
} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Global } from '../Global';
import AsyncStorage from '@react-native-community/async-storage'
import { SearchBar, CheckBox, ListItem } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome5";
import Title from '../components/Title'

import { HorseDetailSiblingMareScreen } from './HorseDetailSiblingMareScreen';

const Tab = createMaterialTopTabNavigator();
const GenerationData = [
    {
        id: "4",
        title: "Generation 4",
    },
    {
        id: "5",
        title: "Generation 5",
    },
    {
        id: "6",
        title: "Generation 6",
    },
    {
        id: "7",
        title: "Generation 7",
    },
    {
        id: "8",
        title: "Generation 8",
    },
    {
        id: "9",
        title: "Generation 9",
    },
];

const CrossLineData = [
    {
        id: "2",
        title: "x2",
    },
    {
        id: "3",
        title: "x3",
    },
    {
        id: "4",
        title: "x4",
    },
    {
        id: "5",
        title: "x5",
    },
    {
        id: "6",
        title: "x6",
    },
    {
        id: "7",
        title: "x7",
    },
];

export function BreedersScreen({ route, navigation }) {
    const { ScreenName } = route.params;

    const refRBSheetGeneration = React.useRef();
    const BottomSheetSearchNavigation = React.useRef();
    const [GenerationTitle, setGenerationTitle] = React.useState("Gen 5");
    const [state, setState] = React.useState({ checked: [] });
    const [chekedItem, setChekedItem] = React.useState(5)
    const [searchValue, setSearchValue] = React.useState()
    const [SireMareHorseData, setSireMareHorseData] = React.useState();
    const [SireMareHorseName, setSireMareHorseName] = React.useState();
    const [SireData, setSireData] = React.useState();
    const [MareData, setMareData] = React.useState();
    const [SireText, setSireText] = React.useState("Sire");
    const [MareText, setMareText] = React.useState("Mare");
    const [getText, setText] = React.useState("");
    const [loader, setLoader] = React.useState(false)

    const [getSelectedSire, setSelectedSire] = React.useState();
    const [getSelectedMare, setSelectedMare] = React.useState();

    const readUser = async () => {
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
                        setSireMareHorseData(json)
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
    React.useEffect(() => {
        readUser();
        setText("");
        setSearchValue("")
    }, [])

    return (
        <View style={styles.Container}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
                <Title text={Global.BreedingContentScreenName} />

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
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            refRBSheetGeneration.current.close();
                            setGenerationTitle("Gen " + chekedItem);
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
                                        }}
                                    >
                                        <ListItem.CheckBox
                                            checked={state.checked.includes(item.id)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='#2169ab'
                                            uncheckedColor='rgb(232, 237, 241)'
                                            onPress={() => {
                                                setState({ checked: [state, item.id] });
                                                setChekedItem(item.id)
                                            }} />
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
                    }}>
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
                                readUser();
                                setLoader(true);
                            }}
                            showLoading={true}
                        />
                        {SireMareHorseData !== undefined ?
                            <ScrollView style={{ marginBottom: 30 }}>
                                {SireMareHorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                                    (item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                BottomSheetSearchNavigation.current.close();
                                                if (ScreenName === "TableReportScreen") {
                                                    Global.Horse_ID = item.HORSE_ID
                                                    setText(item.HORSE_NAME)
                                                }
                                                if (SireMareHorseName === 'Sire') {
                                                    setSireText(item.HORSE_NAME);
                                                    setSireData(item);
                                                    setSelectedSire(item.HORSE_ID);
                                                }
                                                else if (SireMareHorseName === 'Mare') {
                                                    setMareText(item.HORSE_NAME);
                                                    setMareData(item);
                                                    setSelectedMare(item.HORSE_ID);
                                                }
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

                        {SireMareHorseData !== undefined &&
                            <>
                                {SireMareHorseData.m_cDetail !== undefined &&
                                    <>
                                        {SireMareHorseData.m_cDetail.m_eProcessState < 0 &&
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


                        {loader ?
                            <ActivityIndicator
                                color="black"
                                size="large"
                                style={styles.ActivityIndicatorStyle}
                            />

                            : null}

                    </View>
                </RBSheet>


                {ScreenName === "HypoMatingScreen" &&

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => {
                                BottomSheetSearchNavigation.current.open();
                                setSireMareHorseName('Sire');
                                setLoader(true);
                            }}
                            style={styles.SireMareButtonContainer}>
                            <Text>{SireText.substring(0, 6)}...</Text>
                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                BottomSheetSearchNavigation.current.open();
                                setSireMareHorseName('Mare');
                            }}
                            style={styles.SireMareButtonContainer}>
                            <Text>{MareText.substring(0, 6)}...</Text>
                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { refRBSheetGeneration.current.open() }}
                            style={styles.GenerationButtonContainer}>
                            <Text>{GenerationTitle}</Text>
                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>

                    </View>

                    || ScreenName === "TableReportScreen" &&

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => {
                                BottomSheetSearchNavigation.current.open();
                                setLoader(true);
                            }}
                            style={[styles.SireMareButtonContainer, { width: '91%', }]}>
                            {getText === "" ?
                                <>
                                    {Global.BreedingContentScreenName === "Siblings (Mare)" &&

                                        <Text>Search Siblings Mare</Text>

                                        || Global.BreedingContentScreenName === "Siblings (Sire)" &&

                                        <Text>Search Siblings Sire</Text>

                                        || Global.BreedingContentScreenName === "Tail Female" &&

                                        <Text>Search Tail Female</Text>

                                        || Global.BreedingContentScreenName === "Progeny" &&

                                        <Text>Search Progeny</Text>

                                        || Global.BreedingContentScreenName === "Profile" &&

                                        <Text>Search Profile</Text>

                                        || Global.BreedingContentScreenName === "Foals  As Brood Mare Sire" &&

                                        <Text>Search Foals  As Brood Mare Sire</Text>

                                        || Global.BreedingContentScreenName === "Siblings (Broodmare Sire)" &&

                                        <Text>Search Siblings (Broodmare Sire)</Text>
                                    }
                                </>
                                :
                                <Text>{getText}</Text>
                            }

                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>

                    </View>

                    || ScreenName === "TreeViewScreen" &&

                    <View style={{ width: '100%', height: '100%', marginTop: 20 }}>

                        <Tab.Navigator
                            initialRouteName="SearchScreen"
                            removeClippedSubviews={true}
                            sceneContainerStyle={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'white',
                            }}
                            tabBarOptions={{
                                activeTintColor: '#000',
                                inactiveTintColor: '#b5b5b5',
                                indicatorStyle: {
                                    backgroundColor: '#2169ab'
                                },
                                labelStyle: {
                                    fontSize: 12,
                                },
                                style: {
                                    backgroundColor: 'white', //e8edf1
                                    height: (Platform.OS === 'ios') ? 48 : 50,
                                    overflow: "hidden"
                                },
                            }}
                        >
                            <Tab.Screen
                                name="SearchScreen"
                                component={SearchScreen}
                                initialParams={{ TabScreenName: 'Search' }}
                                options={{ tabBarLabel: 'Search' }}
                            />
                            <Tab.Screen
                                name="HypotheticalScreen"
                                component={SearchScreen}
                                initialParams={{ TabScreenName: 'Hypothetical' }}
                                options={{ tabBarLabel: 'Hypothetical' }}
                            />
                        </Tab.Navigator>

                    </View>

                }

                {ScreenName !== "TreeViewScreen" &&
                    <TouchableOpacity
                        style={[styles.SearchButtonStyle, { marginVertical: 34 }]}
                        onPress={() => {
                            if (Global.BreedingContentScreenName === "Hypo Mating") {
                                if (getSelectedSire === undefined || getSelectedMare === undefined) {
                                    Alert.alert(
                                        "Searching Error",
                                        "You have to fill spaces.",
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
                                    Global.Generation_Hypothetical = chekedItem;
                                    Global.Horse_First_ID = SireData.HORSE_ID;
                                    Global.Horse_Second_ID = MareData.HORSE_ID;
                                    navigation.navigate('HypotheticalSearch', {
                                        SireHorseData: SireData,
                                        MareHorseData: MareData,
                                        Generation: chekedItem
                                    });
                                }
                            }
                            else if (Global.BreedingContentScreenName === "Siblings (Mare)") {
                                navigation.navigate('HorseDetailSiblingMare', {
                                    BackButton: true
                                })

                            }
                            else if (Global.BreedingContentScreenName === "Siblings (Sire)") {
                                navigation.navigate('HorseDetailSiblingSire', {
                                    BackButton: true
                                })

                            }
                            else if (Global.BreedingContentScreenName === "Tail Female") {
                                navigation.navigate('HorseDetailTailFemale', {
                                    BackButton: true
                                })

                            }
                            else if (Global.BreedingContentScreenName === "Progeny") {
                                navigation.navigate('HorseDetailProgency', {
                                    BackButton: true
                                })

                            }
                            else if (Global.BreedingContentScreenName === "Profile") {
                                navigation.navigate('HorseDetailPRofile', {
                                    BackButton: true
                                })

                            }
                            else if (Global.BreedingContentScreenName === "Siblings (Broodmare Sire)") {
                                navigation.navigate('HorseDetailSiblingBroodmareSire', {
                                    BackButton: true
                                })

                            }

                            else if (Global.BreedingContentScreenName === "Foals  As Brood Mare Sire") {
                                {console.log("denem")}
                                navigation.navigate('BreedingFoalsAsBroodMareSire', {
                                    BackButton: true,
                                })

                            }


                        }}>
                        <Text style={styles.SearchButtonText}>Search</Text>
                    </TouchableOpacity>

                }

            </View>
        </View >
    )
}

function SearchScreen({ route, navigation }) {

    const { TabScreenName } = route.params;

    const refRBSheetGeneration = React.useRef();
    const BottomSheetSearchNavigation = React.useRef();
    const [getBottomSheetText, setBottomSheetText] = React.useState();
    const [GenerationTitle, setGenerationTitle] = React.useState("Gen 5");
    const [CrossLineTitle, setCrossTitle] = React.useState("x2");
    const [state, setState] = React.useState({ checked: [] }); 
    const [chekedItem, setChekedItem] = React.useState(5)
    const [stateCrossLine, setStateCrossLine] = React.useState({ checkedCrossLine: [] });
    const [chekedItemCrossLine, setChekedItemCrossLine] = React.useState(2)
    const [searchValue, setSearchValue] = React.useState()
    const [SireMareHorseData, setSireMareHorseData] = React.useState();
    const [SireMareHorseName, setSireMareHorseName] = React.useState();
    const [SireData, setSireData] = React.useState();
    const [MareData, setMareData] = React.useState();
    const [SireText, setSireText] = React.useState("Sire");
    const [MareText, setMareText] = React.useState("Mare");
    const [getText, setText] = React.useState("Sire");
    const [loader, setLoader] = React.useState(false)

    const [getSelectedSire, setSelectedSire] = React.useState();
    const [getSelectedMare, setSelectedMare] = React.useState();

    const readUser = async () => {
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
                        setSireMareHorseData(json)
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
    React.useEffect(() => {
        readUser();
        setText("");
        setSearchValue("")
    }, [])

    return (
        <View style={{ width: "100%", height: '100%', alignItems: 'center' }}>

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
                }}>
                <TouchableOpacity
                    onPress={() => {
                        refRBSheetGeneration.current.close();
                        
                        setGenerationTitle("Gen " + chekedItem);
                        setCrossTitle("x" + chekedItemCrossLine)
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    <ScrollView style={{ marginBottom: 50 }}>
                        {getBottomSheetText === "Generation" &&

                            <>
                                {
                                    GenerationData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            onPress={() => {
                                                setState({ checked: [state, item.id] });
                                                setChekedItem(item.id)
                                                Global.Generation = item.id;
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={state.checked.includes(item.id)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    setState({ checked: [state, item.id] });
                                                    setChekedItem(item.id)
                                                    Global.Generation = item.id;
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.title}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))
                                }
                            </>

                            || getBottomSheetText === "CrossLine" &&

                            <>
                                {
                                    CrossLineData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            onPress={() => {
                                                setStateCrossLine({ checkedCrossLine: [stateCrossLine, item.id] });
                                                setChekedItemCrossLine(item.id)
                                                if (Global.BreedingContentScreenName === "Linebreeding") {
                                                    Global.MinCross = item.id;
                                                }
                                                else if (Global.BreedingContentScreenName === "Female Family") {
                                                    Global.MinCross_Fename_Family = item.id
                                                }

                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={stateCrossLine.checkedCrossLine.includes(item.id)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    setStateCrossLine({ checkedCrossLine: [stateCrossLine, item.id] });
                                                    setChekedItemCrossLine(item.id)
                                                    if (Global.BreedingContentScreenName === "Linebreeding") {
                                                        Global.MinCross = item.id;
                                                    }
                                                    else if (Global.BreedingContentScreenName === "Female Family") {
                                                        Global.MinCross_Fename_Family = item.id
                                                    }
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.title}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))
                                }
                            </>

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
                }}>
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
                            readUser();
                            setLoader(true);
                        }}
                        showLoading={true}
                    />
                    {SireMareHorseData !== undefined ?
                        <ScrollView style={{ marginBottom: 30 }}>
                            {SireMareHorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                                (item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            BottomSheetSearchNavigation.current.close();
                                            if (SireMareHorseName === 'Sire') {
                                                setSireText(item.HORSE_NAME);
                                                setSireData(item);
                                                setSelectedSire(item.HORSE_ID);
                                                Global.Horse_ID = item.HORSE_ID;

                                            }
                                            else if (SireMareHorseName === 'Mare') {
                                                setMareText(item.HORSE_NAME);
                                                setMareData(item);
                                                setSelectedMare(item.HORSE_ID);
                                                if (Global.BreedingContentScreenName === "Linebreeding") {
                                                    Global.Horse_ID_Second = item.HORSE_ID;
                                                }
                                                else if (Global.BreedingContentScreenName === "Female Family") {
                                                    Global.Horse_Second_ID_Female_Family = item.HORSE_ID;
                                                }
                                            }
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

                    {SireMareHorseData !== undefined &&
                        <>
                            {SireMareHorseData.m_cDetail !== undefined &&
                                <>
                                    {SireMareHorseData.m_cDetail.m_eProcessState < 0 &&
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


                    {loader ?
                        <ActivityIndicator
                            color="black"
                            size="large"
                            style={styles.ActivityIndicatorStyle}
                        />

                        : null}

                </View>
            </RBSheet>

            {TabScreenName === "Search" &&

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            BottomSheetSearchNavigation.current.open();
                            setSireMareHorseName('Sire');
                            setLoader(true);
                        }}
                        style={styles.SireMareButtonContainer}>
                        <Text>{SireText.substring(0, 8)}...</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("Generation")
                            refRBSheetGeneration.current.open()
                        }}
                        style={styles.GenerationButtonContainer}>
                        <Text>{GenerationTitle}</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setBottomSheetText("CrossLine")
                            refRBSheetGeneration.current.open()
                        }}
                        style={styles.GenerationButtonContainer}>
                        <Text>{CrossLineTitle}</Text>
                        <Icon name="chevron-down" size={16} color="#5f6368" />
                    </TouchableOpacity>

                </View>


                || TabScreenName === "Hypothetical" &&

                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                BottomSheetSearchNavigation.current.open();
                                setSireMareHorseName('Sire');
                                setLoader(true);
                            }}
                            style={styles.SireMareButtonContainer}>
                            <Text>{SireText.substring(0, 6)}...</Text>
                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                BottomSheetSearchNavigation.current.open();
                                setSireMareHorseName('Mare');
                            }}
                            style={styles.SireMareButtonContainer}>
                            <Text>{MareText.substring(0, 6)}...</Text>
                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Generation")
                                refRBSheetGeneration.current.open()
                            }}
                            style={styles.GenerationButtonContainer}>
                            <Text>{GenerationTitle}</Text>
                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("CrossLine")
                                refRBSheetGeneration.current.open()
                            }}
                            style={styles.GenerationButtonContainer}>
                            <Text>{CrossLineTitle}</Text>
                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>
                    </View>
                </>

            }

            <TouchableOpacity
                style={[styles.SearchButtonStyle, { marginVertical: 34 }]}
                onPress={() => {
                    if (Global.BreedingContentScreenName === "Linebreeding") {
                        navigation.navigate('HorseDetailLinebreeding', {
                            BackButton: true
                        })
                    }
                    if (Global.BreedingContentScreenName === "Female Family") {
                        navigation.navigate('HorseDetailScreenFemaleFamily', {
                            BackButton: true
                        })
                    }

                }}
            >
                <Text style={styles.SearchButtonText}>Search</Text>
            </TouchableOpacity>

        </View>
    )
}



const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    ScreensContainer: {
        padding: 10
    },
    SeacrhScreenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
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
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25
    },
})