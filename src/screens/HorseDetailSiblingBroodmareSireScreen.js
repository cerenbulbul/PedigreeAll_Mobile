import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Global } from '../Global'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";

export function HorseDetailSiblingBroodmareSireScreen({ BackButton, navigation }) {
  const [time, setTime] = React.useState(true);
  const [getSiblingBroodmareSire, setSiblingBroodmareSire] = React.useState();

  const readSiblingBroodmareSire = async () => {
    try {
      if (Global.Token !== null) {
        fetch('https://api.pedigreeall.com/Sibling/GetSiblingFromBroodmareSire?p_iHorseId=' + Global.Horse_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + Global.Token,
          },
        }).then((response) => response.json())
          .then((json) => {
            if (json !== null) {
              setSiblingBroodmareSire(json.m_cData);
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
      console.log("GetSiblingBroodmareSire Error")
    }
  };

  React.useEffect(() => {
    readSiblingBroodmareSire();
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
    <ScrollView style={{ backgroundColor: "#fff" }} showsVerticalScrollIndicator={true}>

      {console.log("Broodmare Sire Screen")}

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
          {getSiblingBroodmareSire !== undefined &&

            <ScrollView horizontal={true}>


              <DataTable>
                {Global.Language === 1 ?
                  <DataTable.Header removeClippedSubviews={true}>
                    <DataTable.Title style={{ width: 350 }}>İsim</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Sınıf</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Puan</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Kazanç</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Fam</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Renk</DataTable.Title>
                    <DataTable.Title style={{ width: 400 }}>Aygır</DataTable.Title>
                    <DataTable.Title style={{ width: 400 }}>Kısrak</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Doğum T.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Koşu</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>1.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>1. %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>2.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>2. %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>3.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>3. %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>4.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>4. %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Fiyat</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Dr. RM</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>ANZ</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>PedigreeAll</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Sahip</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Yetiştirici</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Coach</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Dead</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Update D.</DataTable.Title>
                  </DataTable.Header>
                  :
                  <DataTable.Header removeClippedSubviews={true}>
                    <DataTable.Title style={{ width: 350 }}>Name</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Class</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Point</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Earning</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Fam</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Color</DataTable.Title>
                    <DataTable.Title style={{ width: 400 }}>Sire</DataTable.Title>
                    <DataTable.Title style={{ width: 400 }}>Dam</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Birth D.</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Start</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>1st</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>1st %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>2nd</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>2nd %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>3rd</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>3rd %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>4th</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>4th %</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Price</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Dr. RM</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>ANZ</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>PedigreeAll</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Owner</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Breeder</DataTable.Title>
                    <DataTable.Title style={{ width: 150 }}>Antrenör</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Ölü</DataTable.Title>
                    <DataTable.Title style={styles.DataTableText}>Güncellenme T.</DataTable.Title>
                  </DataTable.Header>
                }


                {getSiblingBroodmareSire.HORSE_INFO_LIST.map((item, index) => (

                  <DataTable.Row centered={true} key={index}>
                    <DataTable.Cell
                      onPress={() => { alertDialog("Name", item.HORSE_NAME) }}
                      style={{ width: 350 }}>
                      {item.HORSE_NAME}
                    </DataTable.Cell>
                    {Global.Language === 1 ?
                      <DataTable.Cell style={styles.DataTableText}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_TR}</DataTable.Cell>
                      :
                      <DataTable.Cell style={styles.DataTableText}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                    }

                    <DataTable.Cell style={styles.DataTableText} >{item.POINT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText} >{item.FAMILY_TEXT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.COLOR_TEXT}</DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => { alertDialog("Sire", item.MOTHER_NAME) }}
                      style={{ width: 400 }}>
                      {item.MOTHER_NAME}
                    </DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => { alertDialog("Dam", item.FATHER_NAME) }}
                      style={{ width: 400 }}>
                      {item.FATHER_NAME}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.START_COUNT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText} >{item.FIRST}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText} >{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText} >{item.SECOND}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.THIRD}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText} >{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.FOURTH}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.RM}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.ANZ}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableText}>{item.PA}</DataTable.Cell>
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
                          <DataTable.Cell style={styles.DataTableText}>Ölü</DataTable.Cell>
                          :
                          <DataTable.Cell style={styles.DataTableText}>DEAD</DataTable.Cell>}
                      </>

                      :
                      <>
                        {Global.Language === 1 ?
                          <DataTable.Cell style={styles.DataTableText}>Sağ</DataTable.Cell>
                          :
                          <DataTable.Cell style={styles.DataTableText}>ALIVE</DataTable.Cell>}
                      </>
                    }
                    <DataTable.Cell style={styles.DataTableText}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
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
  BackButton: {
    flexDirection: 'row',
    alignSelf: 'baseline',
    padding: 10,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: 'silver',
    marginBottom: 10
  },
  DataTableText: {
    width: 100
  }
})