import React from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Text, Dimensions, TextInput, Linking, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SearchBar, Card, CheckBox, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { Global } from '../Global';
import RBSheet from "react-native-raw-bottom-sheet";

const ConfirmationData = [
    {
        id: "1",
        title: "All",
    },
    {
        id: "2",
        title: "Approved",
    },
    {
        id: "3",
        title: "Unapproved",
    },
]

const DeadData = [
    {
        id: "1",
        title: "All",
    },
    {
        id: "2",
        title: "Dead",
    },
    {
        id: "3",
        title: "Alive",
    },
]

const RomanMillerData = [
    {
        id: "1",
        title: "B",
    },
    {
        id: "2",
        title: "I",
    },
    {
        id: "3",
        title: "C",
    },
    {
        id: "4",
        title: "S",
    },
    {
        id: "5",
        title: "P",
    },
]

export function ThoroughhbredsSearchScreen({ navigation }) {

    const BottomSheetFiltering = React.useRef();
    const BottomSheetLong = React.useRef();
    const BottomSheetSmall = React.useRef();
    const [getBottomSheetText, setBottomSheetText] = React.useState();

    const [time, setTime] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState()
    const [isLoading, SetisLoading] = React.useState(true);
    const [getHorseList, setHorseList] = React.useState();
    const [state, setState] = React.useState({ checked: [] });
    const [stateDead, setStateDead] = React.useState({ checked: [] });
    const [chekedItem, setChekedItem] = React.useState("")


    const [checkStateMultiRM, setcheckStateMultiRM] = React.useState({ checked: [] });
    const [checkStateMultiANZ, setcheckStateMultiANZ] = React.useState({ checked: [] });
    const [checkStateMultiPA, setcheckStateMultiPA] = React.useState({ checked: [] });
    const [checkStateMultiSireName, setcheckStateMultiSireName] = React.useState({ checked: [] });
    const [checkStateMultiSireNameString, setcheckStateMultiSireNameString] = React.useState({ checkedString: [] });
    const [checkStateMultiMareName, setcheckStateMultiMareName] = React.useState({ checked: [] });
    const [checkStateMultiMareNameString, setcheckStateMultiMareNameString] = React.useState({ checkedString: [] });
    const [checkStateMultiBMSireName, setcheckStateMultiBMSireName] = React.useState({ checked: [] });
    const [checkStateMultiBMSireNameString, setcheckStateMultiBMSireNameString] = React.useState({ checkedString: [] });
    const [checkStateMultiCountry, setcheckStateMultiCountry] = React.useState({ checked: [] });
    const [checkStateMultiCountryString, setcheckStateMultiCountryString] = React.useState({ checkedString: [] });
    const [checkStateMultiSex, setcheckStateMultiSex] = React.useState({ checked: [] });
    const [checkStateMultiSexString, setcheckStateMultiSexString] = React.useState({ checkedString: [] });
    const [checkStateMultiClass, setcheckStateMultiClass] = React.useState({ checked: [] });
    const [checkStateMultiClassString, setcheckStateMultiClassString] = React.useState({ checkedString: [] });
    const [checkStateMultiOwner, setcheckStateMultiOwner] = React.useState({ checked: [] });
    const [checkStateMultiOwnerString, setcheckStateMultiOwnerString] = React.useState({ checkedString: [] });
    const [checkStateMultiBreeder, setcheckStateMultiBreeder] = React.useState({ checked: [] });
    const [checkStateMultiBreederString, setcheckStateMultiBreederString] = React.useState({ checkedString: [] });
    const [checkStateMultiCoach, setcheckStateMultiCoach] = React.useState({ checked: [] });
    const [checkStateMultiCoachString, setcheckStateMultiCoachString] = React.useState({ checkedString: [] });

    const [getBMSireName, setBMSireName] = React.useState("BM Sire Name")
    const [getConfirmation, setConfirmation] = React.useState("Confirmation")
    const [getDead, setDead] = React.useState("Dead");
    const [getCountry, setCountry] = React.useState("Country")
    const [getSex, setSex] = React.useState("Sex")
    const [getClass, setClass] = React.useState("Class");
    const [getOwner, setOwner] = React.useState("Owner")
    const [getBreeder, setBreeder] = React.useState("Breeder")
    const [getCoach, setCoach] = React.useState("Coach")
    const [getRomanMiller, setRomanMiller] = React.useState("Roman Miller")
    const [getANZ, setANZ] = React.useState("ANZ")
    const [getSortTypeString, setSortTypeString] = React.useState("Recently Added")
    const [getOwnerBreederName, setOwnerBreederName] = React.useState()

    const [getHorseGetFilter, setHorseGetFilter] = React.useState();
    const [getBool, setBool] = React.useState();
    const [getCountryData, setCountryData] = React.useState();
    const [getSexData, setSexData] = React.useState();
    const [getClassData, setClassData] = React.useState();
    const [getOwnerBreederData, setOwnerBreederData] = React.useState();
    const [getSortTypeData, setSortTypeData] = React.useState();

    const [getHorseID, setHorseID] = React.useState("");
    const [getHorseName, setHorseName] = React.useState("");
    const [getFatherID, setFatherID] = React.useState("");
    const [getMotherID, setMotherID] = React.useState("");
    const [getBmSireID, setBmSireID] = React.useState("");
    const [getConfirm, setConfirm] = React.useState("");
    const [getCountryID, setCountryID] = React.useState("");
    const [getStartBirthdate, setStartBirthdate] = React.useState("");
    const [getEndBirthdate, setEndBirthdate] = React.useState("");
    const [getSexID, setSexID] = React.useState("");
    const [getWinnerTypeID, setWinnerTypeID] = React.useState("");
    const [getMinEarning, setMinEarning] = React.useState("");
    const [getMaxEarning, setMaxEarning] = React.useState("");
    const [getMinPrice, setMinPrice] = React.useState("");
    const [getMaxPrice, setMaxPrice] = React.useState("");
    const [getOwnerID, setOwnerID] = React.useState("");
    const [getBreederID, setBreederID] = React.useState("");
    const [getCoachID, setCoachID] = React.useState("");
    const [getIsDead, setIsDead] = React.useState("");
    const [getMinStartsCount, setMinStartsCount] = React.useState("");
    const [getMaxStartsCount, setMaxStartsCount] = React.useState("");
    const [getMinFirst, setMinFirst] = React.useState("");
    const [getMaxFirst, setMaxFirst] = React.useState("");
    const [getMinSecond, setMinSecond] = React.useState("");
    const [getMaxSecond, setMaxSecond] = React.useState("");
    const [getMinThird, setMinThird] = React.useState("");
    const [getMaxThird, setMaxThird] = React.useState("");
    const [getMinFourth, setMinFourth] = React.useState("");
    const [getMaxFourth, setMaxFourth] = React.useState("");
    const [getReference1, setReference1] = React.useState("");
    const [getReference2, setReference2] = React.useState("");
    const [getB, setB] = React.useState("");
    const [getI, setI] = React.useState("");
    const [getC, setC] = React.useState("");
    const [getS, setS] = React.useState("");
    const [getP, setP] = React.useState("");
    const [getRmB, setRmB] = React.useState("");
    const [getRmI, setRmI] = React.useState("");
    const [getRmC, setRmC] = React.useState("");
    const [getRmS, setRmS] = React.useState("");
    const [getRmP, setRmP] = React.useState("");
    const [getAnzB, setAnzB] = React.useState("");
    const [getAnzI, setAnzI] = React.useState("");
    const [getAnzC, setAnzC] = React.useState("");
    const [getAnzS, setAnzS] = React.useState("");
    const [getAnzP, setAnzP] = React.useState("");
    //const [getSortTypeID, setSortTypeID] = React.useState("1");

    const pressRM = item => {   // The onPress method
        const { checked } = checkStateMultiRM;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.title)) {
            setcheckStateMultiRM({ checked: [...checked, item.title] });
        } else {
            setcheckStateMultiRM({ checked: checked.filter(a => a !== item.title) });
        }
    }

    const pressANZ = item => {   // The onPress method
        const { checked } = checkStateMultiANZ;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.title)) {
            setcheckStateMultiANZ({ checked: [...checked, item.title] });
        } else {
            setcheckStateMultiANZ({ checked: checked.filter(a => a !== item.title) });
        }
    }

    const pressPA = item => {   // The onPress method
        const { checked } = checkStateMultiPA;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.title)) {
            setcheckStateMultiPA({ checked: [...checked, item.title] });
        } else {
            setcheckStateMultiPA({ checked: checked.filter(a => a !== item.title) });
        }
    }

    const pressSireName = item => {   // The onPress method
        const { checked } = checkStateMultiSireName;
        const { checkedString } = checkStateMultiSireNameString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.HORSE_ID)) {
            setcheckStateMultiSireName({ checked: [...checked, item.HORSE_ID] });
            setcheckStateMultiSireNameString({ checkedString: [...checkedString, item.HORSE_NAME] })
        } else {
            setcheckStateMultiSireName({ checked: checked.filter(a => a !== item.HORSE_ID) });
            setcheckStateMultiSireNameString({ checkedString: checkedString.filter(a => a !== item.HORSE_NAME) });
        }
    }

    const pressMareName = item => {   // The onPress method
        const { checked } = checkStateMultiMareName;
        const { checkedString } = checkStateMultiMareNameString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.HORSE_ID)) {
            setcheckStateMultiMareName({ checked: [...checked, item.HORSE_ID] });
            setcheckStateMultiMareNameString({ checkedString: [...checkedString, item.HORSE_NAME] })
        } else {
            setcheckStateMultiMareName({ checked: checked.filter(a => a !== item.HORSE_ID) });
            setcheckStateMultiMareNameString({ checheckedStringcked: checkedString.filter(a => a !== item.HORSE_NAME) });
        }
    }

    const pressBMSireName = item => {   // The onPress method
        const { checked } = checkStateMultiBMSireName;
        const { checkedString } = checkStateMultiBMSireNameString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.HORSE_ID)) {
            setcheckStateMultiBMSireName({ checked: [...checked, item.HORSE_ID] });
            setcheckStateMultiBMSireNameString({ checkedString: [...checkedString, item.HORSE_NAME] })
        } else {
            setcheckStateMultiBMSireName({ checked: checked.filter(a => a !== item.HORSE_ID) });
            setcheckStateMultiBMSireNameString({ checkedString: checkedString.filter(a => a !== item.HORSE_NAME) });
        }
    }

    const pressCountry = item => {   // The onPress method
        const { checked } = checkStateMultiCountry;
        const { checkedString } = checkStateMultiCountryString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.COUNTRY_ID)) {
            setcheckStateMultiCountry({ checked: [...checked, item.COUNTRY_ID] });
            setcheckStateMultiCountryString({ checkedString: [...checkedString, item.COUNTRY_EN] })
        } else {
            setcheckStateMultiCountry({ checked: checked.filter(a => a !== item.COUNTRY_ID) });
            setcheckStateMultiCountryString({ checkedString: checkedString.filter(a => a !== item.COUNTRY_EN) });
        }
    }

    const pressSex = item => {   // The onPress method
        const { checked } = checkStateMultiSex;
        const { checkedString } = checkStateMultiSexString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.SEX_ID)) {
            setcheckStateMultiSex({ checked: [...checked, item.SEX_ID] });
            setcheckStateMultiSexString({ checkedString: [...checkedString, item.SEX_EN] })
        } else {
            setcheckStateMultiSex({ checked: checked.filter(a => a !== item.SEX_ID) });
            setcheckStateMultiSexString({ checkedString: checkedString.filter(a => a !== item.SEX_EN) });
        }
    }

    const pressClass = item => {   // The onPress method
        const { checked } = checkStateMultiClass;
        const { checkedString } = checkStateMultiClassString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.WINNER_TYPE_ID)) {
            setcheckStateMultiClass({ checked: [...checked, item.WINNER_TYPE_ID] });
            setcheckStateMultiClassString({ checkedString: [...checkedString, item.WINNER_TYPE_EN] })
        } else {
            setcheckStateMultiClass({ checked: checked.filter(a => a !== item.WINNER_TYPE_ID) });
            setcheckStateMultiClassString({ checkedString: checkedString.filter(a => a !== item.WINNER_TYPE_EN) });
        }
    }

    const pressOwner = item => {   // The onPress method
        const { checked } = checkStateMultiOwner;
        const { checkedString } = checkStateMultiOwnerString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.ID)) {
            setcheckStateMultiOwner({ checked: [...checked, item.ID] });
            setcheckStateMultiOwnerString({ checkedString: [...checkedString, item.NAME] })
        } else {
            setcheckStateMultiOwner({ checked: checked.filter(a => a !== item.ID) });
            setcheckStateMultiOwnerString({ checkedString: checkedString.filter(a => a !== item.NAME) });
        }
    }

    const pressBreeder = item => {   // The onPress method
        const { checked } = checkStateMultiBreeder;
        const { checkedString } = checkStateMultiBreederString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.ID)) {
            setcheckStateMultiBreeder({ checked: [...checked, item.ID] });
            setcheckStateMultiBreederString({ checkedString: [...checkedString, item.NAME] })
        } else {
            setcheckStateMultiBreeder({ checked: checked.filter(a => a !== item.ID) });
            setcheckStateMultiBreederString({ checkedString: checkedString.filter(a => a !== item.NAME) });
        }
    }

    const pressCoach = item => {   // The onPress method
        const { checked } = checkStateMultiCoach;
        const { checkedString } = checkStateMultiCoachString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.ID)) {
            setcheckStateMultiCoach({ checked: [...checked, item.ID] });
            setcheckStateMultiCoachString({ checkedString: [...checkedString, item.NAME] })
        } else {
            setcheckStateMultiCoach({ checked: checked.filter(a => a !== item.ID) });
            setcheckStateMultiCoachString({ checkedString: checkedString.filter(a => a !== item.NAME) });
        }
    }

    const readHorseGetFilter = async (getSortTypeID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/HorseInfo/GetFilter', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "HORSE_ID": getHorseID,
                        "HORSE_NAME": getHorseName,
                        "FATHER_ID": getFatherID,
                        "MOTHER_ID": getMotherID,
                        "BM_SIRE_ID": getBmSireID,
                        "CONFIRM": getConfirm,
                        "COUNTRY_ID": getCountryID,
                        "START_bIRTHDATE": getStartBirthdate,
                        "END_BIRTHDATE": getEndBirthdate,
                        "SEX_ID": getSexID,
                        "WINNER_TYPE_ID": getWinnerTypeID,
                        "MIN_EARNING": getMinEarning,
                        "MAX_EARNING": getMaxEarning,
                        "MIN_PRICE": getMinPrice,
                        "MAX_PRICE": getMaxPrice,
                        "OWNER_ID": getOwnerID,
                        "BREEDER_ID": getBreederID,
                        "COACH_ID": getCoachID,
                        "IS_DEAD": getIsDead,
                        "MIN_STARTS_COUNT": getMinStartsCount,
                        "MAX_STARTS_COUNT": getMaxStartsCount,
                        "MIN_FIRST": getMinFirst,
                        "MAX_FIRST": getMaxFirst,
                        "MIN_SECOND": getMinSecond,
                        "MAX_SECOND": getMaxSecond,
                        "MIN_THIRD": getMinThird,
                        "MAX_THIRD": getMaxThird,
                        "MIN_FOURTH": getMinFourth,
                        "MAX_FOURTH": getMaxFourth,
                        "REFERENCE_1": getReference1,
                        "REFERENCE_2": getReference2,
                        "B": getB,
                        "I": getI,
                        "C": getC,
                        "S": getS,
                        "P": getP,
                        "RM_B": getRmB,
                        "RM_I": getRmI,
                        "RM_C": getRmC,
                        "RM_S": getRmS,
                        "RM_P": getRmP,
                        "ANZ_B": getAnzB,
                        "ANZ_I": getAnzI,
                        "ANZ_C": getAnzC,
                        "ANZ_S": getAnzS,
                        "ANZ_P": getAnzP,
                        "SORT_TYPE_ID": getSortTypeID,
                        "PAGE_NO": 1,
                        "PAGE_COUNT": 16
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseGetFilter(json.m_cData)
                        setTime(false)
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

    const readHorseGetByName = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
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

    const readGetBool = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Bool/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setBool(json.m_cData)
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

    const readGetCountry = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Country/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setCountryData(json.m_cData);
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

    const readGetSex = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Sex/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setSexData(json.m_cData);
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

    const readGetWinnerType = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/WinnerType/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setClassData(json.m_cData);
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

    const readGetOwnerBreeder = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/SystemUser/GetOwnerBreederByName?p_sName=' + getOwnerBreederName, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setOwnerBreederData(json.m_cData);
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

    const readGetSortType = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/SortType/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setSortTypeData(json.m_cData);
                        SetisLoading(false);
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
        }
    }


    React.useEffect(() => {
        readGetSortType();
        readHorseGetByName();
        readHorseGetFilter("1");
        readGetBool();
        readGetCountry();
        readGetSex();
        readGetWinnerType();
        readGetOwnerBreeder();
    }, [])


    return (
        <View style={styles.Container}>
            <RBSheet
                ref={BottomSheetFiltering}
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
                    onPress={() => { BottomSheetFiltering.current.close() }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <ScrollView style={styles.BottomSheetContainer}>

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"Horse ID"}
                        name={"HorseID"}
                        value={getHorseID}
                        onChangeText={setHorseID}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"Name"}
                        name={"HorseName"}
                        value={getHorseName}
                        onChangeText={setHorseName}
                    />

                    <View style={[styles.OneValueInLine, { marginTop: 50 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("SireName");
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {checkStateMultiSireNameString.checkedString.length === 0 ?
                                <Text style={styles.InformationText}>Sire Name</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiSireNameString.checkedString}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setBMSireName("Sire Name");
                                setBmSireID("");
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("MareName");
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {checkStateMultiMareNameString.checkedString.length === 0 ?
                                <Text style={styles.InformationText}>Mare Name</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiMareNameString.checkedString}</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setcheckStateMultiMareNameString.checkedString = null
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("BMSireName");
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {checkStateMultiBMSireName.checked.length === 0 ?
                                <Text style={styles.InformationText}>BM Sire Name</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiBMSireNameString.checkedString}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setBMSireName("BM Sire Name");
                                setBmSireID("");
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.OneValueInLine, { marginTop: 50 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Confirmation")
                                BottomSheetSmall.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="check-circle" size={20} color="#2169ab" />
                            <Text style={styles.InformationText}>{getConfirmation}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setConfirm("");
                                setConfirmation("Confirmation")
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Dead")
                                BottomSheetSmall.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="dizzy" size={20} color="#2169ab" />
                            <Text style={styles.InformationText}>{getDead}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setDead("Dead");
                                setIsDead("");
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Country")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="flag" size={20} color="#2169ab" />
                            {checkStateMultiCountry.checked.length === 0 ?
                                <Text style={styles.InformationText}>Country</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiCountryString.checkedString}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCountry("Country");
                                setCountryID("");
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Sex")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="male" size={20} color="#2169ab" />
                            {checkStateMultiSex.checked.length === 0 ?
                                <Text style={styles.InformationText}>Sex</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiSexString.checkedString}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSex("Sex");
                                setSexID("");
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Class")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="horse" size={20} color="#2169ab" />
                            {checkStateMultiClass.checked.length === 0 ?
                                <Text style={styles.InformationText}>Class</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiClassString.checkedString}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setClass("Class");
                                setWinnerTypeID("");
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 50 }]}
                        placeholder={"Min Earning"}
                        name={"MinEarning"}
                        value={getMinEarning}
                        onChangeText={setMinEarning}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"Max Earning"}
                        name={"MaxEarning"}
                        value={getMaxEarning}
                        onChangeText={setMaxEarning}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={"Min Price"}
                        name={"MinPrice"}
                        value={getMinPrice}
                        onChangeText={setMinPrice}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"max Earning"}
                        name={"MaxPrice"}
                        value={getMaxPrice}
                        onChangeText={setMaxPrice}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={"Start B.Date"}
                        name={"StartBDate"}
                        value={getStartBirthdate}
                        onChangeText={setStartBirthdate}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"End B.Date"}
                        name={"EndBDate"}
                        value={getEndBirthdate}
                        onChangeText={setEndBirthdate}
                        keyboardType="numeric"
                    />

                    <View style={[styles.OneValueInLine, { marginTop: 50 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Owner")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            {checkStateMultiOwner.checked.length === 0 ?
                                <Text style={styles.InformationText}>Owner</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiOwnerString.checkedString}</Text>
                            }

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setOwner("Owner")
                                setOwnerID("")
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Breeder")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            {checkStateMultiBreeder.checked.length === 0 ?
                                <Text style={styles.InformationText}>Breeder</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiBreederString.checkedString}</Text>
                            }

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setBreeder("Breeder")
                                setBreederID("")
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Coach")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            {checkStateMultiCoach.checked.length === 0 ?
                                <Text style={styles.InformationText}>Coach</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiCoachString.checkedString}</Text>
                            }

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setCoachID("")
                                setCoach("Coach")
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 50 }]}
                        placeholder={"Min Starts"}
                        name={"MinStarts"}
                        value={getMinStartsCount}
                        onChangeText={setMinStartsCount}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"Max Starts"}
                        name={"MaxStarts"}
                        value={getMaxStartsCount}
                        onChangeText={setMaxStartsCount}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={"Min 1st Place"}
                        name={"Min1stPlace"}
                        value={getMinFirst}
                        onChangeText={setMinFirst}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"Max 1st Place"}
                        name={"Max1stPlace"}
                        value={getMaxFirst}
                        onChangeText={setMaxFirst}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={"Min 2nd Place"}
                        name={"Min2ndPlace"}
                        value={getMinSecond}
                        onChangeText={setMinSecond}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"Max 2nd Place"}
                        name={"Max2ndPlace"}
                        value={getMaxSecond}
                        onChangeText={setMaxSecond}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={"Min 3rd Place"}
                        name={"Min3rdPlace"}
                        value={getMinThird}
                        onChangeText={setMinThird}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"Max 3rd Place"}
                        name={"Max3rdPlace"}
                        value={getMaxThird}
                        onChangeText={setMaxThird}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={"Min 4th Place"}
                        name={"Min4thPlace"}
                        value={getMinFourth}
                        onChangeText={setMinFourth}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"Max 4th Place"}
                        name={"Max4thPlace"}
                        value={getMaxFourth}
                        onChangeText={setMaxFourth}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={"TJK ID"}
                        name={"TJKID"}
                        value={getReference1}
                        onChangeText={setReference1}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"TJK ID Sire/Mare ID"}
                        name={"TJKIDSire/Mare"}
                        value={getReference2}
                        onChangeText={setReference2}
                        keyboardType="numeric"
                    />
                    <View style={[styles.OneValueInLine, { marginTop: 50 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("RomanMiller")
                                BottomSheetSmall.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            {checkStateMultiRM.checked.length === 0 ?
                                <Text style={styles.InformationText}>Roman Miller</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiRM.checked}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="caret-down" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("ANZ")
                                BottomSheetSmall.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            {checkStateMultiANZ.checked.length === 0 ?
                                <Text style={styles.InformationText}>ANZ</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiANZ.checked}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="caret-down" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("PA")
                                BottomSheetSmall.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            {checkStateMultiPA.checked.length === 0 ?
                                <Text style={styles.InformationText}>PedigreeAll.com</Text>
                                :
                                <Text style={styles.InformationText}>{checkStateMultiPA.checked}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="caret-down" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.SearchButtonStyle}
                        onPress={() => {
                            setTime(true)
                            readHorseGetFilter();
                            BottomSheetFiltering.current.close()
                        }}>
                        <Text style={styles.SearchButtonText}>Search</Text>
                    </TouchableOpacity>
                </ScrollView>
            </RBSheet>

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
                        console.log(checkStateMultiSireName.checked)

                        let FatherIDString
                        if (checkStateMultiSireName.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiSireName.checked.length; i++) {
                                if (i === 0) {
                                    FatherIDString = checkStateMultiSireName.checked[0]
                                }
                                else {
                                    FatherIDString += "," + checkStateMultiSireName.checked[i]
                                }
                            }
                        }

                        setFatherID(FatherIDString);

                        let MotherIDString
                        if (checkStateMultiMareName.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiMareName.checked.length; i++) {
                                if (i === 0) {
                                    MotherIDString = checkStateMultiMareName.checked[0]
                                }
                                else {
                                    MotherIDString += "," + checkStateMultiMareName.checked[i]
                                }
                            }
                        }

                        setMotherID(MotherIDString);

                        let BMSireIDString
                        if (checkStateMultiBMSireName.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiBMSireName.checked.length; i++) {
                                if (i === 0) {
                                    BMSireIDString = checkStateMultiBMSireName.checked[0]
                                }
                                else {
                                    BMSireIDString += "," + checkStateMultiBMSireName.checked[i]
                                }
                            }
                        }

                        setMotherID(BMSireIDString);

                        let CountryString
                        if (checkStateMultiCountry.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiCountry.checked.length; i++) {
                                if (i === 0) {
                                    CountryString = checkStateMultiCountry.checked[0]
                                }
                                else {
                                    CountryString += "," + checkStateMultiCountry.checked[i]
                                }
                            }
                        }

                        console.log(CountryString)
                        setCountryID(CountryString);

                        let SexString
                        if (checkStateMultiSex.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiSex.checked.length; i++) {
                                if (i === 0) {
                                    SexString = checkStateMultiSex.checked[0]
                                }
                                else {
                                    SexString += "," + checkStateMultiSex.checked[i]
                                }
                            }
                        }

                        setSexID(SexString);

                        let ClassString
                        if (checkStateMultiClass.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiClass.checked.length; i++) {
                                if (i === 0) {
                                    ClassString = checkStateMultiClass.checked[0]
                                }
                                else {
                                    ClassString += "," + checkStateMultiClass.checked[i]
                                }
                            }
                        }

                        setWinnerTypeID(ClassString);

                        let OwnerString
                        if (checkStateMultiOwner.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiOwner.checked.length; i++) {
                                if (i === 0) {
                                    OwnerString = checkStateMultiOwner.checked[0]
                                }
                                else {
                                    OwnerString += "," + checkStateMultiOwner.checked[i]
                                }
                            }
                        }
                        setOwnerID(OwnerString);

                        let BreederString
                        if (checkStateMultiBreeder.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiBreeder.checked.length; i++) {
                                if (i === 0) {
                                    BreederString = checkStateMultiBreeder.checked[0]
                                }
                                else {
                                    BreederString += "," + checkStateMultiBreeder.checked[i]
                                }
                            }
                        }
                        setBreederID(BreederString);

                        let CoachString
                        if (checkStateMultiCoach.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiCoach.checked.length; i++) {
                                if (i === 0) {
                                    CoachString = checkStateMultiCoach.checked[0]
                                }
                                else {
                                    CoachString += "," + checkStateMultiCoach.checked[i]
                                }
                            }
                        }
                        setBreederID(CoachString);

                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

                    {getBottomSheetText === "SireName" &&

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
                                    SetisLoading(true);
                                    readHorseGetByName();
                                }}
                                showLoading={true}
                            />

                            {isLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getHorseList.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            pressSireName(item)
                                            if (item.HORSE_ID !== undefined) {
                                                //setFatherID(item.HORSE_ID);
                                                //setSireName(item.HORSE_NAME)
                                            }
                                            //BottomSheetLong.current.close();
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
                                )
                                )}
                            </ScrollView>
                        </>

                        || getBottomSheetText === "MareName" &&

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
                                    SetisLoading(true);
                                    readHorseGetByName();
                                }}
                                showLoading={true}
                            />

                            {isLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getHorseList.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            pressMareName(item)
                                        }}
                                    >
                                        <ListItem.CheckBox
                                            checked={checkStateMultiMareName.checked.includes(item.HORSE_ID)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='#2169ab'
                                            uncheckedColor='rgb(232, 237, 241)'
                                            onPress={() => {
                                                pressMareName(item)
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
                                )
                                )}
                            </ScrollView>
                        </>

                        || getBottomSheetText === "BMSireName" &&
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
                                    SetisLoading(true);
                                    readHorseGetByName();
                                }}
                                showLoading={true}
                            />

                            {isLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getHorseList.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            pressBMSireName(item)
                                        }}
                                    >
                                        <ListItem.CheckBox
                                            checked={checkStateMultiBMSireName.checked.includes(item.HORSE_ID)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='#2169ab'
                                            uncheckedColor='rgb(232, 237, 241)'
                                            onPress={() => {
                                                pressBMSireName(item)
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
                                )
                                )}
                            </ScrollView>
                        </>

                        || getBottomSheetText === "Country" &&

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
                                    SetisLoading(true);
                                    readGetCountry();
                                }}
                                showLoading={true}
                            />

                            {isLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getCountryData.filter((x) => x.COUNTRY_EN.includes(searchValue)).map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            pressCountry(item)
                                        }}
                                    >
                                        <ListItem.CheckBox
                                            checked={checkStateMultiCountry.checked.includes(item.COUNTRY_ID)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='#2169ab'
                                            uncheckedColor='rgb(232, 237, 241)'
                                            onPress={() => {
                                                pressCountry(item)
                                            }} />

                                        <Flag code={item.ICON.toUpperCase()} size={24} />
                                        <ListItem.Content>
                                            <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                                )
                                )}
                            </ScrollView>
                        </>

                        || getBottomSheetText === "Sex" &&

                        <>
                            {isLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getSexData.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            pressSex(item)
                                        }}
                                    >
                                        <ListItem.CheckBox
                                            checked={checkStateMultiSex.checked.includes(item.SEX_ID)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='#2169ab'
                                            uncheckedColor='rgb(232, 237, 241)'
                                            onPress={() => {
                                                pressSex(item)
                                            }} />
                                        <ListItem.Content>
                                            <ListItem.Title>{item.SEX_EN}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                                )
                                )}
                            </ScrollView>
                        </>

                        || getBottomSheetText === "Class" &&

                        <>
                            {isLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
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
                                            checked={checkStateMultiClass.checked.includes(item.WINNER_TYPE_ID)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='#2169ab'
                                            uncheckedColor='rgb(232, 237, 241)'
                                            onPress={() => {
                                                pressClass(item)
                                            }} />
                                        <ListItem.Content>
                                            <ListItem.Title>{item.WINNER_TYPE_EN}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                                )
                                )}
                            </ScrollView>
                        </>

                        || getBottomSheetText === "Owner" &&

                        <>
                            <SearchBar
                                placeholder={getOwnerBreederName}
                                lightTheme
                                platform="ios"
                                cancelButtonTitle=""
                                inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                containerStyle={{ backgroundColor: 'transparent', }}
                                inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                                rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                value={getOwnerBreederName}
                                onChangeText={setOwnerBreederName}
                                onSubmitEditing={() => {
                                    SetisLoading(true);
                                    readGetOwnerBreeder();
                                }}
                                showLoading={true}
                            />

                            {isLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getOwnerBreederData.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            pressOwner(item)
                                        }}
                                    >
                                        <ListItem.CheckBox
                                            checked={checkStateMultiOwner.checked.includes(item.ID)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='#2169ab'
                                            uncheckedColor='rgb(232, 237, 241)'
                                            onPress={() => {
                                                pressOwner(item)
                                            }} />

                                        <ListItem.Content>
                                            <ListItem.Title>{item.NAME}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                                )
                                )}
                            </ScrollView>
                        </>

                        || getBottomSheetText === "Breeder" &&

                        <>
                            <SearchBar
                                placeholder={getOwnerBreederName}
                                lightTheme
                                platform="ios"
                                cancelButtonTitle=""
                                inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                containerStyle={{ backgroundColor: 'transparent', }}
                                inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                                rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                value={getOwnerBreederName}
                                onChangeText={setOwnerBreederName}
                                onSubmitEditing={() => {
                                    SetisLoading(true);
                                    readGetOwnerBreeder();
                                }}
                                showLoading={true}
                            />

                            {isLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getOwnerBreederData.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            pressBreeder(item)
                                        }}
                                    >
                                        <ListItem.CheckBox
                                            checked={checkStateMultiBreeder.checked.includes(item.ID)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='#2169ab'
                                            uncheckedColor='rgb(232, 237, 241)'
                                            onPress={() => {
                                                pressBreeder(item)
                                            }} />

                                        <ListItem.Content>
                                            <ListItem.Title>{item.NAME}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                                )
                                )}
                            </ScrollView>
                        </>

                        || getBottomSheetText === "Coach" &&

                        <>
                            <SearchBar
                                placeholder={getOwnerBreederName}
                                lightTheme
                                platform="ios"
                                cancelButtonTitle=""
                                inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                containerStyle={{ backgroundColor: 'transparent', }}
                                inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                                rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                value={getOwnerBreederName}
                                onChangeText={setOwnerBreederName}
                                onSubmitEditing={() => {
                                    SetisLoading(true);
                                    readGetOwnerBreeder();
                                }}
                                showLoading={true}
                            />

                            {isLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getOwnerBreederData.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            pressCoach(item)
                                        }}
                                    >
                                        <ListItem.CheckBox
                                            checked={checkStateMultiCoach.checked.includes(item.ID)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='#2169ab'
                                            uncheckedColor='rgb(232, 237, 241)'
                                            onPress={() => {
                                                pressCoach(item)
                                            }} />

                                        <ListItem.Content>
                                            <ListItem.Title>{item.NAME}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                                )
                                )}
                            </ScrollView>
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
                        BottomSheetSmall.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

                    {getBottomSheetText === "Confirmation" &&

                        <>
                            {ConfirmationData.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={() => {
                                        setState({ checked: [state, item.id] });
                                        setChekedItem(item.id)
                                        BottomSheetSmall.current.close();
                                        setConfirmation(item.title)
                                        if (item.title === "All") {
                                            setConfirm("");
                                        }
                                        else if (item.title === "Approved") {
                                            setConfirm("1")
                                        }
                                        else if (item.title === "Unapproved") {
                                            setConfirm("0")
                                        }

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
                                            setConfirmation(item.title)
                                            setConfirm(item.title);
                                        }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>

                                </ListItem>
                            ))}
                        </>

                        || getBottomSheetText === "Dead" &&

                        <>
                            {DeadData.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={() => {
                                        setStateDead({ checked: [state, item.id] });
                                        setChekedItem(item.id)
                                        setDead(item.title)
                                        if (item.title === "All") {
                                            setIsDead("");
                                        }
                                        else if (item.title === "Alive") {
                                            setIsDead("1")
                                        }
                                        else if (item.title === "Dead") {
                                            setIsDead("0")
                                        }
                                        BottomSheetSmall.current.close();
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
                                            setStateDead({ checked: [state, item.id] });
                                            setChekedItem(item.id)
                                            setDead(item.title)
                                        }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>

                                </ListItem>
                            ))}
                        </>

                        || getBottomSheetText === "RomanMiller" &&

                        <>
                            {RomanMillerData.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={() => {
                                        pressRM(item)

                                    }}
                                >
                                    <ListItem.CheckBox
                                        checked={checkStateMultiRM.checked.includes(item.title)}
                                        checkedIcon='circle'
                                        uncheckedIcon='circle'
                                        center={true}
                                        checkedColor='#2169ab'
                                        uncheckedColor='rgb(232, 237, 241)'
                                        onPress={() => {
                                            pressRM(item)
                                        }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>

                                </ListItem>
                            ))}
                        </>

                        || getBottomSheetText === "ANZ" &&

                        <>
                            {RomanMillerData.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={() => {
                                        pressANZ(item)

                                    }}
                                >
                                    <ListItem.CheckBox
                                        checked={checkStateMultiANZ.checked.includes(item.title)}
                                        checkedIcon='circle'
                                        uncheckedIcon='circle'
                                        center={true}
                                        checkedColor='#2169ab'
                                        uncheckedColor='rgb(232, 237, 241)'
                                        onPress={() => {
                                            pressANZ(item)
                                        }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>

                                </ListItem>
                            ))}
                        </>

                        || getBottomSheetText === "PA" &&

                        <>
                            {RomanMillerData.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={() => {
                                        pressPA(item)

                                    }}
                                >
                                    <ListItem.CheckBox
                                        checked={checkStateMultiPA.checked.includes(item.title)}
                                        checkedIcon='circle'
                                        uncheckedIcon='circle'
                                        center={true}
                                        checkedColor='#2169ab'
                                        uncheckedColor='rgb(232, 237, 241)'
                                        onPress={() => {
                                            pressPA(item)
                                        }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>

                                </ListItem>
                            ))}
                        </>
                        || getBottomSheetText === "SortType" &&

                        <>
                            {getSortTypeData !== undefined &&

                                <ScrollView>
                                    {getSortTypeData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            onPress={() => {
                                                BottomSheetSmall.current.close()
                                                setSortTypeString(item.SORT_TYPE_EN)
                                                setTime(true)
                                                readHorseGetFilter(item.SORT_TYPE_ID);
                                            }}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.SORT_TYPE_EN}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))}
                                </ScrollView>

                            }
                        </>
                    }

                </View>
            </RBSheet>

            <TouchableOpacity
                style={styles.FilteringContainer}
                onPress={() => {
                    BottomSheetFiltering.current.open();
                }}>
                <Icon name="filter" size={16} color="#fff" style={{ justifyContent: 'center' }} />
            </TouchableOpacity>

            {time ?
                <ActivityIndicator size="large" color="#000" />
                :
                <ScrollView style={{ marginBottom: 10 }}>
                    {getSortTypeData !== undefined &&

                        <View style={styles.SortTypeContainer}>
                            <TouchableOpacity
                                style={styles.SortTypeButton}
                                onPress={() => {
                                    setBottomSheetText("SortType")
                                    BottomSheetSmall.current.open();
                                }}>
                                <Icon name="caret-down" size={16} color="#fff" style={{ alignSelf: 'center', marginRight: 5 }} />
                                <Text style={styles.SortTypeButtonText}>{getSortTypeString}</Text>
                            </TouchableOpacity>
                        </View>

                    }

                    {getHorseGetFilter !== undefined &&
                        <>
                            {getHorseGetFilter.length === 0 ?
                                <View style={styles.ErrorMessageContainer}>
                                <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                                <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                <Text style={styles.ErrorMessageText}>You can search again.</Text>
                                <View style={styles.ErrorMessageButtonContainer}>
                                </View>
                              </View>
                                :
                                <View>
                                    {getHorseGetFilter.map((item, index) => (
                                        <View key={index}>

                                            <Card>
                                                <View style={styles.CardHeaderContainer}>
                                                    <Flag code={item.ICON.toUpperCase()} size={24} />
                                                    <Text style={styles.LatestCardTitle}>{item.HORSE_NAME}</Text>
                                                </View>

                                                <Card.Divider></Card.Divider>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={styles.LatestCardItemTitle}>Sire</Text>
                                                        <View style={{ flexDirection: 'row', marginLeft: 40 }}>
                                                            <Flag code={item.ICON.toUpperCase()} size={24} />
                                                            <Text style={styles.CardItemText}>{item.FATHER_NAME}</Text>
                                                        </View>
                                                    </View>

                                                </View>


                                                <Card.Divider></Card.Divider>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                    <View style={styles.LatestViewItem}>
                                                        <Text style={styles.LatestCardItemTitle}>Dam</Text>
                                                        <View style={{ flexDirection: 'row', marginLeft: 35 }}>
                                                            <Flag code={item.ICON.toUpperCase()} size={24} />
                                                            <Text style={styles.CardItemText}>{item.MOTHER_NAME}</Text>
                                                        </View>
                                                    </View>


                                                </View>

                                                <Card.Divider></Card.Divider>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                    <View style={styles.LatestViewItem}>
                                                        <Text style={styles.LatestCardItemTitle}>BM Sire</Text>
                                                        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                                                            <Flag code='UNK' size={24} />
                                                            <Text style={styles.CardItemText}>{item.BM_SIRE_NAME}</Text>
                                                        </View>
                                                    </View>


                                                </View>



                                                <Card.Divider></Card.Divider>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.LatestCardItemTitle}>Records</Text>
                                                        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                                                            <Text>{item.START_COUNT} - {item.FIRST} - {item.SECOND} - {item.THIRD} - {item.FOURTH}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={styles.LatestCardItemTitle}>Sex</Text>
                                                        <Text style={{ marginLeft: 50 }}>{item.SEX_OBJECT.SEX_EN}</Text>
                                                    </View>
                                                </View>



                                                <Card.Divider></Card.Divider>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.LatestCardItemTitle}>Earning</Text>
                                                        <Text style={{ marginLeft: 17 }}>{moneyFormat(item.EARN)} {item.EARN_ICON}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={styles.LatestCardItemTitle}>Class</Text>
                                                        <Text style={{ marginLeft: 50 }}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</Text>
                                                    </View>

                                                </View>

                                                <Card.Divider></Card.Divider>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                    <View style={styles.LatestViewItem}>
                                                        <Text style={styles.LatestCardItemTitle}>Point</Text>
                                                        <Text style={{ marginLeft: 35 }}>{item.POINT.toFixed()}</Text>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity
                                                            style={styles.InformationHorseButton}
                                                            onPress={() => {
                                                                Global.Horse_ID = item.HORSE_ID,
                                                                    Global.Generation = 5,
                                                                    navigation.navigate('HorseDetail', {
                                                                        HorseData: item,
                                                                        Generation: 5
                                                                    });
                                                            }}
                                                        >
                                                            <Icon name="arrow-circle-right" size={16} color="white" />
                                                        </TouchableOpacity>
                                                    </View>


                                                </View>



                                            </Card>

                                        </View>

                                    ))

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

function moneyFormat(price) {
    const pieces = parseFloat(price).toFixed(2).split('')
    let ii = pieces.length - 3
    while ((ii -= 3) > 0) {
        pieces.splice(ii, 0, ',')
    }
    return pieces.join('')
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
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
        fontWeight: '700'
    },
    CardHeaderContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20
    },
    CardItemText: {
        marginLeft: 10
    },
    InformationHorseButton: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#2169ab',
        borderRadius: 6
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
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },
    SearchButtonStyle: {
        width: '80%',
        padding: 15,
        marginVertical: 20,
        borderColor: '#2e3f6e',
        borderRadius: 8,
        elevation: 8,
        shadowColor: 'silver',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        backgroundColor: "#2169ab",
        alignSelf: 'center'

    },
    SearchButtonText: {
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 16,
        color: "#fff",
        fontWeight: '500'
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
    TwoInformationInLineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TwoValueInLineButton: {
        width: '47%',
        flexDirection: 'row',
        marginVertical: 8,
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        alignItems: 'center'
    },
    InformationText: {
        fontSize: 16,
        marginLeft: 10
    },
    BottomSheetContainer: {
        padding: 20
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
    InformationText: {
        fontSize: 16,
        marginLeft: 10
    },
    InputTouchableContainer: {
        width: '95%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    HalfInputStyle: {
        width: '90%',
        paddingLeft: 20,
        fontSize: 16,
        margin: 0,
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
        fontWeight: 'bold'
    },
    TextInputLineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'silver',
        padding: 5,
        borderRadius: 8,
        marginVertical: 5
    },
    SortTypeContainer: {
        width: '100%',
        padding: 10,
        paddingRight: 15,
        alignItems: 'flex-end'
    },
    SortTypeButton: {
        flexDirection: 'row',
        backgroundColor: '#2169ab',
        padding: 10,
        borderRadius: 6,
        elevation: 10,
        width: '37%'
    },
    SortTypeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
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