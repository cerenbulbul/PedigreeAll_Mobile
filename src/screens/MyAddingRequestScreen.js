import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import Title from '../components/Title';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/FontAwesome5";
import { SettingBottomSheet } from '../components/SettingBottomSheet'
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { BlueButton } from '../components/BlueButton';
import { Dimensions } from 'react-native';
import { ListItem } from "react-native-elements";
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import { Global } from '../Global';

export function MyAddingRequestScreen({ navigation }) {

  const refRBSheet = useRef();
  const BottomSheetRequestsStatus = useRef();
  const BottomSheetViewRequest = useRef();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [birthdate, setBirthdate] = useState('Date')
  const [searchText, setSearchText] = React.useState("");
  const [requestStatusList, setRequestStatusList] = useState()
  const [requestStatusText, setRequestStatusText] = useState("Select A Request Status")

  const [showReport, setShowReport] = useState(false)

  const [getHorseAddRequestData, setHorseAddRequestData] = React.useState();

  const [getAddRequestID, setAddRequestID] = React.useState()
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
            "PAGE_COUNT": 100,
            "RACE_ID": 1,
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

  const [getStartRequestDatePlaceholder, setStartRequestDatePlaceholder] = React.useState("")
  const [getEndRequestDatePlaceholder, setEndRequestDatePlaceholder] = React.useState("")
  const [getStartLastActionDatePlaceholder, setStartLastActionDatePlaceholder] = React.useState("")
  const [getEndLastActionDatePlaceholder, setEndLastActionDatePlaceholder] = React.useState("")
  const [getViewButton, setViewButton] = React.useState("")

  React.useEffect(() => {
    readDataRequestStatusList();
    readGetHorseAddRequest()

    if (Global.Language === 1) {
      setRequestStatusText("Talep Durumu Seçiniz")
      setStartRequestDatePlaceholder("Talep Tarihi (Başlangıç)")
      setEndRequestDatePlaceholder("Talep Tarihi (Bitiş)")
      setStartLastActionDatePlaceholder("Son İşlem Tarihi (Başlangıç)")
      setEndLastActionDatePlaceholder("Son İşlem Tarihi (Bitiş)")
      setViewButton("Görüntüle")
    }
    else {
      setRequestStatusText("Select A Request Status")
      setStartRequestDatePlaceholder("Request Date (Start)")
      setEndRequestDatePlaceholder("Request Date (End)")
      setStartLastActionDatePlaceholder("Last Action Date (Start)")
      setEndLastActionDatePlaceholder("Last Action Date (End)")
      setViewButton("view")
    }
  }, [])


  return (
    <View style={styles.Container}>
      {Global.Language === 1 ?
        <Title text="Ekleme Taleplerim" />
        :
        <Title text="My Adding Request" />
      }

      <RBSheet
        ref={BottomSheetRequestsStatus}
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
          onPress={() => { BottomSheetRequestsStatus.current.close() }}
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
                      if (Global.Language === 1) {
                        setRequestStatusText(item.REQUEST_STATUS_TR)
                      } else {
                        setRequestStatusText(item.REQUEST_STATUS_EN)
                      }

                      setRequestStatusID(item.REQUEST_STATUS_ID)
                      BottomSheetRequestsStatus.current.close();
                    }} >
                    <ListItem.Content>
                      {Global.Language === 1 ?
                        <ListItem.Title>{item.REQUEST_STATUS_TR}</ListItem.Title>
                        :
                        <ListItem.Title>{item.REQUEST_STATUS_EN}</ListItem.Title>
                      }

                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))}
            </ScrollView>
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
                {Global.Language === 1 ?
                  <Text style={{ fontSize: 16, marginLeft: 10 }}>Geri</Text>
                  :
                  <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                }

              </TouchableOpacity>
            </View>

            {getHorseAddRequestData !== undefined ?
              <>
                {getHorseAddRequestData.length === 0 ?
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
                          <DataTable.Title style={{ width: 120 }}>ID</DataTable.Title>
                          <DataTable.Title style={{ width: 120 }}>Adı</DataTable.Title>
                          <DataTable.Title style={{ width: 120 }}>Baba</DataTable.Title>
                          <DataTable.Title style={{ width: 120 }}>Anne</DataTable.Title>
                          <DataTable.Title style={{ width: 120 }}>Talep Durumu</DataTable.Title>
                          <DataTable.Title style={{ width: 120 }}>Talep Tarihi</DataTable.Title>
                          <DataTable.Title style={{ width: 120 }}>Son İşlem Tarihi</DataTable.Title>
                          <DataTable.Title style={{ width: 120 }}>İşlemler</DataTable.Title>
                        </DataTable.Header>
                        :
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
                      }


                      {getHorseAddRequestData.map((item, i) => (
                        <DataTable.Row key={i}>
                          <DataTable.Cell style={{ width: 120 }} >{item.HORSE_ID}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.HORSE_NAME}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.FATHER_NAME}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.MOTHER_NAME}</DataTable.Cell>
                          {Global.Language === 1 ?
                            <DataTable.Cell style={{ width: 120 }}>{item.REQUEST_STATUS_OBJECT.REQUEST_STATUS_TR}</DataTable.Cell>
                            :
                            <DataTable.Cell style={{ width: 120 }}>{item.REQUEST_STATUS_OBJECT.REQUEST_STATUS_EN}</DataTable.Cell>
                          }

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
          :
          <View style={styles.InformationContainer}>

            <View>
              <View style={styles.TextInputContainer}>
                <Text style={styles.TextInputHeader}>ID: </Text>
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={""}
                  name={"ID"}
                  keyboardType="numeric"
                  value={getAddRequestID}
                  onChangeText={setAddRequestID}
                />
              </View>
              <View style={styles.TextInputContainer}>
                {Global.Language===1?
                <Text style={styles.TextInputHeader}>Adı: </Text>
                :
                <Text style={styles.TextInputHeader}>Name: </Text>
                }
                
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={""}
                  name={"HorseName"}
                  value={getHorseName}
                  onChangeText={setHorseName}
                />
              </View>
              <View style={styles.TextInputContainer}>
                {Global.Language===1?
                <Text style={styles.TextInputHeader}>Baba: </Text>
                :
                <Text style={styles.TextInputHeader}>Sire: </Text>
                }
                
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={""}
                  name={"FatherName"}
                  value={getFatherName}
                  onChangeText={setFatherName}
                />
              </View>
              <View style={styles.TextInputContainer}>
                {Global.Language===1?
                <Text style={styles.TextInputHeader}>Anne: </Text>
                :
                <Text style={styles.TextInputHeader}>Dam: </Text>
                }
                
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={""}
                  name={"username"}
                  value={getMotherName}
                  onChangeText={setMotherName}
                />
              </View>

            </View>


            <View style={{ marginVertical: 40 }}>
              <View style={styles.RequestStatusConatiner}>
                <TouchableOpacity
                  onPress={() => { BottomSheetRequestsStatus.current.open() }}
                  style={styles.OneValueInLineButton}>
                  <Icon name="circle" size={20} color="#2169ab" />
                  <Text style={styles.InformationText}>{requestStatusText}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                </TouchableOpacity>
              </View>

              <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                <Icon name="calendar-alt" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={getStartRequestDatePlaceholder}
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
                  placeholder={getEndRequestDatePlaceholder}
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
                  placeholder={getStartLastActionDatePlaceholder}
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
                  placeholder={getEndLastActionDatePlaceholder}
                  name={"EndLastActionDate"}
                  keyboardType="numeric"
                  value={getEndLastActionDate}
                  onChangeText={setEndLastActionDate}
                />
              </View>




            </View>

            <BlueButton
              style={{ marginVertical: 20 }}
              title={getViewButton}
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
})