import React from 'react'
import { View, StyleSheet, ScrollView, Text, Alert, TextInput, TouchableOpacity, ActivityIndicator, Dimensions, Image } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";
import { BlueButton } from '../components/BlueButton';
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { SearchBar, ListItem } from 'react-native-elements'

export function ManagementStallionsMareStatisticsScreen({ navigation }) {

    const BottomSheetLong = React.useRef()
    const BottomSheetSmall = React.useRef()

    const [isEditting, setIsEditting] = React.useState(false)

    const [getBottomSheetText, setBottomSheetText] = React.useState();

    const [getParentPageData, setParentPageData] = React.useState();
    const [geHorseNameData, seHorseNameData] = React.useState();
    const [getOwnerBreederData, setOwnerBreederData] = React.useState();
    const [getRegistrationData, setRegistrationData] = React.useState();
    const [getBlogCategoryData, setBlogCategoryData] = React.useState();
    const [CurrencyTypeList, setCurrencyList] = React.useState()

    const [getLoading, setLoading] = React.useState(true);
    const [showAddProfileForm, setShowAddProfileForm] = React.useState(false)
    const [getSearchValue, setSearchValue] = React.useState();
    const [getSearchValueForOwnerBreeder, setSearchValueForOwnerBreeder] = React.useState()
    const [getLoadingForTable, setLoadingForTable] = React.useState(false)



    const [getID, setID] = React.useState(0)
    const [getParentId, setParentID] = React.useState("")
    const [earningText, setEarningText] = React.useState("$")
    const [getEarnCurrencyID, setEarnCurrencyID] = React.useState(1)

    const [getSireMareNameForm, setSireMareNameForm] = React.useState();
    const [getSireMareIDForm, setSireMareIDForm] = React.useState();
    const [getRelatedPersonForm, setRelatedPersonForm] = React.useState();
    const [getRelatedPersonIDForm, setRelatedPersonIDForm] = React.useState();
    const [getRegistrationForm, setRegistrationForm] = React.useState();
    const [getRegistrationIDForm, setRegistrationIDForm] = React.useState();
    const [getBlogCategoryName, setBlogCategoryName] = React.useState()
    const [getBlogCategoryID, setBlogCategoryID] = React.useState()
    const [getFoal, setFoal] = React.useState();
    const [getRacingFoal, setRacingFoal] = React.useState();
    const [getRaceWinnerFoal, setRaceWinnerFoal] = React.useState();
    const [getGroupRaceWinnerFoal, setGroupRaceWinnerFoal] = React.useState();
    const [getBlackTypeFoal, setBlackTypeFoal] = React.useState();
    const [getStart, setStart] = React.useState();
    const [getFirst, setFirst] = React.useState();
    const [getSecond, setSecond] = React.useState();
    const [getThird, setThird] = React.useState();
    const [getFourth, setFourth] = React.useState();
    const [getLink, setLink] = React.useState();
    const [getCoverLink, setCoverLink] = React.useState();
    const [getFacebook, setFacebook] = React.useState();
    const [getInstagram, setInstagram] = React.useState();
    const [getTwitter, setTwitter] = React.useState();
    const [getWebsite, setWebsite] = React.useState();
    const [getEarning, setEarning] = React.useState();
    const [getEarnCurrecyObject, setEarnCurrencyObject] = React.useState()
    const [getRegistrationObject, setRegistrationObject] = React.useState()
    const [getSystemUserObject, setSystemUserObject] = React.useState();
    const [getParentPageID, setParentPageID] = React.useState();

    const [checkStateMultiSireName, setcheckStateMultiSireName] = React.useState({ checked: [] });
    const [checkStateMultiSireNameString, setcheckStateMultiSireNameString] = React.useState({ checkedString: [] });

    const [loadingForData, setLoadingForData] = React.useState(false)

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
    const readGetParentPage = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/ParentPage/Get?p_iId=' + getID + '&p_sParentId=' + getParentId + '&p_iPageNo=' + 1 + '&p_iPageCount=' + 100, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setParentPageData(json.m_cData)
                        setLoading(false)
                        setLoadingForTable(false)
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
                fetch('https://api.pedigreeall.com/SystemUser/GetOwnerBreederByName?p_sName=' + getSearchValueForOwnerBreeder, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setOwnerBreederData(json.m_cData)
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
                        setRegistrationData(json.m_cData)
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

    const readGetBlogCategory = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/BlogCategory/Get?p_iSelection=' + 1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setBlogCategoryData(json.m_cData)
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

    const readGeHorseName = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/GetByName?p_sName=' + getSearchValue, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
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

    const readDataCurrencyList = async () => {
        fetch('https://api.pedigreeall.com/Currency/Get', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
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

    const readParentPageUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/ParentPage/Update', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "BLOG_CATEGORY_ID": getBlogCategoryID,
                        "B_WINNER_FOAL": getBlackTypeFoal,
                        "COVER_LINK": getCoverLink,
                        "EARN": getEarning,
                        "EARN_CURRENCY_OBJECT": getEarnCurrecyObject,
                        "FACEBOOK": getFacebook,
                        "FIRST": getFirst,
                        "FOAL": getFoal,
                        "FOURTH": getFourth,
                        "G_WINNER_FOAL": getGroupRaceWinnerFoal,
                        "INSTAGRAM": getInstagram,
                        "LINK": getLink,
                        "PARENT_ID": getSireMareIDForm,
                        "PARENT_PAGE_ID": getParentPageID,
                        "PARENT_TEXT": getSireMareNameForm,
                        "RACE_FOAL": getRacingFoal,
                        "REGISTRATION": getRegistrationObject,
                        "SECOND": getSecond,
                        "START": getStart,
                        "SYSTEM_USER": getSystemUserObject,
                        "THIRD": getThird,
                        "TWITTER": getTwitter,
                        "WEB_SITE": getWebsite,
                        "WINNER_FOAL": getRaceWinnerFoal,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            setIsEditting(false)
                            setShowAddProfileForm(false)
                            setSireMareIDForm("")
                            setSireMareNameForm("")
                            setRelatedPersonForm("")
                            setRelatedPersonIDForm("")
                            setSystemUserObject([])
                            setRegistrationForm("")
                            setRegistrationIDForm("")
                            setRegistrationObject([])
                            setFoal("")
                            setRacingFoal("")
                            setRaceWinnerFoal("")
                            setGroupRaceWinnerFoal("")
                            setBlackTypeFoal("")
                            setStart("")
                            setFirst("")
                            setSecond("")
                            setThird("")
                            setFourth("")
                            setLink("")
                            setCoverLink("")
                            setFacebook("")
                            setInstagram("")
                            setTwitter("")
                            setWebsite("")
                            setEarning("")
                            setEarnCurrencyObject([])
                            setEarningText("$")
                            setBlogCategoryID("")
                            setParentPageID("")
                            setBlogCategoryName("")
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

    const readParentPageAdd = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/ParentPage/Add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "BLOG_CATEGORY_ID": getBlogCategoryID,
                        "B_WINNER_FOAL": getBlackTypeFoal,
                        "COVER_LINK": getCoverLink,
                        "EARN": getEarning,
                        "EARN_CURRENCY_OBJECT": getEarnCurrecyObject,
                        "FACEBOOK": getFacebook,
                        "FIRST": getFirst,
                        "FOAL": getFoal,
                        "FOURTH": getFourth,
                        "G_WINNER_FOAL": getGroupRaceWinnerFoal,
                        "INSTAGRAM": getInstagram,
                        "LINK": getLink,
                        "PARENT_ID": getSireMareIDForm,
                        "PARENT_PAGE_ID": getParentPageID,
                        "PARENT_TEXT": getSireMareNameForm,
                        "RACE_FOAL": getRacingFoal,
                        "REGISTRATION": getRegistrationObject,
                        "SECOND": getSecond,
                        "START": getStart,
                        "SYSTEM_USER": getSystemUserObject,
                        "THIRD": getThird,
                        "TWITTER": getTwitter,
                        "WEB_SITE": getWebsite,
                        "WINNER_FOAL": getRaceWinnerFoal,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            setIsEditting(false)
                            setShowAddProfileForm(false)
                            setSireMareIDForm("")
                            setSireMareNameForm("")
                            setRelatedPersonForm("")
                            setRelatedPersonIDForm("")
                            setSystemUserObject([])
                            setRegistrationForm("")
                            setRegistrationIDForm("")
                            setRegistrationObject([])
                            setFoal("")
                            setRacingFoal("")
                            setRaceWinnerFoal("")
                            setGroupRaceWinnerFoal("")
                            setBlackTypeFoal("")
                            setStart("")
                            setFirst("")
                            setSecond("")
                            setThird("")
                            setFourth("")
                            setLink("")
                            setCoverLink("")
                            setFacebook("")
                            setInstagram("")
                            setTwitter("")
                            setWebsite("")
                            setEarning("")
                            setEarnCurrencyObject([])
                            setEarningText("$")
                            setBlogCategoryID("")
                            setParentPageID("")
                            setBlogCategoryName("")
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
        readGetParentPage()
        readGeHorseName()
        readGetOwnerBreeder()
        readGetRegistration()
        readGetBlogCategory()
        readDataCurrencyList()
    }, [])

    React.useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            readGetParentPage()
        });

        return () => {
            unsubscribe;
        };
    }, [navigation]);


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

                        let SireID
                        if (checkStateMultiSireName.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiSireName.checked.length; i++) {
                                if (i === 0) {
                                    SireID = checkStateMultiSireName.checked[0]
                                }
                                else {
                                    SireID += "," + checkStateMultiSireName.checked[i]
                                }
                            }
                        }
                        setParentID(SireID);

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
                                    readGeHorseName();
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

                        || getBottomSheetText === "SireMareForm" &&

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
                                    readGeHorseName();
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
                                                setSireMareNameForm(item.HORSE_NAME)
                                                setSireMareIDForm(item.ID)
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

                        || getBottomSheetText === "RelatedPersonForm" &&

                        <>
                            <SearchBar
                                placeholder={getSearchValueForOwnerBreeder}
                                lightTheme
                                platform="ios"
                                cancelButtonTitle=""
                                inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                containerStyle={{ backgroundColor: 'transparent', }}
                                inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                                rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                value={getSearchValueForOwnerBreeder}
                                onChangeText={setSearchValueForOwnerBreeder}
                                onSubmitEditing={() => {
                                    readGetOwnerBreeder();
                                }}
                                showLoading={true}
                            />

                            {getOwnerBreederData !== undefined &&

                                <ScrollView>
                                    {getOwnerBreederData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setRelatedPersonForm(item.NAME)
                                                setRelatedPersonIDForm(item.ID)
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

                        || getBottomSheetText === "BlogKategoriForm" &&

                        <>
                            {getBlogCategoryData !== undefined &&

                                <ScrollView>
                                    {console.log(getBlogCategoryData)}
                                    {getBlogCategoryData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setBlogCategoryName(item.BLOG_CATEGORY_EN)
                                                setBlogCategoryID(item.BLOG_CATEGORY_ID)
                                                BottomSheetLong.current.close()
                                            }}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.BLOG_CATEGORY_EN}</ListItem.Title>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    ))}
                                </ScrollView>

                            }
                        </>

                        || getBottomSheetText === "CurrencyList" &&

                        <>
                            {CurrencyTypeList !== undefined &&
                                <ScrollView>
                                    {CurrencyTypeList.filter((x) => x.ICON).map(
                                        (item, i) => (
                                            <ListItem
                                                key={i}
                                                bottomDivider
                                                button
                                                onPress={() => {
                                                    setEarningText(item.ICON)
                                                    setEarnCurrencyID(item.CURRENCY_ID)
                                                    setEarnCurrencyObject(item)
                                                    BottomSheetLong.current.close()
                                                }} >
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.ICON}</ListItem.Title>
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

                    {getBottomSheetText === "RegistrationTypeForm" &&

                        <>
                            {getRegistrationData !== undefined &&

                                <ScrollView>
                                    {getRegistrationData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            bottomDivider
                                            button
                                            onPress={() => {
                                                setRegistrationForm(item.REGISTRATION_EN)
                                                setRegistrationIDForm(item.REGISTRATION_ID)
                                                setRegistrationObject(item)
                                                BottomSheetSmall.current.close()
                                            }}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.REGISTRATION_EN}</ListItem.Title>
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
                        setShowAddProfileForm(true)
                        setSireMareIDForm()
                        setSireMareNameForm()
                        setRelatedPersonForm()
                        setRelatedPersonIDForm()
                        setRegistrationForm()
                        setRegistrationIDForm()
                        setFoal("")
                        setRacingFoal("")
                        setRaceWinnerFoal("")
                        setGroupRaceWinnerFoal("")
                        setBlackTypeFoal("")
                        setStart("")
                        setFirst("")
                        setSecond("")
                        setThird("")
                        setFourth("")
                        setLink("")
                        setCoverLink("")
                        setFacebook("")
                        setInstagram("")
                        setTwitter("")
                        setWebsite("")
                        setEarning("")
                        setBlogCategoryID()
                        setBlogCategoryName()
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

            {showAddProfileForm ?

                <ScrollView style={{ padding: 10 }}>
                    <View >
                        <TouchableOpacity
                            onPress={() => {
                                setShowAddProfileForm(false)
                            }}
                            style={{ width: '100%', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', marginBottom: 10 }}>
                            <Icon name="chevron-left" size={24} color="silver" />
                            <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.OneValueInLine]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("SireMareForm")
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {getSireMareNameForm !== undefined ?
                                <Text style={styles.InformationText}>{getSireMareNameForm}</Text>
                                :
                                <Text style={styles.InformationText}>Sire | Mare</Text>
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
                                setBottomSheetText("RelatedPersonForm")
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {getRelatedPersonForm !== undefined ?
                                <Text style={styles.InformationText}>{getRelatedPersonForm}</Text>
                                :
                                <Text style={styles.InformationText}>Related Person</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                //setBMSireName("Sire Name");
                                //setBmSireID("");
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.RequestStatusConatiner}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("RegistrationTypeForm")
                                BottomSheetSmall.current.open()

                            }}
                            style={styles.OneValueInLineButton}>
                            <Icon name="circle" size={20} color="#2169ab" />
                            {getRegistrationForm !== undefined ?
                                <Text style={styles.InformationText}>{getRegistrationForm}</Text>
                                :
                                <Text style={styles.InformationText}>Registration Type</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                        <Text style={styles.TextInputHeader}>Foal: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Foal"}
                            keyboardType="numeric"
                            value={getFoal.toString()}
                            onChangeText={setFoal}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Racing Foal: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"RacingFoal"}
                            keyboardType="numeric"
                            value={getRacingFoal.toString()}
                            onChangeText={setRacingFoal}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Race Winner Foal: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"RaceWinnerFoal"}
                            keyboardType="numeric"
                            value={getRaceWinnerFoal.toString()}
                            onChangeText={setRaceWinnerFoal}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Group Race Winner Foal: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"GroupRaceWinnerFoal"}
                            keyboardType="numeric"
                            value={getGroupRaceWinnerFoal.toString()}
                            onChangeText={setGroupRaceWinnerFoal}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Black Type Foal: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"BlackTypeFoal"}
                            keyboardType="numeric"
                            value={getBlackTypeFoal.toString()}
                            onChangeText={setBlackTypeFoal}
                        />
                    </View>

                    <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                        <Text style={styles.TextInputHeader}>Start: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Start"}
                            keyboardType="numeric"
                            value={getStart.toString()}
                            onChangeText={setStart}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>1st: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"1st"}
                            keyboardType="numeric"
                            value={getFirst.toString()}
                            onChangeText={setFirst}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>2nd: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"2nd"}
                            keyboardType="numeric"
                            value={getSecond.toString()}
                            onChangeText={setSecond}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>3rd: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"3rd"}
                            keyboardType="numeric"
                            value={getThird.toString()}
                            onChangeText={setThird}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>4th: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"4th"}
                            keyboardType="numeric"
                            value={getFourth.toString()}
                            onChangeText={setFourth}
                        />
                    </View>

                    <View style={[styles.RequestStatusConatiner, { marginTop: 30 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("BlogKategoriForm")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.OneValueInLineButton}>
                            <Icon name="horse" size={20} color="#2169ab" />
                            {getBlogCategoryName !== undefined ?
                                <Text style={styles.InformationText}>{getBlogCategoryName}</Text>
                                :
                                <Text style={styles.InformationText}>Blog Kategori</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                        <Text style={styles.TextInputHeader}>Link: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Link"}
                            keyboardType="url"
                            value={getLink}
                            onChangeText={setLink}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Cover Link: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"CoverLink"}
                            keyboardType="url"
                            value={getCoverLink}
                            onChangeText={setCoverLink}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Facebook: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Facebook"}
                            keyboardType="url"
                            value={getFacebook}
                            onChangeText={setFacebook}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Instagram: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Instagram"}
                            keyboardType="url"
                            value={getInstagram}
                            onChangeText={setInstagram}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Twitter: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Twitter"}
                            keyboardType="twitter"
                            value={getTwitter}
                            onChangeText={setTwitter}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Web Site: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"WebSite"}
                            keyboardType="url"
                            value={getWebsite}
                            onChangeText={setWebsite}
                        />
                    </View>



                    <View style={styles.EarningPriceItemContainer}>
                        <TextInput
                            style={styles.EarningPriceInput}
                            placeholder={"Earning"}
                            keyboardType="numeric"
                            value={getEarning.toString()}
                            onChangeText={setEarning}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("CurrencyList");
                                BottomSheetLong.current.open();
                            }}
                            style={styles.EarningPriceButtonContainer}>
                            <Text style={styles.EarningPriceButtonText}>{earningText}</Text>
                            <Icon name="caret-down" size={20} color="silver" />
                        </TouchableOpacity>
                    </View>



                    {isEditting ?
                        <BlueButton
                            onPress={() => {
                                setLoadingForData(true)
                                readParentPageUpdate();
                            }}
                            style={{ marginVertical: 20 }}
                            title="Edit"
                        />
                        :
                        <BlueButton
                            onPress={()=>{
                                setLoadingForData(true)
                                readParentPageAdd()
                            }}
                            style={{ marginVertical: 20 }}
                            title="Save"
                        />
                    }


                </ScrollView>

                :
                <ScrollView>

                    <View style={styles.HeaderSearchContainer}>
                        <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                            <Text style={styles.TextInputHeader}>ID: </Text>
                            <TextInput
                                style={styles.HalfInputStyle}
                                placeholder={"ID"}
                                keyboardType="numeric"
                                value={getID.toString()}
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
                                    <Text style={styles.InformationText}>Sire Name</Text>
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

                        <BlueButton
                            onPress={() => {
                                setLoadingForTable(true)
                                setLoading(true)
                                readGetParentPage();
                            }}
                            style={{ marginVertical: 20 }}
                            title="Search"
                        />

                    </View>

                    {getLoadingForTable ?
                        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                            <ActivityIndicator
                                color="#3F51B5"
                                size="large"
                            />
                        </View>
                        :
                        <>

                            {getParentPageData !== undefined ?
                                <>
                                    {getParentPageData.length === 0 ?
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
                                                    <DataTable.Title style={[styles.DataTableTitle]}>ID</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Sire | Mare</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Registration Type</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Foal</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Racing</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Racing %</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Race Win.</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Race Win. %</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Group Race Win.</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Group Race Win. %</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Black Type</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Black Type %</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Start</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Top 4</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Top 4 %</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>1st</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>1st %</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>2nd</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>2nd %</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>3rd</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>3rd %</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>4th</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>4th %</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Earning</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>R. Person</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>URL</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Cover URL</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Web Site</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Facebook</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Instagram</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Twitter</DataTable.Title>
                                                    <DataTable.Title style={styles.DataTableTitle}>Edit</DataTable.Title>
                                                </DataTable.Header>

                                                {getParentPageData.map((item, index) => (
                                                    <DataTable.Row key={index}>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.PARENT_PAGE_ID}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.PARENT_TEXT.substring(0, 8)} ...</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.REGISTRATION.REGISTRATION_EN}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.FOAL}</DataTable.Cell>
                                                        <DataTable.Cell style={[styles.DataTableCellText]}>{item.RACE_FOAL}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.RACE_FOAL_PERCENTAGE} %</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.WINNER_FOAL}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.WINNER_FOAL_PERCENTAGE} %</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.G_WINNER_FOAL}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.G_WINNER_FOAL_PERCENTAGE} %</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.B_WINNER_FOAL}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.B_WINNER_FOAL_PERCENTAGE} %</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.START}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.TOP4}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.TOP4_PERCENTAGE} %</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.FIRST}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.SECOND}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.THIRD}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.FOURTH}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.EARN} {item.EARN_CURRENCY_OBJECT.ICON}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}
                                                            onPress={() => {
                                                                let message = item.SYSTEM_USER.NAME + '/' + item.SYSTEM_USER.CELL_PHONE + '/' + item.SYSTEM_USER.EMAIL
                                                                alertDialog('Related Person', message)
                                                            }}
                                                        >
                                                            {item.SYSTEM_USER.NAME.substring(0, 8)}...
                                                        </DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.LINK}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.COVER_LINK}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.WEB_SITE}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.FACEBOOK}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.INSTAGRAM}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>{item.TWITTER}</DataTable.Cell>
                                                        <DataTable.Cell style={styles.DataTableCellText}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setIsEditting(true)
                                                                    setShowAddProfileForm(true)
                                                                    setSireMareIDForm(item.PARENT_ID)
                                                                    setSireMareNameForm(item.PARENT_TEXT)
                                                                    setRelatedPersonForm(item.SYSTEM_USER.NAME)
                                                                    setRelatedPersonIDForm(item.SYSTEM_USER.ID)
                                                                    setSystemUserObject(item.SYSTEM_USER)
                                                                    setRegistrationForm(item.REGISTRATION.REGISTRATION_EN)
                                                                    setRegistrationIDForm(item.REGISTRATION.REGISTRATION_ID)
                                                                    setRegistrationObject(item.REGISTRATION)
                                                                    setFoal(item.FOAL)
                                                                    setRacingFoal(item.RACE_FOAL)
                                                                    setRaceWinnerFoal(item.WINNER_FOAL)
                                                                    setGroupRaceWinnerFoal(item.G_WINNER_FOAL)
                                                                    setBlackTypeFoal(item.B_WINNER_FOAL)
                                                                    setStart(item.START)
                                                                    setFirst(item.FIRST)
                                                                    setSecond(item.SECOND)
                                                                    setThird(item.THIRD)
                                                                    setFourth(item.FOURTH)
                                                                    setLink(item.LINK)
                                                                    setCoverLink(item.COVER_LINK)
                                                                    setFacebook(item.FACEBOOK)
                                                                    setInstagram(item.INSTAGRAM)
                                                                    setTwitter(item.TWITTER)
                                                                    setWebsite(item.WEB_SITE)
                                                                    setEarning(item.EARN)
                                                                    setEarnCurrencyObject(item.EARN_CURRENCY_OBJECT)
                                                                    setEarningText(item.EARN_CURRENCY_OBJECT.ICON)
                                                                    setBlogCategoryID(item.BLOG_CATEGORY_ID)
                                                                    setParentPageID(item.PARENT_PAGE_ID)
                                                                    console.log(getBlogCategoryData)
                                                                    for (let i = 0; i < getBlogCategoryData.length; i++) {
                                                                        if (getBlogCategoryData[i].BLOG_CATEGORY_ID === item.BLOG_CATEGORY_ID) {
                                                                            setBlogCategoryName(getBlogCategoryData[i].BLOG_CATEGORY_EN)
                                                                        }
                                                                    }



                                                                }}
                                                                style={styles.TableActionButtonContainer}>
                                                                <Text style={styles.TableActionButtonText}>Edit</Text>
                                                            </TouchableOpacity>
                                                        </DataTable.Cell>
                                                    </DataTable.Row>
                                                ))}
                                            </DataTable>

                                        </ScrollView>
                                    }
                                </>
                                :
                                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                    <ActivityIndicator
                                        color="#3F51B5"
                                        size="large"
                                    />
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

    TableActionButtonText: {
        color: '#352c2a'
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
    HeaderSearchContainer: {
        padding: 10
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
    RequestStatusConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        padding: 10,
    },
    OneValueInLineButton: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    InformationText: {
        fontSize: 16,
        marginLeft: 10
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