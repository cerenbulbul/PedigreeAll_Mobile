import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, ScrollView, Platform, Dimensions, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-community/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DataTable } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { SearchBar, ListItem } from "react-native-elements";

import { HypotheticalSearchScreenPedigree } from './HypotheticalSearchScreenPedigree'
import { HypotheticalSearchScreenMareSiblings } from './HypotheticalSearchScreenMareSiblings'
import { HypotheticalSearchScreenSireSiblings } from './HypotheticalSearchScreenSireSiblings'
import { HypotheticalSearchScreenBroodmareSire } from './HypotheticalSearchScreenBroodmareSire'
import { HypotheticalSearchScreenTailFemale } from './HypotheticalSearchScreenTailFemale'
import { Global } from '../Global'

const Tab = createMaterialTopTabNavigator();

const GenerationData = [
  {
    id: "4",
    title: "Gen 4",
  },
  {
    id: "5",
    title: "Gen 5",
  },
  {
    id: "6",
    title: "Gen 6",
  },
  {
    id: "7",
    title: "Gen 7",
  },
  {
    id: "8",
    title: "Gen 8",
  },
  {
    id: "9",
    title: "Gen 9",
  },
];

export function HypotheticalSearchScreen({ route, navigation }) {
  const [getHorseData, setHorseData] = React.useState();
  const [time, setTime] = React.useState(true);
  const [statisticTime, setStatisticTime] = React.useState(true);
  const [FoalTime, setFoalTime] = React.useState(true);
  const [showHeader, setShowHeader] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [getFoalInfo, setFoalInfo] = React.useState();
  const [getFoalNum, setFoalNum] = React.useState(1);
  const [getStatisticInfo, setStatisticInfo] = React.useState();

  const [getScreenName, setScreenName] = React.useState("Pedigree")

  const [getPedigreeLineColor, setPedigreeLineColor] = React.useState("#2169ab");
  const [getPedigreeColor, setPedigreeColor] = React.useState("#2169ab");
  const [getPedigreeFontWeight, setPedigreeFontWeight] = React.useState("700")
  const [getPedigreeFontSize, setPedigreeFontSize] = React.useState(18)

  const [getSiblingsMareLineColor, setSiblingsMareLineColor] = React.useState("#fff");
  const [getSiblingsMareColor, setSiblingsMareColor] = React.useState("#000");
  const [getSiblingsMareFontWeight, setSiblingsMareFontWeight] = React.useState("500")
  const [getSiblingsMareFontSize, setSiblingsMareFontSize] = React.useState(16)

  const [getSiblingsSireLineColor, setSiblingsSireLineColor] = React.useState("#fff");
  const [getSiblingsSireColor, setSiblingsSireColor] = React.useState("#000");
  const [getSiblingsSireFontWeight, setSiblingsSireFontWeight] = React.useState("500")
  const [getSiblingsSireFontSize, setSiblingsSireFontSize] = React.useState(16)

  const [getSiblingsBroodmareSireLineColor, setSiblingsBroodmareSireLineColor] = React.useState("#fff");
  const [getSiblingsBroodmareSireColor, setSiblingsBroodmareSireColor] = React.useState("#000");
  const [getSiblingsBroodmareSireFontWeight, setSiblingsBroodmareSireFontWeight] = React.useState("500")
  const [getSiblingsBroodmareSireFontSize, setSiblingsBroodmareSireFontSize] = React.useState(16)

  const [getTailFemaleLineColor, setTailFemaleLineColor] = React.useState("#fff");
  const [getTailFemaleColor, setTailFemaleColor] = React.useState("#000");
  const [getTailFemaleFontWeight, setTailFemaleFontWeight] = React.useState("500")
  const [getTailFemaleFontSize, setTailFemaleFontSize] = React.useState(16)


  const refRBSheetGeneration = React.useRef();
  const BottomSheetSearchNavigation = React.useRef();
  const [GenerationTitle, setGenerationTitle] = React.useState("");
  const [state, setState] = React.useState({ checked: [] });
  const [chekedItem, setChekedItem] = React.useState(5)
  const [searchValue, setSearchValue] = React.useState("")
  const [SireMareHorseData, setSireMareHorseData] = React.useState();
  const [SireMareHorseName, setSireMareHorseName] = React.useState();
  const [SireData, setSireData] = React.useState();
  const [MareData, setMareData] = React.useState();
  const [SireText, setSireText] = React.useState("Sire");
  const [MareText, setMareText] = React.useState("Mare");
  const [loader, setLoader] = React.useState(false)
  const [getSelectedSire, setSelectedSire] = React.useState();
  const [getSelectedMare, setSelectedMare] = React.useState();

  const scrollRef = React.useRef(ScrollView);

  const readUser = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
        fetch('https://api.pedigreeall.com/Pedigree/GetPedigree?p_iGenerationCount=' + Global.Generation_Hypothetical + "&p_iFirstId=" + Global.Horse_First_ID + "&p_iSecondId=" + Global.Horse_Second_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setHorseData(json.m_cData)
            console.log(json)
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
  const readFoalInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/ParentPage/GetByIdAsNameAndId?p_iHorseId=' + Global.Horse_First_ID + "&p_iLanguageId=" + 2, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setFoalInfo(json.m_cData);
            setFoalTime(false)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }
  const readStatisticInfo = async (foalNum) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/HorseInfo/GetFoals?p_iHorseId=' + Global.Horse_First_ID + "&p_iTypeId=" + foalNum, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setStatisticInfo(json.m_cData);
            setStatisticTime(false)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }

  const readHorseGetByName = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
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
            setSireMareHorseData(json)
            setLoader(false);
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
    readUser();
  }, [])

  React.useEffect(() => {
    readUser();
    readFoalInfo();
    readStatisticInfo(1);
    readHorseGetByName();
    setGenerationTitle("Gen " + Global.Generation_Hypothetical)
  }, [])

  return (
    <View style={styles.Container}>

      <RBSheet
        ref={refRBSheetGeneration}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        animationType='fade'
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}>
        <TouchableOpacity
          onPress={() => {
            refRBSheetGeneration.current.close();
            setGenerationTitle("Gen " + chekedItem);
          }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <View>
          <ScrollView style={{ marginBottom: 50 }}>
            {
              GenerationData.map((item, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => {
                    setState({ checked: [state, item.id] });
                    setChekedItem(item.id)
                    setGenerationTitle("Gen " + item.id);
                    Global.Generation_Hypothetical = item.id
                    refRBSheetGeneration.current.close();

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
                      setGenerationTitle("Gen " + item.id);
                      Global.Generation_Hypothetical = item.id
                      refRBSheetGeneration.current.close();
                    }} />
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>

                </ListItem>
              ))
            }

          </ScrollView>

        </View>
      </RBSheet>
      <RBSheet
        ref={BottomSheetSearchNavigation}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height - 50}
        animationType='fade'
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}>
        <TouchableOpacity
          onPress={() => {
            BottomSheetSearchNavigation.current.close();
          }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>

        <View>
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
              setLoader(true);
              readHorseGetByName();
            }}
            showLoading={true}
          />
          {SireMareHorseData !== undefined &&
            <>
              {SireMareHorseData.m_cData !== undefined &&

                <ScrollView style={{ marginBottom: 30 }}>
                  {SireMareHorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                    (item, i) => (
                      <ListItem
                        key={i}
                        bottomDivider
                        button
                        onPress={() => {
                          BottomSheetSearchNavigation.current.close();
                          if (SireMareHorseName === 'Sire') {
                            setSireText(item.HORSE_NAME);
                            setSireData(item);
                            setSelectedSire(item.HORSE_ID);
                            Global.Horse_First_ID = item.HORSE_ID
                          }
                          else if (SireMareHorseName === 'Mare') {
                            setMareText(item.HORSE_NAME);
                            setMareData(item);
                            setSelectedMare(item.HORSE_ID);
                            Global.Horse_Second_ID = item.HORSE_ID
                          }
                        }} >
                        <Image
                          style={{ width: 70, height: 70, justifyContent: 'center', resizeMode: 'contain' }}
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
              }
            </>
          }


          {loader ?
            <ActivityIndicator
              color="#000"
              size="large"
              style={styles.ActivityIndicatorStyle}
            />

            : null}

        </View>
      </RBSheet>


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={[styles.FullScreenContainer]}>
            <View style={{ width: '100%', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Icon name="times" size={26} color="silver" />
              </TouchableOpacity>
            </View>
            {getFoalInfo !== undefined &&
              <>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal>
                  <View style={styles.StatisticFoalContainer}>
                    {getFoalInfo.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.StatisticFoalButton}
                        onPress={() => {
                          setFoalNum(item.ID)
                          setStatisticTime(true);
                          readStatisticInfo(item.ID);
                        }}>
                        <Text style={styles.StatisticFoalButtonText}>{item.NAME}</Text>
                      </TouchableOpacity>

                    ))}
                  </View>

                </ScrollView>
                {statisticTime ?
                  <ActivityIndicator color="#000" size="large" />
                  :
                  <ScrollView style={{ height: "100%" }}>
                    {getStatisticInfo !== undefined &&

                      <ScrollView horizontal>
                        <DataTable>
                          <DataTable.Header>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 90 }}>Class</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Point</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Earning</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Fam</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Color</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Dam</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 80 }}>Birth D.</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Start</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>1st</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>1st %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>2nd</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>2nd %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>3rd</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 60 }}>3rd %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>4th</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 50 }}>4th %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Price</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Dr. RM</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>ANZ</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>PedigreeAll</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Owner</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 50 }}>Breeder</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 80 }}>Coach</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 50 }}>Dead</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 10 }}>Update D.</DataTable.Title>
                          </DataTable.Header>

                          {getStatisticInfo.map((item, index) => (
                            <DataTable.Row centered={true} key={index}>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto' }}>{item.HORSE_NAME}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 15, width: 80, justifyContent: 'center' }}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.POINT}</DataTable.Cell>
                              <DataTable.Cell style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 70, justifyContent: 'center' }} >{item.FAMILY_TEXT}</DataTable.Cell>
                              <DataTable.Cell style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.COLOR_TEXT}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.MOTHER_NAME}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 15, width: 80, justifyContent: 'center' }}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.START_COUNT}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.FIRST}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.SECOND}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.THIRD}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.FOURTH}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.RM}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.ANZ}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.PA}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.OWNER}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.BREEDER}</DataTable.Cell>
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.COACH}</DataTable.Cell>
                              {item.IS_DEAD ?
                                <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>DEAD</DataTable.Cell>
                                : <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>ALIVE</DataTable.Cell>}
                              <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                            </DataTable.Row>

                          ))}
                        </DataTable>

                      </ScrollView>}
                  </ScrollView>}
              </>}


          </View>
        </View>
      </Modal>

      {Global.Hypothetical_Search_View ?
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <TouchableOpacity
            onPress={() => {
              BottomSheetSearchNavigation.current.open();
              setSireMareHorseName('Sire');
              setLoader(true);
            }}
            style={styles.SireMareButtonContainer}>
            <Text>{SireText.substring(0, 6)}...</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              BottomSheetSearchNavigation.current.open();
              setSireMareHorseName('Mare');
            }}
            style={styles.SireMareButtonContainer}>
            <Text>{MareText.substring(0, 6)}...</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { refRBSheetGeneration.current.open() }}
            style={styles.GenerationButtonContainer}>
            <Text>{GenerationTitle}</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.SearchButtonStyle}
            onPress={() => {
              setScreenName("NoScreen")
              setLoader(true)
              setTime(true)
              readUser();
              readFoalInfo();
              readStatisticInfo(1);
              readHorseGetByName();

              setScreenName("Pedigree")



            }}>
            <Icon name="search" size={16} color="#fff" />
          </TouchableOpacity>

        </View>
        :
        null}


      {time ?
        <ActivityIndicator size="large" color="#000" />
        :
        <>
          {getHorseData !== undefined &&

            <>
              <View style={styles.HeaderShortContainer}>
                <Text style={styles.HeaderTitle}>{getHorseData.HEADER_OBJECT.ROW1_GENERAL}</Text>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  style={styles.StabilInformationButton}>
                  <Icon name="chart-line" size={16} color="#fff"></Icon>
                  <Text style={styles.StabilInformationButtonText}>Statistics</Text>
                </TouchableOpacity>

              </View>


            </>

          }


          <ScrollView
            ref={scrollRef}
            style={{ height: 10 }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>

            <View style={styles.TabNavigationContainer}>
              <TouchableOpacity
                style={[styles.TabNavigationItem, { borderColor: getPedigreeLineColor }]}
                onPress={() => {
                  setScreenName("Pedigree")
                  setPedigreeLineColor("#2169ab")
                  setPedigreeColor("#2169ab")
                  setPedigreeFontWeight("700")
                  setPedigreeFontSize(18)

                  setSiblingsMareLineColor("#fff")
                  setSiblingsMareColor("#222")
                  setSiblingsMareFontWeight("500")
                  setSiblingsMareFontSize(16)

                  setSiblingsSireLineColor("#fff")
                  setSiblingsSireColor("#222")
                  setSiblingsSireFontWeight("500")
                  setSiblingsSireFontSize(16)

                  setSiblingsBroodmareSireLineColor("#fff")
                  setSiblingsBroodmareSireColor("#222")
                  setSiblingsBroodmareSireFontWeight("500")
                  setSiblingsBroodmareSireFontSize(16)

                  setTailFemaleLineColor("#fff")
                  setTailFemaleColor("#222")
                  setTailFemaleFontWeight("500")
                  setTailFemaleFontSize(16)

                }}>
                <Icon name="network-wired" size={16} color={getPedigreeColor} style={{ alignSelf: 'center' }} />
                <Text style={[styles.TabNavigationItemText, { color: getPedigreeColor, fontWeight: getPedigreeFontWeight, fontSize: getPedigreeFontSize }]}>Pedigree</Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.TabNavigationItem, { borderColor: getSiblingsMareLineColor }]}
                onPress={() => {
                  setScreenName("SiblingMare")

                  setSiblingsMareLineColor("#2169ab")
                  setSiblingsMareColor("#2169ab")
                  setSiblingsMareFontWeight("700")
                  setSiblingsMareFontSize(18)

                  setPedigreeLineColor("#fff")
                  setPedigreeColor("#222")
                  setPedigreeFontWeight("500")
                  setPedigreeFontSize(16)

                  setSiblingsSireLineColor("#fff")
                  setSiblingsSireColor("#222")
                  setSiblingsSireFontWeight("500")
                  setSiblingsSireFontSize(16)

                  setSiblingsBroodmareSireLineColor("#fff")
                  setSiblingsBroodmareSireColor("#222")
                  setSiblingsBroodmareSireFontWeight("500")
                  setSiblingsBroodmareSireFontSize(16)

                  setTailFemaleLineColor("#fff")
                  setTailFemaleColor("#222")
                  setTailFemaleFontWeight("500")
                  setTailFemaleFontSize(16)

                }}>
                <Icon name="cloudsmith" size={16} color={getSiblingsMareColor} style={{ alignSelf: 'center' }} />
                <Text style={[styles.TabNavigationItemText, { color: getSiblingsMareColor, fontWeight: getSiblingsMareFontWeight, fontSize: getSiblingsMareFontSize }]}>Siblings (Mare)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.TabNavigationItem, { borderColor: getSiblingsSireLineColor }]}
                onPress={() => {
                  setScreenName("SiblingSire")

                  setSiblingsSireLineColor("#2169ab")
                  setSiblingsSireColor("#2169ab")
                  setSiblingsSireFontWeight("700")
                  setSiblingsSireFontSize(18)

                  setSiblingsMareLineColor("#fff")
                  setSiblingsMareColor("#222")
                  setSiblingsMareFontWeight("500")
                  setSiblingsMareFontSize(16)

                  setPedigreeLineColor("#fff")
                  setPedigreeColor("#222")
                  setPedigreeFontWeight("500")
                  setPedigreeFontSize(16)

                  setSiblingsBroodmareSireLineColor("#fff")
                  setSiblingsBroodmareSireColor("#222")
                  setSiblingsBroodmareSireFontWeight("500")
                  setSiblingsBroodmareSireFontSize(16)

                  setTailFemaleLineColor("#fff")
                  setTailFemaleColor("#222")
                  setTailFemaleFontWeight("500")
                  setTailFemaleFontSize(16)

                }}>
                <Icon name="cloudsmith" size={16} color={getSiblingsSireColor} style={{ alignSelf: 'center' }} />
                <Text style={[styles.TabNavigationItemText, { color: getSiblingsSireColor, fontWeight: getSiblingsSireFontWeight, fontSize: getSiblingsSireFontSize }]}>Siblings (Sire)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.TabNavigationItem, { borderColor: getSiblingsBroodmareSireLineColor }]}
                onPress={() => {
                  setScreenName("SiblingBroodmareSire")

                  setSiblingsBroodmareSireLineColor("#2169ab")
                  setSiblingsBroodmareSireColor("#2169ab")
                  setSiblingsBroodmareSireFontWeight("700")
                  setSiblingsBroodmareSireFontSize(18)

                  setSiblingsSireLineColor("#fff")
                  setSiblingsSireColor("#222")
                  setSiblingsSireFontWeight("500")
                  setSiblingsSireFontSize(16)

                  setSiblingsMareLineColor("#fff")
                  setSiblingsMareColor("#222")
                  setSiblingsMareFontWeight("500")
                  setSiblingsMareFontSize(16)

                  setPedigreeLineColor("#fff")
                  setPedigreeColor("#222")
                  setPedigreeFontWeight("500")
                  setPedigreeFontSize(16)

                  setTailFemaleLineColor("#fff")
                  setTailFemaleColor("#222")
                  setTailFemaleFontWeight("500")
                  setTailFemaleFontSize(16)

                }}>
                <Icon name="cloudsmith" size={16} color={getSiblingsBroodmareSireColor} style={{ alignSelf: 'center' }} />
                <Text style={[styles.TabNavigationItemText, { color: getSiblingsBroodmareSireColor, fontWeight: getSiblingsBroodmareSireFontWeight, fontSize: getSiblingsBroodmareSireFontSize }]}>Siblings (Broodmare Sire)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.TabNavigationItem, { borderColor: getTailFemaleLineColor }]}
                onPress={() => {
                  setScreenName("TailFemale")

                  setTailFemaleLineColor("#2169ab")
                  setTailFemaleColor("#2169ab")
                  setTailFemaleFontWeight("700")
                  setTailFemaleFontSize(18)

                  setSiblingsBroodmareSireLineColor("#fff")
                  setSiblingsBroodmareSireColor("#222")
                  setSiblingsBroodmareSireFontWeight("500")
                  setSiblingsBroodmareSireFontSize(16)

                  setSiblingsSireLineColor("#fff")
                  setSiblingsSireColor("#222")
                  setSiblingsSireFontWeight("500")
                  setSiblingsSireFontSize(16)

                  setSiblingsMareLineColor("#fff")
                  setSiblingsMareColor("#222")
                  setSiblingsMareFontWeight("500")
                  setSiblingsMareFontSize(16)

                  setPedigreeLineColor("#fff")
                  setPedigreeColor("#222")
                  setPedigreeFontWeight("500")
                  setPedigreeFontSize(16)

                }}>
                <Icon name="cloudsmith" size={16} color={getTailFemaleColor} style={{ alignSelf: 'center' }} />
                <Text style={[styles.TabNavigationItemText, { color: getTailFemaleColor, fontWeight: getTailFemaleFontWeight, fontSize: getTailFemaleFontSize }]}>Tail Female</Text>
              </TouchableOpacity>




            </View>

          </ScrollView>


          <View
            style={{ height: '60%' }}>
            {getScreenName === "Pedigree" &&
              <HypotheticalSearchScreenPedigree />
              || getScreenName === "SiblingMare" &&
              <HypotheticalSearchScreenMareSiblings />
              || getScreenName === "SiblingSire" &&
              <HypotheticalSearchScreenSireSiblings />
              || getScreenName === "SiblingBroodmareSire" &&
              <HypotheticalSearchScreenBroodmareSire />
              || getScreenName === "TailFemale" &&
              <HypotheticalSearchScreenTailFemale />
            }
          </View>
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
  HeaderShortContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  HeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '80%'
  },
  ShowHeaderButtonContainer: {
    backgroundColor: '#2169ab',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
  },
  StabilInformationButton: {
    flexDirection: 'row',
    backgroundColor: '#2169ab',
    padding: 7,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10
  },
  StabilInformationButtonText: {
    color: '#fff',
    marginLeft: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: '#6c6c6ca8'
  },
  FullScreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: "#000",
  },
  StatisticFoalContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'baseline',
    padding: 10,
    borderBottomWidth: 0.5,
  },
  StatisticFoalButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'silver',
    marginLeft: 5,
    backgroundColor: '#2169ab',
    elevation: 2
  },
  StatisticFoalButtonText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff'
  },
  SireMareButtonContainer: {
    backgroundColor: "#e8edf1",
    padding: 9,
    borderRadius: 8,
    height: 36,
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginRight: 7
  },
  GenerationButtonContainer: {
    backgroundColor: "#e8edf1",
    padding: 9,
    borderRadius: 8,
    height: 36,
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginRight: 7
  },
  SearchButtonStyle: {
    backgroundColor: "#2169ab",
    padding: 10,
    borderRadius: 150,
    height: 36,
    marginTop: 12,
    marginRight: 7
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25,
    zIndex: 1
  },
  TabNavigationContainer: {
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  TabNavigationItem: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingBottom: 15,
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  TabNavigationItemText: {
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 5,
    padding: 5,
  },
})



/*


              <Tab.Navigator
                initialRouteName="HypoticalScreen"
                removeClippedSubviews={true}
                sceneContainerStyle={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'white',
                }}
                tabBarOptions={{
                  activeTintColor: '#000',
                  inactiveTintColor: '#b5b5b5',
                  showIcon: true,
                  scrollEnabled: true,
                  indicatorStyle: {
                    backgroundColor: '#2169ab'
                  },
                  labelStyle: {
                    fontSize: 14,
                  },
                  style: {
                    backgroundColor: 'white', //e8edf1
                    //height: (Platform.OS === 'ios') ? 48 : 50,
                    //overflow: "hidden"
                  },
                  tabStyle: {
                    marginTop: (Platform.OS === 'ios') ? 0 : 0,
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'center'
                  },
                }}
              >

                <Tab.Screen
                  name="Pedigree"
                  component={HypotheticalSearchScreenPedigree}
                  options={{
                    tabBarLabel: 'Pedigree',
                    tabBarIcon: () => (
                      <Icon name="network-wired" size={16} color="#222" />
                    ),

                  }}
                />
                <Tab.Screen
                  name="SiblingsMare"
                  component={HypotheticalSearchScreenMareSiblings}
                  options={{
                    tabBarLabel: 'Siblings (Mare)',
                    tabBarIcon: () => (
                      <Icon name="cloudsmith" size={16} color="#222" />
                    )
                  }}
                />
                <Tab.Screen
                  name="SiblingsSire"
                  component={HypotheticalSearchScreenSireSiblings}
                  options={{
                    tabBarLabel: 'Siblings (Sire)',
                    tabBarIcon: () => (
                      <Icon name="cloudsmith" size={16} color="#222" />
                    )
                  }}
                />
                <Tab.Screen
                  name="SiblingBroodmareSire"
                  component={HypotheticalSearchScreenBroodmareSire}
                  options={{
                    tabBarLabel: 'Siblings (BroodMareSire)',
                    tabBarIcon: () => (
                      <Icon name="cloudsmith" size={16} color="#222" />
                    )
                  }}
                />
                <Tab.Screen
                  name="TailFemale"
                  component={HypotheticalSearchScreenTailFemale}
                  options={{
                    tabBarLabel: 'Tail Female',
                    tabBarIcon: () => (
                      <Icon name="cloudsmith" size={16} color="#222" />
                    )
                  }}
                />
              </Tab.Navigator>



 */