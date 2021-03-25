import React, { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Global } from '../Global'
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome5";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export function HorseDetailSiblingMareScreen({ BackButton, navigation }) {
  const [time, setTime] = React.useState(true);
  const [getSiblingMare, setSiblingMare] = React.useState();
  const readSiblingMare = async () => {
    try {
      if (Global.Token !== null) {
        fetch('https://api.pedigreeall.com/Sibling/GetSiblingFromMother?p_iHorseId=' + Global.Horse_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + Global.Token,
          },
        }).then((response) => response.json())
          .then((json) => {
            if (json !== null) {
              setSiblingMare(json.m_cData);
              setTime(false);
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    }
    catch (e) {
      console.log("GetSiblingMare Error")
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  React.useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      console.log(Global.Horse_ID)
      readSiblingMare();

    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  React.useEffect(() => {
    console.log(Global.Horse_ID)
    readSiblingMare();
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
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      showsVerticalScrollIndicator={true}>

      {BackButton ?
        <View>
          <TouchableOpacity
            style={styles.BackButton}
            onPress={() => {
              navigation.navigate('Breeders', {
                ScreenName: "TableReportScreen",
              })
            }}>
            <Icon name="chevron-left" size={24} color="silver" style={{ alignSelf: 'center' }} />
            <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
          </TouchableOpacity>

        </View>
        :
        null}

      {time ?
        <ActivityIndicator size="large" color="#000" />
        :
        <>
          {getSiblingMare !== undefined &&

            <ScrollView horizontal={true}>


              <DataTable>
                {Global.Language === 1 ?
                  <DataTable.Header removeClippedSubviews={true}>
                    <DataTable.Title style={{ width: 350 }}>İsim</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Sınıf</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Puan</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Kazanç</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Fam</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Renk</DataTable.Title>
                    <DataTable.Title style={{ width: 400 }}>Aygır</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Doğum T.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Koşu</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>1.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>1. %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>2.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>2. %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>3.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>3. %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>4.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>4. %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Price</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Dr. RM</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>ANZ</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>PedigreeAll</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Sahip</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Yetiştirici</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Antrenör</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Ölü</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Güncellenme T.</DataTable.Title>
                  </DataTable.Header>
                  :
                  <DataTable.Header removeClippedSubviews={true}>
                    <DataTable.Title style={{ width: 350 }}>Name</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Class</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Point</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Earning</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Fam</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Color</DataTable.Title>
                    <DataTable.Title style={{ width: 400 }}>Sire</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Birth D.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Start</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>1st</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>1st %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>2nd</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>2nd %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>3rd</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>3rd %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>4th</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>4th %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Price</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Dr. RM</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>ANZ</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>PedigreeAll</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Owner</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Breeder</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Coach</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Dead</DataTable.Title>
                    <DataTable.Title style={styles.DataTableTitle}>Update D.</DataTable.Title>
                  </DataTable.Header>
                }


                {getSiblingMare.HORSE_INFO_LIST.map((item, index) => (

                  <DataTable.Row centered={true} key={index}>
                    <DataTable.Cell
                      onPress={() => { alertDialog("Name", item.HORSE_NAME) }}
                      style={{ width: 350 }}>
                      {item.HORSE_NAME}
                    </DataTable.Cell>
                    {Global.Language === 1 ?
                      <DataTable.Cell style={styles.DataTableCell}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_TR}</DataTable.Cell>
                      :
                      <DataTable.Cell style={styles.DataTableCell}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                    }

                    <DataTable.Cell style={styles.DataTableCell} >{item.POINT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.FAMILY_TEXT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.COLOR_TEXT}</DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => { alertDialog("Sire", item.FATHER_NAME) }}
                      style={{ width: 400 }}>
                      {item.FATHER_NAME}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.START_COUNT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.FIRST}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.SECOND}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.THIRD}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.FOURTH}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.RM}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.ANZ}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.PA}</DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => { alertDialog("Owner", item.OWNER) }}
                      style={{ width: 150 }}>
                      {item.OWNER}
                    </DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => { alertDialog("Breeder", item.BREEDER) }}
                      style={{ width: 150 }}>
                      {item.BREEDER}
                    </DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => { alertDialog("Coach", item.COACH) }}
                      style={{ width: 150 }}>
                      {item.COACH}
                    </DataTable.Cell>
                    {item.IS_DEAD ?
                      <>
                        {Global.Language === 1 ?
                          <DataTable.Cell style={styles.DataTableCell}>Ölü</DataTable.Cell>
                          :
                          <DataTable.Cell style={styles.DataTableCell}>DEAD</DataTable.Cell>}
                      </>

                      :
                      <>
                        {Global.Language === 1 ?
                          <DataTable.Cell style={styles.DataTableCell}>Sağ</DataTable.Cell>
                          :
                          <DataTable.Cell style={styles.DataTableCell}>ALIVE</DataTable.Cell>}
                      </>
                    }
                    <DataTable.Cell style={styles.DataTableCell}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                  </DataTable.Row>



                ))}

              </DataTable>
            </ScrollView>
          }
        </>
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  BackButton: {
    flexDirection: 'row',
    alignSelf: 'baseline',
    padding: 10,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: 'silver',
    marginBottom: 10
  },
  DataTableTitle: {
    width: 100
  },
  DataTableCell: {
    width: 100
  }
})