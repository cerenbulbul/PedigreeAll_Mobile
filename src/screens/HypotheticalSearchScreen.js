import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-community/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DataTable } from 'react-native-paper';

import {HypotheticalSearchScreenPedigree} from './HypotheticalSearchScreenPedigree'
import {HypotheticalSearchScreenMareSiblings} from './HypotheticalSearchScreenMareSiblings'
import {HypotheticalSearchScreenSireSiblings} from './HypotheticalSearchScreenSireSiblings'
import {HypotheticalSearchScreenBroodmareSire} from './HypotheticalSearchScreenBroodmareSire'
import {HypotheticalSearchScreenTailFemale} from './HypotheticalSearchScreenTailFemale'
import {Global} from '../Global'

const Tab = createMaterialTopTabNavigator();

export function HypotheticalSearchScreen({ route, navigation }) {
    const { SireHorseData, MareHorseData, Generation } = route.params;
    const [getHorseData, setHorseData] = React.useState();
    const [time, setTime] = React.useState(true);
    const [statisticTime, setStatisticTime] = React.useState(true);
    const [FoalTime, setFoalTime] = React.useState(true);
    const [showHeader, setShowHeader] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [getFoalInfo, setFoalInfo] = React.useState();
    const [getFoalNum, setFoalNum] = React.useState(1);
    const [getStatisticInfo, setStatisticInfo] = React.useState();
    const readUser = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Pedigree/GetPedigree?p_iGenerationCount=' + Generation + "&p_iFirstId=" + SireHorseData.HORSE_ID + "&p_iSecondId=" + MareHorseData.HORSE_ID, {
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
      const readStatisticInfo = async () => {
        try {
          const token = await AsyncStorage.getItem('TOKEN')
          if (token !== null) {
            fetch('https://api.pedigreeall.com/HorseInfo/GetFoals?p_iHorseId=' + Global.Horse_First_ID + "&p_iTypeId=" + getFoalNum, {
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

    React.useEffect(() => {
        readUser();
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
                              readStatisticInfo();
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

                        </>

                    }

                </>
            }
        </View>
    )
}

function denemeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
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
})