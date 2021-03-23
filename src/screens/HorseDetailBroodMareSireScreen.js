import React, {useState} from 'react'
import { View , StyleSheet, ScrollView, ActivityIndicator, Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {Global} from '../Global'
import { DataTable } from 'react-native-paper';

export function HorseDetailBroodMareSireScreen() {
    const [getBroodMareSire,setBroodMareSire] = React.useState();
    const [time, setTime] = React.useState(true);

    const readBroodMareSire= async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/BmSire/GetFoalsOfBroodMareSire?p_iHorseId=' + Global.Horse_ID  , {
                method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + Global.Token,
                  },
                }).then((response) => response.json())
                  .then((json) => {
                    if (json !== null) {
                        setBroodMareSire(json.m_cData);
                        setTime(false)
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  })
          } 
          else{
            console.log("Basarisiz")
          }
              }
              catch (e) {
                console.log("GetBroodMareSire Error")
              }
      };
    
      React.useEffect(() => {
        readBroodMareSire();
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
        <ScrollView showsVerticalScrollIndicator={true}>
        
        {time?
        <ActivityIndicator size="large" color="#000" />
        :
        <>
         {getBroodMareSire !== undefined &&
        
        <ScrollView horizontal={true}>
            
       
                <DataTable>
                <DataTable.Header removeClippedSubviews={true}>
                <DataTable.Title style={{width:350}} >Name</DataTable.Title>
                <DataTable.Title style={styles.DataTableText}>Class</DataTable.Title>
                <DataTable.Title style={styles.DataTableText}>Point</DataTable.Title>
                <DataTable.Title style={styles.DataTableText}>Earning</DataTable.Title>
                <DataTable.Title style={styles.DataTableText}>Fam</DataTable.Title>
                <DataTable.Title style={styles.DataTableText}>Color</DataTable.Title>
                <DataTable.Title style={{width:400}}>Dam</DataTable.Title>
                <DataTable.Title style={{width:400}}>Broodmare Sire</DataTable.Title>
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
                <DataTable.Title style={{width:150}}>Owner</DataTable.Title>
                <DataTable.Title style={{width:150}}>Breeder</DataTable.Title>
                <DataTable.Title style={{width:150}}>Coach</DataTable.Title>
                <DataTable.Title style={styles.DataTableText}>Dead</DataTable.Title>
                <DataTable.Title style={styles.DataTableText}>Update D.</DataTable.Title>
                </DataTable.Header>

                {getBroodMareSire.HORSE_INFO_LIST.map((item,index)=>(

                <DataTable.Row centered={true} key={index}>
                <DataTable.Cell 
                  onPress={() => { alertDialog("Name", item.HORSE_NAME) }} 
                  style={{width:350}}>
                    {item.HORSE_NAME}
                </DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText} >{item.POINT}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText} >{item.FAMILY_TEXT}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText} >{item.COLOR_TEXT}</DataTable.Cell>
                <DataTable.Cell 
                  onPress={() => { alertDialog("Dam", item.MOTHER_NAME) }} 
                  style={{width:400}}>
                    {item.MOTHER_NAME}
                </DataTable.Cell>
                <DataTable.Cell 
                  onPress={() => { alertDialog("Broodmare Sire", item.BM_SIRE_NAME) }} 
                  style={{width:400}}>
                    {item.BM_SIRE_NAME}
                </DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.START_COUNT}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText} >{item.FIRST}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText} >{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText} >{item.SECOND}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText} >{item.THIRD}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText} >{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.FOURTH}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.RM}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.ANZ}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableText}>{item.PA}</DataTable.Cell>
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
                <DataTable.Cell style={styles.DataTableText}>DEAD</DataTable.Cell>
                :<DataTable.Cell style={styles.DataTableText}>ALIVE</DataTable.Cell> }
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
  DataTableText:{
    width:100
  }
})