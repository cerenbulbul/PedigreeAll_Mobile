import React from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { Global } from '../Global';
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";

export function BreedingFoalsAsBroodMareSireScreen({ navigation }) {


    const [getBmSireData, setBMSireData] = React.useState();
    const [getLoader, setLoader] = React.useState(true);

    const readUser = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/BmSire/GetFoalsOfBroodMareSire?p_iHorseId=' + Global.Horse_ID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json)
                        setBMSireData(json.m_cData)
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


    return (
        <ScrollView style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={true}>


            {getLoader ?
                <ActivityIndicator size="large" color="#000" />
                :
                <>

                    {getBmSireData !== undefined &&

                        <ScrollView horizontal={true}>


                            <DataTable>
                                {Global.Language === 1 ?
                                    <DataTable.Header removeClippedSubviews={true}>
                                        <DataTable.Title style={{ width: 350 }}>Isim</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Sınıf</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Puan</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Kazanç</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Fam</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Renk</DataTable.Title>
                                        <DataTable.Title style={{ width: 400 }}>Sire</DataTable.Title>
                                        <DataTable.Title style={{ width: 400 }}>Dam</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Doğum T.</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Koşu</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>1.</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>1.st %</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>2.</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>2. %</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>3.</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>3. %</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>4.</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>4. %</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Fiyat</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Dr. RM</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>ANZ</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>PedigreeAll</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>Sahip</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>Yetiştirici</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>Antrenör</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Ölü</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Güncelleme T.</DataTable.Title>
                                    </DataTable.Header>
                                    :
                                    <DataTable.Header removeClippedSubviews={true}>
                                        <DataTable.Title style={{ width: 350 }}>Name</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Class</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Point</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Earning</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Fam</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Color</DataTable.Title>
                                        <DataTable.Title style={{ width: 400 }}>Sire</DataTable.Title>
                                        <DataTable.Title style={{ width: 400 }}>Dam</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Birth D.</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Start</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>1st</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>1st %</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>2nd</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>2nd %</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>3rd</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>3rd %</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>4th</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>4th %</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Price</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Dr. RM</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>ANZ</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>PedigreeAll</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>Owner</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>Breeder</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>Coach</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Dead</DataTable.Title>
                                        <DataTable.Title style={styles.TableHeaderContainer}>Update D.</DataTable.Title>
                                    </DataTable.Header>
                                }

                                {getBmSireData.HORSE_INFO_LIST.map((item, index) => (

                                    <DataTable.Row centered={true} key={index}>
                                        <DataTable.Cell style={{ width: 350 }}>{item.HORSE_NAME}</DataTable.Cell>
                                        {Global.Language === 1 ?
                                            <DataTable.Cell style={styles.TableCellContainer}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_TR}</DataTable.Cell>
                                            :
                                            <DataTable.Cell style={styles.TableCellContainer}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                                        }

                                        <DataTable.Cell style={styles.TableCellContainer}>{item.POINT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.FAMILY_TEXT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.COLOR_TEXT}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 400 }}>{item.FATHER_NAME}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 400 }}>{item.MOTHER_NAME}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer} >{item.START_COUNT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer} >{item.FIRST}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer} >{item.SECOND}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer} >{item.THIRD}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.FOURTH}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer} >{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.RM}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.ANZ}</DataTable.Cell>
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.PA}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 150 }}>{item.OWNER}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 150 }}>{item.BREEDER}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 150 }}>{item.COACH}</DataTable.Cell>
                                        {item.IS_DEAD ?
                                            <>
                                                {Global.Language === 1 ?
                                                    <DataTable.Cell style={styles.TableCellContainer}>Ölü</DataTable.Cell>
                                                    :
                                                    <DataTable.Cell style={styles.TableCellContainer}>DEAD</DataTable.Cell>
                                                }
                                            </>

                                            :
                                            <>
                                                {Global.Language === 1 ?
                                                    <DataTable.Cell style={styles.TableCellContainer}>Sağ</DataTable.Cell>
                                                    :
                                                    <DataTable.Cell style={styles.TableCellContainer}>ALIVE</DataTable.Cell>
                                                }
                                            </>
                                        }
                                        <DataTable.Cell style={styles.TableCellContainer}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
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
    TableHeaderContainer: {
        width: 120,
    },
    TableCellContainer: {
        width: 120
    }
})