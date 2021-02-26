import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Platform, Animated, ActivityIndicator, Dimensions, Modal, TouchableHighlight, TouchableOpacity, Image, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';

import { Global } from '../Global'
import { HorseDetailScreenPedigree } from './HorseDetailScreenPedigree'
import { HorseDetailPRofileScreen } from './HorseDetailPRofileScreen';
import { HorseDetailProgencyScreen } from './HorseDetailProgencyScreen';
import { HorseDetailSiblingMareScreen } from './HorseDetailSiblingMareScreen';
import { HorseDetailSiblingSireScreen } from './HorseDetailSiblingSireScreen';
import { HorseDetailSiblingBroodmareSireScreen } from './HorseDetailSiblingBroodmareSireScreen';
import { HorseDetailTailFemaleScreen } from "./HorseDetailTailFemaleScreen";
import { HorseDetailBroodMareSireScreen } from "./HorseDetailBroodMareSireScreen";
import { HorseDetailLinebreedingScreen } from './HorseDetailLinebreedingScreen'
import { HorseDetailScreenFemaleFamily } from './HorseDetailScreenFemaleFamily';
import { HorseDetailScreenTJK } from './HorseDetailScreenTJK';
import RBSheet from "react-native-raw-bottom-sheet";
import WebView from 'react-native-webview';
const Tab = createMaterialTopTabNavigator();


export function HorseDetailScreen({ route, navigation }) {
  const { HorseData, Generation } = route.params;
  const [SearchHorseData, setSearchHorseData] = useState();
  Global.Generation = Generation;



  const readUser = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
        if (HorseData.HORSE_ID !== undefined) {
          fetch('https://api.pedigreeall.com/Pedigree/GetPedigree?p_iGenerationCount=' + Generation + "&p_iFirstId=" + Global.Horse_ID + "&p_iSecondId=" + -1, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Basic " + token,
            },
          })
            .then((response) => response.json())
            .then((json) => {
              setSearchHorseData(json)
              Global.HorseDetail = json;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    readUser();
  }, [])
  return (
    <TabScreen HorseInformationData={SearchHorseData} />
  )
}

function TabScreen(HorseInformationData) {
  const HEADER_MIN_HEIGHT = 0;
  const HEADER_MAX_HEIGHT = 350;
  const [showHeader, setShowHeader] = useState(false)
  const refBottomSheet = useRef();
  const [ModalText, setModalText] = useState();
  const [HorseInfo, setHorseInfo] = React.useState();
  const [getFoalInfo, setFoalInfo] = React.useState();
  const [getFoalNum, setFoalNum] = React.useState(1);
  const [getStatisticInfo, setStatisticInfo] = React.useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [FullScreenVisible, setFullScreenVisible] = useState(false);
  const [time, setTime] = React.useState(true);
  const scrollY = new Animated.Value(
    Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
  )
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const readHorseInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/ImageInfo/GetById?p_iHorseId=' + Global.Horse_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            //console.log(json);
            setHorseInfo(json.m_cData);
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }
  const readFoalInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/ParentPage/GetByIdAsNameAndId?p_iHorseId=' + Global.Horse_ID + "&p_iLanguageId=" + 2, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setFoalInfo(json.m_cData);
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }
  const readStatisticInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/HorseInfo/GetFoals?p_iHorseId=' + Global.Horse_ID + "&p_iTypeId=" + getFoalNum, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setStatisticInfo(json.m_cData);
            setTime(false)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }

  React.useEffect(() => {
    readHorseInfo();
    readFoalInfo();
    readStatisticInfo();
  }, [])

  return (
    <View style={styles.Container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.FullScreenContainer}>
            <View style={{ width: '100%', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Icon name="times" size={26} color="silver" />
              </TouchableOpacity>
            </View>
            {ModalText === "Information" &&
              <>
                {HorseInfo !== undefined ?
                  <View style={styles.ModalItemContainer}>
                    <WebView
                      source={{ html: "<body class='scrollHeight'>" + HorseInfo[0].INFO + "</body>" }}
                      startInLoadingState={true}
                      bounces={true}
                      style={{ width: '100%', height: '100%' }}
                      automaticallyAdjustContentInsets={true}
                      javaScriptEnabledAndroid={true}
                      scrollEnabled={false}
                      renderLoading={() => (
                        <ActivityIndicator
                          color='black'
                          size='large'
                        />)} />
                  </View>
                  : <Text>There is no information</Text>
                }
              </>
              || ModalText === "Image" &&

              <>
                <Image style={styles.HorseImage} source={{ uri: 'https://www.pedigreeall.com//upload/1000/' + HorseInfo[0].IMAGE_LIST[0] }} />
              </>

              || ModalText === "Statistics" &&

              <>
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
                              setTime(true);
                              readStatisticInfo();
                            }}>
                            <Text style={styles.StatisticFoalButtonText}>{item.NAME}</Text>
                          </TouchableOpacity>

                        ))}
                      </View>

                    </ScrollView>
                    {time ?
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
              </>

            }

          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={FullScreenVisible}>
        <View style={styles.centeredView}>
          <View style={[styles.FullScreenContainer]}>
            <View style={{ width: '100%', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setFullScreenVisible(false);
                }}>
                <Icon name="times" size={26} color="silver" />
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </Modal>

      <View style={styles.HeaderShortContainer}>

        {HorseInformationData.HorseInformationData !== undefined ?
          <Text style={styles.HeaderTitle}>{HorseInformationData.HorseInformationData.m_cData.HEADER_OBJECT.ROW1_GENERAL}</Text>
          : null}
        <TouchableOpacity
          style={styles.ShowHeaderButtonContainer}
          onPress={() => { setShowHeader(!showHeader) }}>
          {showHeader ?
            <Icon name="minus" size={14} color="#fff" />
            : <Icon name="plus" size={14} color="#fff" />}

        </TouchableOpacity>
      </View>
      {showHeader ?
        <View>
          {HorseInformationData.HorseInformationData !== undefined ?
            <View style={styles.StabilInformationContainer}>
              <View style={styles.StabilInformationItem}>
                <Icon name="chart-line" size={16} color="#222"></Icon>
                <Text style={styles.StabilInformationText}>Dr. Roman Miller: {HorseInformationData.HorseInformationData.m_cData.HEADER_OBJECT.ROW2_RM} </Text>
              </View>
              <View style={styles.StabilInformationItem}>
                <Icon name="chart-line" size={16} color="#222"></Icon>
                <Text style={styles.StabilInformationText}>ANZ: {HorseInformationData.HorseInformationData.m_cData.HEADER_OBJECT.ROW3_ANZ}</Text>
              </View>
              <View style={styles.StabilInformationItem}>
                <Icon name="chart-line" size={16} color="#222"></Icon>
                <Text style={styles.StabilInformationText}>BM-PedigreeAll.com: {HorseInformationData.HorseInformationData.m_cData.HEADER_OBJECT.ROW4_BM_PA}</Text>
              </View>
              <View style={styles.StabilInformationItem}>
                <Icon name="chart-line" size={16} color="#222"></Icon>
                <Text style={styles.StabilInformationText}>PedigreeAll.com: {HorseInformationData.HorseInformationData.m_cData.HEADER_OBJECT.ROW5_PA}</Text>
              </View>
              <View style={styles.StabilInformationButtonContainer3Value}>
                <TouchableOpacity
                  onPress={() => {
                    setModalText("Information");
                    setModalVisible(true);
                  }}
                  style={styles.StabilInformationButton}>
                  <Icon name="exclamation-circle" size={16} color="#fff"></Icon>
                  <Text style={styles.StabilInformationButtonText}>Information</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalText("Statistics")
                    setModalVisible(true);
                  }}
                  style={styles.StabilInformationButton}>
                  <Icon name="chart-line" size={16} color="#fff"></Icon>
                  <Text style={styles.StabilInformationButtonText}>Statistics</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalText("Image");
                    setModalVisible(true);
                  }}
                  style={styles.StabilInformationButton}>
                  <Icon name="image" size={16} color="#fff"></Icon>
                  <Text style={styles.StabilInformationButtonText}>Images</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.StabilInformationButtonContainer2Value}>
                <TouchableOpacity style={styles.StabilInformationButton}>
                  <Icon name="file-pdf" size={16} color="#fff"></Icon>
                  <Text style={styles.StabilInformationButtonText}>Pedigree</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.StabilInformationButton}>
                  <Icon name="image" size={16} color="#fff"></Icon>
                  <Text style={styles.StabilInformationButtonText}>Pedigree</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Line} />
            </View>
            :
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.ActivityIndicatorStyle}
            />
          }
        </View>
        : null}

      <Tab.Navigator
        initialRouteName="SearchScreen"
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
          component={HorseDetailScreenPedigree}
          options={{
            tabBarLabel: 'Pedigree',
            tabBarIcon: () => (
              <Icon name="network-wired" size={16} color="#222" />
            ),

          }}
        />
        <Tab.Screen
          name="Profile"
          component={HorseDetailPRofileScreen}
          initialParams={{BackButton: false}}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => (
              <Icon name="id-card" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="Progeny"
          component={HorseDetailProgencyScreen}
          initialParams={{BackButton: false}}
          options={{
            tabBarLabel: 'Progeny',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="SiblingsMare"
          component={HorseDetailSiblingMareScreen}
          initialParams={{BackButton: false}}
          options={{
            tabBarLabel: 'Siblings (Mare)',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="SiblingsSire"
          component={HorseDetailSiblingSireScreen}
          initialParams={{BackButton: false}}
          options={{
            tabBarLabel: 'Siblings (Sire)',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="SiblingBroodmareSire"
          component={HorseDetailSiblingBroodmareSireScreen}
          initialParams={{BackButton: false}}
          options={{
            tabBarLabel: 'Siblings (BroodMareSire)',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="TailFemale"
          component={HorseDetailTailFemaleScreen}
          initialParams={{BackButton: false}}
          options={{
            tabBarLabel: 'Tail Female',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="BroodMareSire"
          component={HorseDetailBroodMareSireScreen}
          options={{
            tabBarLabel: 'BroodMare Sire',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="Linebreeding"
          component={HorseDetailLinebreedingScreen}
          initialParams={{BackButton: false}}
          options={{
            tabBarLabel: 'Linebreeding',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="FemaleFamiliy"
          component={HorseDetailScreenFemaleFamily}
          initialParams={{BackButton: false}}
          options={{
            tabBarLabel: 'Female Family',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="TJK"
          component={HorseDetailScreenTJK}
          options={{
            tabBarLabel: 'TJK',
            tabBarIcon: () => (
              <Image
                style={{ width: 25, height: 25 }}
                source={{ uri: 'https://medya-cdn.tjk.org/medyaftp/site_img/logo-tjk.png' }}
              />
            )
          }}
        />
      </Tab.Navigator>


    </View>
  )

}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  StabilInformationContainer: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    padding: 10
  },
  StabilInformationItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
    alignItems: 'center'
  },
  StabilInformationText: {
    fontSize: 14,
    marginLeft: 10,
  },
  StabilInformationButtonContainer3Value: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  StabilInformationButtonContainer2Value: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  StabilInformationButton: {
    flexDirection: 'row',
    backgroundColor: '#2169ab',
    padding: 7,
    borderRadius: 10,
    alignItems: 'center'
  },
  StabilInformationButtonText: {
    color: '#fff',
    marginLeft: 10
  },
  Line: {
    borderBottomColor: 'silver',
    borderBottomWidth: 0.5,
    marginTop: 10
  },
  FooterButton: {
    backgroundColor: '#2169ab',
    padding: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    zIndex: 99999999,
    bottom: 0,
    right: 0,
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
  HeaderShortContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25,
    zIndex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: '#6c6c6ca8'
  },
  openButton: {
    backgroundColor: "#2169ab",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  ModalItemContainer: {
    width: '100%',
    height: '95%',

  },
  ModalContainer: {
    width: '95%',
    height: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  FullScreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: "#000",
  },
  TableCellStyle: {
    width: 100,
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
  HorseImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
    marginBottom: 20
  }
})