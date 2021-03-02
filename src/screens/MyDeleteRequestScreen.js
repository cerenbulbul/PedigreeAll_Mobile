import React , {useState,useRef,useEffect} from 'react';
import {View , StyleSheet , TouchableOpacity, TextInput, Text} from 'react-native';
import Title from '../components/Title';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/FontAwesome5";
import {SettingBottomSheet} from '../components/SettingBottomSheet'
import { Root, Popup,Toast } from "../components/Popup";
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { BlueButton } from '../components/BlueButton';
import { Dimensions } from 'react-native';
import { ListItem, Input, SearchBar } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';

export function MyDeleteRequestScreen({navigation}) {

    const refRBSheet = useRef();
    const BottomSheetRequestsStatus = useRef();
    const BottomSheetViewRequest = useRef();
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [id, setID] = useState("");
    const [sire, setSire] = useState("");
    const [dam, setDam] = useState("");
    const [requestStartDate, setRequestStartDate] = useState('Date')
    const [requestEndDate, setRequestEndDate] = useState('Date')
    const [lastActionStartDate, setLastActionStartDate] = useState('Date')
    const [lastActionEndDate, setlastActionEndDate] = useState('Date')
    const [dateCount, setDateCount] = useState()
    const [searchText, setSearchText] = React.useState("");
    const [requestStatusList, setRequestStatusList] = useState()
    const [requestDeleteList, setRequestDeleteList] = useState()
    const [requestStatusText, setRequestStatusText] = useState("Select A Request Status")

    const [getHorseDeleteRequest, setHorseDeleteRequest] = React.useState();
    const [showReport, setShowReport] = useState(false)

    const [getDeleteRequestID, setDeleteRequestID] = React.useState(-1)
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
 
      const readDataRequestStatusList = async (data) => {
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

    const readGetHorseDeleteRequest = async () => {
      try {
        const token = await AsyncStorage.getItem('TOKEN')
        if (token !== null) {
          fetch('https://api.pedigreeall.com/HorseDeleteRequest/Get', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Basic " + token,
            },
            body: JSON.stringify({
              "DELETE_REQUEST_ID": parseInt(getDeleteRequestID),
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
              setHorseDeleteRequest(json.m_cData)
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
    }, [])

    return (
        <View style={styles.Container}>
        <Title text = "My Delete Request"/>
        <RBSheet
          ref={BottomSheetRequestsStatus}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container:{
              borderTopLeftRadius:10,
              borderTopRightRadius:10
            },
            draggableIcon: { 
              backgroundColor: "#000"
            }
          }}
        >
          <TouchableOpacity 
            onPress={()=>{BottomSheetRequestsStatus.current.close()}}
            style={styles.SwipableCloseIcon}>
            <Icon name="times" size={20} color="#adb5bd" />
          </TouchableOpacity>
          <View>
          {requestStatusList !== undefined && 
                <ScrollView>
                  {requestStatusList.filter((x) => x.REQUEST_STATUS_EN).map(
                      (item, i) => (
                        <ListItem
                          key={i}
                          bottomDivider
                          button
                          onPress={() => {
                            console.log(item.REQUEST_STATUS_EN)
                            setRequestStatusText(item.REQUEST_STATUS_EN);
                            setRequestStatusID(item.REQUEST_STATUS_ID)
                            BottomSheetRequestsStatus.current.close();
                          }} >
                          <ListItem.Content>
                            <ListItem.Title>{item.REQUEST_STATUS_EN}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      ))}
                </ScrollView>
                }
          </View>
        </RBSheet>
        
        <RBSheet
          ref={BottomSheetViewRequest}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={Dimensions.get('window').height-50}
          customStyles={{
            container:{
              borderTopLeftRadius:10,
              borderTopRightRadius:10
            },
            draggableIcon: { 
              backgroundColor: "#000"
            }
          }}
        >
          <TouchableOpacity 
            onPress={()=>{BottomSheetViewRequest.current.close()}}
            style={styles.SwipableCloseIcon}>
            <Icon name="times" size={20} color="#adb5bd" />
          </TouchableOpacity>
          <View>
        
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

            {getHorseDeleteRequest !== undefined ?
              <>
                {getHorseDeleteRequest.length === 0 ?
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
                        <DataTable.Title style={{ width: 120 }}>Action</DataTable.Title>
                      </DataTable.Header>

                      {getHorseDeleteRequest.map((item, i) => (
                        <DataTable.Row key={i}>
                          <DataTable.Cell style={{ width: 120 }} >{item.HORSE_ID}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.HORSE_NAME}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.FATHER_NAME}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.MOTHER_NAME}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.REQUEST_STATUS_OBJECT.REQUEST_STATUS_EN}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.DATE.substring(0, 10)}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.EDIT_DATE.substring(0, 10)}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>-</DataTable.Cell>

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
                keyboardType ="numeric"
                value={getDeleteRequestID.toString()}
                onChangeText={setDeleteRequestID}
                />
            </View>
            <View style={styles.TextInputContainer}>
              <Text style={styles.TextInputHeader}>Name: </Text>
              <TextInput
                style={styles.HalfInputStyle}
                placeholder={"Name"}
                name={"Name"}
                value={getHorseName}
                onChangeText={setHorseName}
                />
            </View>
            <View style={styles.TextInputContainer}>
              <Text style={styles.TextInputHeader}>Sire: </Text>
              <TextInput
                style={styles.HalfInputStyle}
                placeholder={"Sire"}
                name={"Sire"}
                value={getFatherName}
                onChangeText={setFatherName}
                />
            </View>
            <View style={styles.TextInputContainer}>
              <Text style={styles.TextInputHeader}>Dam: </Text>
              <TextInput
                style={styles.HalfInputStyle}
                placeholder={"Dam"}
                name={"Dam"}
                value={getMotherName}
                onChangeText={setMotherName}
                />
            </View>
            
          </View>


        <View style={{marginVertical:40}}>
        <View style={styles.RequestStatusConatiner}>
          <TouchableOpacity
            onPress={()=>{BottomSheetRequestsStatus.current.open()}} 
            style={styles.OneValueInLineButton}>
              <Icon  name="circle" size={20} color="#2169ab" />
              <Text style={styles.InformationText}>{requestStatusText}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon  name="arrow-alt-circle-down" size={24} color="silver" />
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

          </View>
          
            <BlueButton 
                style={{marginVertical:20}} 
                title="View"
                onPress={()=>{
                  readGetHorseDeleteRequest();
                  setShowReport(true)
                }}
                />
        </View>

          }

        </ScrollView>


    </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
    },
    SwipableCloseIcon:{
        width:'100%',
        flexDirection:'row-reverse',
        marginRight:-25
      },
    InformationContainer:{
        padding:10
    },
    TwoInformationInLineContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    HalfInputStyle:{
        width:'90%',
        paddingLeft:20,
        fontSize:16,
        margin:0,
    },
    BirthDateText:{
      marginLeft:10,
      fontSize:16
    },
    TextInputHeader:{
      fontSize:16,
      fontWeight:'bold'
    },
    InformationText:{
      fontSize:16,
      marginLeft:5
    },
    TextInputContainer:{
        padding:10,
        borderWidth:0.5,
        borderColor:'silver',
        borderRadius:8,
        flexDirection:'row',
        marginVertical:5
    },
    FullInputStyle:{
        marginVertical:5,
        backgroundColor:'#e8e8e8',
        width:'100%',
        paddingLeft:20,
        borderRadius:8,
        fontSize:18,
        margin:0,
        padding:10
    },
    OneValueInLineButton:{
        width:'90%',
        flexDirection:'row',
        alignItems:'center'
      },
      TwoValueInLineButton:{
        width:'100%',
        flexDirection:'row',
        marginVertical:8,
        padding:10,
        justifyContent:'space-between',
        borderWidth:0.5,
        borderRadius:8,
        borderColor:'silver',
        alignItems:'center'
      },
      BirthDatePickerButton:{
        width:'80%',
        flexDirection:'row'
      },
      RequestStatusConatiner:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:0.5,
        borderRadius:8,
        borderColor:'silver',
        padding:10,
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
})