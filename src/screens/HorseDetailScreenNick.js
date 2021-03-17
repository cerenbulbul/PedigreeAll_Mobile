import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert , Modal} from 'react-native'
import { Global } from '../Global'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";

export function HorseDetailScreenNick() {

    const [getNickSuccessData, setNickSuccessData] = React.useState()
    const [getLoader, setLoader] = React.useState(true)
    const [getMoreInfo, setMoreInfo] = React.useState(false)

    const readNickSuccessGetHorseID = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/NickSuccess/Get?p_iHorseId=' + Global.Horse_ID, {
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
                            setNickSuccessData(json.m_cData)
                            setLoader(false)
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
            console.log("GetPedigreeReport Error")
        }
    };

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


    React.useEffect(() => {
        readNickSuccessGetHorseID();
    }, [])

    return (
        <View style={styles.Container}>

            {getLoader ?
                <ActivityIndicator color="black" size="large" />
                :
                <>
                    {getNickSuccessData !== undefined &&

                        <ScrollView horizontal={true}>


                            <DataTable>
                                <DataTable.Header removeClippedSubviews={true}>
                                    <DataTable.Title style={{width:50}}> </DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>B. Sire</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Foals</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Point</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Start</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Top 4</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Top 4%</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>1.</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>1. %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle} >2.</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>2. %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>3.</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>3. %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>4.</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>4. %</DataTable.Title>
                                </DataTable.Header>

                                {getNickSuccessData.map((item, index) => (

                                    <DataTable.Row centered={true} key={index}>
                                        <DataTable.Cell 
                                            onPress={()=>{
                                                setMoreInfo(true)
                                            }}
                                            style={{width:50}}>
                                                <Icon name="info" color="#222" size={16} />
                                            
                                        </DataTable.Cell>
                                        <DataTable.Cell 
                                            onPress={()=>{
                                                alertDialog("Broodmare Sire", item.BM_SIRE_NAME)
                                            }}
                                            style={styles.DataTableText}>
                                            {item.BM_SIRE_NAME.substring(0,8)}...
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.COUNTER}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.POINT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.START}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.TOP4}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.TOP4_PERCENTAGE}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.FOURTH}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.FOURTH_PERCENTAGE}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.THIRD}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.THIRD_PERCENTAGE}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.SECOND}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.SECOND_PERCENTAGE}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.FIRST}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.FIRST_PERCENTAGE}</DataTable.Cell>
                                    </DataTable.Row>



                                ))}

                            </DataTable>


                        </ScrollView>


                    }
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
    DataTableTitle:{
        width:100
    },
    DataTableText:{
        width:100
    }
})