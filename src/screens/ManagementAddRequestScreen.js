import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import Title from '../components/Title';
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { BlueButton } from '../components/BlueButton';
import { Dimensions } from 'react-native';
import { ListItem } from "react-native-elements";
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'

export function ManagementAddRequestScreen() {
    const BottomSheetSmall = useRef();
    const BottomSheetLong = useRef();

    const [getBottomSheetText, setBottomSheetText] = React.useState();
    const [requestStatusList, setRequestStatusList] = useState()
    const [getSystemUserGetNameAndIDList, setSystemUserGetNameAndIDList] = useState()
    const [getSystemUserGetEditor, setSystemUserGetEditor] = React.useState()

    const [showReport, setShowReport] = useState(false)

    const [getHorseAddRequestData, setHorseAddRequestData] = React.useState();

    const [getAddRequestID, setAddRequestID] = React.useState(-1)
    const [getHorseName, setHorseName] = React.useState("")
    const [getFatherName, setFatherName] = React.useState("")
    const [getMotherName, setMotherName] = React.useState("")
    const [getRequestStatusID, setRequestStatusID] = React.useState()
    const [getStartRequestDate, setStartRequestDate] = React.useState();
    const [getEndRequestDate, setEndRequestDate] = React.useState();
    const [getStartLastActionDate, setStartLastActionDate] = React.useState();
    const [getEndLastActionDate, setEndLastActionDate] = React.useState();
    const [getRequestOwnerID, setRequestOwnerID] = React.useState("")
    const [getEditorID, setEditorID] = React.useState("")

    const [checkStateMultiRequestStatus, setcheckStateMultiRequestStatus] = React.useState({ checked: [] });
    const [checkStateMultiRequestStatusString, setcheckStateMultiRequestStatusString] = React.useState({ checkedString: [] });
    const [checkStateMultiRequestOwner, setcheckStateMultiRequestOwner] = React.useState({ checked: [] });
    const [checkStateMultiRequestOwnerString, setcheckStateMultiRequestOwnerString] = React.useState({ checkedString: [] });
    const [checkStateMultiEditor, setcheckStateMultiEditor] = React.useState({ checked: [] });
    const [checkStateMultiEditorString, setcheckStateMultiEditorString] = React.useState({ checkedString: [] });

    const pressRequestStatus = item => {   // The onPress method
        const { checked } = checkStateMultiRequestStatus;
        const { checkedString } = checkStateMultiRequestStatusString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.REQUEST_STATUS_ID)) {
            setcheckStateMultiRequestStatus({ checked: [...checked, item.REQUEST_STATUS_ID] });
            setcheckStateMultiRequestStatusString({ checkedString: [...checkedString, item.REQUEST_STATUS_EN] })
        } else {
            setcheckStateMultiRequestStatus({ checked: checked.filter(a => a !== item.REQUEST_STATUS_ID) });
            setcheckStateMultiRequestStatusString({ checkedString: checkedString.filter(a => a !== item.REQUEST_STATUS_EN) });
        }
    }

    const pressRequestOwner = item => {
        const { checked } = checkStateMultiRequestOwner;
        const { checkedString } = checkStateMultiRequestOwnerString;
        if (!checked.includes(item.ID)) {
            setcheckStateMultiRequestOwner({ checked: [...checked, item.ID] });
            setcheckStateMultiRequestOwnerString({ checkedString: [...checkedString, item.NAME] })
        } else {
            setcheckStateMultiRequestOwner({ checked: checked.filter(a => a !== item.ID) });
            setcheckStateMultiRequestOwnerString({ checkedString: checkedString.filter(a => a !== item.NAME) });
        }
    }

    const pressEditor = item => {
        const { checked } = checkStateMultiEditor;
        const { checkedString } = checkStateMultiEditorString;
        if (!checked.includes(item.ID)) {
            setcheckStateMultiEditor({ checked: [...checked, item.ID] });
            setcheckStateMultiEditorString({ checkedString: [...checkedString, item.NAME] })
        } else {
            setcheckStateMultiEditor({ checked: checked.filter(a => a !== item.ID) });
            setcheckStateMultiEditorString({ checkedString: checkedString.filter(a => a !== item.NAME) });
        }
    }

    const readDataRequestStatusList = async () => {
        fetch('https://api.pedigreeall.com/RequestStatus/Get', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setRequestStatusList(json.m_cData)
                console.log(json.m_cData)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const readDataSystemUserGetNameAndIDList = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/SystemUser/GetAsNameAndId', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setSystemUserGetNameAndIDList(json.m_cData)
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

    const readDataSystemUserGetEditor = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/SystemUser/GetEditor', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setSystemUserGetEditor(json.m_cData)
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

    const readGetHorseAddRequest = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/HorseAddRequest/Get', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "ADD_REQUEST_ID": getAddRequestID,
                        "HORSE_NAME": getHorseName,
                        "FATHER_NAME": getFatherName,
                        "MOTHER_NAME": getMotherName,
                        "REQUEST_STATUS_ID": getRequestStatusID,
                        "START_REQUEST_DATE": getStartRequestDate,
                        "END_REQUEST_DATE": getEndRequestDate,
                        "START_LAST_ACTION_DATE": getStartLastActionDate,
                        "END_LAST_ACTION_DATE": getEndLastActionDate,
                        "REQUEST_OWNER_ID": getRequestOwnerID,
                        "EDITOR_ID": getEditorID,
                        "PAGE_NO": 1,
                        "PAGE_COUNT": 100
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseAddRequestData(json.m_cData)
                        //setTime(false)
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
            console.log(e)
        }
    }

    React.useEffect(() => {
        readDataRequestStatusList();
        readGetHorseAddRequest()
        readDataSystemUserGetNameAndIDList();
        readDataSystemUserGetEditor()
    }, [])


    return (
        <View style={styles.Container}>
            <Title text="Add Request" />
            <RBSheet
                ref={BottomSheetSmall}
                closeOnDragDown={true}
                closeOnPressMask={true}
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

                        let RequestStatusID
                        if (checkStateMultiRequestStatus.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiRequestStatus.checked.length; i++) {
                                if (i === 0) {
                                    RequestStatusID = checkStateMultiRequestStatus.checked[0]
                                }
                                else {
                                    RequestStatusID += "," + checkStateMultiRequestStatus.checked[i]
                                }
                            }
                        }
                        console.log(RequestStatusID)
                        setRequestStatusID(RequestStatusID);

                        BottomSheetSmall.current.close() 
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    {getBottomSheetText === "RequestStatus" &&

                        <>
                            {requestStatusList !== undefined &&
                                <ScrollView>
                                    {requestStatusList.map(
                                        (item, i) => (
                                            <ListItem
                                                key={i}
                                                bottomDivider
                                                button
                                                onPress={() => {
                                                    pressRequestStatus(item);
                                                }} >
                                                <ListItem.CheckBox
                                                    checked={checkStateMultiRequestStatus.checked.includes(item.REQUEST_STATUS_ID)}
                                                    checkedIcon='circle'
                                                    uncheckedIcon='circle'
                                                    center={true}
                                                    checkedColor='#2169ab'
                                                    uncheckedColor='rgb(232, 237, 241)'
                                                    onPress={() => {
                                                        pressRequestStatus(item)
                                                    }} />
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.REQUEST_STATUS_EN}</ListItem.Title>
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
                        let RequestOwnerID
                        if (checkStateMultiRequestOwner.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiRequestOwner.checked.length; i++) {
                                if (i === 0) {
                                    RequestOwnerID = checkStateMultiRequestOwner.checked[0]
                                }
                                else {
                                    RequestOwnerID += "," + checkStateMultiRequestOwner.checked[i]
                                }
                            }
                        }
                        console.log(RequestOwnerID)
                        setRequestOwnerID(RequestOwnerID);

                        let EditorID
                        if (checkStateMultiEditor.checked.length > 0) {
                            for (let i = 0; i < checkStateMultiEditor.checked.length; i++) {
                                if (i === 0) {
                                    EditorID = checkStateMultiEditor.checked[0]
                                }
                                else {
                                    EditorID += "," + checkStateMultiEditor.checked[i]
                                }
                            }
                        }
                        console.log(EditorID)
                        setEditorID(EditorID);

                        BottomSheetLong.current.close() 
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    {getBottomSheetText === "RequestOwner" &&

                        <>

                            {getSystemUserGetNameAndIDList !== undefined &&
                                <ScrollView>
                                    {getSystemUserGetNameAndIDList.map(
                                        (item, i) => (
                                            <ListItem
                                                key={i}
                                                bottomDivider
                                                button
                                                onPress={() => {
                                                    pressRequestOwner(item);
                                                }} >
                                                <ListItem.CheckBox
                                                    checked={checkStateMultiRequestOwner.checked.includes(item.ID)}
                                                    checkedIcon='circle'
                                                    uncheckedIcon='circle'
                                                    center={true}
                                                    checkedColor='#2169ab'
                                                    uncheckedColor='rgb(232, 237, 241)'
                                                    onPress={() => {
                                                        pressRequestOwner(item)
                                                    }} />
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.NAME}</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron />
                                            </ListItem>
                                        ))}
                                </ScrollView>
                            }

                        </>

                        || getBottomSheetText === "Editor" &&

                        <>

                            {getSystemUserGetEditor !== undefined &&
                                <ScrollView>
                                    {getSystemUserGetEditor.map(
                                        (item, i) => (
                                            <ListItem
                                                key={i}
                                                bottomDivider
                                                button
                                                onPress={() => {
                                                    pressEditor(item);
                                                }} >
                                                <ListItem.CheckBox
                                                    checked={checkStateMultiEditor.checked.includes(item.ID)}
                                                    checkedIcon='circle'
                                                    uncheckedIcon='circle'
                                                    center={true}
                                                    checkedColor='#2169ab'
                                                    uncheckedColor='rgb(232, 237, 241)'
                                                    onPress={() => {
                                                        pressEditor(item)
                                                    }} />
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.NAME}</ListItem.Title>
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


            <ScrollView style={styles.ScrollViewContainer}>

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

                        {getHorseAddRequestData !== undefined ?
                            <>
                                {getHorseAddRequestData.length === 0 ?
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
                                                <DataTable.Title style={{ width: 120 }}>ID</DataTable.Title>
                                                <DataTable.Title style={{ width: 120 }}>Name</DataTable.Title>
                                                <DataTable.Title style={{ width: 120 }}>Sire</DataTable.Title>
                                                <DataTable.Title style={{ width: 120 }}>Dam</DataTable.Title>
                                                <DataTable.Title style={{ width: 120 }}>Request Status</DataTable.Title>
                                                <DataTable.Title style={{ width: 120 }}>Request Date</DataTable.Title>
                                                <DataTable.Title style={{ width: 120 }}>Last Action Date</DataTable.Title>
                                                <DataTable.Title style={{ width: 120 }}>Request Owner</DataTable.Title>
                                                <DataTable.Title style={{ width: 120 }}>Editor</DataTable.Title>
                                                <DataTable.Title style={{ width: 120 }}>Action</DataTable.Title>
                                            </DataTable.Header>

                                            {getHorseAddRequestData.map((item, i) => (
                                                <DataTable.Row key={i}>
                                                    <DataTable.Cell style={{ width: 120 }} >{item.HORSE_ID}</DataTable.Cell>
                                                    <DataTable.Cell style={{ width: 120 }}>{item.HORSE_NAME}</DataTable.Cell>
                                                    <DataTable.Cell style={{ width: 120 }}>{item.FATHER_NAME}</DataTable.Cell>
                                                    <DataTable.Cell style={{ width: 120 }}>{item.MOTHER_NAME}</DataTable.Cell>
                                                    <DataTable.Cell style={{ width: 120 }}>{item.REQUEST_STATUS_OBJECT.REQUEST_STATUS_EN}</DataTable.Cell>
                                                    <DataTable.Cell style={{ width: 120 }}>{item.DATE.substring(0, 10)}</DataTable.Cell>
                                                    <DataTable.Cell style={{ width: 120 }}>{item.EDIT_DATE.substring(0, 10)}</DataTable.Cell>
                                                    <DataTable.Cell style={{ width: 120 }}>{item.REQUEST_OWNER}</DataTable.Cell>
                                                    <DataTable.Cell style={{ width: 120 }}>{item.EDITOR}</DataTable.Cell>
                                                    <DataTable.Cell style={{ width: 150 }}>
                                                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                            <TouchableOpacity style={styles.TableActionButtonContainer}>
                                                                <Text style={styles.TableActionButtonText}>Approve</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={[styles.TableActionButtonContainer, {marginLeft:5}]} >
                                                                <Text style={styles.TableActionButtonText}>Reject</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </DataTable.Cell>

                                                </DataTable.Row>
                                            )
                                            )}
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
                    :

                    <View style={styles.InformationContainer}>

                        <View>
                            <View style={styles.TextInputContainer}>
                                <Text style={styles.TextInputHeader}>ID: </Text>
                                <TextInput
                                    style={styles.HalfInputStyle}
                                    placeholder={"ID"}
                                    name={"ID"}
                                    keyboardType="numeric"
                                    value={getAddRequestID}
                                    onChangeText={setAddRequestID}
                                />
                            </View>
                            <View style={styles.TextInputContainer}>
                                <Text style={styles.TextInputHeader}>Name: </Text>
                                <TextInput
                                    style={styles.HalfInputStyle}
                                    placeholder={"Name"}
                                    name={"HorseName"}
                                    value={getHorseName}
                                    onChangeText={setHorseName}
                                />
                            </View>
                            <View style={styles.TextInputContainer}>
                                <Text style={styles.TextInputHeader}>Sire: </Text>
                                <TextInput
                                    style={styles.HalfInputStyle}
                                    placeholder={"Sire"}
                                    name={"FatherName"}
                                    value={getFatherName}
                                    onChangeText={setFatherName}
                                />
                            </View>
                            <View style={styles.TextInputContainer}>
                                <Text style={styles.TextInputHeader}>Dam: </Text>
                                <TextInput
                                    style={styles.HalfInputStyle}
                                    placeholder={"Dam"}
                                    name={"username"}
                                    value={getMotherName}
                                    onChangeText={setMotherName}
                                />
                            </View>

                        </View>


                        <View style={{ marginVertical: 40 }}>
                            <View style={styles.RequestStatusConatiner}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setBottomSheetText("RequestStatus")
                                        BottomSheetSmall.current.open()
                                    }}
                                    style={styles.OneValueInLineButton}>
                                    <Icon name="circle" size={20} color="#2169ab" />
                                    {checkStateMultiRequestStatusString.checkedString.length === 0 ?
                                        <Text style={styles.InformationText}>Request Status</Text>
                                        :
                                        <Text style={styles.InformationText}>{checkStateMultiRequestStatusString.checkedString}</Text>
                                    }

                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                                <Icon name="calendar-alt" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                <TextInput
                                    style={styles.HalfInputStyle}
                                    placeholder={"Start Request Date"}
                                    name={"StartRequestDate"}
                                    keyboardType="numeric"
                                    value={getStartRequestDate}
                                    onChangeText={setStartRequestDate}
                                />
                            </View>

                            <View style={styles.TextInputContainer}>
                                <Icon name="calendar-alt" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                <TextInput
                                    style={styles.HalfInputStyle}
                                    placeholder={"End Request Date"}
                                    name={"EndRequestDate"}
                                    keyboardType="numeric"
                                    value={getEndRequestDate}
                                    onChangeText={setEndRequestDate}
                                />
                            </View>

                            <View style={styles.TextInputContainer}>
                                <Icon name="calendar-alt" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                <TextInput
                                    style={styles.HalfInputStyle}
                                    placeholder={"Start Last Action Date"}
                                    name={"StartLastActionDate"}
                                    keyboardType="numeric"
                                    value={getStartLastActionDate}
                                    onChangeText={setStartLastActionDate}
                                />
                            </View>

                            <View style={styles.TextInputContainer}>
                                <Icon name="calendar-alt" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                                <TextInput
                                    style={styles.HalfInputStyle}
                                    placeholder={"End Last Action Date"}
                                    name={"EndLastActionDate"}
                                    keyboardType="numeric"
                                    value={getEndLastActionDate}
                                    onChangeText={setEndLastActionDate}
                                />
                            </View>

                            <View style={[styles.RequestStatusConatiner, { marginTop: 40 }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setBottomSheetText("RequestOwner")
                                        BottomSheetLong.current.open()
                                    }}
                                    style={styles.OneValueInLineButton}>
                                    <Icon name="circle" size={20} color="#2169ab" />
                                    {checkStateMultiRequestOwnerString.checkedString.length === 0 ?
                                        <Text style={styles.InformationText}>Request Owner</Text>
                                        :
                                        <Text style={styles.InformationText}>{checkStateMultiRequestOwnerString.checkedString}</Text>
                                    }

                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.RequestStatusConatiner, { marginTop: 10 }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setBottomSheetText("Editor")
                                        BottomSheetLong.current.open()
                                    }}
                                    style={styles.OneValueInLineButton}>
                                    <Icon name="circle" size={20} color="#2169ab" />
                                    {checkStateMultiEditorString.checkedString.length === 0 ?
                                        <Text style={styles.InformationText}>Editor</Text>
                                        :
                                        <Text style={styles.InformationText}>{checkStateMultiEditorString.checkedString}</Text>
                                    }

                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                                </TouchableOpacity>
                            </View>




                        </View>

                        <BlueButton
                            style={{ marginVertical: 20 }}
                            title="View"
                            onPress={() => {
                                readGetHorseAddRequest()
                                setShowReport(true);
                            }}
                        />
                    </View>

                }


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
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25
    },
    InformationContainer: {
        padding: 10
    },
    TwoInformationInLineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    HalfInputStyle: {
        width: '90%',
        paddingLeft: 20,
        fontSize: 16,
        margin: 0,
    },
    BirthDateText: {
        marginLeft: 10,
        fontSize: 16
    },
    TextInputHeader: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    InformationText: {
        fontSize: 16,
        marginLeft: 5
    },
    TextInputContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5
    },
    FullInputStyle: {
        marginVertical: 5,
        backgroundColor: '#e8e8e8',
        width: '100%',
        paddingLeft: 20,
        borderRadius: 8,
        fontSize: 18,
        margin: 0,
        padding: 10
    },
    OneValueInLineButton: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    TwoValueInLineButton: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 8,
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        alignItems: 'center'
    },
    BirthDatePickerButton: {
        width: '80%',
        flexDirection: 'row'
    },
    RequestStatusConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        padding: 10,
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
    TableActionButtonContainer:{
        padding:10,
        borderWidth:0.5,
        borderColor:'silver',
        borderRadius:8,
        backgroundColor:'rgb(232, 237, 241)'
    },

    TableActionButtonText:{
        color:'#352c2a'
    }
})