import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Global } from '../Global'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";

export function HorseDetailLinebreedingScreen({ route, navigation }) {

    const { BackButton } = route.params;

    const [LinebreedingHorse, setLinebreedingHorse] = React.useState();
    const [loader, setLoader] = useState(true)
    const readLinebreedingHorse = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/Linebreeding/GetLinebreedingReport?p_iFirstId=' + Global.Horse_ID + "&p_iSecondId=" + Global.Horse_ID_Second + "&p_iGenerationCount=" + Global.Generation + "&p_iMinCross=" + Global.MinCross, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setLinebreedingHorse(json.m_cData)
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
            console.log(e)
        }
    }
    React.useEffect(() => {
        readLinebreedingHorse();
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
                                ScreenName: "TreeViewScreen",
                            })
                        }}>
                        <Icon name="chevron-left" size={24} color="silver" style={{ alignSelf: 'center' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                    </TouchableOpacity>

                </View>
                :
                null}

            {loader ?
                <ActivityIndicator size="large" color="#000" />
                :
                <>
                    {LinebreedingHorse !== undefined &&

                        <ScrollView horizontal={true}>

                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title style={{ width: 100 }}>Name</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Inbreeding Statistics</DataTable.Title>
                                    <DataTable.Title style={{ width: 100, marginLeft: 20 }}> X </DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Lines</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Blood%</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Influence</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>AGR</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Class</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Sex</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Earning</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Family</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Color</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Sire</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Dam</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Broodmare Sire</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Birth D.</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Start</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>1st</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>1st %</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>2nd</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>2nd %</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>3rd</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>3rd %</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>4th</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>4th %</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Price</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Dr. RM</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>ANZ</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>PedigreeAll</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Owner</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Breeder</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Coach</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Dead</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Point</DataTable.Title>
                                    <DataTable.Title style={{ width: 100 }}>Update D.</DataTable.Title>
                                </DataTable.Header>

                                {LinebreedingHorse.LINEBREEDING_LIST !== undefined &&
                                    <>
                                        {LinebreedingHorse.LINEBREEDING_LIST.map((item, index) => (
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell 
                                                    style={{ width: 100 }} 
                                                    onPress={() => {
                                                        alertDialog("Name" , item.HORSE_INFO_OBJECT.HORSE_NAME)
                                                    }}
                                                >{item.HORSE_INFO_OBJECT.HORSE_NAME}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.STATISTICS}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100, marginLeft: 20 }}>{item.CROSS}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.LINES}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.BLOOD} %</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.INFLUENCE} %</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.AGR} %</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.SEX_OBJECT.SEX_EN}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.EARN} {item.HORSE_INFO_OBJECT.EARN_ICON}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.FAMILY_TEXT}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.COLOR_TEXT}</DataTable.Cell>
                                                <DataTable.Cell onPress = {()=>{
                                                    alertDialog("Sire" , item.HORSE_INFO_OBJECT.FATHER_NAME)
                                                }} style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.FATHER_NAME}</DataTable.Cell>
                                                <DataTable.Cell onPress={()=>{
                                                    alertDialog("Dam", item.HORSE_INFO_OBJECT.MOTHER_NAME)
                                                }} style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.MOTHER_NAME}</DataTable.Cell>
                                                <DataTable.Cell onPress={()=>{
                                                    alertDialog("Broodmare Sire" , item.HORSE_INFO_OBJECT.BM_SIRE_NAME)
                                                }} style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.BM_SIRE_NAME}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.START_COUNT}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.FIRST}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.FIRST_PERCENTAGE}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.SECOND}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.SECOND_PERCENTAGE}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.THIRD}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.THIRD_PERCENTAGE}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.FOURTH}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.FOURTH_PERCENTAGE}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.PRICE} {item.HORSE_INFO_OBJECT.PRICE_ICON}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.RM}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.ANZ}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.PA}</DataTable.Cell>
                                                <DataTable.Cell onPress={()=>{
                                                    alertDialog("Owner" , item.HORSE_INFO_OBJECT.OWNER)
                                                }} style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.OWNER}</DataTable.Cell>
                                                <DataTable.Cell onPress={()=>{
                                                    alertDialog("Breeder", item.HORSE_INFO_OBJECT.BREEDER)
                                                }} style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.BREEDER}</DataTable.Cell>
                                                <DataTable.Cell onPress={()=>{
                                                    alertDialog("Coach", item.HORSE_INFO_OBJECT.COACH)
                                                }} style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.COACH}</DataTable.Cell>
                                                {item.HORSE_INFO_OBJECT.IS_DEAD ?
                                                    <DataTable.Cell style={{ width: 100 }}>DEAD</DataTable.Cell> :
                                                    <DataTable.Cell style={{ width: 100 }}>ALIVE</DataTable.Cell>}

                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.POINT}</DataTable.Cell>
                                                <DataTable.Cell style={{ width: 100 }}>{item.HORSE_INFO_OBJECT.EDIT_DATE_TEXT}</DataTable.Cell>

                                            </DataTable.Row>
                                        ))}
                                    </>

                                }
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
})