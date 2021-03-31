import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Dimensions, Image } from 'react-native'
import { BlueButton } from '../components/BlueButton';
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { SearchBar, ListItem } from 'react-native-elements'
import { Global } from '../Global';

export function ManagementStallionAdsScreen() {

    const BottomSheetLong = React.useRef()

    const [isEditting, setIsEditting] = React.useState(false)

    const [getBottomSheetText, setBottomSheetText] = React.useState();
    const [getSearchValue, setSearchValue] = React.useState();

    const [getStallionAdsData, setStallionAdsData] = React.useState()
    const [geHorseNameData, seHorseNameData] = React.useState();
    const [getYearData, setYearData] = React.useState();
    const [getPlaceData, setPlaceData] = React.useState();
    const [getCurrencyTypeData, setCurrencyTypeData] = React.useState()

    const [isLoading, setLoading] = React.useState(true);
    const [showReport, setShowReport] = React.useState(false);
    const [showAddProfileForm, setShowAddProfileForm] = React.useState(false)

    const [getID, setID] = React.useState();
    const [getSireName, setSirename] = React.useState('');
    const [getYear, setYear] = React.useState('');

    const [getCurrencyTypeText, setCurrencyTypeYearText] = React.useState()
    const [getCurrencyTypeID, setCurrencyTypeID] = React.useState()

    const [getSireMareNameForm, setSireMareNameForm] = React.useState();
    const [getSireMareIDForm, setSireMareIDForm] = React.useState();
    const [getYearForm, setYearForm] = React.useState();
    const [getYearIDForm, setYearIDForm] = React.useState();
    const [getPlaceForm, setPlaceForm] = React.useState();
    const [getPlaceIDForm, setPlaceIDForm] = React.useState();

    const [checkStateMultiSireName, setcheckStateMultiSireName] = React.useState({ checked: [] });
    const [checkStateMultiSireNameString, setcheckStateMultiSireNameString] = React.useState({ checkedString: [] });
    const [checkStateMultiYear, setcheckStateMultiYear] = React.useState({ checked: [] });
    const [checkStateMultiYearString, setcheckStateMultiYearSireNameString] = React.useState({ checkedString: [] });

    const [getAliveCount, setAliveCount] = React.useState("");
    const [getCurrencyObject, setCurrencyObject] = React.useState();
    const [getDeadMareCount, setDeadMareCount] = React.useState("");
    const [getEmptyCount, setEmptyCount] = React.useState("");
    const [getFee, setFee] = React.useState("");
    const [getMareCount, setMareCount] = React.useState("");
    const [getMaxCount, setMaxCount] = React.useState("");
    const [getPlaceObject, setPlaceObject] = React.useState();
    const [getPregnantCount, setPregnantCount] = React.useState("");
    const [getSireID, setSireID] = React.useState("");
    const [getSireText, setSireText] = React.useState("")
    const [getStallionAdsID, setStallionAdsID] = React.useState("");
    const [getUnchekedCount, setUnchekedCount] = React.useState("");
    const [getYearObject, setYearObject] = React.useState();

    const [loadingForData, setLoadingForData] = React.useState(false)

    const [getEarningName, setEarningName] = React.useState("")
    const [getSaveButtonName, setSaveButtonName] = React.useState("")
    const [getEditButtonName, setEditButtonName] = React.useState("")
    const [getSearchButtonName, setSearchButtonName] = React.useState("")

    const [getFeeName, setFeeName] = React.useState("")

    const pressSireName = item => {
        const { checked } = checkStateMultiSireName;
        const { checkedString } = checkStateMultiSireNameString;
        if (!checked.includes(item.HORSE_ID)) {
            setcheckStateMultiSireName({ checked: [...checked, item.HORSE_ID] });
            setcheckStateMultiSireNameString({ checkedString: [...checkedString, item.HORSE_NAME] })
        } else {
            setcheckStateMultiSireName({ checked: checked.filter(a => a !== item.HORSE_ID) });
            setcheckStateMultiSireNameString({ checkedString: checkedString.filter(a => a !== item.HORSE_NAME) });
        }
    }

    const pressYear = item => {
        const { checked } = checkStateMultiYear;
        const { checkedString } = checkStateMultiYearString;
        if (!checked.includes(item.YEAR_ID)) {
            setcheckStateMultiYear({ checked: [...checked, item.YEAR_ID] });
            setcheckStateMultiYearSireNameString({ checkedString: [...checkedString, item.YEAR_TEXT] })
        } else {
            setcheckStateMultiYear({ checked: checked.filter(a => a !== item.YEAR_ID) });
            setcheckStateMultiYearSireNameString({ checkedString: checkedString.filter(a => a !== item.YEAR_TEXT) });
        }
    }

    const alertDialog = (messageTitle, message) =>
        Alert.alert(
            messageTitle,
            message,
            [
                {
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );

    const readGetStallionAds = async (ID, SireID, YearID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/StallionAds/Get?p_iId=' + ID +
                    '&p_sSireId=' + SireID + '&p_sYearId=' + YearID + '&p_iRaceId=' + 1 + '&p_iPageNo=' + 1 + '&p_iPageCount=' + 100, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setStallionAdsData(json.m_cData)
                        setLoading(false)
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

    const readGetHorseName = async () => {
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
                        NAME: searchValue,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        seHorseNameData(json.m_cData)
                        //setLoading(false)
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

    const readGetYear = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Year/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setYearData(json.m_cData)
                        //setLoading(false)
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

    const readGetPlace = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Place/GetAsNameId', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setPlaceData(json.m_cData)
                        //setLoading(false)
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

    const readDataCurrencyList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Currency/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setCurrencyTypeData(json.m_cData)
                        //setLoading(false)
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

    const readStallionAdsUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/StallionAds/Update', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "ALIVE_COUNT": getAliveCount,
                        "CURRENCY_OBJECT": getCurrencyObject,
                        "DEAD_MARE_COUNT": getDeadMareCount,
                        "EMPTY_COUNT": getEmptyCount,
                        "FEE": getFee,
                        "MARE_COUNT": getMareCount,
                        "MAX_COUNT": getMaxCount,
                        "PLACE_OBJECT": getPlaceObject,
                        "PREGNANT_COUNT": getPregnantCount,
                        "SIRE_ID": getSireID,
                        "SIRE_TEXT": getSireText,
                        "STALLION_ADS_ID": getStallionAdsID,
                        "UNCHECKED_COUNT": getUnchekedCount,
                        "YEAR_OBJECT": getYearObject

                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            setIsEditting(false)
                            setShowReport(false)

                            setAliveCount("")
                            setCurrencyObject()
                            setDeadMareCount("")
                            setEmptyCount("")
                            setFee("")
                            setMareCount("")
                            setMaxCount("")
                            setPlaceObject()
                            setPregnantCount("")
                            setSireID("")
                            setSireText()
                            setStallionAdsID("")
                            setUnchekedCount("")
                            setYearObject()

                            setLoadingForData(false)
                        }
                        else {
                            alertDialog("Error", json.m_lUserMessageList[1])
                        }


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

    const readStallionAdsAdd = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/StallionAds/Add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "ALIVE_COUNT": getAliveCount,
                        "CURRENCY_OBJECT": getCurrencyObject,
                        "DEAD_MARE_COUNT": getDeadMareCount,
                        "EMPTY_COUNT": getEmptyCount,
                        "FEE": getFee,
                        "MARE_COUNT": getMareCount,
                        "MAX_COUNT": getMaxCount,
                        "PLACE_OBJECT": getPlaceObject,
                        "PREGNANT_COUNT": getPregnantCount,
                        "SIRE_ID": getSireID,
                        "SIRE_TEXT": getSireText,
                        "STALLION_ADS_ID": getStallionAdsID,
                        "UNCHECKED_COUNT": getUnchekedCount,
                        "YEAR_OBJECT": getYearObject

                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            setIsEditting(false)
                            setShowReport(false)

                            setAliveCount("")
                            setCurrencyObject()
                            setDeadMareCount("")
                            setEmptyCount("")
                            setFee("")
                            setMareCount("")
                            setMaxCount("")
                            setPlaceObject()
                            setPregnantCount("")
                            setSireID("")
                            setSireText()
                            setStallionAdsID("")
                            setUnchekedCount("")
                            setYearObject()

                            setLoadingForData(false)
                        }
                        else {
                            alertDialog("Error", json.m_lUserMessageList[1])
                        }


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
        readGetStallionAds(-1, '', '')
        readGetHorseName();
        readGetYear();
        readDataCurrencyList();
        readGetPlace();

        if (Global.Language === 1) {
            setEarningName("Kazanc")
            setSaveButtonName("Kaydet")
            setEditButtonName("Düzenle")
            setSearchButtonName("Arama")
            setFeeName("Ücret")

        }
        else {
            setEarningName("Earning")
            setSaveButtonName("Save")
            setEditButtonName("Edit")
            setSearchButtonName("Search")
            setFeeName("Fee")
        }
    }, [])

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


                        if (checkStateMultiSireName.checked.length > 0) {
                            let SireID
                            for (let i = 0; i < checkStateMultiSireName.checked.length; i++) {
                                if (i === 0) {
                                    SireID = checkStateMultiSireName.checked[0]
                                }
                                else {
                                    SireID += "," + checkStateMultiSireName.checked[i]
                                }
                            }
                            setSirename(SireID);
                        }

                        if (checkStateMultiYear.checked.length > 0) {
                            let YearID
                            for (let i = 0; i < checkStateMultiYear.checked.length; i++) {
                                if (i === 0) {
                                    YearID = checkStateMultiYear.checked[0]
                                }
                                else {
                                    YearID += "," + checkStateMultiYear.checked[i]
                                }
                            }
                            setYear(YearID);
                        }



                        BottomSheetLong.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

                    {getBottomSheetText === "SireName" &&

                        <>
                            <SearchBar
                                placeholder={getSearchValue}
                                lightTheme
                                platform="ios"
                                cancelButtonTitle=""
                                inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                containerStyle={{ backgroundColor: 'transparent', }}
                                inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                                rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                value={getSearchValue}
                                onChangeText={setSearchValue}
                                onSubmitEditing={() => {
                                    readGetHorseName();
                                }}
                                showLoading={true}
                            />

                            {geHorseNameData !== undefined &&

                                <ScrollView>
                                    {geHorseNameData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressSireName(item)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiSireName.checked.includes(item.HORSE_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressSireName(item)
                                                }} />
                                            <Image
                                                source={{
                                                    uri:
                                                        'https://www.pedigreeall.com//upload/1000/' + item.IMAGE,
                                                }}
                                                style={{ width: 100, height: 100 }}
                                                resizeMode='contain'
                                                transition={false} />
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

                        || getBottomSheetText === "Year" &&

                        <>

                            {getYearData !== undefined &&

                                <ScrollView>
                                    {getYearData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressYear(item)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiYear.checked.includes(item.YEAR_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressYear(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.YEAR_TEXT}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    ))}
                                </ScrollView>

                            }
                        </>

                        || getBottomSheetText === "FeeForm" &&

                        <>
                            {getCurrencyTypeData !== undefined &&

                                <ScrollView>
                                    {getCurrencyTypeData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setCurrencyTypeYearText(item.ICON)
                                                setCurrencyTypeID(item.CURRENCY_ID)
                                                setCurrencyObject(item)
                                                BottomSheetLong.current.close()
                                            }}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.ICON}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    ))}
                                </ScrollView>

                            }
                        </>

                        || getBottomSheetText === "Place" &&

                        <>
                            {getPlaceData !== undefined &&

                                <ScrollView>
                                    {getPlaceData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setPlaceForm(item.NAME)
                                                setPlaceIDForm(item.ID)
                                                setPlaceObject(item)
                                                BottomSheetLong.current.close()
                                            }}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.NAME}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    ))}
                                </ScrollView>

                            }
                        </>

                        || getBottomSheetText === "SireNameForm" &&

                        <>

                            <SearchBar
                                placeholder={getSearchValue}
                                lightTheme
                                platform="ios"
                                cancelButtonTitle=""
                                inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                containerStyle={{ backgroundColor: 'transparent', }}
                                inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                                rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                value={getSearchValue}
                                onChangeText={setSearchValue}
                                onSubmitEditing={() => {
                                    readGetHorseName();
                                }}
                                showLoading={true}
                            />

                            {geHorseNameData !== undefined &&

                                <ScrollView>
                                    {geHorseNameData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setSireMareIDForm(item.HORSE_ID)
                                                setSireMareNameForm(item.HORSE_NAME)
                                                setSireText(item.HORSE_NAME)
                                                setSireID(item.HORSE_ID)
                                                BottomSheetLong.current.close()
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri:
                                                        'https://www.pedigreeall.com//upload/1000/' + item.IMAGE,
                                                }}
                                                style={{ width: 100, height: 100 }}
                                                resizeMode='contain'
                                                transition={false} />
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

                        || getBottomSheetText === "YearForm" &&

                        <>
                            {getYearData !== undefined &&

                                <ScrollView>
                                    {getYearData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setYearIDForm(item.YEAR_ID)
                                                setYearForm(item.YEAR_TEXT)
                                                setYearObject(item)
                                                BottomSheetLong.current.close();
                                            }}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.YEAR_TEXT}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    ))}
                                </ScrollView>

                            }
                        </>
                    }

                </View>
            </RBSheet>

            {showAddProfileForm ?
                null
                :
                <TouchableOpacity
                    style={styles.FilteringContainer}
                    onPress={() => {
                        setIsEditting(false)
                        setShowReport(true)
                        setShowAddProfileForm(true)

                        setAliveCount("")
                        setCurrencyObject()
                        setDeadMareCount("")
                        setEmptyCount("")
                        setFee("")
                        setMareCount("")
                        setMaxCount("")
                        setPlaceObject()
                        setPregnantCount("")
                        setSireID("")
                        setSireText()
                        setStallionAdsID("")
                        setUnchekedCount("")
                        setYearObject()

                    }}>
                    <Icon name="plus" size={16} color="#fff" style={{ justifyContent: 'center' }} />
                </TouchableOpacity>

            }

            {loadingForData &&

                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                    <ActivityIndicator
                        style={{ height: 100, top: 150 }}
                        color="#000"
                        size="large"
                    />
                </View>

            }

            {showReport ?
                <ScrollView style={{ padding: 10 }}>
                    <View >
                        <TouchableOpacity
                            onPress={() => {
                                setShowReport(false)
                                setShowAddProfileForm(false)
                            }}
                            style={{ width: '100%', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', marginBottom: 10 }}>
                            <Icon name="chevron-left" size={24} color="silver" />
                            {Global.Language === 1 ?
                                <Text style={{ fontSize: 16, marginLeft: 10 }}>Geri</Text>
                                :
                                <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                            }

                        </TouchableOpacity>
                    </View>

                    <View style={[styles.OneValueInLine]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("SireNameForm")
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {getSireText !== undefined ?
                                <Text style={styles.InformationText}>{getSireText}</Text>
                                :
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.InformationText}>Safkan | Kısrak</Text>
                                        :
                                        <Text style={styles.InformationText}>Sire | Mare</Text>
                                    }
                                </>

                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSireMareNameForm("Sire | Mare");
                                setSireMareIDForm(undefined);
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.OneValueInLine]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("YearForm")
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {getYearObject !== undefined ?
                                <Text style={styles.InformationText}>{getYearObject.YEAR_TEXT}</Text>
                                :
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.InformationText}>Yıl</Text>
                                        :
                                        <Text style={styles.InformationText}>Year</Text>
                                    }
                                </>

                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setYearForm("Year");
                                setYearIDForm(undefined);
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.OneValueInLine]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Place")
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {getPlaceObject !== undefined ?
                                <Text style={styles.InformationText}>{getPlaceObject.NAME}</Text>
                                :
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.InformationText}>Yer</Text>
                                        :
                                        <Text style={styles.InformationText}>Place</Text>
                                    }
                                </>

                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setPlaceForm("Place");
                                setPlaceIDForm(undefined);
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.EarningPriceItemContainer, { marginTop: 30 }]}>
                        <TextInput
                            style={styles.EarningPriceInput}
                            placeholder={getFeeName}
                            keyboardType="numeric"
                            value={getFee.toString()}
                            onChangeText={setFee}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("FeeForm");
                                BottomSheetLong.current.open();
                            }}
                            style={styles.EarningPriceButtonContainer}>
                            {getCurrencyObject !== undefined ?
                                <Text style={styles.EarningPriceButtonText}>{getCurrencyObject.ICON}</Text>
                                :
                                <Text style={styles.EarningPriceButtonText}>₺</Text>
                            }

                            <Icon name="caret-down" size={20} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                        {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Kontenjan: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Quota: </Text>
                        }

                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={""}
                            value={getMaxCount.toString()}
                            onChangeText={setMaxCount}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Kısrak: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Mare: </Text>
                        }

                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={""}
                            value={getMareCount.toString()}
                            onChangeText={setMareCount}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Gebe: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Pregnant: </Text>
                        }

                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={""}
                            value={getPregnantCount.toString()}
                            onChangeText={setPregnantCount}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Boş: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Empty: </Text>
                        }

                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={""}
                            value={getEmptyCount.toString()}
                            onChangeText={setEmptyCount}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Kontrol Edilmeyen: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Uncheked: </Text>
                        }

                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={""}
                            value={getUnchekedCount.toString()}
                            onChangeText={setUnchekedCount}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Ölen Kısrak: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Dead Mare: </Text>
                        }

                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={""}
                            value={getDeadMareCount.toString()}
                            onChangeText={setDeadMareCount}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Canlı Tay: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Alive Fool: </Text>
                        }

                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={""}
                            value={getAliveCount.toString()}
                            onChangeText={setAliveCount}
                        />
                    </View>

                    {isEditting ?
                        <BlueButton
                            onPress={() => {
                                setLoadingForData(true)
                                readStallionAdsUpdate();
                            }}
                            style={{ marginVertical: 20 }}
                            title={getEditButtonName}
                        />
                        :
                        <BlueButton
                            onPress={() => {
                                setLoadingForData(true)
                                readStallionAdsAdd()
                            }}
                            style={{ marginVertical: 20 }}
                            title={getSaveButtonName}
                        />
                    }

                </ScrollView>
                :
                <ScrollView style={{ padding: 10 }}>

                    <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                        <Text style={styles.TextInputHeader}>ID: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"ID"}
                            keyboardType="numeric"
                            value={getID}
                            onChangeText={setID}
                        />
                    </View>

                    <View style={[styles.OneValueInLine]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("SireName")
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {checkStateMultiSireNameString.checkedString.length === 0 ?
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.InformationText}>Aygır</Text>
                                        :
                                        <Text style={styles.InformationText}>Sire Name</Text>
                                    }
                                </>

                                :
                                <Text style={styles.InformationText}>{checkStateMultiSireNameString.checkedString}</Text>
                            }


                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.OneValueInLine]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Year")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {checkStateMultiYearString.checkedString.length === 0 ?
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.InformationText}>Yıl</Text>
                                        :
                                        <Text style={styles.InformationText}>Year</Text>
                                    }
                                </>

                                :
                                <Text style={styles.InformationText}>{checkStateMultiYearString.checkedString}</Text>
                            }


                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <BlueButton
                        onPress={() => {
                            setLoading(true);
                            console.log()
                            if (getID !== undefined) {
                                readGetStallionAds(getID, getSireName, getYear)
                            }
                            else {
                                readGetStallionAds(-1, getSireName, getYear)
                            }

                        }}
                        style={{ marginVertical: 20 }}
                        title={getSearchButtonName}
                    />

                    {isLoading ?
                        <ActivityIndicator size="large" color="#000" />
                        :
                        <>

                            {getStallionAdsData !== undefined ?
                                <>
                                    {getStallionAdsData.length === 0 ?
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
                                        </View>
                                        :
                                        <ScrollView horizontal={true}>

                                            <DataTable>
                                                {Global.Language === 1 ?
                                                    <DataTable.Header>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>ID</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Safkan</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Yıl</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Yer</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Ücret</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Kontenjan</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Kısrak</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Gebe</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Boş</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Kontrol Edilmeyen</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Ölen Kısrak</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Canlı Tay</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Düzenle</DataTable.Title>
                                                    </DataTable.Header>
                                                    :
                                                    <DataTable.Header>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>ID</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Sire</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Year</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Place</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Fee</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Quota</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Mare</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Pregnant</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Empty</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Uncheked</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Dead Mare</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Alive Foal</DataTable.Title>
                                                        <DataTable.Title style={[styles.DataTableTitle]}>Edit</DataTable.Title>
                                                    </DataTable.Header>
                                                }


                                                {getStallionAdsData.map((item, index) => (
                                                    <DataTable.Row key={index}>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.STALLION_ADS_ID}</DataTable.Cell>
                                                        <DataTable.Cell
                                                            onPress={() => {
                                                                alertDialog('Sire', item.SIRE_TEXT)
                                                            }}
                                                            style={styles.DataTableCellText}>
                                                            {item.SIRE_TEXT.substring(0, 10)}...
                                                </DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.YEAR_OBJECT.YEAR_TEXT}</DataTable.Cell>
                                                        <DataTable.Cell
                                                            onPress={() => {
                                                                alertDialog("Place", item.PLACE_OBJECT.PLACE_TEXT)
                                                            }}
                                                            style={styles.DataTableCellText}>
                                                            {item.PLACE_OBJECT.PLACE_TEXT.substring(0, 10)}...
                                                </DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.FEE} {item.CURRENCY_OBJECT.ICON}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.MAX_COUNT}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.MARE_COUNT}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.PREGNANT_COUNT}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.EMPTY_COUNT}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.UNCHECKED_COUNT}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.DEAD_MARE_COUNT}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.ALIVE_COUNT}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setIsEditting(true)
                                                                    setShowReport(true)
                                                                    setSireMareNameForm(item.SIRE_TEXT)
                                                                    setSireMareIDForm(item.SIRE_ID)

                                                                    setAliveCount(item.ALIVE_COUNT)
                                                                    setCurrencyObject(item.CURRENCY_OBJECT)
                                                                    setDeadMareCount(item.DEAD_MARE_COUNT)
                                                                    setEmptyCount(item.EMPTY_COUNT)
                                                                    setFee(item.FEE)
                                                                    setMareCount(item.MARE_COUNT)
                                                                    setMaxCount(item.MAX_COUNT)
                                                                    setPlaceObject(item.PLACE_OBJECT)
                                                                    setPregnantCount(item.PREGNANT_COUNT)
                                                                    setSireID(item.SIRE_ID)
                                                                    setSireText(item.SIRE_TEXT)
                                                                    setStallionAdsID(item.STALLION_ADS_ID)
                                                                    setUnchekedCount(item.UNCHECKED_COUNT)
                                                                    setYearObject(item.YEAR_OBJECT)

                                                                }}
                                                                style={styles.TableActionButtonContainer}>
                                                                {Global.Language === 1 ?
                                                                    <Text style={styles.TableActionButtonText}>Düzenle</Text>
                                                                    :
                                                                    <Text style={styles.TableActionButtonText}>Edit</Text>
                                                                }

                                                            </TouchableOpacity>
                                                        </DataTable.Cell>
                                                    </DataTable.Row>
                                                ))}
                                            </DataTable>

                                        </ScrollView>
                                    }
                                </>
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
                                </View>
                            }

                        </>

                    }

                </ScrollView>


            }

        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
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
    OneValueInLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'silver',
        marginVertical: 7,
        padding: 10
    },
    InputTouchableContainer: {
        width: '95%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    InformationText: {
        fontSize: 16,
        marginLeft: 10
    },
    DataTableTitle: {
        width: 150,
    },
    DataTableCellText: {
        width: 150,
    },
    TableActionButtonContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        backgroundColor: 'rgb(232, 237, 241)'
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
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
    FilteringContainer: {
        position: 'absolute',
        padding: 20,
        backgroundColor: '#2169ab',
        borderBottomWidth: 0.5,
        borderColor: 'silver',
        flexDirection: 'row',
        bottom: 10,
        right: 10,
        borderRadius: 50,
        zIndex: 1,
        elevation: 10
    },
    EarningPriceItemContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderRadius: 8,
        borderColor: 'silver',
        borderWidth: 0.5,
        marginVertical: 5
    },
    EarningPriceButtonContainer: {
        flexDirection: 'row',
        borderLeftWidth: 0.5,
        borderColor: 'silver',
        padding: 5,
        justifyContent: 'space-around',
        width: '40%'
    },
    EarningPriceInput: {
        padding: 5,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        width: '60%',
        fontSize: 16,
        marginLeft: 10
    },
    EarningPriceButtonText: {
        fontSize: 16,
        marginRight: 5,
    },
})