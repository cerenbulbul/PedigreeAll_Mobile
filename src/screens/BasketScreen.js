import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export function BasketScreen() {

    const readGetProduct = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Product/GetAsNameId?p_iProductTypeId=' + -1 + '&p_iLanguage=' + 2, {
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
        readGetProduct();
    }, [])

    return (
        <View style={styles.Container}>

            <Text>Basket Screen</Text>

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