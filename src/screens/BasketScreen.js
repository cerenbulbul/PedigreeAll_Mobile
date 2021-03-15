import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Global } from '../Global'
const deneme = [
    {
        "COST_TL": 2242.5,
        "COST_USD": 299,
        "INFO": " (Torok (IRE) (2009),1673470) ",
        "ORDER_DETAIL_ID": 1615814723480,
        "ORDER_ID": -1
    }
]
export function BasketScreen() {

    const [getBasketData, setBasketData] = React.useState();

    const saveData = async () => {
        try {

            await AsyncStorage.setItem("SEPETIM", JSON.stringify(deneme))
            console.log('Data successfully saved')
            getBasket()
        } catch (e) {
            console.log('Failed to save the data to the storage')
        }
    }

    
 


    const readGetProductUsingTypeID = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Product/Get?p_iProductTypeId=' + -1, {
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
        readGetProductUsingTypeID();
    }, [])

    return (
        <View style={styles.Container}>

            <TouchableOpacity
                onPress={() => {
                    saveData();

                }}
                style={{ padding: 10, borderWidth: 1, borderColor: '#000' }}>
                <Text>
                    Kaydet
                </Text>
            </TouchableOpacity>
            

        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: "100%",
        backgroundColor: '#fff'
    }
})