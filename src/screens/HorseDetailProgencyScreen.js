import React, { useState } from 'react'
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Global } from '../Global'
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Platform } from 'react-native';


export function HorseDetailProgencyScreen({ BackButton, navigation }) {

  const [time, setTime] = React.useState(true);
  const [getProgency, setProgency] = React.useState();

  const readProgency = async () => {
    try {
      if (Global.Token !== null) {
        fetch('https://api.pedigreeall.com/Progeny/GetProgeny?p_iHorseId=' + Global.Horse_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + Global.Token,
          },
        }).then((response) => response.json())
          .then((json) => {
            //setHorsePedigree(json)
            if (json !== null) {
              setProgency(json.m_cData);
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
      console.log("GetProgency Error")
    }

  };

  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Progency Page Duration");
      }, 2000);
    });
  }

  async function asyncCall() {
    const result = await resolveAfter2Seconds();
    setTime(false);
    // expected output: "resolved"
  }
  React.useEffect(() => {
    readProgency();
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
    <ScrollView style={{backgroundColor:'#fff'}} showsVerticalScrollIndicator={true}>

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

          {getProgency !== undefined &&

            <ScrollView horizontal={true}>


              <DataTable>
                <DataTable.Header removeClippedSubviews={true}>
                  <DataTable.Title style={{width:350}}>Name</DataTable.Title>
                  <DataTable.Title style={styles.DataTableTitle}>Class</DataTable.Title>
                  <DataTable.Title style={styles.DataTableTitle}>Point</DataTable.Title>
                  <DataTable.Title style={styles.DataTableTitle}>Earning</DataTable.Title>
                  <DataTable.Title style={styles.DataTableTitle}>Fam</DataTable.Title>
                  <DataTable.Title style={styles.DataTableTitle}>Color</DataTable.Title>
                  <DataTable.Title style={{width:350}}>Dam</DataTable.Title>
                  <DataTable.Title style={{width:400}}>Broodmare Sire</DataTable.Title>
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
                  <DataTable.Title style={{width:150}}>Owner</DataTable.Title>
                  <DataTable.Title style={{width:150}}>Breeder</DataTable.Title>
                  <DataTable.Title style={{width:150}}>Coach</DataTable.Title>
                  <DataTable.Title style={styles.DataTableTitle}>Dead</DataTable.Title>
                  <DataTable.Title style={styles.DataTableTitle}>Update D.</DataTable.Title>
                </DataTable.Header>

                {getProgency.HORSE_INFO_LIST.map((item, index) => (

                  <DataTable.Row centered={true} key={index}>
                    <DataTable.Cell 
                      onPress={() => { alertDialog("Name", item.HORSE_NAME) }} 
                      style={{width:350}}>
                        {item.HORSE_NAME}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.POINT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell} >{item.FAMILY_TEXT}</DataTable.Cell>
                    <DataTable.Cell style={styles.DataTableCell}>{item.COLOR_TEXT}</DataTable.Cell>
                    <DataTable.Cell 
                      onPress={() => { alertDialog("Dam", item.MOTHER_NAME) }} 
                      style={{width:350}}>
                        {item.MOTHER_NAME}
                    </DataTable.Cell>
                    <DataTable.Cell 
                      onPress={() => { alertDialog("Broodmare Sire", item.BM_SIRE_NAME) }} 
                      style={{width:400}}>
                        {item.BM_SIRE_NAME}
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
                      style={{width:150}}>
                        {item.OWNER}
                    </DataTable.Cell>
                    <DataTable.Cell 
                      onPress={() => { alertDialog("Breeder", item.BREEDER) }}
                      style={{width:150}}>
                        {item.BREEDER}
                    </DataTable.Cell>
                    <DataTable.Cell 
                      onPress={() => { alertDialog("Coach", item.COACH) }} 
                      style={{width:150}}>
                        {item.COACH}
                    </DataTable.Cell>
                    {item.IS_DEAD ?
                      <DataTable.Cell  style={styles.DataTableCell} >DEAD</DataTable.Cell>
                      : <DataTable.Cell style={styles.DataTableCell}>ALIVE</DataTable.Cell>}
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
  BackButton:{
    flexDirection:'row',
    alignSelf:'baseline',
    padding:10,
    width:'100%',
    borderBottomWidth:0.5, 
    borderColor:'silver',
    marginBottom:10
  },
  DataTableTitle:{
    width:100
  },
  DataTableCell:{
    width:100
  },
})