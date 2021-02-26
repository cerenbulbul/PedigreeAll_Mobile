import React, { useRef } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, TextInput, ActivityIndicator } from 'react-native'
import Title from '../components/Title';
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import { BlueButton } from '../components/BlueButton';
import Icon from "react-native-vector-icons/FontAwesome5";
import { ListItem, SearchBar } from "react-native-elements";


export function ManagementPedigreePlanScreen() {

    const BottomSheetLong = useRef();
    const BottomSheetSmall = useRef();

    const [showReport, setShowReport] = React.useState(false);
    const [getisLoading, setisLoading] = React.useState(false)
    const [getBottomSheetText, setBottomSheetText] = React.useState();

    const [getHorseData, setHorseData] = React.useState();
    const [getCityData, setCityData] = React.useState()
    const [getRaceData, setRaceData] = React.useState()
    const [getGroupRaceData, setGroupRaceData] = React.useState()
    const [getDistanceData, setDistanceData] = React.useState()
    const [getRunwayData, setRunwayData] = React.useState()
    const [getGenderData, setGenderData] = React.useState()
    const [getClassData, setClassData] = React.useState()
    const [getTjkConditionRaceGetFilterData, setTjkConditionRaceGetFilterData] = React.useState()



    const [getTJKConditionHorseID, setTJKConditionHorseID] = React.useState(-1)
    const [getStartDate, setStartDate] = React.useState("")
    const [getEndDate, setEndDate] = React.useState("")
    const [getRaceCityID, setRaceCityID] = React.useState("")
    const [getRaceID, setRaceID] = React.useState("")
    const [getRaceGroupID, setRaceGroupID] = React.useState("")
    const [getRaceTypeID, setRaceTypeID] = React.useState("")
    const [getRaceDistanceID, setRaceDistanceID] = React.useState("")
    const [getRaceFloorID, setRaceFloorID] = React.useState("")
    const [getRaceGenderID, setGenderID] = React.useState("")
    const [getPrizeMin, setPrizeMin] = React.useState(-1)
    const [getPrizeMax, setPrizeMax] = React.useState(-1)
    const [getMaxBonus, setMaxBonus] = React.useState(-1);


    const [getSelectableHorseName, setSelectableHorseName] = React.useState();
    const [checkStateMultiCity, setcheckStateMultiCity] = React.useState({ checked: [] });
    const [checkStateMultiCityString, setcheckStateMultiCityString] = React.useState({ checkedString: [] });
    const [checkStateMultiRace, setcheckStateMultiRace] = React.useState({ checked: [] });
    const [checkStateMultiRaceString, setcheckStateMultiRaceString] = React.useState({ checkedString: [] });
    const [checkStateMultiGroupRace, setcheckStateMultiGroupRace] = React.useState({ checked: [] });
    const [checkStateMultiGroupRaceString, setcheckStateMultiGroupRaceString] = React.useState({ checkedString: [] });
    const [checkStateMultiDistance, setcheckStateMultiDistance] = React.useState({ checked: [] });
    const [checkStateMultiDistanceString, setcheckStateMultiDistanceString] = React.useState({ checkedString: [] });
    const [checkStateMultiRunway, setcheckStateMultiRunway] = React.useState({ checked: [] });
    const [checkStateMultiRunwayString, setcheckStateMultiRunwayString] = React.useState({ checkedString: [] });
    const [checkStateMultiGender, setcheckStateMultiGender] = React.useState({ checked: [] });
    const [checkStateMultiGenderString, setcheckStateMultiGenderString] = React.useState({ checkedString: [] });
    const [checkStateMultiClass, setcheckStateMultiClass] = React.useState({ checked: [] });
    const [checkStateMultiClassString, setcheckStateMultiClassString] = React.useState({ checkedString: [] });

    const pressCity = item => {   // The onPress method
        const { checked } = checkStateMultiCity;
        const { checkedString } = checkStateMultiCityString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.RACE_CITY_ID)) {
            setcheckStateMultiCity({ checked: [...checked, item.RACE_CITY_ID] });
            setcheckStateMultiCityString({ checkedString: [...checkedString, item.RACE_CITY_EN] })
        } else {
            setcheckStateMultiCity({ checked: checked.filter(a => a !== item.RACE_CITY_ID) });
            setcheckStateMultiCityString({ checkedString: checkedString.filter(a => a !== item.RACE_CITY_EN) });
        }
    }

    const pressRace = item => {   // The onPress method
        const { checked } = checkStateMultiRace;
        const { checkedString } = checkStateMultiRaceString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.RACE_ID)) {
            setcheckStateMultiRace({ checked: [...checked, item.RACE_ID] });
            setcheckStateMultiRaceString({ checkedString: [...checkedString, item.RACE_EN] })
        } else {
            setcheckStateMultiRace({ checked: checked.filter(a => a !== item.RACE_ID) });
            setcheckStateMultiRaceString({ checkedString: checkedString.filter(a => a !== item.RACE_EN) });
        }
    }

    const pressGroupRace = item => {   // The onPress method
        const { checked } = checkStateMultiGroupRace;
        const { checkedString } = checkStateMultiGroupRaceString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.ID)) {
            setcheckStateMultiGroupRace({ checked: [...checked, item.ID] });
            setcheckStateMultiGroupRaceString({ checkedString: [...checkedString, item.NAME] })
        } else {
            setcheckStateMultiGroupRace({ checked: checked.filter(a => a !== item.ID) });
            setcheckStateMultiGroupRaceString({ checkedString: checkedString.filter(a => a !== item.NAME) });
        }
    }

    const pressDistance = item => {   // The onPress method
        const { checked } = checkStateMultiDistance;
        const { checkedString } = checkStateMultiDistanceString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.RACE_DISTANCE_ID)) {
            setcheckStateMultiDistance({ checked: [...checked, item.RACE_DISTANCE_ID] });
            setcheckStateMultiDistanceString({ checkedString: [...checkedString, item.DISTANCE] })
        } else {
            setcheckStateMultiDistance({ checked: checked.filter(a => a !== item.RACE_DISTANCE_ID) });
            setcheckStateMultiDistanceString({ checkedString: checkedString.filter(a => a !== item.DISTANCE) });
        }
    }

    const pressRunway = item => {   // The onPress method
        const { checked } = checkStateMultiRunway;
        const { checkedString } = checkStateMultiRunwayString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.ID)) {
            setcheckStateMultiRunway({ checked: [...checked, item.ID] });
            setcheckStateMultiRunwayString({ checkedString: [...checkedString, item.NAME] })
        } else {
            setcheckStateMultiRunway({ checked: checked.filter(a => a !== item.ID) });
            setcheckStateMultiRunwayString({ checkedString: checkedString.filter(a => a !== item.NAME) });
        }
    }

    const pressGender = item => {   // The onPress method
        const { checked } = checkStateMultiGender;
        const { checkedString } = checkStateMultiGenderString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.RACE_GENDER_ID)) {
            setcheckStateMultiGender({ checked: [...checked, item.RACE_GENDER_ID] });
            setcheckStateMultiGenderString({ checkedString: [...checkedString, item.RACE_GENDER_EN] })
        } else {
            setcheckStateMultiGender({ checked: checked.filter(a => a !== item.RACE_GENDER_ID) });
            setcheckStateMultiGenderString({ checkedString: checkedString.filter(a => a !== item.RACE_GENDER_EN) });
        }
    }

    const pressClass = item => {   // The onPress method
        const { checked } = checkStateMultiClass;
        const { checkedString } = checkStateMultiClassString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.ID)) {
            setcheckStateMultiClass({ checked: [...checked, item.ID] });
            setcheckStateMultiClassString({ checkedString: [...checkedString, item.NAME] })
        } else {
            setcheckStateMultiClass({ checked: checked.filter(a => a !== item.ID) });
            setcheckStateMultiClassString({ checkedString: checkedString.filter(a => a !== item.NAME) });
        }
    }

    const readDataCityList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/RaceCity/Get?p_sCountryId=' + 1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setCityData(json.m_cData)
                        setisLoading(false)
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

    const readDataRaceList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Race/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setRaceData(json.m_cData)
                        setisLoading(false)
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

    const readDataHorseList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/TjkConditonHorse/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseData(json.m_cData)
                        setisLoading(false)
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

    const readDataRaceGroupList = async (RaceID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/RaceGroup/GetAsNameId?p_iLanguage=' + 2 + "&p_sRaceId=" + RaceID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setGroupRaceData(json.m_cData)
                        setisLoading(false)
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

    const readDataDistanceList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/RaceDistance/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setDistanceData(json.m_cData)
                        setisLoading(false)
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

    const readDataRunwayList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/RaceFloor/GetAsNameId?p_iLanguage=' + 2, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setRunwayData(json.m_cData)
                        setisLoading(false)
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

    const readDataGenderList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/RaceGender/GetByTjkConditionHorseId?p_iTjkConditonHorseId=' + -1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setGenderData(json.m_cData)
                        setisLoading(false)
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

    const readDataClassList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/RaceType/GetAsNameId?p_iLanguage=' + 2, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setClassData(json.m_cData)
                        setisLoading(false)
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

    const readTjkConditionRaceGetFilter = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/TjkConditionRace/GetFilter', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "TJK_CONDITION_HORSE_ID": -1,
                        "START_DATE": "",
                        "END_DATE": "",
                        "RACE_CITY_ID": getRaceCityID,
                        "RACE_ID": getRaceID,
                        "RACE_GROUP_ID": getRaceGroupID,
                        "RACE_TYPE_ID": getRaceTypeID,
                        "RACE_DISTANCE_ID": getRaceDistanceID,
                        "RACE_FLOOR_ID": getRaceFloorID,
                        "RACE_GENDER_ID": getRaceGenderID,
                        "MIN_BONUS": -1,
                        "MAX_BONUS": -1,
                        "PAGE_NO": 1,
                        "PAGE_COUNT": 100
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setTjkConditionRaceGetFilterData(json.m_cData)
                        //setTime(false)
                        console.log(json)
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

    React.useEffect(() => {
        readDataCityList();
        readDataHorseList();
        readDataRaceList();
        readDataDistanceList();
        readDataRunwayList();
        readDataGenderList()
        readDataClassList()
    }, [])

    return (
        <View style={styles.Container}>
            <Title text="Race Analysis" />

            <RBSheet
                ref={BottomSheetLong}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={Dimensions.get('window').height}
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
                        BottomSheetLong.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    {getBottomSheetText === "HorseList" &&

                        <>
                            {getisLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getHorseData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getHorseData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setSelectableHorseName(item.NAME)
                                                BottomSheetLong.current.close();
                                            }}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.NAME}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    )
                                    )}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                </View>
                            }

                        </>
                        || getBottomSheetText === "CityList" &&

                        <>
                            {getisLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getCityData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getCityData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressCity(item)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiCity.checked.includes(item.RACE_CITY_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressCity(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.RACE_CITY_EN}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    )
                                    )}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                </View>
                            }
                        </>

                        || getBottomSheetText === "RaceGroupList" &&

                        <>
                            {getisLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getGroupRaceData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getGroupRaceData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressGroupRace(item)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiGroupRace.checked.includes(item.ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressGroupRace(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.NAME}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    )
                                    )}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                </View>
                            }
                        </>

                        || getBottomSheetText === "DitanceList" &&

                        <>
                            {getisLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getDistanceData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getDistanceData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressDistance(item)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiDistance.checked.includes(item.RACE_DISTANCE_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressDistance(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.DISTANCE}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    )
                                    )}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                </View>
                            }
                        </>
                        || getBottomSheetText === "ClassList" &&

                        <>
                            {getisLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getClassData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getClassData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressClass(item)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiClass.checked.includes(item.ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressClass(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.NAME}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    )
                                    )}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                </View>
                            }
                        </>
                    }
                </View>
            </RBSheet>

            <RBSheet
                ref={BottomSheetSmall}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={300}
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

                        let RaceIDString
                        if (checkStateMultiRace.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiRace.checked.length; i++) {
                                if (i === 0) {
                                    RaceIDString = checkStateMultiRace.checked[0]
                                }
                                else {
                                    RaceIDString += "," + checkStateMultiRace.checked[i]
                                }
                            }
                            readDataRaceGroupList(RaceIDString)
                        }

                        BottomSheetSmall.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    {getBottomSheetText === "RaceList" &&

                        <>
                            {getisLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getRaceData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getRaceData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressRace(item);
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiRace.checked.includes(item.RACE_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressRace(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.RACE_EN}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    )
                                    )}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                </View>
                            }

                        </>
                        || getBottomSheetText === "RunwayList" &&

                        <>
                            {getisLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getRunwayData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getRunwayData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressRunway(item);
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiRunway.checked.includes(item.ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressRunway(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.NAME}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    )
                                    )}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                </View>
                            }
                        </>

                        || getBottomSheetText === "GenderList" &&

                        <>
                            {getisLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getGenderData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getGenderData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressGender(item);
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiGender.checked.includes(item.RACE_GENDER_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressGender(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.RACE_GENDER_EN}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    )
                                    )}
                                </ScrollView>
                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                </View>
                            }
                        </>

                    }
                </View>
            </RBSheet>

            <ScrollView style={{ padding: 10 }}>
                {showReport ?
                    <>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowReport(false)
                                }}
                                style={{ width: '100%', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', marginBottom: 10 }}>
                                <Icon name="chevron-left" size={24} color="silver" />
                                <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.ScrollViewContainer}>
                            {getTjkConditionRaceGetFilterData !== undefined ?

                                <>
                                    {getTjkConditionRaceGetFilterData.length === 0 ?
                                        <View style={styles.ErrorMessageContainer}>
                                            <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                                            <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                            <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                            <Text style={styles.ErrorMessageText}>You can search again.</Text>
                                        </View>
                                        :

                                        <ScrollView horizontal={true}>

                                            <DataTable>
                                                <DataTable.Header>
                                                    <DataTable.Title style={{ width: 100 }}>Name</DataTable.Title>
                                                    <DataTable.Title style={{ width: 100 }}>Bonus</DataTable.Title>
                                                    <DataTable.Title style={{ width: 100 }}>Date</DataTable.Title>
                                                    <DataTable.Title style={{ width: 100 }}>Description</DataTable.Title>
                                                    <DataTable.Title style={{ width: 100 }}>City</DataTable.Title>
                                                    <DataTable.Title style={{ width: 100 }}>Distance</DataTable.Title>
                                                    <DataTable.Title style={{ width: 100 }}>Runway</DataTable.Title>
                                                    <DataTable.Title style={{ width: 100 }}>Sex</DataTable.Title>
                                                    <DataTable.Title style={{ width: 100 }}>RACE GROUP</DataTable.Title>
                                                    <DataTable.Title style={{ width: 100 }}>Tipi</DataTable.Title>
                                                </DataTable.Header>




                                                <>
                                                    {getTjkConditionRaceGetFilterData.map((item, index) => (
                                                        <DataTable.Row key={index}>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100 }}></DataTable.Cell>
                                                        </DataTable.Row>
                                                    ))}

                                                </>



                                            </DataTable>
                                        </ScrollView>


                                    }
                                </>

                                :
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                </View>
                            }

                        </ScrollView>
                    </>
                    :
                    <>

                        <View style={[styles.BottomSheetInputsContainer]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("HorseList");
                                    BottomSheetLong.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="horse" size={20} color="#2169ab" />
                                {getSelectableHorseName !== undefined ?
                                    <Text style={styles.InformationText}>{getSelectableHorseName}</Text>
                                    :
                                    <Text style={styles.InformationText}>Select A Horse</Text>
                                }


                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                            <Text style={styles.TextInputHeader}>Start Date: </Text>
                            <TextInput
                                style={styles.HalfInputStyle}
                                placeholder={"Start Date"}
                                keyboardType="numeric"
                                value={getStartDate}
                                onChange={setStartDate}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            <Text style={styles.TextInputHeader}>End Date: </Text>
                            <TextInput
                                style={styles.HalfInputStyle}
                                placeholder={"End Date"}
                                keyboardType="numeric"
                                value={getEndDate}
                                onChange={setEndDate}
                            />
                        </View>

                        <View style={[styles.BottomSheetInputsContainer, { marginTop: 30 }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("CityList");
                                    BottomSheetLong.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="city" size={20} color="#2169ab" />
                                {checkStateMultiCityString.checkedString.length === 0
                                    ?
                                    <Text style={styles.InformationText}>Select A City</Text>
                                    :
                                    <Text style={styles.InformationText}>{checkStateMultiCityString.checkedString}</Text>
                                }


                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.BottomSheetInputsContainer]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("RaceList");
                                    BottomSheetSmall.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="horse" size={20} color="#2169ab" />
                                {checkStateMultiRaceString.checkedString.length === 0 ?
                                    <Text style={styles.InformationText}>Select A Race</Text>
                                    :
                                    <Text style={styles.InformationText}>{checkStateMultiRaceString.checkedString}</Text>
                                }


                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.BottomSheetInputsContainer]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("RaceGroupList");
                                    BottomSheetLong.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="horse" size={20} color="#2169ab" />
                                {checkStateMultiGroupRaceString.checkedString.length === 0
                                    ?
                                    <Text style={styles.InformationText}>Select A Race Group</Text>
                                    :
                                    <Text style={styles.InformationText}>{checkStateMultiGroupRaceString.checkedString}</Text>
                                }


                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.BottomSheetInputsContainer]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("DitanceList");
                                    BottomSheetLong.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="route" size={20} color="#2169ab" />
                                {checkStateMultiDistanceString.checkedString.length === 0 ?
                                    <Text style={styles.InformationText}>Select A Ditance</Text>
                                    :
                                    <Text style={styles.InformationText}>{checkStateMultiDistanceString.checkedString}</Text>
                                }


                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.BottomSheetInputsContainer]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("RunwayList");
                                    BottomSheetSmall.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="route" size={20} color="#2169ab" />
                                {checkStateMultiRunwayString.checkedString.length === 0 ?
                                    <Text style={styles.InformationText}>Select A Runway</Text>
                                    :
                                    <Text style={styles.InformationText}>{checkStateMultiRunwayString.checkedString}</Text>
                                }


                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.BottomSheetInputsContainer]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("GenderList");
                                    BottomSheetSmall.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="male" size={20} color="#2169ab" />
                                {checkStateMultiGenderString.checkedString.length === 0 ?
                                    <Text style={styles.InformationText}>Select A Sex</Text>
                                    :
                                    <Text style={styles.InformationText}>{checkStateMultiGenderString.checkedString}</Text>
                                }


                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.BottomSheetInputsContainer]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("ClassList");
                                    BottomSheetLong.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="horse" size={20} color="#2169ab" />
                                {checkStateMultiCityString.checkedString.length === 0 ?
                                    <Text style={styles.InformationText}>Select A Class</Text>
                                    :
                                    <Text style={styles.InformationText}>{checkStateMultiCityString.checkedString}</Text>
                                }


                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                            <Text style={styles.TextInputHeader}>Prize Min: </Text>
                            <TextInput
                                style={styles.HalfInputStyle}
                                placeholder={"Prize Min"}
                                keyboardType="numeric"
                                value={getPrizeMin}
                                onChange={setPrizeMin}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            <Text style={styles.TextInputHeader}>Prize Max: </Text>
                            <TextInput
                                style={styles.HalfInputStyle}
                                placeholder={"Prize Max"}
                                keyboardType="numeric"
                                value={getPrizeMax}
                                onChange={setPrizeMax}
                            />
                        </View>

                        <View style={styles.ButtonContainer}>
                            <BlueButton
                                title="View"
                                style={{ width: '95%' }}
                                onPress={() => {
                                    readTjkConditionRaceGetFilter();
                                    setShowReport(true)
                                }}
                            />
                        </View>



                    </>
                }
            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',

    },
    BottomSheetInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        padding: 10,
        marginVertical: 2
    },
    OneValueInLineButton: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    InformationText: {
        fontSize: 16,
        marginLeft: 5
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25
    },
    ButtonContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    FullInputStyle: {
        marginVertical: 5,
        width: '100%',
        paddingLeft: 20,
        borderRadius: 8,
        fontSize: 18,
        margin: 0,
        padding: 10,
        borderColor: 'silver',
        borderWidth: 0.5,
    },
    TextInputContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5
    },
    TextInputHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    HalfInputStyle: {
        width: '90%',
        paddingLeft: 20,
        fontSize: 16,
        margin: 0,
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
})