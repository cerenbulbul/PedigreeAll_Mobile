import React, { useRef } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    ActivityIndicator,
    Alert
} from 'react-native'
import Title from '../components/Title';
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import { BlueButton } from '../components/BlueButton';
import Icon from "react-native-vector-icons/FontAwesome5";
import { ListItem, SearchBar } from "react-native-elements";
import { Global } from "../Global";


export function ManagementMemberScreen() {

    const BottomSheetSmall = useRef();
    const BottomSheetLong = useRef();

    const [visible, setVisible] = React.useState(false)

    const [showReport, setShowReport] = React.useState(false);
    const [getBottomSheetText, setBottomSheetText] = React.useState();
    const [getIsLoading, setIsLoading] = React.useState(false);
    const [getLoadingForTable, setLoadingForTable] = React.useState(false)
    const [openAddNewMemberForm, setOpenAddNewMemberForm] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState()

    const [getSystemUserTypeData, setSystemUserTypeData] = React.useState();
    const [getPersonTypeData, setPersonTypeData] = React.useState();
    const [getActiveData, setActiveData] = React.useState();
    const [getApprovedData, setApprovedData] = React.useState();
    const [getSystemUserData, setSystemUserData] = React.useState()
    const [getCountryData, setCountryData] = React.useState()

    const [getCountryText, setCountryText] = React.useState("")


    const [getSystemUserID, setSystemUserID] = React.useState("")
    const [getSystemUserTypeID, setSystemUserTypeID] = React.useState("")
    const [getPersonTypeID, setPersonTypeID] = React.useState("")
    const [getName, setName] = React.useState("")
    const [getSurname, setSurname] = React.useState("")
    const [getEmail, setEmail] = React.useState("")
    const [getTitle, setTitle] = React.useState("")
    const [getID, setID] = React.useState("")
    const [getTaxOffice, setTaxOffice] = React.useState("")
    const [getCountryID, setCountryID] = React.useState("")
    const [getAddress, setAddress] = React.useState("")
    const [getCellPhone, setCellPhone] = React.useState("")
    const [getApproved, setApproved] = React.useState("")
    const [getActive, setActive] = React.useState("")


    const [checkStateMultiPersonType, setcheckStateMultiPersonType] = React.useState({ checked: [] });
    const [checkStateMultiPersonTypeString, setcheckStateMultiPersonTypeString] = React.useState({ checkedString: [] });
    const [checkStateMultiUserType, setcheckStateMultiUserType] = React.useState({ checked: [] });
    const [checkStateMultiUserTypeString, setcheckStateMultiUserTypeString] = React.useState({ checkedString: [] });
    const [checkStateMultiActive, setcheckStateMultiActive] = React.useState({ checked: [] });
    const [checkStateMultiActiveString, setcheckStateMultiActiveString] = React.useState({ checkedString: [] });
    const [checkStateMultiApproved, setcheckStateMultiApproved] = React.useState({ checked: [] });
    const [checkStateMultiApprovedString, setcheckStateMultiApprovedString] = React.useState({ checkedString: [] });

    const [checkStateMultiUserTypeForm, setcheckStateMultiUserTypeForm] = React.useState({ checked: [] });
    const [checkStateMultiUserTypeFormString, setcheckStateMultiUserTypeFormString] = React.useState({ checkedString: [] });
    const [checkStateMultiPersonTypeForm, setcheckStateMultiPersonTypeForm] = React.useState({ checked: [] });
    const [checkStateMultiPersonTypeFormString, setcheckStateMultiPersonTypeFormString] = React.useState({ checkedString: [] });


    const [getSystemUserTypeIDForAdding, setSystemUserTypeIDForAdding] = React.useState("1");
    const [getSystemUserIDForAdding, setSystemUserIDForAdding] = React.useState(-1);
    const [getSystemPersonTypeIDForAdding, setSystemPersonTypeIDForAdding] = React.useState("1");
    const [getNameForAdding, setNameForAdding] = React.useState("")
    const [getSurnameForAdding, setSurnameForAdding] = React.useState("")
    const [getEmailForAdding, setEmailForAdding] = React.useState("")
    const [getPasswordForAdding, setPasswordForAdding] = React.useState("")
    const [getPasswordAgainForAdding, setPasswordAgainForAdding] = React.useState("")
    const [getTitleForAdding, setTitleForAdding] = React.useState("")
    const [getIDForAdding, setIDForAdding] = React.useState("")
    const [getTaxOfficeForAdding, setTaxOfficeForAdding] = React.useState("")
    const [getCountryIDForAdding, setCountryIDForAdding] = React.useState("0")
    const [getAddressForAdding, setAddressForAdding] = React.useState("")
    const [getCellPhoneForAdding, setCellPhoneForAdding] = React.useState("")
    const [getBreederIDForAdding, setBreederIDForAdding] = React.useState("")
    const [getOwnerIDForAdding, setOwnerIDForAdding] = React.useState("")
    const [getCoachIDForAdding, setCoachIDForAdding] = React.useState("")
    const [getJockeyIDForAdding, setJockeyIDForAdding] = React.useState("")
    const [getIBANForAdding, setIBANForAdding] = React.useState("")

    const [getViewName, setViewName] = React.useState()


    const pressUserType = item => {
        const { checked } = checkStateMultiUserType;
        const { checkedString } = checkStateMultiUserTypeString;
        if (!checked.includes(item.SYSTEM_USER_TYPE_ID)) {
            setcheckStateMultiUserType({ checked: [...checked, item.SYSTEM_USER_TYPE_ID] });
            setcheckStateMultiUserTypeString({ checkedString: [...checkedString, item.SYSTEM_USER_TYPE_EN] })
        } else {
            setcheckStateMultiUserType({ checked: checked.filter(a => a !== item.SYSTEM_USER_TYPE_ID) });
            setcheckStateMultiUserTypeString({ checkedString: checkedString.filter(a => a !== item.SYSTEM_USER_TYPE_EN) });
        }
    }

    const pressPersonType = item => {
        const { checked } = checkStateMultiPersonType;
        const { checkedString } = checkStateMultiPersonTypeString;
        if (!checked.includes(item.PERSON_TYPE_ID)) {
            setcheckStateMultiPersonType({ checked: [...checked, item.PERSON_TYPE_ID] });
            setcheckStateMultiPersonTypeString({ checkedString: [...checkedString, item.PERSON_TYPE_EN] })
        } else {
            setcheckStateMultiPersonType({ checked: checked.filter(a => a !== item.PERSON_TYPE_ID) });
            setcheckStateMultiPersonTypeString({ checkedString: checkedString.filter(a => a !== item.PERSON_TYPE_EN) });
        }
    }

    const pressActive = item => {
        const { checked } = checkStateMultiActive;
        const { checkedString } = checkStateMultiActiveString;
        if (!checked.includes(item.BOOL_ID)) {
            setcheckStateMultiActive({ checked: [...checked, item.BOOL_ID] });
            setcheckStateMultiActiveString({ checkedString: [...checkedString, item.BOOL_EN] })
        } else {
            setcheckStateMultiActive({ checked: checked.filter(a => a !== item.BOOL_ID) });
            setcheckStateMultiActiveString({ checkedString: checkedString.filter(a => a !== item.BOOL_EN) });
        }
    }

    const pressApproved = item => {
        const { checked } = checkStateMultiApproved;
        const { checkedString } = checkStateMultiApprovedString;
        if (!checked.includes(item.BOOL_ID)) {
            setcheckStateMultiApproved({ checked: [...checked, item.BOOL_ID] });
            setcheckStateMultiApprovedString({ checkedString: [...checkedString, item.BOOL_EN] })
        } else {
            setcheckStateMultiApproved({ checked: checked.filter(a => a !== item.BOOL_ID) });
            setcheckStateMultiApprovedString({ checkedString: checkedString.filter(a => a !== item.BOOL_EN) });
        }
    }

    const pressUserTypeForm = item => {
        const { checked } = checkStateMultiUserTypeForm;
        const { checkedString } = checkStateMultiUserTypeFormString;
        if (!checked.includes(item.SYSTEM_USER_TYPE_ID)) {
            setcheckStateMultiUserTypeForm({ checked: [...checked, item.SYSTEM_USER_TYPE_ID] });
            setcheckStateMultiUserTypeFormString({ checkedString: [...checkedString, item.SYSTEM_USER_TYPE_EN] })
        } else {
            setcheckStateMultiUserTypeForm({ checked: checked.filter(a => a !== item.SYSTEM_USER_TYPE_ID) });
            setcheckStateMultiUserTypeFormString({ checkedString: checkedString.filter(a => a !== item.SYSTEM_USER_TYPE_EN) });
        }
    }

    const pressPersonTypeForm = item => {
        const { checked } = checkStateMultiPersonTypeForm;
        const { checkedString } = checkStateMultiPersonTypeFormString;
        if (!checked.includes(item.PERSON_TYPE_ID)) {
            setcheckStateMultiPersonTypeForm({ checked: [...checked, item.PERSON_TYPE_ID] });
            setcheckStateMultiPersonTypeFormString({ checkedString: [...checkedString, item.PERSON_TYPE_EN] })
        } else {
            setcheckStateMultiPersonTypeForm({ checked: checked.filter(a => a !== item.PERSON_TYPE_ID) });
            setcheckStateMultiPersonTypeFormString({ checkedString: checkedString.filter(a => a !== item.PERSON_TYPE_EN) });
        }
    }



    const readPersonTypeList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/PersonType/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setPersonTypeData(json.m_cData)
                        setIsLoading(false)
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

    const readSystemUserTypeList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/SystemUserType/Get', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setSystemUserTypeData(json.m_cData)
                        setIsLoading(false)
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
    const readBoolList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
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
                        setActiveData(json.m_cData)
                        setApprovedData(json.m_cData)
                        setIsLoading(false)
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

    const readGetSystemUser = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/SystemUser/Get', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "SYSTEM_USER_ID": getSystemUserID,
                        "SYSTEM_USER_TYPE_ID": getSystemUserTypeID,
                        "PERSON_TYPE_ID": getPersonTypeID,
                        "NAME": getName,
                        "SURNAME": getSurname,
                        "EMAIL": getEmail,
                        "TITLE": getTitle,
                        "ID": getID,
                        "TAX_OFFICE": getTaxOffice,
                        "COUNTRY_ID": getCountryID,
                        "ADDRESS": getAddress,
                        "CELL_PHONE": getCellPhone,
                        "APPROVED": getApproved,
                        "ACTIVE": getActive,
                        "PAGE_NO": 1,
                        "PAGE_COUNT": 100
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setSystemUserData(json.m_cData)
                        setLoadingForTable(false)
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

    const readCountryGet = async () => {
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
                        setCountryData(json.m_cData)
                        setIsLoading(false)
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

    const readAddSystemUser = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/SystemUser/Add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "SYSTEM_USER_TYPE_OBJECT": {
                            'SYSTEM_USER_TYPE_ID': getSystemUserTypeIDForAdding
                        },
                        "SYSTEM_USER_ID": getSystemUserIDForAdding,

                        "PERSON_TYPE_OBJECT": {
                            'PERSON_TYPE_ID': getSystemPersonTypeIDForAdding
                        },
                        "NAME": getNameForAdding,
                        "SURNAME": getSurnameForAdding,
                        "EMAIL": getEmailForAdding,
                        "PASSWORD": getPasswordForAdding,
                        "TITLE": getTitleForAdding,
                        "ID": getIDForAdding,
                        "TAX_OFFICE": getTaxOfficeForAdding,
                        "COUNTRY_OBJECT": {
                            'COUNTRY_ID': getCountryIDForAdding
                        },
                        "ADDRESS": getAddressForAdding,
                        "CELL_PHONE": getCellPhoneForAdding,
                        "BREEDER_ID": getBreederIDForAdding,
                        "OWNER_ID": getOwnerIDForAdding,
                        "COACH_ID": getCoachIDForAdding,
                        'JOCKEY_ID': getJockeyIDForAdding,
                        "IBAN": getIBANForAdding

                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json)
                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            setOpenAddNewMemberForm(false)
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
        if (Global.Language === 1) {
            setViewName("Görüntüle")
        }
        else {
            setViewName("View")
        }

        readPersonTypeList();
        readSystemUserTypeList();
        readBoolList()
        readCountryGet()

    }, [])

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

    return (
        <View style={styles.Container}>
            {Global.Language === 1 ?
                <Title text="Üyeler" />
                :
                <Title text="Member" />
            }

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

                        let UserTypeID
                        if (checkStateMultiUserType.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiUserType.checked.length; i++) {
                                if (i === 0) {
                                    UserTypeID = checkStateMultiUserType.checked[0]
                                }
                                else {
                                    UserTypeID += "," + checkStateMultiUserType.checked[i]
                                }
                            }
                        }
                        console.log(UserTypeID)
                        setSystemUserTypeID(UserTypeID);

                        let PersonTypeID
                        if (checkStateMultiPersonType.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiPersonType.checked.length; i++) {
                                if (i === 0) {
                                    PersonTypeID = checkStateMultiPersonType.checked[0]
                                }
                                else {
                                    PersonTypeID += "," + checkStateMultiPersonType.checked[i]
                                }
                            }
                        }
                        setPersonTypeID(PersonTypeID);

                        let ActiveID
                        if (checkStateMultiActive.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiActive.checked.length; i++) {
                                if (i === 0) {
                                    ActiveID = checkStateMultiActive.checked[0]
                                }
                                else {
                                    ActiveID += "," + checkStateMultiActive.checked[i]
                                }
                            }
                        }
                        setActive(ActiveID);

                        let ApprovedID
                        if (checkStateMultiApproved.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiApproved.checked.length; i++) {
                                if (i === 0) {
                                    ApprovedID = checkStateMultiApproved.checked[0]
                                }
                                else {
                                    ApprovedID += "," + checkStateMultiApproved.checked[i]
                                }
                            }
                        }
                        setApproved(ApprovedID);


                        BottomSheetSmall.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

                    {getBottomSheetText === "UserTypeList" &&

                        <>
                            {getIsLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getSystemUserTypeData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getSystemUserTypeData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressUserType(item)

                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiUserType.checked.includes(item.SYSTEM_USER_TYPE_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressUserType(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.SYSTEM_USER_TYPE_EN}</ListItem.Title>
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

                        || getBottomSheetText === "MemberTypeList" &&

                        <>
                            {getIsLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getPersonTypeData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getPersonTypeData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressPersonType(item)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiPersonType.checked.includes(item.PERSON_TYPE_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressPersonType(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.PERSON_TYPE_EN}</ListItem.Title>
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

                        || getBottomSheetText === "ActiveList" &&

                        <>
                            {getIsLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getActiveData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getActiveData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressActive(item)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiActive.checked.includes(item.BOOL_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressActive(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.BOOL_EN}</ListItem.Title>
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

                        || getBottomSheetText === "ApprovedList" &&

                        <>
                            {getIsLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getApprovedData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getApprovedData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressApproved(item)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiApproved.checked.includes(item.BOOL_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressApproved(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.BOOL_EN}</ListItem.Title>
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

                        || getBottomSheetText === "UserTypeForFormList" &&

                        <>
                            {getIsLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getSystemUserTypeData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getSystemUserTypeData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressUserTypeForm(item)
                                                setSystemUserTypeIDForAdding(item.SYSTEM_USER_TYPE_ID)

                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiUserTypeForm.checked.includes(item.SYSTEM_USER_TYPE_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressUserTypeForm(item)
                                                    setSystemUserTypeIDForAdding(item.SYSTEM_USER_TYPE_ID)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.SYSTEM_USER_TYPE_EN}</ListItem.Title>
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

                        || getBottomSheetText === "MemberTypeForFormList" &&

                        <>
                            {getIsLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getPersonTypeData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getPersonTypeData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                pressPersonTypeForm(item)
                                                setSystemPersonTypeIDForAdding(item.PERSON_TYPE_ID)
                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiPersonTypeForm.checked.includes(item.PERSON_TYPE_ID)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressPersonTypeForm(item)
                                                    setSystemPersonTypeIDForAdding(item.PERSON_TYPE_ID)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.PERSON_TYPE_EN}</ListItem.Title>
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
                ref={BottomSheetLong}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={Dimensions.get('screen').height - 100}
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

                    {getBottomSheetText === "CountryForFormList" &&
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
                                    readCountryGet();
                                }}
                                showLoading={true}
                            />

                            {getIsLoading && (
                                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#3F51B5"
                                        size="large"
                                    />
                                </View>
                            )}
                            {getCountryData !== undefined ?
                                <ScrollView style={styles.ScrollViewContainer}>
                                    {getCountryData.filter((x) => x.COUNTRY_EN.includes(searchValue)).map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setCountryText(item.COUNTRY_EN)
                                                BottomSheetLong.current.close()
                                                setCountryIDForAdding(item.COUNTRY_ID)
                                            }}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
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

                <View style={styles.SortTypeContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setSystemUserTypeIDForAdding("1")
                            setSystemUserIDForAdding(-1)
                            setSystemPersonTypeIDForAdding("1")
                            setNameForAdding("")
                            setSurnameForAdding("")
                            setEmailForAdding("")
                            setPasswordForAdding("")
                            setPasswordAgainForAdding("")
                            setTitleForAdding("")
                            setIDForAdding("")
                            setTaxOfficeForAdding("")
                            setCountryIDForAdding("0")
                            setAddressForAdding("")
                            setCellPhoneForAdding("")
                            setBreederIDForAdding("")
                            setOwnerIDForAdding("")
                            setCoachIDForAdding("")
                            setJockeyIDForAdding("")
                            setIBANForAdding("")
                            setOpenAddNewMemberForm(true);
                        }}
                        style={styles.SortTypeButton}>
                        <Icon name="plus-circle" size={16} color="#fff" style={{ alignSelf: 'center', marginRight: 5 }} />
                        {Global.Language ===1 ?
                            <Text style={styles.SortTypeButtonText}>Yeni uye ekle</Text>
                            :
                            <Text style={styles.SortTypeButtonText}>Add A New Member</Text>
                        }
                    </TouchableOpacity>
                </View>
                {openAddNewMemberForm ?
                    <>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setSystemUserID(-1);
                                    setSystemUserTypeID("")
                                    setPersonTypeID("")
                                    setName("")
                                    setSurname("")
                                    setEmail("")
                                    setTitle("")
                                    setID("")
                                    setTaxOffice("")
                                    setCountryID("")
                                    setAddress("")
                                    setCellPhone("")
                                    setApproved("")
                                    setActive("")
                                    setOpenAddNewMemberForm(false)
                                }}
                                style={{ width: '100%', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', marginBottom: 10 }}>
                                <Icon name="chevron-left" size={24} color="silver" />
                                {Global.Language ===1?
                                    <Text style={{ fontSize: 16, marginLeft: 10 }}>Geri</Text>
                                    :
                                    <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                                }

                            </TouchableOpacity>
                        </View>

                        <View style={[styles.BottomSheetInputsContainer]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("UserTypeForFormList");
                                    BottomSheetSmall.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="user" size={20} color="#2169ab" />
                                {checkStateMultiUserTypeFormString.checkedString.length === 0 ?
                                    <>
                                    {Global.Language === 1 ?
                                    <Text style={styles.InformationText}>Kullanıcı Tipi</Text>
                                    :
                                    <Text style={styles.InformationText}>User Type</Text>
                                    }
                                    </>
                                    
                                    :
                                    <Text style={styles.InformationText}>{checkStateMultiUserTypeFormString.checkedString}</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                            {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>İsim: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Name: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getNameForAdding}
                                onChangeText={setNameForAdding}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1?
                            <Text style={styles.TextInputHeader}>Soyisim: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Surname: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getSurnameForAdding}
                                onChangeText={setSurnameForAdding}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>E-Posta: </Text>
                            :
                            <Text style={styles.TextInputHeader}>E-mail: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getEmailForAdding}
                                onChangeText={setEmailForAdding}
                            />
                        </View>

                        {visible ?
                            <View style={[styles.TextInputContainer]}>
                                <Text style={styles.TextInputHeader}>Password: </Text>
                                <TextInput
                                    style={styles.HalfInputStyle}
                                    placeholder={"Password"}
                                    secureTextEntry
                                />
                            </View>
                            :
                            null}


                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Şifre: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Password: </Text>
                            }
                            
                            <TextInput
                                secureTextEntry
                                style={styles.HalfInputStyle}
                                value={getPasswordForAdding}
                                onChangeText={setPasswordForAdding}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1?
                            <Text style={styles.TextInputHeader}>Şifre Tekrar: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Password Again: </Text>
                            }
                            
                            <TextInput
                                secureTextEntry
                                style={styles.HalfInputStyle}
                                value={getPasswordAgainForAdding}
                                onChangeText={setPasswordAgainForAdding}
                            />
                        </View>

                        <View style={[styles.BottomSheetInputsContainer, { marginTop: 30 }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("MemberTypeForFormList");
                                    BottomSheetSmall.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="user" size={20} color="#2169ab" />
                                {checkStateMultiPersonTypeFormString.checkedString.length === 0 ?
                                <>
                                {Global.Language === 1?
                                <Text style={styles.InformationText}>Üye Tipi</Text>
                                :
                                <Text style={styles.InformationText}>Member Type</Text>
                                }
                                </>
                                    
                                    :
                                    <Text style={styles.InformationText}>{checkStateMultiPersonTypeFormString.checkedString}</Text>
                                }

                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                            {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Ünvan: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Title: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getTitleForAdding}
                                onChangeText={setTitleForAdding}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Kimlik/Pasaport/Vergi No: </Text>
                            :
                            <Text style={styles.TextInputHeader}>ID/Passport/Tax No: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getIDForAdding}
                                onChangeText={setIDForAdding}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Vergi Dairesi: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Tax Office: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getTaxOfficeForAdding}
                                onChangeText={setTaxOfficeForAdding}
                            />
                        </View>

                        <View style={[styles.BottomSheetInputsContainer, { marginTop: 30 }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBottomSheetText("CountryForFormList");
                                    BottomSheetLong.current.open();
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="flag" size={20} color="#2169ab" />
                                {getCountryText === "" ?
                                    <>
                                        {Global.Language === 1 ?
                                        <Text style={styles.InformationText}>Ülke</Text>
                                        :
                                        <Text style={styles.InformationText}>Country</Text>
                                        }
                                    </>
                                    
                                    :
                                    <Text style={styles.InformationText}>{getCountryText}</Text>
                                }

                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                            {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Adres: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Address: </Text>
                            }
                            
                            <TextInput
                                style={[styles.HalfInputStyle]}
                                multiline={true}
                                value={getAddressForAdding}
                                onChangeText={setAddressForAdding}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1? 
                            <Text style={styles.TextInputHeader}>Telefon: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Phone: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getCellPhoneForAdding}
                                onChangeText={setCellPhoneForAdding}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Antrenör Id: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Coach Id: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getCoachIDForAdding}
                                onChangeText={setCoachIDForAdding}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1 ?
                            <Text style={styles.TextInputHeader}>Yetiştirici Id: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Grower Id: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getBreederIDForAdding}
                                onChangeText={setBreederIDForAdding}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            {Global.Language === 1?
                            <Text style={styles.TextInputHeader}>Sahip  Id: </Text>
                            :
                            <Text style={styles.TextInputHeader}>Owner Id: </Text>
                            }
                            
                            <TextInput
                                style={styles.HalfInputStyle}
                                value={getOwnerIDForAdding}
                                onChangeText={setOwnerIDForAdding}
                            />
                        </View>

                        <View style={styles.ButtonContainer}>
                            <BlueButton
                                onPress={() => {

                                    if (getPasswordForAdding === getPasswordAgainForAdding) {
                                        readAddSystemUser();
                                    }
                                    else {
                                        alertDialog("Passwords are not matching")
                                    }

                                }}
                                title="Save"
                                style={{ width: '95%' }}
                            />
                        </View>

                    </>
                    :
                    <>
                        {showReport ?
                            <>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowReport(false)
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

                                {getLoadingForTable ?
                                    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                        <ActivityIndicator
                                            color="#3F51B5"
                                            size="large"
                                        />
                                    </View>
                                    :

                                    <ScrollView style={styles.ScrollViewContainer}>


                                        <>
                                            {getSystemUserData !== undefined ?
                                                <>
                                                    {getSystemUserData.length === 0 ?
                                                        <View style={styles.ErrorMessageContainer}>
                                                            <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                                                            <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                                            <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                                            <Text style={styles.ErrorMessageText}>You can search again.</Text>
                                                        </View>
                                                        :
                                                        <ScrollView style={styles.ScrollViewContainer}>
                                                            <ScrollView horizontal={true}>

                                                                <DataTable>
                                                                    <DataTable.Header>
                                                                        <DataTable.Title style={{ width: 100 }} >ID</DataTable.Title>
                                                                        {Global.Language === 1 ?
                                                                            <>
                                                                                <DataTable.Title style={{ width: 100 }} >Kullanıcı Tipi</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Üye Tipi</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >İsim</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Soyisim</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >E-Posta</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Kimlik/Pasaport/Vergi No</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }}>Ünvan</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Vergi Dairesi</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Adres</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Aktif</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Onay</DataTable.Title>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <DataTable.Title style={{ width: 100 }} >User Type</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Member Type</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Name</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Surname</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >E-mail</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }}>ID/Passport/Tax</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Title</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Tax Office</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Address</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Active</DataTable.Title>
                                                                                <DataTable.Title style={{ width: 100 }} >Approved</DataTable.Title>
                                                                            </>
                                                                        }

                                                                    </DataTable.Header>
                                                                    {getSystemUserData.map((item, i) => (
                                                                        <DataTable.Row key={i}>
                                                                            <DataTable.Cell style={{ width: 50 }}>{item.SYSTEM_USER_ID}</DataTable.Cell>
                                                                            {Global.Language === 1 ?
                                                                                <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} >{item.SYSTEM_USER_TYPE_OBJECT.SYSTEM_USER_TYPE_TR}</DataTable.Cell>
                                                                                :
                                                                                <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} >{item.SYSTEM_USER_TYPE_OBJECT.SYSTEM_USER_TYPE_EN}</DataTable.Cell>
                                                                            }

                                                                            {Global.Language === 1 ?
                                                                                <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} >{item.PERSON_TYPE_OBJECT.PERSON_TYPE_TR}</DataTable.Cell>
                                                                                :
                                                                                <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} >{item.PERSON_TYPE_OBJECT.PERSON_TYPE_EN}</DataTable.Cell>
                                                                            }


                                                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} >{item.NAME}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }}>{item.SURNAME}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }}>{item.EMAIL}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }}>{item.ID}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }}>{item.TITLE}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }}>{item.TAX_OFFICE}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }}>{item.ADDRESS}</DataTable.Cell>
                                                                            {Global.Language === 1 ?
                                                                                <>
                                                                                    <DataTable.Cell style={{ width: 100 }}>{item.ACTIVE_OBJECT.BOOL_TR}</DataTable.Cell>
                                                                                    <DataTable.Cell style={{ width: 100, }}>{item.APPROVED_OBJECT.BOOL_TR}</DataTable.Cell>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <DataTable.Cell style={{ width: 100 }}>{item.ACTIVE_OBJECT.BOOL_EN}</DataTable.Cell>
                                                                                    <DataTable.Cell style={{ width: 100, }}>{item.APPROVED_OBJECT.BOOL_EN}</DataTable.Cell>
                                                                                </>
                                                                            }

                                                                        </DataTable.Row>
                                                                    )
                                                                    )}
                                                                </DataTable>

                                                            </ScrollView>
                                                        </ScrollView>}
                                                </>
                                                :
                                                <View style={styles.ErrorMessageContainer}>
                                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                                                </View>
                                            }
                                        </>



                                    </ScrollView>

                                }
                            </>
                            :
                            <>

                                <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                                    <Text style={styles.TextInputHeader}>ID: </Text>
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"ID"}
                                        value={getSystemUserID}
                                        onChangeText={setSystemUserID}
                                    />
                                </View>


                                <View style={[styles.BottomSheetInputsContainer, { marginTop: 30 }]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheetText("UserTypeList");
                                            BottomSheetSmall.current.open();
                                        }}
                                        style={styles.OneValueInLineButton}>
                                        <Icon name="user" size={20} color="#2169ab" />
                                        {checkStateMultiUserTypeString.checkedString.length === 0 ?
                                            <>
                                                {Global.Language === 1 ?
                                                    <Text style={styles.InformationText}>Kullanici Tipi</Text>
                                                    :
                                                    <Text style={styles.InformationText}>User Type</Text>
                                                }
                                            </>

                                            :
                                            <Text style={styles.InformationText}>{checkStateMultiUserTypeString.checkedString}</Text>
                                        }

                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.BottomSheetInputsContainer]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheetText("MemberTypeList");
                                            BottomSheetSmall.current.open();
                                        }}
                                        style={styles.OneValueInLineButton}>
                                        <Icon name="user" size={20} color="#2169ab" />
                                        {checkStateMultiPersonTypeString.checkedString.length === 0 ?
                                            <>
                                                {Global.Language === 1 ?
                                                    <Text style={styles.InformationText}>Üye Tipi</Text>
                                                    :
                                                    <Text style={styles.InformationText}>Member Type</Text>
                                                }
                                            </>

                                            :
                                            <Text style={styles.InformationText}>{checkStateMultiPersonTypeString.checkedString}</Text>}

                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                                    {Global.Language === 1 ?
                                        <Text style={styles.TextInputHeader}>İsim: </Text>
                                        :
                                        <Text style={styles.TextInputHeader}>Name: </Text>
                                    }

                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        value={getName}
                                        onChangeText={setName}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    {Global.Language === 1 ?
                                        <Text style={styles.TextInputHeader}>Soyisim: </Text>
                                        :
                                        <Text style={styles.TextInputHeader}>Surname: </Text>
                                    }

                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        value={getSurname}
                                        onChangeText={setSurname}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    {Global.Language === 1 ?
                                        <Text style={styles.TextInputHeader}>E-Posta: </Text>
                                        :
                                        <Text style={styles.TextInputHeader}>E-mail: </Text>
                                    }

                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        keyboardType="email-address"
                                        value={getEmail}
                                        onChangeText={setEmail}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    {Global.Language === 1 ?
                                        <Text style={styles.TextInputHeader}>Kimlik/Pasaport/Vergi No: </Text>
                                        :
                                        <Text style={styles.TextInputHeader}>ID/Passport/tax No: </Text>
                                    }

                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        value={getID}
                                        onChangeText={setID}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    {Global.Language === 1 ?
                                        <Text style={styles.TextInputHeader}>Ünvan: </Text>
                                        :
                                        <Text style={styles.TextInputHeader}>Title: </Text>
                                    }

                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        value={getTitle}
                                        onChangeText={setTitle}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    {Global.Language === 1 ?
                                        <Text style={styles.TextInputHeader}>Vergi Dairesi: </Text>
                                        :
                                        <Text style={styles.TextInputHeader}>Tax Office: </Text>
                                    }

                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        value={getTaxOffice}
                                        onChangeText={setTaxOffice}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    {Global.Language === 1 ?
                                        <Text style={styles.TextInputHeader}>Cep Telefonu: </Text>
                                        :
                                        <Text style={styles.TextInputHeader}>Cell Phone: </Text>
                                    }

                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        keyboardType="phone-pad"
                                        value={getCellPhone.toString()}
                                        onChangeText={setCellPhone}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer]}>
                                    {Global.Language === 1 ?
                                        <Text style={styles.TextInputHeader}>Adres: </Text>
                                        :
                                        <Text style={styles.TextInputHeader}>Address: </Text>
                                    }

                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        value={getAddress}
                                        onChangeText={setAddress}
                                    />
                                </View>

                                <View style={[styles.BottomSheetInputsContainer, { marginTop: 30 }]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheetText("ActiveList");
                                            BottomSheetSmall.current.open();
                                        }}
                                        style={styles.OneValueInLineButton}>
                                        <Icon name="circle" size={20} color="#2169ab" />
                                        {checkStateMultiActiveString.checkedString.length === 0 ?
                                            <>
                                                {Global.Language === 1 ?
                                                    <Text style={styles.InformationText}>Aktif</Text>
                                                    :
                                                    <Text style={styles.InformationText}>Active</Text>
                                                }
                                            </>

                                            :
                                            <Text style={styles.InformationText}>{checkStateMultiActiveString.checkedString}</Text>
                                        }


                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.BottomSheetInputsContainer]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBottomSheetText("ApprovedList");
                                            BottomSheetSmall.current.open();
                                        }}
                                        style={styles.OneValueInLineButton}>
                                        <Icon name="circle" size={20} color="#2169ab" />
                                        {checkStateMultiApprovedString.checkedString.length === 0 ?
                                            <>
                                                {Global.Language === 1 ?
                                                    <Text style={styles.InformationText}>Onay</Text>
                                                    :
                                                    <Text style={styles.InformationText}>Approved</Text>
                                                }
                                            </>

                                            :
                                            <Text style={styles.InformationText}>{checkStateMultiApprovedString.checkedString}</Text>
                                        }


                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.ButtonContainer}>
                                    {getViewName !== undefined &&
                                        <BlueButton
                                            title= "View"
                                            style={{ width: '95%' }}
                                            onPress={() => {
                                                setLoadingForTable(true)
                                                readGetSystemUser()
                                                setShowReport(true)
                                            }}
                                        />
                                    }

                                </View>



                            </>
                        }
                    </>}
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
        width: '50%'
    },
    SortTypeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
})