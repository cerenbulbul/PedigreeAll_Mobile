import React from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    Dimensions,
    TextInput,
    Linking,
    Image,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SearchBar, Card, CheckBox, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { Global } from '../Global';
import RBSheet from "react-native-raw-bottom-sheet";
import { timing } from 'react-native-reanimated';

const ConfirmationData = [
    {
        id: "1",
        titleEnglish: "All",
        titleTurkish: "Hepsi"
    },
    {
        id: "2",
        titleEnglish: "Approved",
        titleTurkish: "Onaylı"
    },
    {
        id: "3",
        titleEnglish: "Unapproved",
        titleTurkish: "Onaysız"
    },
]

const DeadData = [
    {
        id: "1",
        titleEnglish: "All",
        titleTurkish: "Hepsi"
    },
    {
        id: "2",
        titleEnglish: "Dead",
        titleTurkish: "Ölü"
    },
    {
        id: "3",
        titleEnglish: "Alive",
        titleTurkish: "Sağ"
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

export function ThoroughbredStallionsSearchScreen({ navigation }) {

    const BottomSheetSmall = React.useRef();
    const BottomSheetFiltering = React.useRef();
    const BottomSheetLong = React.useRef();

    const [isDetail, setIsDetail] = React.useState(false);

    const [getBottomSheetText, setBottomSheetText] = React.useState();
    const [searchValue, setSearchValue] = React.useState()
    const [isLoading, SetisLoading] = React.useState(true);
    const [state, setState] = React.useState({ checked: [] });
    const [stateDead, setStateDead] = React.useState({ checked: [] });
    const [chekedItem, setChekedItem] = React.useState("")


    const [getHorseList, setHorseList] = React.useState();
    const [getBool, setBool] = React.useState();
    const [getCountryData, setCountryData] = React.useState();
    const [getSexData, setSexData] = React.useState();
    const [getClassData, setClassData] = React.useState();
    const [getOwnerBreederData, setOwnerBreederData] = React.useState();
    const [getPlaceData, setPlaceData] = React.useState()
    const [getRegistrationData, setRegistrationData] = React.useState()
    const [getHorseGetFilter, setHorseGetFilter] = React.useState()
    const [getSortTypeData, setSortTypeData] = React.useState()
    const [getYearData, setYearData] = React.useState()
    const [getOwnerBreederName, setOwnerBreederName] = React.useState()

    const [getConfirmation, setConfirmation] = React.useState("Confirmation")
    const [getDead, setDead] = React.useState("All");
    const [getPlace, setPlace] = React.useState("Place");

    const [getSortTypeString, setSortTypeString] = React.useState("Recently Added")
    const [getYearString, setYearString] = React.useState(2021)

    const [getSortTypeIDGlobal, setSortTypeIDGlobal] = React.useState(1)
    const [getYearIDGlobal, setYearIDGlobal] = React.useState("7")

    const [getTime, setTime] = React.useState(true);

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

    const [checkStateMultiPlace, setcheckStateMultiPlace] = React.useState({ checked: [] });
    const [checkStateMultiPlaceString, setcheckStateMultiPlaceString] = React.useState({ checkedString: [] });
    const [checkStateMultiRegistration, setcheckStateMultiRegistration] = React.useState({ checked: [] });
    const [checkStateMultiRegistrationString, setcheckStateMultiRegistrationString] = React.useState({ checkedString: [] });

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

    const [getMinEarningAsFoal, setMinEarningAsFoal] = React.useState()
    const [getMaxEarningAsFoal, setMaxEarningAsFoal] = React.useState()
    const [getMinStartsAsFoal, setMinStartAsFoal] = React.useState()
    const [getMaxStartsAsFoal, setMaxStartsAsFoal] = React.useState()
    const [getMinFirstAsFoal, setMinFirstAsFoal] = React.useState();
    const [getMaxFirstAsFoal, setMaxFirstAsFoal] = React.useState()
    const [getMinSecondAsFoal, setMinSecondAsFoal] = React.useState()
    const [getMaxSecondAsFoal, setMaxSecondAsFoal] = React.useState()
    const [getMinThirdAsFoal, setMinThirdAsFoal] = React.useState()
    const [getMaxThirdAsFoal, setMaxThirdAsFoal] = React.useState()
    const [getMinFourthAsFoal, setMinFourthAsFoal] = React.useState()
    const [getMaxFourthAsFoal, setMaxFourthAsFoal] = React.useState()
    const [getMinBWinnerFoal, setMinBWinnerFoal] = React.useState()
    const [getMaxBWinnerFoal, setMaxBWinnerFoal] = React.useState()
    const [getMinGWinnerFoal, setMinGWinnerFoal] = React.useState()
    const [getMaxGWinnerFoal, setMaxGWinnerFoal] = React.useState()
    const [getMinWinnerFoal, setMinWinnerFoal] = React.useState()
    const [getMaxWinnerFoal, setMaxWinnerFoal] = React.useState()
    const [getMinRaceFoal, setMinRaceFoal] = React.useState()
    const [getMaxRaceFoal, setMaxRaceFoal] = React.useState()
    const [getMinFoal, setMinFoal] = React.useState()
    const [getMaxFoal, setMaxFoal] = React.useState()
    const [getPlaceID, setPlaceID] = React.useState("");
    const [getRegistrationTypeID, setRegistrationTypeID] = React.useState("")

    const pressPlace = item => {   // The onPress method
        const { checked } = checkStateMultiPlace;
        const { checkedString } = checkStateMultiPlaceString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.ID)) {
            setcheckStateMultiPlace({ checked: [...checked, item.ID] });
            setcheckStateMultiPlaceString({ checkedString: [...checkedString, item.NAME] })
        } else {
            setcheckStateMultiPlace({ checked: checked.filter(a => a !== item.ID) });
            setcheckStateMultiPlaceString({ checkedString: checkedString.filter(a => a !== item.NAME) });
        }
    }

    const pressRegistration = item => {   // The onPress method
        const { checked } = checkStateMultiRegistration;
        const { checkedString } = checkStateMultiRegistrationString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.REGISTRATION_ID)) {
            setcheckStateMultiRegistration({ checked: [...checked, item.REGISTRATION_ID] });
            if (Global.Language === 1) {
                setcheckStateMultiRegistrationString({ checkedString: [...checkedString, item.REGISTRATION_TR] })
            }
            else {
                setcheckStateMultiRegistrationString({ checkedString: [...checkedString, item.REGISTRATION_EN] })
            }
        } else {
            setcheckStateMultiRegistration({ checked: checked.filter(a => a !== item.REGISTRATION_ID) });
            if (Global.Language === 1) {
                setcheckStateMultiRegistrationString({ checkedString: checkedString.filter(a => a !== item.REGISTRATION_TR) });
            }
            else {
                setcheckStateMultiRegistrationString({ checkedString: checkedString.filter(a => a !== item.REGISTRATION_EN) });
            }

        }
    }

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
            if (Global.Language === 1) {
                setcheckStateMultiCountryString({ checkedString: [...checkedString, item.COUNTRY_TR] })
            }
            else {
                setcheckStateMultiCountryString({ checkedString: [...checkedString, item.COUNTRY_EN] })
            }

        } else {
            setcheckStateMultiCountry({ checked: checked.filter(a => a !== item.COUNTRY_ID) });
            if (Global.Language === 1) {
                setcheckStateMultiCountryString({ checkedString: checkedString.filter(a => a !== item.COUNTRY_TR) });
            }
            else {
                setcheckStateMultiCountryString({ checkedString: checkedString.filter(a => a !== item.COUNTRY_EN) });
            }

        }
    }

    const pressSex = item => {   // The onPress method
        const { checked } = checkStateMultiSex;
        const { checkedString } = checkStateMultiSexString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.SEX_ID)) {
            setcheckStateMultiSex({ checked: [...checked, item.SEX_ID] });
            if (Global.Language === 1) {
                setcheckStateMultiSexString({ checkedString: [...checkedString, item.SEX_TR] })
            }
            else {
                setcheckStateMultiSexString({ checkedString: [...checkedString, item.SEX_EN] })
            }

        } else {
            setcheckStateMultiSex({ checked: checked.filter(a => a !== item.SEX_ID) });
            if (Global.Language === 1) {
                setcheckStateMultiSexString({ checkedString: checkedString.filter(a => a !== item.SEX_TR) });
            }
            else {
                setcheckStateMultiSexString({ checkedString: checkedString.filter(a => a !== item.SEX_EN) });
            }

        }
    }

    const pressClass = item => {   // The onPress method
        const { checked } = checkStateMultiClass;
        const { checkedString } = checkStateMultiClassString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.WINNER_TYPE_ID)) {
            setcheckStateMultiClass({ checked: [...checked, item.WINNER_TYPE_ID] });
            if (Global.Language === 1) {
                setcheckStateMultiClassString({ checkedString: [...checkedString, item.WINNER_TYPE_TR] })
            }
            else {
                setcheckStateMultiClassString({ checkedString: [...checkedString, item.WINNER_TYPE_EN] })
            }

        } else {
            setcheckStateMultiClass({ checked: checked.filter(a => a !== item.WINNER_TYPE_ID) });
            if (Global.Language === 1) {
                setcheckStateMultiClassString({ checkedString: checkedString.filter(a => a !== item.WINNER_TYPE_TR) });
            }
            else {
                setcheckStateMultiClassString({ checkedString: checkedString.filter(a => a !== item.WINNER_TYPE_EN) });
            }

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

    const readHorseGetFilter = async (getSortTypeID, getYearID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/StallionPage/GetFilter', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "MIN_EARNING_AS_FOAL": getMinEarningAsFoal,
                        "MAX_EARNING_AS_FOAL": getMaxEarningAsFoal,
                        "MIN_STARTS_AS_FOAL": getMinStartsAsFoal,
                        "MAX_STARTS_AS_FOAL": getMaxStartsAsFoal,
                        "MIN_FIRST_AS_FOAL": getMinFirstAsFoal,
                        "MAX_FIRST_AS_FOAL": getMaxFirstAsFoal,
                        "MIN_SECOND_AS_FOAL": getMinSecondAsFoal,
                        "MAX_SECOND_AS_FOAL": getMaxSecondAsFoal,
                        "MIN_THIRD_AS_FOAL": getMinThirdAsFoal,
                        "MAX_THIRD_AS_FOAL": getMaxThirdAsFoal,
                        "MIN_FOURTH_AS_FOAL": getMinFourthAsFoal,
                        "MAX_FOURTH_AS_FOAL": getMaxFourthAsFoal,
                        "MIN_B_WINNER_FOAL": getMinBWinnerFoal,
                        "MAX_B_WINNER_FOAL": getMaxBWinnerFoal,
                        "MIN_G_WINNER_FOAL": getMinGWinnerFoal,
                        "MAX_G_WINNER_FOAL": getMaxGWinnerFoal,
                        "MIN_WINNER_FOAL": getMinWinnerFoal,
                        "MAX_WINNER_FOAL": getMaxWinnerFoal,
                        "MIN_RACE_FOAL": getMinRaceFoal,
                        "MAX_RACE_FOAL": getMaxRaceFoal,
                        "MIN_FOAL": getMinFoal,
                        "MAX_FOAL": getMaxFoal,
                        "REGISTRATION_TYPE_ID": getRegistrationTypeID,
                        "PLACE_ID": getPlaceID,
                        "YEAR_ID": getYearID,
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
                        "PAGE_COUNT": 15,
                        "RACE_ID": 1
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
                        setYearData(json.m_cData);
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
                        NAME: searchValue,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseList(json.m_cData)
                        SetisLoading(false)
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
                        SetisLoading(false)
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
                        SetisLoading(false)
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
                        SetisLoading(false)
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
                        SetisLoading(false)
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
                        SetisLoading(false)
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
                        setPlaceData(json.m_cData);
                        SetisLoading(false)
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
                        setRegistrationData(json.m_cData);
                        SetisLoading(false)
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

    const [getMinFoalPlaceholder, setMinFoalPlaceholder] = React.useState("")
    const [getMaxFoalPlaceholder, setMaxFoalPlaceholder] = React.useState("")
    const [getMinRaceFoalPlaceholder, setMinRaceFoalPlaceholder] = React.useState("")
    const [getMaxRaceFoalPlaceholder, setMaxRaceFoalPlaceholder] = React.useState("")
    const [getMinWinnerFoalPlaceholder, setMinWinnerFoalPlaceholder] = React.useState("")
    const [getMaxWinnerFoalPlaceholder, setMaxWinnerFoalPlaceholder] = React.useState("")
    const [getMinGroupRaceWinnerFoalPlaceholder, setMinGroupRaceWinnerFoalPlaceholder] = React.useState("")
    const [getMaxGroupRaceWinnerFoalPlaceholder, setMaxGroupRaceWinnerFoalPlaceholder] = React.useState("")
    const [getMinBlackTypeFoalPlaceholder, setMinBlackTypeFoalPlaceholder] = React.useState("")
    const [getMaxBlackTypeFoalPlaceholder, setMaxBlackTypeFoalPlaceholder] = React.useState("")
    const [getMinEarningPlaceholder, setMinEarningPlaceholder] = React.useState("")
    const [getMaxEarningPlaceholder, setMaxEarningPlaceholder] = React.useState("")
    const [getMinStartsPlaceholder, setMinStartsPlaceholder] = React.useState("")
    const [getMaxStartsPlaceholder, setMaxStartsPlaceholder] = React.useState("")
    const [getMinFirstPlacePlaceholder, setMinFirstPlacePlaceholder] = React.useState("")
    const [getMaxFirstPlacePlaceholder, setMaxFirstPlacePlaceholder] = React.useState("")
    const [getMinSecondPlacePlaceholder, setMinSecondPlacePlaceholder] = React.useState("")
    const [getMaxSecondPlacePlaceholder, setMaxSecondPlacePlaceholder] = React.useState("")
    const [getMinThirdPlacePlaceholder, setMinThirdPlacePlaceholder] = React.useState("")
    const [getMaxThirdPlacePlaceholder, setMaxThirdPlacePlaceholder] = React.useState("")
    const [getMinFourthPlacePlaceholder, setMinFourthPlacePlaceholder] = React.useState("")
    const [getMaxFourthPlacePlaceholder, setMaxFourthPlacePlaceholder] = React.useState("")
    const [getTJKSireMarePlaceholder, setTJKSireMarePlaceholder] = React.useState("")
    const [getHorseNamePlaceholder, setHorseNamePlaceholder] = React.useState("");
    const [getMinPricePlaceholder, setMinPricePlaceholder] = React.useState("")
    const [getMaxPricePlaceholder, setMaxPricePlaceholder] = React.useState("")
    const [getStartBDatePlaceholder, setStartBDatePlaceholder] = React.useState("")
    const [getEndBDatePlaceholder, setEndBDatePlaceholder] = React.useState("")

    React.useEffect(() => {
        readGetSortType();
        readGetYear()
        readHorseGetFilter(getSortTypeIDGlobal, getYearIDGlobal);
        readHorseGetByName()
        readGetBool()
        readGetCountry()
        readGetSex()
        readGetWinnerType()
        readGetOwnerBreeder()
        readGetPlace()
        readGetRegistration();

        if (Global.Language === 1) {
            setSortTypeString("Son Eklenenler")
            setConfirmation("Onay")
            setDead("Ölü")

            setHorseNamePlaceholder("Isim")
            setMinFoalPlaceholder("Min Tay")
            setMaxFoalPlaceholder("Max Tay")
            setMinRaceFoalPlaceholder("Min Yarışan Tay")
            setMaxRaceFoalPlaceholder("Max Yarışan Tay")
            setMinWinnerFoalPlaceholder("Min Kazanan Tay")
            setMaxWinnerFoalPlaceholder("Max Kazanan Tay")
            setMinGroupRaceWinnerFoalPlaceholder("Min Grup Yarış Kazanan Tay")
            setMaxGroupRaceWinnerFoalPlaceholder("Max Grup Yarış Kazanan Tay")
            setMinBlackTypeFoalPlaceholder("Min Black Type Tay")
            setMaxBlackTypeFoalPlaceholder("Max Black Type Tay")
            setMinEarningPlaceholder("Min Kazanç")
            setMaxEarningPlaceholder("Max Kazanç")
            setMinStartsPlaceholder("Min Toplam Yarış Sayısı")
            setMaxStartsPlaceholder("Max Toplam Yarış Sayısı")
            setMinFirstPlacePlaceholder("Min 1'incilik")
            setMaxFirstPlacePlaceholder("Max 1'incilik")
            setMinSecondPlacePlaceholder("Min 2'ncilik")
            setMaxSecondPlacePlaceholder("Max 2'ncilik")
            setMinThirdPlacePlaceholder("Min 3'üncülük")
            setMaxThirdPlacePlaceholder("Max 3'üncülük")
            setMinFourthPlacePlaceholder("Min 4'üncülük")
            setMaxFourthPlacePlaceholder("Max 4'üncülük")
            setTJKSireMarePlaceholder("TJK ID Aygır/Kısrak")
            setMinPricePlaceholder("Min Fiyat")
            setMaxPricePlaceholder("Max Fiyat")
            setStartBDatePlaceholder("Başlangıç Doğum Tarihi")
            setEndBDatePlaceholder("Bitiş Doğum Tarihi")


        }
        else {
            setSortTypeString("Recently Added")
            setConfirmation("Confimation")
            setDead("Dead")

            setHorseNamePlaceholder("Name")
            setMinFoalPlaceholder("Min Foal")
            setMaxFoalPlaceholder("Max Foal")
            setMinRaceFoalPlaceholder("Min Race Foal")
            setMaxRaceFoalPlaceholder("Max Race Foal")
            setMinWinnerFoalPlaceholder("Min Winner Foal")
            setMaxWinnerFoalPlaceholder("Max Winner Foal")
            setMinGroupRaceWinnerFoalPlaceholder("Min Group Winner Foal")
            setMaxGroupRaceWinnerFoalPlaceholder("Max Group Winner Foal")
            setMinBlackTypeFoalPlaceholder("Min Black Type Foal")
            setMaxBlackTypeFoalPlaceholder("Max Black Type Foal")
            setMinEarningPlaceholder("Min Earning")
            setMaxEarningPlaceholder("Max Earning")
            setMinStartsPlaceholder("Min Start Count")
            setMaxStartsPlaceholder("Max Start Count")
            setMinFirstPlacePlaceholder("Min 1st place")
            setMaxFirstPlacePlaceholder("Max 1st place")
            setMinSecondPlacePlaceholder("Min 2nd place")
            setMaxSecondPlacePlaceholder("Max 2nd place")
            setMinThirdPlacePlaceholder("Min 3rd place")
            setMaxThirdPlacePlaceholder("Max 3rd place")
            setMinFourthPlacePlaceholder("Min 4th place")
            setMaxFourthPlacePlaceholder("Max 4th place")
            setTJKSireMarePlaceholder("TJK ID Sire/Mare")
            setMinPricePlaceholder("Min Price")
            setMaxPricePlaceholder("Max Price")
            setStartBDatePlaceholder("Start Birth Date")
            setEndBDatePlaceholder("End Birth Date")
        }

    }, [])

    return (
        <View style={styles.Container}>
            <RBSheet
                ref={BottomSheetFiltering}
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
                    onPress={() => { BottomSheetFiltering.current.close() }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <ScrollView style={styles.BottomSheetContainer}>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Place")
                                BottomSheetSmall.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="map-marker-alt" size={20} color="#2169ab" />
                            {checkStateMultiPlaceString.checkedString.length === 0 ?
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.InformationText}>Yer</Text>
                                        :
                                        <Text style={styles.InformationText}>Place</Text>
                                    }
                                </>

                                :
                                <Text style={styles.InformationText}>{checkStateMultiPlaceString.checkedString}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setPlaceID("");
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("RegistirationType")
                                BottomSheetSmall.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="registered" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                            {checkStateMultiRegistrationString.checkedString.length === 0 ?
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.InformationText}>Kayıt Tipi</Text>
                                        :
                                        <Text style={styles.InformationText}>Registiration Type</Text>
                                    }
                                </>

                                :
                                <Text style={styles.InformationText}>{checkStateMultiRegistrationString.checkedString}</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                //setPlaceID("");
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 50 }]}
                        placeholder={getMinFoalPlaceholder}
                        name={"MinFoal"}
                        value={getMinFoal}
                        onChangeText={setMinFoal}
                        keyboardType={"numeric"}
                    />
                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxFoalPlaceholder}
                        name={"MaxFoal"}
                        value={getMaxFoal}
                        onChangeText={setMaxFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinRaceFoalPlaceholder}
                        name={"MinRaceFoal"}
                        value={getMinRaceFoal}
                        onChangeText={setMinRaceFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxRaceFoalPlaceholder}
                        name={"MaxRaceFoal"}
                        value={getMaxRaceFoal}
                        onChangeText={setMaxRaceFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinWinnerFoalPlaceholder}
                        name={"MinWinnerFoal"}
                        value={getMinWinnerFoal}
                        onChangeText={setMinWinnerFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxWinnerFoalPlaceholder}
                        name={"MaxWinnerFoal"}
                        value={getMaxWinnerFoal}
                        onChangeText={setMaxWinnerFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinGroupRaceWinnerFoalPlaceholder}
                        name={"MinGroupRaceWinnerFoal"}
                        value={getMinGWinnerFoal}
                        onChangeText={setMinGWinnerFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxGroupRaceWinnerFoalPlaceholder}
                        name={"MaxGroupRaceWinnerFoal"}
                        value={getMaxGWinnerFoal}
                        onChangeText={setMaxGWinnerFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinBlackTypeFoalPlaceholder}
                        name={"MinBlackTypeFoal"}
                        value={getMinBWinnerFoal}
                        onChangeText={setMinBWinnerFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxBlackTypeFoalPlaceholder}
                        name={"MaxBlackTypeFoal"}
                        value={getMaxBWinnerFoal}
                        onChangeText={setMaxBWinnerFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinEarningPlaceholder}
                        name={"MinEarning"}
                        value={getMinEarningAsFoal}
                        onChangeText={setMinEarningAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxEarningPlaceholder}
                        name={"MaxEarning"}
                        value={getMaxEarningAsFoal}
                        onChangeText={setMaxEarningAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinStartsPlaceholder}
                        name={"MinStart"}
                        value={getMinStartsAsFoal}
                        onChangeText={setMinStartAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxStartsPlaceholder}
                        name={"MaxStart"}
                        value={getMaxStartsAsFoal}
                        onChangeText={setMinStartAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinFirstPlacePlaceholder}
                        name={"Min1stplace"}
                        value={getMinFirstAsFoal}
                        onChangeText={setMinFirstAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxFirstPlacePlaceholder}
                        name={"Max1stplace"}
                        value={getMaxFirstAsFoal}
                        onChangeText={setMaxFirstAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinSecondPlacePlaceholder}
                        name={"Min2ndplace"}
                        value={getMinSecondAsFoal}
                        onChangeText={setMinSecondAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxSecondPlacePlaceholder}
                        name={"Max2ndplace"}
                        value={getMaxSecondAsFoal}
                        onChangeText={setMaxSecondAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinThirdPlacePlaceholder}
                        name={"Min3rdplace"}
                        value={getMinThirdAsFoal}
                        onChangeText={setMinThirdAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxThirdPlacePlaceholder}
                        name={"Max3rdplace"}
                        value={getMaxThirdAsFoal}
                        onChangeText={setMaxThirdAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={[styles.FullInputStyle, { marginTop: 30 }]}
                        placeholder={getMinFourthPlacePlaceholder}
                        name={"Min4thplace"}
                        value={getMinFourthAsFoal}
                        onChangeText={setMinFourthAsFoal}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={styles.FullInputStyle}
                        placeholder={getMaxFourthPlacePlaceholder}
                        name={"Max4thplace"}
                        value={getMaxFourthAsFoal}
                        onChangeText={setMaxFourthAsFoal}
                        keyboardType={"numeric"}
                    />


                    {isDetail ?
                        <View style={{ marginTop: 30 }}>
                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={"ID"}
                                name={"HorseID"}
                                value={getHorseID}
                                onChangeText={setHorseID}
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getHorseNamePlaceholder}
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
                                        <>
                                            {Global.Language === 1 ?
                                                <Text style={styles.InformationText}>Aygır Adı</Text>
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
                                        <>
                                            {Global.Language === 1 ?
                                                <Text style={styles.InformationText}>Kısrak Adı</Text>
                                                :
                                                <Text style={styles.InformationText}>Mare Name</Text>
                                            }
                                        </>

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
                                        <>
                                            {Global.Language === 1 ?
                                                <Text style={styles.InformationText}>Kısrak Babası Adı</Text>
                                                :
                                                <Text style={styles.InformationText}>BM Sire Name</Text>
                                            }
                                        </>

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
                                        setDead("All");
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
                                        <>
                                            {Global.Language === 1 ?
                                                <Text style={styles.InformationText}>Ülke</Text>
                                                :
                                                <Text style={styles.InformationText}>Country</Text>
                                            }
                                        </>

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
                                        <>
                                            {Global.Language === 1 ?
                                                <Text style={styles.InformationText}>Cinsiyet</Text>
                                                :
                                                <Text style={styles.InformationText}>Sex</Text>
                                            }
                                        </>

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
                                        <>
                                            {Global.Language === 1 ?
                                                <Text style={styles.InformationText}>Sınıf</Text>
                                                :
                                                <Text style={styles.InformationText}>Class</Text>
                                            }
                                        </>

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
                                placeholder={getMinEarningPlaceholder}
                                name={"MinEarning"}
                                value={getMinEarning.toString()}
                                onChangeText={setMinEarning}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getMaxEarningPlaceholder}
                                name={"MaxEarning"}
                                value={getMaxEarning.toString()}
                                onChangeText={setMaxEarning}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={[styles.FullInputStyle, { marginTop: 30 }]}
                                placeholder={getMinPricePlaceholder}
                                name={"MinPrice"}
                                value={getMinPrice.toString()}
                                onChangeText={setMinPrice}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getMaxPricePlaceholder}
                                name={"MaxPrice"}
                                value={getMaxPrice.toString()}
                                onChangeText={setMaxPrice}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={[styles.FullInputStyle, { marginTop: 30 }]}
                                placeholder={getStartBDatePlaceholder}
                                name={"StartBDate"}
                                value={getStartBirthdate.toString()}
                                onChangeText={setStartBirthdate}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getEndBDatePlaceholder}
                                name={"EndBDate"}
                                value={getEndBirthdate.toString()}
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
                                        <>
                                            {Global.Language === 1 ?
                                                <Text style={styles.InformationText}>Sahip</Text>
                                                :
                                                <Text style={styles.InformationText}>Owner</Text>
                                            }
                                        </>

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
                                        <>
                                            {Global.Language === 1 ?
                                                <Text style={styles.InformationText}>Yetiştirici</Text>
                                                :
                                                <Text style={styles.InformationText}>Breeder</Text>
                                            }
                                        </>

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
                                        <>
                                            {Global.Language === 1 ?
                                                <Text style={styles.InformationText}>Antrenör</Text>
                                                :
                                                <Text style={styles.InformationText}>Coach</Text>
                                            }
                                        </>

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
                                placeholder={getMinStartsPlaceholder}
                                name={"MinStarts"}
                                value={getMinStartsCount.toString()}
                                onChangeText={setMinStartsCount}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getMaxStartsPlaceholder}
                                name={"MaxStarts"}
                                value={getMaxStartsCount.toString()}
                                onChangeText={setMaxStartsCount}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={[styles.FullInputStyle, { marginTop: 30 }]}
                                placeholder={getMinFirstPlacePlaceholder}
                                name={"Min1stPlace"}
                                value={getMinFirst.toString()}
                                onChangeText={setMinFirst}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getMaxFirstPlacePlaceholder}
                                name={"Max1stPlace"}
                                value={getMaxFirst.toString()}
                                onChangeText={setMaxFirst}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={[styles.FullInputStyle, { marginTop: 30 }]}
                                placeholder={getMinSecondPlacePlaceholder}
                                name={"Min2ndPlace"}
                                value={getMinSecond.toString()}
                                onChangeText={setMinSecond}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getMaxSecondPlacePlaceholder}
                                name={"Max2ndPlace"}
                                value={getMaxSecond.toString()}
                                onChangeText={setMaxSecond}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={[styles.FullInputStyle, { marginTop: 30 }]}
                                placeholder={getMinThirdPlacePlaceholder}
                                name={"Min3rdPlace"}
                                value={getMinThird.toString()}
                                onChangeText={setMinThird}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getMaxThirdPlacePlaceholder}
                                name={"Max3rdPlace"}
                                value={getMaxThird.toString()}
                                onChangeText={setMaxThird}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={[styles.FullInputStyle, { marginTop: 30 }]}
                                placeholder={getMinFourthPlacePlaceholder}
                                name={"Min4thPlace"}
                                value={getMinFourth.toString()}
                                onChangeText={setMinFourth}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getMaxFourthPlacePlaceholder}
                                name={"Max4thPlace"}
                                value={getMaxFourth.toString()}
                                onChangeText={setMaxFourth}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={[styles.FullInputStyle, { marginTop: 30 }]}
                                placeholder={"TJK ID"}
                                name={"TJKID"}
                                value={getReference1.toString()}
                                onChangeText={setReference1}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.FullInputStyle}
                                placeholder={getTJKSireMarePlaceholder}
                                name={"TJKIDSire/Mare"}
                                value={getReference2.toString()}
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

                        </View>
                        :
                        null
                    }

                    <TouchableOpacity
                        style={styles.DetailButtonStyle}
                        onPress={() => {
                            setIsDetail(!isDetail)
                        }}>
                        {isDetail ?
                            <>
                                {Global.Language === 1 ?
                                    <Text style={styles.DetailButtonText}>Ayrıntı Azalt</Text>
                                    :
                                    <Text style={styles.DetailButtonText}>Less Detail</Text>
                                }
                            </>

                            :
                            <>
                                {Global.Language === 1 ?
                                    <Text style={styles.DetailButtonText}>Ayrınti Goster</Text>
                                    :
                                    <Text style={styles.DetailButtonText}>More Detail</Text>
                                }
                            </>

                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.SearchButtonStyle, { marginBottom: 50 }]}
                        onPress={() => {
                            setTime(true)
                            readHorseGetFilter(getSortTypeIDGlobal, getYearIDGlobal);
                            BottomSheetFiltering.current.close()
                        }}>
                        {Global.Language === 1 ?
                            <Text style={styles.SearchButtonText}>Arama</Text>
                            :
                            <Text style={styles.SearchButtonText}>Search</Text>
                        }

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
                                {Global.Language === 1 ?
                                    <>
                                        {getCountryData.filter((x) => x.COUNTRY_TR.includes(searchValue)).map((item, i) => (
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
                                                    <ListItem.Title>{item.COUNTRY_TR}</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron />
                                            </ListItem>
                                        )
                                        )}
                                    </>
                                    :
                                    <>
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
                                    </>}
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
                                            {Global.Language === 1 ?
                                                <ListItem.Title>{item.SEX_TR}</ListItem.Title>
                                                :
                                                <ListItem.Title>{item.SEX_EN}</ListItem.Title>
                                            }

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
                                            {Global.Language == 1 ?
                                                <ListItem.Title>{item.WINNER_TYPE_TR}</ListItem.Title>
                                                :
                                                <ListItem.Title>{item.WINNER_TYPE_EN}</ListItem.Title>
                                            }

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
                        let PlaceID
                        if (checkStateMultiPlace.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiPlace.checked.length; i++) {
                                if (i === 0) {
                                    PlaceID = checkStateMultiPlace.checked[0]
                                }
                                else {
                                    PlaceID += "," + checkStateMultiPlace.checked[i]
                                }
                            }
                        }
                        setPlaceID(PlaceID);

                        let RegistirationTypeID
                        if (checkStateMultiRegistration.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiRegistration.checked.length; i++) {
                                if (i === 0) {
                                    RegistirationTypeID = checkStateMultiRegistration.checked[0]
                                }
                                else {
                                    RegistirationTypeID += "," + checkStateMultiRegistration.checked[i]
                                }
                            }
                        }
                        setRegistrationTypeID(RegistirationTypeID);

                        setRmB(0)
                        setRmI(0)
                        setRmC(0)
                        setRmS(0)
                        setRmP(0)
                        setB(0)
                        setI(0)
                        setC(0)
                        setS(0)
                        setP(0)
                        setAnzB(0)
                        setAnzI(0)
                        setAnzC(0)
                        setAnzP(0)
                        setAnzS(0)

                        if (checkStateMultiRM.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiRM.checked.length; i++) {
                                if (checkStateMultiRM.checked[i] === "B") {
                                    setRmB(1)
                                }
                                if (checkStateMultiRM.checked[i] === "I") {
                                    setRmI(1)
                                }
                                if (checkStateMultiRM.checked[i] === "C") {
                                    setRmC(1)
                                }
                                if (checkStateMultiRM.checked[i] === "S") {
                                    setRmS(1)
                                }
                                if (checkStateMultiRM.checked[i] === "P") {
                                    setRmP(1)
                                }
                            }
                        }

                        if (checkStateMultiPA.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiPA.checked.length; i++) {
                                if (checkStateMultiPA.checked[i] === "B") {
                                    setB(1)
                                }
                                if (checkStateMultiPA.checked[i] === "I") {
                                    setI(1)
                                }
                                if (checkStateMultiPA.checked[i] === "C") {
                                    setC(1)
                                }
                                if (checkStateMultiPA.checked[i] === "S") {
                                    setS(1)
                                }
                                if (checkStateMultiPA.checked[i] === "P") {
                                    setP(1)
                                }
                            }
                        }

                        if (checkStateMultiANZ.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiANZ.checked.length; i++) {
                                if (checkStateMultiANZ.checked[i] === "B") {
                                    setAnzB(1)
                                }
                                if (checkStateMultiANZ.checked[i] === "I") {
                                    setAnzI(1)
                                }
                                if (checkStateMultiANZ.checked[i] === "C") {
                                    setAnzC(1)
                                }
                                if (checkStateMultiANZ.checked[i] === "S") {
                                    setAnzS(1)
                                }
                                if (checkStateMultiANZ.checked[i] === "P") {
                                    setAnzP(1)
                                }
                            }
                        }


                        BottomSheetSmall.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <ScrollView>

                    {getBottomSheetText === "Place" &&

                        <>
                            {getPlaceData !== undefined &&
                                <ScrollView>
                                    {getPlaceData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            onPress={() => {
                                                pressPlace(item)

                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiPlace.checked.includes(item.ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressPlace(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.NAME}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))}
                                </ScrollView>}
                        </>

                        || getBottomSheetText === "RegistirationType" &&

                        <>
                            {getRegistrationData !== undefined &&
                                <ScrollView>
                                    {getRegistrationData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            onPress={() => {
                                                pressRegistration(item)

                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiRegistration.checked.includes(item.REGISTRATION_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressRegistration(item)
                                                }} />
                                            <ListItem.Content>
                                                {Global.Language===1?
                                                <ListItem.Title>{item.REGISTRATION_TR}</ListItem.Title>
                                                :
                                                <ListItem.Title>{item.REGISTRATION_EN}</ListItem.Title>
                                                }
                                                
                                            </ListItem.Content>

                                        </ListItem>
                                    ))}
                                </ScrollView>}
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
                                                if (Global.Language===1) {
                                                    setSortTypeString(item.SORT_TYPE_TR)
                                                }
                                                else{
                                                    setSortTypeString(item.SORT_TYPE_EN)
                                                }
                                                
                                                setTime(true)
                                                setSortTypeIDGlobal(item.SORT_TYPE_ID)
                                                readHorseGetFilter(item.SORT_TYPE_ID, getYearIDGlobal);
                                            }}>
                                            <ListItem.Content>
                                                {Global.Language===1?
                                                <ListItem.Title>{item.SORT_TYPE_TR}</ListItem.Title>
                                                :
                                                <ListItem.Title>{item.SORT_TYPE_EN}</ListItem.Title>
                                                }
                                                
                                            </ListItem.Content>
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
                                            onPress={() => {
                                                BottomSheetSmall.current.close()
                                                setYearString(item.YEAR_TEXT)
                                                setTime(true)
                                                setYearIDGlobal(item.YEAR_ID)
                                                readHorseGetFilter(getSortTypeIDGlobal, item.YEAR_ID,);
                                            }}>
                                            <ListItem.Content>
                                                <ListItem.Title>{item.YEAR_TEXT}</ListItem.Title>
                                            </ListItem.Content>
                                        </ListItem>
                                    ))}
                                </ScrollView>
                            }
                        </>

                        || getBottomSheetText === "Confirmation" &&

                        <>
                            {ConfirmationData.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={() => {
                                        setState({ checked: [state, item.id] });
                                        setChekedItem(item.id)
                                        if (item.id === 1) {
                                            setConfirm("");
                                        }
                                        else if (item.id === 2) {
                                            setConfirm("1")
                                        }
                                        else if (item.id === 3) {
                                            setConfirm("0")
                                        }

                                        if (Global.Language === 1) {
                                            setConfirmation(item.titleTurkish)
                                        }
                                        else {
                                            setConfirmation(item.titleEnglish)
                                        }
                                        BottomSheetSmall.current.close();

                                    }}
                                >
                                    <ListItem.Content>
                                        {Global.Language === 1 ?
                                            <ListItem.Title>{item.titleTurkish}</ListItem.Title>
                                            :
                                            <ListItem.Title>{item.titleEnglish}</ListItem.Title>
                                        }
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
                                        if (item.id === 1) {
                                            setIsDead("");
                                        }
                                        else if (item.id === 2) {
                                            setIsDead("1")
                                        }
                                        else if (item.id === 3) {
                                            setIsDead("0")
                                        }
                                        if (Global.Language === 1) {
                                            setDead(item.titleTurkish)
                                        }
                                        else {
                                            setDead(item.titleEnglish)
                                        }
                                        BottomSheetSmall.current.close();
                                        readHorseGetFilter(getSortTypeIDGlobal, getYearIDGlobal)
                                    }}
                                >
                                    <ListItem.CheckBox
                                        checked={stateDead.checked.includes(item.id)}
                                        checkedIcon='circle'
                                        uncheckedIcon='circle'
                                        center={true}
                                        checkedColor='#2169ab'
                                        uncheckedColor='rgb(232, 237, 241)'
                                        onPress={() => {
                                            setStateDead({ checked: [state, item.id] });
                                            setChekedItem(item.id)
                                            if (Global.Language === 1) {
                                                setDead(item.titleTurkish)
                                            }
                                            else {
                                                setDead(item.titleEnglish)
                                            }
                                            BottomSheetSmall.current.close();
                                            readHorseGetFilter(getSortTypeIDGlobal, getYearIDGlobal)
                                        }} />
                                    <ListItem.Content>
                                        {Global.Language === 1 ?
                                            <ListItem.Title>{item.titleTurkish}</ListItem.Title>
                                            :
                                            <ListItem.Title>{item.titleEnglish}</ListItem.Title>
                                        }
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

                    }

                </ScrollView>
            </RBSheet>

            <TouchableOpacity
                style={styles.FilteringContainer}
                onPress={() => {
                    BottomSheetFiltering.current.open();
                }}>
                <Icon name="filter" size={16} color="#fff" style={{ justifyContent: 'center' }} />
            </TouchableOpacity>


            {getTime ?
                <ActivityIndicator size="large" color="#000" />
                :
                <>
                    {getHorseGetFilter !== undefined &&

                        <ScrollView>

                            {getSortTypeData !== undefined &&
                                <View style={styles.SortTypeContainer}>
                                    <TouchableOpacity
                                        style={styles.SortTypeButton}
                                        onPress={() => {
                                            setBottomSheetText("Year")
                                            BottomSheetSmall.current.open();
                                        }}>
                                        <Icon name="caret-down" size={16} color="#fff" style={{ alignSelf: 'center', marginRight: 5 }} />
                                        <Text style={styles.SortTypeButtonText}>{getYearString}</Text>
                                    </TouchableOpacity>
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

                            {getHorseGetFilter.length === 0 ?
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
                                :
                                <>
                                    {getHorseGetFilter.map((item, index) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                //Linking.openURL("https://" + item.LINK + ".pedigreeall.com")
                                                Global.Link = item.LINK;
                                                navigation.navigate("StallionsSearchLink", {
                                                    Link: item.LINK
                                                });
                                            }}
                                            key={index}>
                                            <Card>
                                                <Card.Title>{item.HORSE_NAME}</Card.Title>
                                                <Card.Divider />
                                                <Card.Image
                                                    style={{ resizeMode: 'contain' }}
                                                    source={{ uri: 'https://www.pedigreeall.com/upload/1000/' + item.IMAGE }}>
                                                </Card.Image>
                                                <View style={styles.CardInformationContainer}>
                                                    <View style={styles.CardInformationTextAndIconContainer}>
                                                        <Icon name="map-marker-alt" size={16} color="#adb5bd" style={{ alignSelf: 'center' }} />
                                                        <Text style={styles.CardInformationText}>{item.PLACE}</Text>
                                                    </View>
                                                    <View style={styles.CardInformationTextAndIconContainer}>
                                                        <Icon name="phone" size={16} color="#adb5bd" style={{ alignSelf: 'center' }} />
                                                        <Text style={styles.CardInformationText}>{item.CELL_PHONE}</Text>
                                                    </View>
                                                    <View style={styles.CardInformationTextAndIconContainer}>
                                                        <Icon name="user" size={16} color="#adb5bd" style={{ alignSelf: 'center' }} />
                                                        <Text style={styles.CardInformationText}>{item.NAME}</Text>
                                                    </View>
                                                </View>

                                                <Card.Divider />

                                                <View style={styles.CardInformationTextViewContainer}>
                                                    <View style={styles.CardInformationTextContainer}>
                                                        <Text style={[styles.CardInformationText, { fontWeight: '700' }]}>{item.COUNT}</Text>
                                                        <Text style={styles.CardInformationText}>Breeding</Text>
                                                    </View>
                                                    {item.REF1 > 0 ?
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                Linking.openURL("https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?1=1&QueryParameter_AtId=" + item.REF1)
                                                            }}>

                                                            <Image
                                                                style={{ width: 40, height: 30, alignSelf: 'center' }}
                                                                source={{ uri: "https://www.pedigreeall.com//images/head2.jpg" }}
                                                            />
                                                        </TouchableOpacity>
                                                        :

                                                        null}

                                                </View>
                                            </Card>
                                        </TouchableOpacity>
                                    ))}
                                </>
                            }


                        </ScrollView>

                    }
                </>
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
    CardInformationContainer: {
        marginTop: 20,
        padding: 10
    },
    CardInformationTextAndIconContainer: {
        flexDirection: 'row',
        marginVertical: 5
    },
    CardInformationText: {
        marginLeft: 10
    },
    CardInformationTextViewContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CardInformationTextContainer: {
        flexDirection: 'row',
    },
    SortTypeContainer: {
        width: '100%',
        padding: 10,
        paddingRight: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    SortTypeButton: {
        flexDirection: 'row',
        backgroundColor: '#2169ab',
        padding: 10,
        borderRadius: 6,
        elevation: 10,
        width: '40%'
    },
    SortTypeButtonText: {
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
        color: "#e8edf1",
        fontWeight: '500'
    },

    DetailButtonStyle: {
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
        backgroundColor: "#e8edf1",
        alignSelf: 'center'

    },
    DetailButtonText: {
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 16,
        color: "#2e3f6e",
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
    ErrorMessageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 30
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