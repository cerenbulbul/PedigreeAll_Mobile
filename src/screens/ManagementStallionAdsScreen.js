import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Dimensions, Image } from 'react-native'
import { BlueButton } from '../components/BlueButton';
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { SearchBar, ListItem } from 'react-native-elements'

export function ManagementStallionAdsScreen() {

    const BottomSheetLong = React.useRef()

    const [getBottomSheetText, setBottomSheetText] = React.useState();
    const [getSearchValue, setSearchValue] = React.useState();

    const [getStallionAdsData, setStallionAdsData] = React.useState()
    const [geHorseNameData, seHorseNameData] = React.useState();
    const [getYearData, setYearData] = React.useState();
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
                    '&p_sSireId=' + SireID + '&p_sYearId=' + YearID + '&p_iPageNo=' + 1 + '&p_iPageCount=' + 100, {
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

    React.useEffect(() => {
        readGetStallionAds(-1, '', '')
        readGetHorseName();
        readGetYear();
        readDataCurrencyList();
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

                    }

                </View>
            </RBSheet>

            {showAddProfileForm ?
                null
                :
                <TouchableOpacity
                    style={styles.FilteringContainer}
                    onPress={() => {
                        setShowReport(true)
                        setShowAddProfileForm(true)
                    }}>
                    <Icon name="plus" size={16} color="#fff" style={{ justifyContent: 'center' }} />
                </TouchableOpacity>

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
                                setBottomSheetText("YearForm")
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {getYearForm !== undefined ?
                                <Text style={styles.InformationText}>{getYearForm}</Text>
                                :
                                <Text style={styles.InformationText}>Year</Text>
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
                                setBottomSheetText("PlaceForm")
                                BottomSheetLong.current.open()
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {getPlaceForm !== undefined ?
                                <Text style={styles.InformationText}>{getPlaceForm}</Text>
                                :
                                <Text style={styles.InformationText}>Place</Text>
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
                            placeholder={"Fee"}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("FeeForm");
                                BottomSheetLong.current.open();
                            }}
                            style={styles.EarningPriceButtonContainer}>
                            {getCurrencyTypeText !== undefined ?
                                <Text style={styles.EarningPriceButtonText}>{getCurrencyTypeText}</Text>
                                :
                                <Text style={styles.EarningPriceButtonText}>TL</Text>
                            }

                            <Icon name="caret-down" size={20} color="silver" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                        <Text style={styles.TextInputHeader}>Quota: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Quota"}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Mare: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Mare"}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Pregnant: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Pregnant"}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Empty: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Empty"}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Uncheked: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Uncheked"}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Dead Mare: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Dead Mare"}
                        />
                    </View>

                    <View style={[styles.TextInputContainer]}>
                        <Text style={styles.TextInputHeader}>Alive Fool: </Text>
                        <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Alive Fool"}
                        />
                    </View>

                    <BlueButton
                        style={{ marginVertical: 20 }}
                        title="Save"
                    />

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

                    <View style={[styles.OneValueInLine]}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("Year")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.InputTouchableContainer}>
                            <Icon name="plus-circle" size={24} color="#2169ab" />
                            {checkStateMultiYearString.checkedString.length === 0 ?
                                <Text style={styles.InformationText}>Year</Text>
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
                        title="Search"
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
                                            <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                            <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                            <Text style={styles.ErrorMessageText}>You can search again.</Text>
                                        </View>
                                        :
                                        <ScrollView horizontal={true}>

                                            <DataTable>
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