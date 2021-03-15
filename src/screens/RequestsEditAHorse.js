import React, { useRef, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Text, Image, TextInput, ActivityIndicator } from 'react-native'
import Title from '../components/Title';
import { SearchBar, ListItem, CheckBox } from "react-native-elements";
import { BlueButton } from '../components/BlueButton'
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-community/async-storage'
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";

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

export function RequestsEditAHorse() {

    const BottomSheetLong = React.useRef();
    const BottomSheetRef = useRef();
    const [searchText, setSearchText] = React.useState("cerenin");
    const [showEdition, setShowEdition] = React.useState(false)

    const [getHorseGetByName, setHorseGetByName] = React.useState();
    const [getHorseGetByIDForUpdate, setHorseGetByIDForUpdate] = React.useState();
    const [getSex, setSex] = React.useState();
    const [getCountry, setCountry] = React.useState();
    const [getWinnerType, setWinnerType] = React.useState();
    const [getCurrency, setCurrency] = React.useState()
    const [getColor, setColor] = React.useState();
    const [getFamily, setFamily] = React.useState();

    const [image1, setImage1] = useState(null);
    const [sexList, setSexList] = useState()
    const [sexText, setSexText] = useState("Select a Sex")
    const [WinnerTypeList, setWinnerTypeList] = useState()
    const [WinnerText, setWinnerText] = useState("Select a Class")
    const [CurrencyTypeList, setCurrencyList] = useState()
    const [earningText, setEarningText] = useState("$")
    const [priceText, setPriceText] = useState("$")
    const [isEarning, setEarning] = useState(false)
    const [CounrtyList, setCountryList] = useState()
    const [CounrtyText, setCounrtyText] = useState("Select a Country")
    const [ColorList, setColorList] = useState()
    const [ColorText, setColorText] = useState("Select a Color")
    const [FamilyText, setFamilyText] = useState("Select a Family")
    const [BottomSheet, setBottomSheet] = useState()
    const [searchValue, setSearchValue] = React.useState()
    const [loader, setLoader] = React.useState(false)
    const [getOwnerBreederName, setOwnerBreederName] = React.useState()
    const [getCoachBreederOwner, setCoachBreederOwner] = React.useState();
    const [getOwnerText, setOwnerText] = React.useState('Owner');
    const [getBreederText, setBreederText] = React.useState('Breeder')
    const [getCoachText, setCoachText] = React.useState('Coach')
    const [isLoading, SetisLoading] = React.useState(true);

    const [getHorseName, setHorseName] = React.useState();
    const [getFatherName, setFatherName] = React.useState();
    const [getMotherName, setMotherName] = React.useState();

    const [DeadCheckBox, setDeadCheckBox] = React.useState(false)

    const [getHorseID, setHorseID] = React.useState();
    const [getHorseNameForUpdate, setHorseNameForUpdate] = React.useState("");
    const [getFatherObject, setFatherObject] = React.useState([])
    const [getMotherObject, setMotherObject] = React.useState([]);
    const [getHorseBirthDate, setHorseBirthDate] = React.useState("")
    const [getRef1, setRef1] = React.useState("");
    const [getRef2, setRef2] = React.useState("");
    const [getEarn, setEarn] = React.useState("");
    const [getPrice, setPrice] = React.useState("");
    const [getOwner, setOwner] = React.useState("");
    const [getBreeder, setBreeder] = React.useState("");
    const [getCoach, setCoach] = React.useState("");
    const [getHeader, setHeader] = React.useState("");
    const [getInfo, setInfo] = React.useState("");
    const [getStartCount, setStartCount] = React.useState("");
    const [getFirst, setFirst] = React.useState("");
    const [getSecond, setSecond] = React.useState("");
    const [getThird, setThird] = React.useState("");
    const [getFourth, setFourth] = React.useState("");
    const [getImage, setImage] = React.useState("");
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


    const [getFatherID, setFatherID] = React.useState();
    const [getMotherID, setMotherID] = React.useState();
    const [getSexID, setSexID] = React.useState();
    const [getCountryID, setCountryID] = React.useState();
    const [getEarnCurrencyID, setEarnCurrencyID] = React.useState()
    const [getPriceCurrencyID, setPriceCurrencyID] = React.useState()
    const [getOwnerSystemUserID, setOwnerSystemUserID] = React.useState()
    const [getBreederSystemUserID, setBreederSystemUserID] = React.useState()
    const [getCoachSystemUserID, setCoachSystemUserID] = React.useState()
    const [getWinnerTypeID, setWinnerTypeID] = React.useState()
    const [getFamilyID, setFamilyID] = React.useState()
    const [getColorID, setColorID] = React.useState()

    const [SireMareHorseData, setSireMareHorseData] = React.useState();
    const [SireMareHorseName, setSireMareHorseName] = React.useState();
    const [getOwnerBreederData, setOwnerBreederData] = React.useState();
    const [getCheckHorseAvaibleData, setCheckHorseAvaibleData] = React.useState();
    const [SireData, setSireData] = React.useState();
    const [MareData, setMareData] = React.useState();
    const [SireText, setSireText] = React.useState("Sire");
    const [MareText, setMareText] = React.useState("Mare");

    const [checkStateMultiRM, setcheckStateMultiRM] = React.useState({ checked: [] });
    const [checkStateMultiANZ, setcheckStateMultiANZ] = React.useState({ checked: [] });
    const [checkStateMultiPA, setcheckStateMultiPA] = React.useState({ checked: [] });

    const [textOfPA, setTextOfPA] = React.useState();

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

    const readHorseGetByName = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/GetByName?p_sName=' + searchText, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseGetByName(json.m_cData)
                        setSireMareHorseData(json)
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

    const readHorseGetByIdForUpdate = async (HorseID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/GetByIdForUpdate?p_iId=' + HorseID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseGetByIDForUpdate(json.m_cData)

                        if (json.m_cData !== undefined) {
                            setHorseID(json.m_cData[0].HORSE_ID)
                            setHorseNameForUpdate(json.m_cData[0].HORSE_NAME)
                            setFatherID(json.m_cData[0].FATHER_OBJECT.HORSE_ID)
                            setMotherID(json.m_cData[0].MOTHER_OBJECT.HORSE_ID)

                            setFatherName(json.m_cData[0].FATHER_OBJECT.HORSE_NAME)
                            setMotherName(json.m_cData[0].MOTHER_OBJECT.HORSE_NAME)
                            setSexText(json.m_cData[0].SEX_OBJECT.SEX_EN)


                            setHorseBirthDate(json.m_cData[0].HORSE_BIRTH_DATE)
                            setRef1(json.m_cData[0].REF1)
                            setRef2(json.m_cData[0].REF2)
                            setEarn(json.m_cData[0].EARN)
                            setPrice(json.m_cData[0].PRICE)
                            setOwner(json.m_cData[0].OWNER)
                            setBreeder(json.m_cData[0].BREEDER)
                            setCoach(json.m_cData[0].COACH)
                            setHeader(json.m_cData[0].HEADER)
                            setInfo(json.m_cData[0].INFO)
                            setStartCount(json.m_cData[0].START_COUNT)
                            setFirst(json.m_cData[0].FIRST)
                            setSecond(json.m_cData[0].SECOND)
                            setThird(json.m_cData[0].THIRD)
                            setFourth(json.m_cData[0].FOURTH)
                            setImage(json.m_cData[0].IMAGE)
                            setB(json.m_cData[0].B)
                            setI(json.m_cData[0].I)
                            setC(json.m_cData[0].C)
                            setS(json.m_cData[0].S)
                            setP(json.m_cData[0].P)
                            setRmB(json.m_cData[0].RM_B)
                            setRmI(json.m_cData[0].RM_I)
                            setRmC(json.m_cData[0].RM_C)
                            setRmS(json.m_cData[0].RM_S)
                            setRmP(json.m_cData[0].RM_P)
                            setAnzB(json.m_cData[0].ANZ_B)
                            setAnzI(json.m_cData[0].ANZ_I)
                            setAnzC(json.m_cData[0].ANZ_C)
                            setAnzS(json.m_cData[0].ANZ_S)
                            setAnzP(json.m_cData[0].ANZ_P)

                            console.log(json)

                            const paArray = []

                            if (json.m_cData[0].B === 1) {
                                paArray.push("B")
                            }
                            if (json.m_cData[0].I === 1) {
                                paArray.push("I")
                            }
                            if (json.m_cData[0].C === 1) {
                                paArray.push("C")
                            }
                            if (json.m_cData[0].S === 1) {
                                paArray.push("S")
                            }
                            if (json.m_cData[0].P === 1) {
                                paArray.push("P")
                            }
                            setcheckStateMultiPA({checked: paArray})

                            const rmArray = []

                            if (json.m_cData[0].RM_B === 1) {
                                rmArray.push("B")
                            }
                            if (json.m_cData[0].RM_I === 1) {
                                rmArray.push("I")
                            }
                            if (json.m_cData[0].RM_C === 1) {
                                rmArray.push("C")
                            }
                            if (json.m_cData[0].RM_S === 1) {
                                rmArray.push("S")
                            }
                            if (json.m_cData[0].RM_P === 1) {
                                rmArray.push("P")
                            }
                            setcheckStateMultiRM({checked: rmArray})


                            const anzArray = []

                            if (json.m_cData[0].ANZ_B === 1) {
                                anzArray.push("B")
                            }
                            if (json.m_cData[0].ANZ_I === 1) {
                                anzArray.push("I")
                            }
                            if (json.m_cData[0].ANZ_C === 1) {
                                anzArray.push("C")
                            }
                            if (json.m_cData[0].ANZ_S === 1) {
                                anzArray.push("S")
                            }
                            if (json.m_cData[0].ANZ_P === 1) {
                                anzArray.push("P")
                            }
                            setcheckStateMultiANZ({checked: anzArray})



                            if (json.m_cData[0].IS_DEAD_OBJECT.BOOL_ID === 0) {
                                setDeadCheckBox(false)
                            }
                            else if (json.m_cData[0].IS_DEAD_OBJECT.BOOL_ID === 1) {
                                setDeadCheckBox(true)
                            }


                            setSexID(json.m_cData[0].SEX_OBJECT.SEX_ID)
                            setCountryID(json.m_cData[0].COUNTRY_OBJECT.COUNTRY_ID)
                            setEarnCurrencyID(json.m_cData[0].EARN_CURRENCY_OBJECT.CURRENCY_ID)
                            setPriceCurrencyID(json.m_cData[0].PRICE_CURRENCY_OBJECT.CURRENCY_ID)
                            setOwnerSystemUserID(json.m_cData[0].OWNER_OBJECT.SYSTEM_USER_ID)
                            setCoachSystemUserID(json.m_cData[0].COACH_OBJECT.SYSTEM_USER_ID)
                            setBreederSystemUserID(json.m_cData[0].BREEDER_OBJECT.SYSTEM_USER_ID)
                            setWinnerTypeID(json.m_cData[0].WINNER_TYPE_OBJECT.WINNER_TYPE_ID)
                            setFamilyID(json.m_cData[0].FAMILY_OBJECT.FAMILY_ID)
                            setColorID(json.m_cData[0].COLOR_OBJECT.COLOR_ID)
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
        }
    }

    const readHorseSex = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
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
                        setSexList(json.m_cData)
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

    const readCountry = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
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
                        setCountryList(json.m_cData)
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

    const readWinnerType = async () => {
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
                        setWinnerTypeList(json.m_cData)
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

    const readCurrency = async () => {
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
                        setCurrencyList(json.m_cData)
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

    const readColor = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Color/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setColorList(json.m_cData)
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

    const readFamily = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Family/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setFamily(json.m_cData)
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

    const readUpdateAHorse = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/Update', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "HORSE_ID": getHorseID,
                        "HORSE_NAME": getHorseNameForUpdate,
                        "FATHER_OBJECT": {
                            "HORSE_ID": getFatherID.toString()
                        },
                        "MOTHER_OBJECT": {
                            "HORSE_ID": getMotherID.toString()
                        },
                        "HORSE_BIRTH_DATE": getHorseBirthDate,
                        "SEX_OBJECT": {
                            "SEX_ID": getSexID.toString()
                        },
                        "COUNTRY_OBJECT": {
                            "COUNTRY_ID": getCountryID
                        },
                        "PRICE": getPrice,
                        "PRICE_CURRENCY_OBJECT": {
                            'CURRENCY_ID': getPriceCurrencyID.toString()
                        },
                        "OWNER_OBJECT": {
                            "SYSTEM_USER_ID": getOwnerSystemUserID.toString()
                        },
                        "OWNER": getOwner,
                        "BREEDER_OBJECT": {
                            "SYSTEM_USER_ID": getBreederSystemUserID.toString()
                        },
                        "BREEDER": getBreeder,
                        "COACH_OBJECT": {
                            "SYSTEM_USER_ID": getCoachSystemUserID.toString()
                        },
                        "COACH": getCoach,
                        "HEADER": getHeader,
                        "INFO": getInfo,
                        "START_COUNT": getStartCount,
                        "FIRST": getFirst,
                        "SECOND": getSecond,
                        "THIRD": getThird,
                        "FOURTH": getFourth,
                        "IS_DEAD_OBJECT": {
                            "BOOL_ID": DeadCheckBox ? 1 : 0
                        },
                        "WINNER_TYPE_OBJECT": {
                            "WINNER_TYPE_ID": getWinnerTypeID.toString()
                        },
                        "REF1": getRef1,
                        "REF2": getRef2,
                        "EARN": getEarn,
                        "EARN_CURRENCY_OBJECT": {
                            'CURRENCY_ID': getEarnCurrencyID.toString()
                        },
                        "IMAGE": getImage,
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
                        "FAMILY_OBJECT": {
                            "FAMILY_ID": getFamilyID.toString()
                        },
                        "COLOR_OBJECT": {
                            "COLOR_ID": getColorID.toString()
                        },
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        //setHorseAddRequestData(json.m_cData)
                        //setTime(false)
                        alert(json.m_lUserMessageList[0])

                        if (json.m_eProcessState === 1) {
                            setHorseName("")
                            setFatherObject([])
                            setMotherObject([])
                            setHorseBirthDate("")
                            setRef1("")
                            setRef2("")
                            setEarn("")
                            setPrice("")
                            setOwner("")
                            setBreeder("")
                            setCoach("")
                            setHeader("")
                            setInfo("")
                            setStartCount("")
                            setFirst("")
                            setSecond("")
                            setThird("")
                            setFourth("")
                            setImage("")
                            setB(0)
                            setI(0)
                            setC(0)
                            setS(0)
                            setP(0)
                            setRmB(0)
                            setRmI(0)
                            setRmC(0)
                            setRmS(0)
                            setRmP(0)
                            setAnzB(0)
                            setAnzC(0)
                            setAnzI(0)
                            setAnzP(0)
                            setAnzS(0)
                            setFatherID(-1)
                            setMotherID(-1)
                            setSexID(1)
                            setCountryID(0)
                            setEarnCurrencyID(1)
                            setPriceCurrencyID(1)
                            setOwnerSystemUserID(1)
                            setBreederSystemUserID(1)
                            setCoachSystemUserID(1)
                            setWinnerTypeID(1)
                            setFamilyID(1)
                            setColorID(1)

                            setShowEdition(false)
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
        readHorseSex();
        readCountry();
        readWinnerType()
        readCurrency();
        readColor()
        readFamily()
        readGetOwnerBreeder();
    }, [])

    return (
        <View style={styles.Container}>
            <Title text="Edit A Horse" />
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

                    {getHorseGetByName !== undefined &&

                        <>
                            {getHorseGetByName.map((item, index) => (
                                <ListItem
                                    key={index}
                                    bottomDivider
                                    button
                                    onPress={() => {
                                        BottomSheetLong.current.close();
                                        readHorseGetByIdForUpdate(item.HORSE_ID)
                                        setShowEdition(true)
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

                </View>
            </RBSheet>
            <RBSheet
                ref={BottomSheetRef}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={Dimensions.get('window').height - 100}
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
                        console.log(checkStateMultiPA)
                        BottomSheetRef.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    {(BottomSheet === "SexList" &&
                        <View>
                            {sexList !== undefined &&
                                <ScrollView>
                                    {sexList.filter((x) => x.SEX_EN).map(
                                        (item, i) => (
                                            <ListItem
                                                key={i}
                                                bottomDivider
                                                button
                                                onPress={() => {
                                                    console.log(item.SEX_EN)
                                                    setSexText(item.SEX_EN)
                                                    setSexID(item.SEX_ID)
                                                    BottomSheetRef.current.close();
                                                }} >
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.SEX_EN}</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron />
                                            </ListItem>
                                        ))}
                                </ScrollView>
                            }
                        </View>
                    )
                        || (BottomSheet === "WinnerList" &&
                            <View>
                                {WinnerTypeList !== undefined &&
                                    <ScrollView>
                                        {WinnerTypeList.filter((x) => x.WINNER_TYPE_EN).map(
                                            (item, i) => (
                                                <ListItem
                                                    key={i}
                                                    bottomDivider
                                                    button
                                                    onPress={() => {
                                                        setWinnerText(item.WINNER_TYPE_EN)
                                                        setWinnerTypeID(item.WINNER_TYPE_ID)
                                                        BottomSheetRef.current.close()
                                                    }} >
                                                    <ListItem.Content>
                                                        <ListItem.Title>{item.WINNER_TYPE_EN}</ListItem.Title>
                                                    </ListItem.Content>
                                                    <ListItem.Chevron />
                                                </ListItem>
                                            ))}
                                    </ScrollView>
                                }
                            </View>
                        )
                        || (BottomSheet === "CurrencyList" &&
                            <View>
                                {CurrencyTypeList !== undefined &&
                                    <ScrollView>
                                        {CurrencyTypeList.map(
                                            (item, i) => (
                                                <ListItem
                                                    key={i}
                                                    bottomDivider
                                                    button
                                                    onPress={() => {
                                                        if (isEarning === true) {
                                                            setEarningText(item.ICON)
                                                            setEarnCurrencyID(item.CURRENCY_ID)
                                                        }
                                                        else if (isEarning === false) {
                                                            setPriceText(item.ICON)
                                                            setPriceCurrencyID(item.CURRENCY_ID)
                                                        }
                                                        BottomSheetRef.current.close()
                                                    }} >
                                                    <ListItem.Content>
                                                        <ListItem.Title>{item.ICON}</ListItem.Title>
                                                    </ListItem.Content>
                                                    <ListItem.Chevron />
                                                </ListItem>
                                            ))}
                                    </ScrollView>
                                }
                            </View>
                        )
                        || (BottomSheet === "CountryList" &&
                            <View>
                                {CounrtyList !== undefined &&
                                    <ScrollView>
                                        {CounrtyList.filter((x) => x.COUNTRY_EN).map(
                                            (item, i) => (
                                                <ListItem
                                                    key={i}
                                                    bottomDivider
                                                    button
                                                    onPress={() => {
                                                        setCounrtyText(item.COUNTRY_EN)
                                                        setCountryID(item.COUNTRY_ID)
                                                        BottomSheetRef.current.close()
                                                    }} >
                                                    <Flag code={item.ICON.toUpperCase()} size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                                                    </ListItem.Content>
                                                    <ListItem.Chevron />
                                                </ListItem>
                                            ))}
                                    </ScrollView>
                                }
                            </View>
                        )
                        || (BottomSheet === "ColorList" &&
                            <View>
                                {ColorList !== undefined &&
                                    <ScrollView>
                                        {ColorList.filter((x) => x.COLOR_TEXT).map(
                                            (item, i) => (
                                                <ListItem
                                                    key={i}
                                                    bottomDivider
                                                    button
                                                    onPress={() => {
                                                        setColorText(item.COLOR_TEXT)
                                                        setColorID(item.COLOR_ID)
                                                        BottomSheetRef.current.close();
                                                    }} >
                                                    <ListItem.Content>
                                                        <ListItem.Title>{item.COLOR_TEXT}</ListItem.Title>
                                                    </ListItem.Content>
                                                    <ListItem.Chevron />
                                                </ListItem>
                                            ))}
                                    </ScrollView>
                                }
                            </View>
                        )
                        || (BottomSheet === "Family" &&

                            <View>
                                {getFamily !== undefined &&
                                    <ScrollView>
                                        {getFamily.filter((x) => x.FAMILY_ID).map(
                                            (item, i) => (
                                                <ListItem
                                                    key={i}
                                                    bottomDivider
                                                    button
                                                    onPress={() => {
                                                        setFamilyText(item.FAMILY_TEXT)
                                                        setFamilyID(item.FAMILY_ID)
                                                        BottomSheetRef.current.close();
                                                    }} >
                                                    <ListItem.Content>
                                                        <ListItem.Title>{item.FAMILY_TEXT}</ListItem.Title>
                                                    </ListItem.Content>
                                                    <ListItem.Chevron />
                                                </ListItem>
                                            ))}
                                    </ScrollView>
                                }
                            </View>

                        )
                        || (BottomSheet === "SireMareObject" &&
                            <>
                                <SearchBar
                                    placeholder={searchText}
                                    lightTheme
                                    platform="ios"
                                    cancelButtonTitle=""
                                    inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                    containerStyle={{ backgroundColor: 'transparent', }}
                                    inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                                    rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                    leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    onSubmitEditing={() => {
                                        readHorseGetByName();
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
                                                        BottomSheetRef.current.close();

                                                        if (SireMareHorseName === 'Sire') {
                                                            setSireText(item.HORSE_NAME);
                                                            setSireData(item);
                                                            setFatherObject(item)
                                                            setFatherID(item.HORSE_ID)
                                                            setFatherName(item.HORSE_NAME)
                                                        }
                                                        else if (SireMareHorseName === 'Mare') {
                                                            setMareText(item.HORSE_NAME);
                                                            setMareData(item);
                                                            setMotherObject(item)
                                                            setMotherID(item.HORSE_ID)
                                                            setMotherName(item.HORSE_NAME)
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
                            </>
                        )
                        || (BottomSheet === "Owner" &&

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
                                                if (getCoachBreederOwner === "Owner") {
                                                    setOwnerText(item.NAME)
                                                    setOwnerSystemUserID(item.ID)
                                                    setOwner(item.NAME)

                                                }
                                                else if (getCoachBreederOwner === "Breeder") {
                                                    setBreederText(item.NAME)
                                                    setBreederSystemUserID(item.ID)
                                                    setBreeder(item.NAME)
                                                }
                                                else if (getCoachBreederOwner === "Coach") {
                                                    setCoachText(item.NAME)
                                                    setCoachSystemUserID(item.ID)
                                                    setCoach(item.NAME)
                                                }

                                                BottomSheetRef.current.close();
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
                            </>

                        )

                        || BottomSheet === "RomanMiller" &&

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

                        || BottomSheet === "ANZ" &&

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

                        || BottomSheet === "PA" &&

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
                </View>
            </RBSheet>


            {showEdition ?

                <>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowEdition(false)
                            }}
                            style={{ width: '100%', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', marginBottom: 10 }}>
                            <Icon name="chevron-left" size={24} color="silver" />
                            <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    {getHorseGetByIDForUpdate !== undefined &&

                        <ScrollView>
                            <View style={{ padding: 10 }}>
                                <TextInput
                                    style={styles.FullInputStyle}
                                    placeholder={getHorseGetByIDForUpdate[0].HORSE_NAME}
                                    name={"HorseName"}
                                    value={getHorseNameForUpdate}
                                    onChangeText={setHorseNameForUpdate}
                                />
                                <View style={styles.TwoInformationInLineContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSireMareHorseName('Sire')
                                            setBottomSheet('SireMareObject')
                                            BottomSheetRef.current.open();
                                        }}
                                        style={styles.TwoValueInLineButton}>
                                        <Text style={styles.InformationText}>{getFatherName}</Text>
                                        <Icon name="plus-circle" size={24} color="silver" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSireMareHorseName('Mare')
                                            setBottomSheet('SireMareObject')
                                            BottomSheetRef.current.open()
                                        }}
                                        style={styles.TwoValueInLineButton}>
                                        <Text style={styles.InformationText}>{getMotherName}</Text>
                                        <Icon name="plus-circle" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                                    <Icon name="calendar-alt" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Set a Birth Date"}
                                        name={"BirthDate"}
                                        keyboardType="numeric"
                                        value={getHorseBirthDate.toString()}
                                        onChangeText={setHorseBirthDate}
                                    />
                                </View>

                                <View style={styles.OneValueInLine}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("SexList")
                                            BottomSheetRef.current.open();
                                        }}
                                        style={styles.InputTouchableContainer}>
                                        <Icon name="male" size={20} color="#2169ab" />
                                        {sexList.map((item, index) => (
                                            <View key={index}>
                                                {item.SEX_ID === getSexID &&
                                                    <Text>{item.SEX_EN}</Text>
                                                }
                                            </View>
                                        ))}

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setSexText("Select a Sex")
                                    }}>
                                        <Icon name="times-circle" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.OneValueInLine}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("CountryList")
                                            BottomSheetRef.current.open();

                                        }}
                                        style={styles.InputTouchableContainer}>
                                        <Icon name="flag" size={20} color="#2169ab" />
                                        {CounrtyList.map((item, index) => (
                                            <View key={index}>
                                                {item.COUNTRY_ID === getCountryID &&
                                                    <Text>{item.COUNTRY_EN}</Text>
                                                }
                                            </View>
                                        ))}

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setSexText("Select a Country")
                                    }}>
                                        <Icon name="times-circle" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.OneValueInLine}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("WinnerList")
                                            BottomSheetRef.current.open();

                                        }}
                                        style={styles.InputTouchableContainer}>
                                        <Icon name="horse" size={20} color="#2169ab" />
                                        {WinnerTypeList.map((item, index) => (
                                            <View key={index}>
                                                {item.WINNER_TYPE_ID === getWinnerTypeID &&
                                                    <Text>{item.TYPE_TEXT}</Text>
                                                }
                                            </View>
                                        ))}

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setSexText("Select a Class")
                                    }}>
                                        <Icon name="times-circle" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                                    <Icon name="award" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"First"}
                                        name={"FirstPlace"}
                                        keyboardType="numeric"
                                        value={getFirst.toString()}
                                        onChangeText={setFirst}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    <Icon name="award" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Second"}
                                        name={"SecondPlace"}
                                        keyboardType="numeric"
                                        value={getSecond.toString()}
                                        onChangeText={setSecond}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    <Icon name="award" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Third"}
                                        name={"ThirdPlace"}
                                        keyboardType="numeric"
                                        value={getThird.toString()}
                                        onChangeText={setThird}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    <Icon name="award" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Fourth"}
                                        name={"FourthPlace"}
                                        keyboardType="numeric"
                                        value={getFourth.toString()}
                                        onChangeText={setFourth}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    <Icon name="award" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Start Count"}
                                        name={"StartCount"}
                                        keyboardType="numeric"
                                        value={getStartCount.toString()}
                                        onChangeText={setStartCount}
                                    />
                                </View>

                                <View style={styles.CurrencyContainer}>

                                    <View style={styles.EarningPriceItemContainer}>
                                        <TextInput
                                            style={styles.EarningPriceInput}
                                            placeholder={"Earning"}
                                            keyboardType="numeric"
                                            name={"Earning"}
                                            value={getEarn.toString()}
                                            onChangeText={setEarn}
                                        />
                                        <TouchableOpacity
                                            style={styles.EarningPriceButtonContainer}
                                            onPress={() => {
                                                setBottomSheet("CurrencyList");
                                                setEarning(true);
                                                BottomSheetRef.current.open();

                                            }}>
                                            {CurrencyTypeList.map((item, index) => (
                                                <View key={index}>
                                                    {item.CURRENCY_ID === getEarnCurrencyID &&
                                                        <Text>{item.ICON}</Text>
                                                    }
                                                </View>
                                            ))}
                                            <Icon name="caret-down" size={20} color="silver" />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.EarningPriceItemContainer}>
                                        <TextInput
                                            style={styles.EarningPriceInput}
                                            placeholder={"Price"}
                                            keyboardType="numeric"
                                            name={"Price"}
                                            value={getPrice.toString()}
                                            onChangeText={setPrice}
                                        />
                                        <TouchableOpacity
                                            style={styles.EarningPriceButtonContainer}
                                            onPress={() => {
                                                setBottomSheet("CurrencyList");
                                                setEarning(false);
                                                BottomSheetRef.current.open();

                                            }}>
                                            {CurrencyTypeList.map((item, index) => (
                                                <View key={index}>
                                                    {item.CURRENCY_ID === getPriceCurrencyID &&
                                                        <Text>{item.ICON}</Text>
                                                    }
                                                </View>
                                            ))}

                                            <Icon name="caret-down" size={20} color="silver" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: "100%" }}>
                                        <CheckBox
                                            center
                                            title="Dead"
                                            checkedIcon="dot-circle-o"
                                            uncheckedIcon="circle-o"
                                            style={{ margin: 0 }}
                                            checked={DeadCheckBox}
                                            onPress={() => setDeadCheckBox(!DeadCheckBox)}
                                        />
                                    </View>


                                </View>

                                <View style={styles.OneValueInLine}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("ColorList");
                                            BottomSheetRef.current.open();
                                        }}
                                        style={styles.InputTouchableContainer}>
                                        <Icon name="palette" size={20} color="#2169ab" />
                                        {ColorList.map((item, index) => (
                                            <View key={index}>
                                                {item.COLOR_ID === getColorID &&
                                                    <Text>{item.COLOR_TEXT}</Text>
                                                }
                                            </View>
                                        ))}

                                        <Text style={styles.InputText}></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setColorText("Select a Color")
                                    }}>
                                        <Icon name="times-circle" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.OneValueInLine}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("Family");
                                            BottomSheetRef.current.open();
                                        }}
                                        style={styles.InputTouchableContainer}>
                                        <Icon name="horse" size={20} color="#2169ab" />
                                        {getFamily.map((item, index) => (
                                            <View key={index}>
                                                {item.FAMILY_ID === getFamilyID &&
                                                    <Text>{item.FAMILY_TEXT}</Text>
                                                }
                                            </View>
                                        ))}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setColorText("Select a Family")
                                    }}>
                                        <Icon name="times-circle" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.CoachOwnerContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("Owner")
                                            setCoachBreederOwner("Owner")
                                            BottomSheetRef.current.open()
                                        }}
                                        style={styles.ThreeValueInLineButton}>
                                        <Text>{getOwner}</Text>

                                        <Icon name="plus-circle" size={24} color="silver" />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("Owner")
                                            setCoachBreederOwner("Coach")
                                            BottomSheetRef.current.open()
                                        }}
                                        style={styles.ThreeValueInLineButton}>
                                        <Text>{getCoach}</Text>
                                        <Icon name="plus-circle" size={24} color="silver" />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("Owner")
                                            setCoachBreederOwner("Breeder")
                                            BottomSheetRef.current.open()
                                        }}
                                        style={styles.ThreeValueInLineButton}>
                                        <Text>{getBreeder}</Text>
                                        <Icon name="plus-circle" size={24} color="silver" />
                                    </TouchableOpacity>

                                </View>

                                <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                                    <Text style={{ fontWeight: '700', alignSelf: 'center', fontSize: 16 }}>Ref 1: </Text>
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Ref1"}
                                        name={"Ref1"}
                                        keyboardType="numeric"
                                        value={getRef1.toString()}
                                        onChangeText={setRef1}
                                    />
                                </View>

                                <View style={styles.TextInputContainer}>
                                    <Text style={{ fontWeight: '700', alignSelf: 'center', fontSize: 16 }}>Ref 2: </Text>
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Ref2"}
                                        name={"Ref2"}
                                        keyboardType="numeric"
                                        value={getRef2.toString()}
                                        onChangeText={setRef2}
                                    />
                                </View>

                                <View style={[styles.OneValueInLine, { marginTop: 50 }]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("RomanMiller")
                                            BottomSheetRef.current.open();

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

                                <View style={[styles.OneValueInLine]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("ANZ")
                                            BottomSheetRef.current.open();
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

                                <View style={[styles.OneValueInLine]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheet("PA")
                                            BottomSheetRef.current.open();
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

                                <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                                    <Text style={{ fontWeight: '700', alignSelf: 'center', fontSize: 16 }}>Header: </Text>
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Header"}
                                        name={"Header"}
                                        value={getHeader}
                                        onChangeText={setHeader}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    <Text style={{ fontWeight: '700', alignSelf: 'center', fontSize: 16 }}>Paragraph: </Text>
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Info"}
                                        name={"Info"}
                                        value={getInfo}
                                        onChangeText={setInfo}
                                        multiline={true}
                                    />
                                </View>



                                <BlueButton
                                    onPress={() => {
                                        readUpdateAHorse();
                                    }}
                                    style={{ marginVertical: 20 }}
                                    title="Update"
                                />

                            </View>
                        </ScrollView>
                    }
                </>

                :
                <>
                    <SearchBar
                        placeholder="Please type here and press enter .. "
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
                            title="Edit"
                            style={{ width: '95%' }}
                            onPress={() => {
                                readHorseGetByName();
                                BottomSheetLong.current.open();
                            }}
                        />
                    </View>
                </>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: "100%",
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
    TextInputContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5
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
    CurrencyContainer: {
        marginVertical: 30
    },
    EarningPriceItemContainer: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between',
        borderRadius: 8,
        borderColor: 'silver',
        borderWidth: 0.5,
        marginVertical: 5,
        justifyContent: 'center',
        alignSelf: 'center'
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
    CoachOwnerContainer: {
        marginVertical: 10
    },
    ThreeValueInLineButton: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        alignItems: 'center'
    },
})