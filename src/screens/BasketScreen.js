import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Global } from '../Global'
import Icon from "react-native-vector-icons/FontAwesome5";
import { DataTable } from 'react-native-paper';
import Title from '../components/Title';



export function BasketScreen({ navigation }) {

    const [getBasketData, setBasketData] = React.useState();
    const [getLoader, setLoader] = React.useState(true)
    const [getTotalCostUSD, setTotalCostUSD] = React.useState();
    const [getTotalCostTL, setTotalCostTL] = React.useState();

    const getItemFromSepetim = async () => {
        try {
            const userKey = await AsyncStorage.getItem('SEPETIM')
            if (userKey !== null) {
                setBasketData(JSON.parse(userKey))
                let totalUSD = 0;
                let totalTL = 0;
                for (let i = 0; i < JSON.parse(userKey).length; i++) {
                    totalUSD += JSON.parse(userKey)[i].COST_USD
                    totalTL += JSON.parse(userKey)[i].COST_TL
                }
                setTotalCostUSD(totalUSD)
                setTotalCostTL(totalTL)

                setLoader(false)
            }
        } catch (e) {
            console.log("User Error")
        }
    };


    const removeData = async (item) => {
        try {
            const Basket = [];
            const userKey = await AsyncStorage.getItem('SEPETIM')
            if (userKey !== null) {
                for (let i = 0; i < (JSON.parse(userKey).length); i++) {
                    if (item.ORDER_DETAIL_ID !== JSON.parse(userKey)[i].ORDER_DETAIL_ID) {
                        Basket.push(JSON.parse(userKey)[i])
                    }
                    
                }
            }
            await AsyncStorage.removeItem("SEPETIM")
            await AsyncStorage.setItem("SEPETIM", JSON.stringify(Basket))
            alertDialog("Successfully", "You deleted successfully")
            setLoader(true)
            getItemFromSepetim();
            console.log('Data successfully removed')
        } catch (e) {
            console.log('Failed to save the data to the storage')
        }
    }


    React.useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getItemFromSepetim()

        });

        return () => {
            unsubscribe;
        };
    }, [navigation]);

    React.useEffect(() => {

        getItemFromSepetim();
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
        <View style={styles.Container}>
            <Title text="Cart" />
            {getLoader ?
                <ActivityIndicator size="large" color="#000" />
                :
                <ScrollView>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>File</DataTable.Title>
                            <DataTable.Title>Report Type</DataTable.Title>
                            <DataTable.Title>Report</DataTable.Title>
                            <DataTable.Title>Fee USD</DataTable.Title>
                            <DataTable.Title>Fee TL</DataTable.Title>
                            <DataTable.Title>Delete</DataTable.Title>
                        </DataTable.Header>

                        {getBasketData !== undefined &&
                            <>
                                {getBasketData.map((item, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>
                                            <Icon name="file-pdf" size={20} color="red" />
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => {
                                                alertDialog("Report Type", item.PRODUCT.PRODUCT_EN)
                                            }}
                                            style={styles.DataTableCellText}>
                                            {item.PRODUCT.PRODUCT_EN.substring(0, 10)}...
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => {
                                                alertDialog("Report", item.INFO)
                                            }}
                                            style={styles.DataTableCellText}>
                                            {item.INFO.substring(0, 10)}...
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableCellText}>{item.COST_USD}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableCellText}>{item.COST_TL}</DataTable.Cell>
                                        <DataTable.Cell 
                                            onPress={()=>{
                                                removeData(item)
                                            }}
                                            style={styles.DataTableCellText}>
                                            <Icon name="times-circle" size={20} color="red" />
                                        </DataTable.Cell>
                                    </DataTable.Row>

                                ))}
                            </>

                        }
                    </DataTable>


                    <View style={styles.TotalCostContainer}>
                        <Text style={styles.TotalCostText}>Total USD: {getTotalCostUSD} $</Text>
                        <Text style={styles.TotalCostText}>Total TL: {getTotalCostTL} ₺</Text>
                    </View>



                </ScrollView>
            }




        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: "100%",
        backgroundColor: '#fff'
    },
    TotalCostContainer: {
        padding: 20,
        marginVertical: 8,
        width: '100%',
        alignItems: 'flex-end',

    },
    TotalCostText: {
        fontSize: 15,
        fontWeight: '700'
    },
    DataTableCellText: {
        justifyContent: 'center'
    }
})