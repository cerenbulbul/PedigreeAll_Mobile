import React from 'react'
import { View, StyleSheet, ScrollView, Text, Alert, TextInput, TouchableOpacity, ActivityIndicator, Dimensions, Image } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";
import { BlueButton } from '../components/BlueButton';
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { SearchBar, ListItem } from 'react-native-elements'

export function ManagementStallionsMareStatisticsScreen() {

    const BottomSheetLong = React.useRef()
    const BottomSheetSmall = React.useRef()

    const [getBottomSheetText, setBottomSheetText] = React.useState();

    const [getParentPageData, setParentPageData] = React.useState();
    const [geHorseNameData, seHorseNameData] = React.useState();
    const [getOwnerBreederData, setOwnerBreederData] = React.useState();
    const [getRegistrationData, setRegistrationData] = React.useState();
    const [getBlogCategoryData, setBlogCategoryData] = React.useState();

    const [getLoading, setLoading] = React.useState(true);
    const [showAddProfileForm, setShowAddProfileForm] = React.useState(false)
    const [getSearchValue, setSearchValue] = React.useState();
    const [getSearchValueForOwnerBreeder, setSearchValueForOwnerBreeder] = React.useState()


    const [getID, setID] = React.useState(0)
    const [getParentId, setParentID] = React.useState("")

    const [getSireMareNameForm, setSireMareNameForm] = React.useState();
    const [getSireMareIDForm, setSireMareIDForm] = React.useState();
    const [getRelatedPersonForm, setRelatedPersonForm] = React.useState();
    const [getRelatedPersonIDForm, setRelatedPersonIDForm] = React.useState();
    const [getRegistrationForm, setRegistrationForm] = React.useState();
    const [getRegistrationIDForm, setRegistrationIDForm] = React.useState();
    const [getBlogCategoryName, setBlogCategoryName] = React.useState()
    const [getBlogCategoryID, setBlogCategoryID] = React.useState()

    const [checkStateMultiSireName, setcheckStateMultiSireName] = React.useState({ checked: [] });
    const [checkStateMultiSireNameString, setcheckStateMultiSireNameString] = React.useState({ checkedString: [] });

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

    React.useEffect(() => {
        readGetParentPage()
        readGeHorseName()
        readGetOwnerBreeder()
        readGetRegistration()
        readGetBlogCategory()
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
                        {console.log(getBlogCategoryData)}
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
                        setShowAddProfileForm(true)
                    }}>
                    <Icon name="plus" size={16} color="#fff" style={{ justifyContent: 'center' }} />
                </TouchableOpacity>

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
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Racing Foal: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"RacingFoal"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Race Winner Foal: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"RaceWinnerFoal"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Group Race Winner Foal: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"GroupRaceWinnerFoal"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Black Type Foal: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"BlackTypeFoal"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                        <Text style={styles.TextInputHeader}>Start: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Start"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>1st: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"1st"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>2nd: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"2nd"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>3rd: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"3rd"}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>4th: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"4th"}
                            keyboardType="numeric"
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
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Cover Link: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"CoverLink"}
                            keyboardType="url"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Facebook: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Facebook"}
                            keyboardType="url"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Instagram: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Instagram"}
                            keyboardType="url"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Twitter: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Twitter"}
                            keyboardType="twitter"
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Web Site: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"WebSite"}
                            keyboardType="url"
                        />
                    </View>

                    <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                        <Text style={styles.TextInputHeader}>Earning: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Earning"}
                            keyboardType="numeric"
                        />
                    </View>

                    <BlueButton
                        style={{ marginVertical: 20 }}
                        title="Save"
                    />

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
                                    //setBMSireName("Sire Name");
                                    //setBmSireID("");
                                }}>
                                <Icon name="times-circle" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <BlueButton
                            onPress={() => {
                                setLoading(true)
                                readGetParentPage();
                            }}
                            style={{ marginVertical: 20 }}
                            title="Search"
                        />

                    </View>

                    {getLoading ?
                        <ActivityIndicator size="large" color="#000" />
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
                                                            <TouchableOpacity style={styles.TableActionButtonContainer}>
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
                                <View style={styles.ErrorMessageContainer}>
                                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
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
})